var con = require('../../../config/database');
require("dotenv").config();
var common = require('../../../config/common');
var cryptoLib = require('cryptlib');
var asyncLoop = require('node-async-loop');
var moment = require('moment');
var shaKey = cryptoLib.getHashSha256(process.env.KEY, 32);
const { response, query } = require('express');
var emailTemplate = require('../../../config/template');


var Auth = {

    // get details of any users
    userdetails: function (user_id, callback) {
        con.query("SELECT u.*, IFNULL(ut.token,'') as token FROM tbl_user u LEFT JOIN tbl_user_device as ut ON u.id = ut.user_id WHERE u.id = '" + user_id + "' AND u.is_deleted='0' GROUP BY u.id", function (err, result, fields) {
            //console.log("Error of Users", err);
            if (!err && result.length > 0) {
                callback(result[0]);
            } else {
                callback(null);
            }
        });
    },

    // check email uniqueness
    checkUniqueEmail: function (user_id, request, callback) {

        if (request.email != undefined && request.email != '') {

            if (user_id != undefined && user_id != '') {
                var uniqueEmail = "SELECT * FROM tbl_user WHERE email = '" + request.email + "' AND is_deleted='0' AND id != '" + user_id + "' ";
            } else {
                var uniqueEmail = "SELECT * FROM tbl_user WHERE email = '" + request.email + "' AND is_deleted='0' ";
            }
            con.query(uniqueEmail, function (error, result, fields) {
                if (!error && result[0] != undefined) {
                    callback('0', {
                        keyword: 'rest_keywords_duplicate_email',
                        components: {}
                    }, false);
                } else {
                    callback('1', "Success", true);
                }
            });

        } else {
            callback('1', "Success", true);
        }
    },

    // update user details
    updateCustomer: function (user_id, upd_params, callback) {
        con.query("UPDATE tbl_user SET ? WHERE id = ? ", [upd_params, user_id], function (err, result, fields) {
            
            if (!err) {
                Auth.userdetails(user_id, function (response, err) {
                    callback(response);
                });
            } else {
                callback(null, err);
            }
        });
    },

    // sign Up Users
    signUpUsers: function (request, callback) {
        Auth.checkUniqueEmail('', request, function (uniquecode, uniquemsg, isUnique) {
    console.log(isUnique)
            if (isUnique) {

                var customer = {
                    name: request.name,
                    email: (request.email != undefined && request.email != "") ? request.email : '',
                    password: request.password,
                    language : request.language,
                    last_login: require("node-datetime").create().format('Y-m-d H:M:S')
                };
                // if(request.password != ''){
                //     request.password = cryptoLib.encrypt(request.password, shaKey, process.env.IV)
                // }
                
                con.query('INSERT INTO tbl_user SET ?', customer, function (err, result, fields) {
                    console.log(err)
                    if (!err) {
                        
                        console.log("hii",customer)
                        // common.checkUpdateDeviceInfo(result.insertId, "Customer", request, function () {

                            Auth.userdetails(result.insertId, function (userprofile, err) {
                                common.generateSessionCode(result.insertId, "Customer", function (Token) {
                                    
                                    userprofile.token = Token;
                                    callback('1', {
                                        keyword: 'rest_keywords_user_signup_success',
                                        components: {}
                                    }, userprofile);
                                });
                            });
                        // });
                    } else {
                        callback('0', {
                            keyword: 'rest_keywords_user_signup_failed',
                            components: {}
                        }, null);
                    }
                });

            } else {
                console.log(uniquecode, uniquemsg)
                callback(uniquecode, uniquemsg, null);
            }
        });
    },

    // check login details
      checkLogin: function (request, callback) {

        var whereCondition = " email='" + request.email + "' ";

        con.query("SELECT * FROM tbl_user where " + whereCondition + " AND is_deleted='0' ", function (err, result, fields) {

            if (!err && result[0] != undefined) {

                console.log(result)

                Auth.userdetails(result[0].id, function (userprofile) {

                    var password =result[0].password

                    // var password = cryptoLib.decrypt(result[0].password, shaKey, process.env.IV);
                    if (result[0].is_active == '0') {

                        callback('3', {
                            keyword: 'rest_keywords_inactive_accountby_admin',
                            components: {}
                        }, null);

                    }  else if (password !== request.password) {

                        callback('0', {
                            keyword: 'rest_keywords_invalid_password',
                            components: {}
                        }, null);

                    } else {

                        var updparams = {
                            is_online: "1",
                            last_login: require('node-datetime').create().format('Y-m-d H:M:S'),

                        }
                        // update device information of user
                        // common.checkUpdateDeviceInfo(result[0].id, "userlist", request, function () {
                            Auth.updateCustomer(result[0].id, updparams, function (userprofile, error) {
                                common.generateSessionCode(result[0].id, "userlist", function (token) {
                                    userprofile.token = token;
                                    callback('1', {
                                        keyword: 'rest_keywords_user_login_success',
                                        components: {}
                                    }, userprofile);
                                });
                            });
                        // });
                    }
                });
            } else {
                callback('0', {
                    keyword: 'rest_keywords_invalid_email',
                    components: {}
                }, null);
            }
        });
    },

   
    
    forgotPassword: function (request, callback) {
        
        con.query("SELECT * FROM tbl_user where email='" + request.email + "' AND is_deleted='0' ", function (err, result, fields) {
            if (!err & result[0] != undefined) {
                
                var updparams = {
                    forgotpassword_token: process.env.APP_NAME + result[0].id,
                    forgotpassword_date: require('node-datetime').create().format('Y-m-d H:M:S')
                }
                Auth.updateCustomer(result[0].id, updparams, function (isupdated) {
                    
                    result[0].encoded_user_id = Buffer.from(result[0].id.toString()).toString('base64');
                    emailTemplate.forgot_password(result[0], function (forgotTemplate) {
                        common.send_email("Forgot Password", request.email, forgotTemplate, function (isSend) {
                            if (isSend) {
                                callback('1', {
                                    keyword: 'rest_keywords_user_forgot_password_success',
                                    components: {}
                                }, result[0]);
                            } else {
                                callback('0', {
                                    keyword: 'rest_keywords_user_forgot_password_failed',
                                    components: {}
                                }, result[0]);
                            }
                        });
                    });
                });
            } else {
                callback('0', {
                    keyword: 'rest_keywords_user_doesnot_exist',
                    components: {}
                }, null);
            }
        });
    },

    changePassword: function (user_id, request, callback) {
        Auth.userdetails(user_id, function (userprofile) {
            // console.log(err)
            if (userprofile != null) {
                var currentpassword = userprofile.password;
                if (currentpassword != request.old_password) {
                    callback('0', {
                        keyword: 'rest_keywords_user_old_password_incorrect',
                        components: {}
                    }, null);
                } else if (currentpassword == request.new_password) {
                    callback('0', {
                        keyword: 'rest_keywords_user_newold_password_similar',
                        components: {}
                    }, null);
                } else {
                    var password = request.new_password;
                    var updparams = {
                        password: password
                    };
                    Auth.updateCustomer(user_id, updparams, function (userprofile) {
                        if (userprofile == null) {
                            callback('0', {
                                keyword: 'rest_keywords_something_went_wrong',
                                components: {}
                            }, null);
                        } else {
                            callback('1', {
                                keyword: 'rest_keywords_user_change_password_success',
                                components: {}
                            }, userprofile);
                        }
                    });
                }
            } else {
                callback('0', {
                    keyword: 'rest_keywords_userdetailsnot_found',
                    components: {}
                }, null);
            }
        });
    },

    
    editProfile: function (user_id, request, callback) {
        Auth.userdetails(user_id, function (userprofile) {
            if (userprofile != null) {

                var updparams = {
                   name : request.name,
                   email : request.email
          
                };
        console.log(userprofile)
                Auth.updateCustomer(user_id, updparams, function (userprofile) {
                    if (userprofile == null) {
                        callback('0', {
                            keyword: 'rest_keywords_something_went_wrong',
                            components: {}
                        }, null);
                    } else {
                        callback('1', {
                            keyword: 'rest_keywords_profileupdate_success',
                            components: {}
                        }, userprofile);
                    }
                });

            } else {
                callback('0', {
                    keyword: 'rest_keywords_userdetailsnot_found',
                    components: {}
                }, null);
            }
        });
    },

      // Show Profile User
      profileshow: function(user_id,req,callback){
        Auth.userdetails(user_id, function (result) {
            if(result != null){
                callback('1', {
                    keyword: 'user profile is here',
                    components: {}
                }, result);
            }else{
                callback('0', {
                    keyword: 'user profile get failed',
                    components: {}
                }, true);
            }
        });
    },

    company: function(request, callback){
        con.query(`SELECT * FROM tbl_user_otp_details where mobile = '${request.mobile}' AND otp = '${request.otp}'`, function (err, result, fields) {

            if(!err && result[0] != undefined){

                con.query(`update tbl_user_otp_details SET otp='' WHERE id = ${result[0].id}`, function (err, result, fields) {
                    callback('1', {
                        keyword: 'company details success',
                        components: {}
                    }, null);
                })
            }
            else {
                callback('0', {
                    keyword: 'company details fail.',
                    components: {}
                }, null);
            }
        });

    },

}
module.exports = Auth;