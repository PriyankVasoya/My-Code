var con = require('../../../config/database');
require("dotenv").config();
var common = require('../../../config/common');
var cryptoLib = require('cryptlib');
var asyncLoop = require('node-async-loop');
var shaKey = cryptoLib.getHashSha256(process.env.KEY, 32);
var moment = require('moment');
const { end } = require('../../../config/database');
phone = {

    get_phone_by_search: function (request, callback) {
        con.query(`SELECT * FROM tbl_product WHERE product_name LIKE '%${request.search}%' AND is_active = 1`, (err, result) => {
            if (!err) {
                callback('1', {
                    keyword: 'products found...',
                    components: {}
                }, result);
            } else {
                callback('0', {
                    keyword: 'products not found...',
                    components: {}
                }, null);
            }
        })

    },

    get_company_list: function (request, callback) {
        con.query(`SELECT * FROM tbl_company_name WHERE is_active = 1`, (err, result) => {
            if (!err) {
                callback('1', {
                    keyword: 'company found...',
                    components: {}
                }, result);
            } else {
                callback('0', {
                    keyword: 'company not found...',
                    components: {}
                }, null);
            }
        })

    },

     ProductListByCategory: function (request, callback) {

        let where = '';
        if(request.company_id != undefined){
            where = `AND (p.company_id = `+request.company_id+`) `;
        }

        var sql = `SELECT p.*
        FROM tbl_product p
        LEFT JOIN tbl_company_name c ON c.id = p.company_id
        WHERE p.is_active = '1'`
        +where+
        `ORDER BY p.id DESC`;
                
        con.query(sql, function (err, result, fields) {
            if (!err) { 
                if(result != 0){
                    callback('1', {
                        keyword: 'rest_keywords_product_data_successfound',
                        components: {}
                    }, result);
                }else{
                    callback('0', {
                        keyword: 'rest_keywords_something_went_wrong',
                        components: {}
                    }, null);
                }

            } else {
                callback('0', {
                    keyword: 'rest_keywords_no_data_found',
                    components: {}
                }, null);
            }
        });

    },
 
    cartDetails: function (request, req, callback) { 
        request.user_id = req.user_id;
        phone.check_phone_info(request, function (err, msg,phoneCart ) {
            console.log(phoneCart)
            if(phoneCart != null){
                phone.update_phone_qty(request, phoneCart, function () { 
                    phone.get_phone_cart(request, function (err, msg, result) { 
                        callback('1',{
                            keyword:'info success',
                            components:{}
                        }, result);
                        })
                    })
            } else{
                var rules = {
                    user_id: req.user_id,
                    product_id: request.product_id,
                    product_qty: request.product_qty,
                }
                console.log(rules)
                phone.order_details(rules, function (err, result) { 
                    phone.get_phone_cart(request, function (err, msg, result) { 
                        callback('0', {
                            keyword:'insert sucess',
                            components:{}
                        },result);
                        })
                    })
            }
         })
       
    },

    order_details: function (request, callback) { 
        console.log(request);
        con.query(`INSERT INTO tbl_order SET ?`, request, function (err, result) { 
            console.log('12');
            // console.log(err);
            if(!err){
                callback('1',{
                    keyword:'order details created',
                    components:{}
                }, result);
            } else{
                callback('0',{
                    keyword: 'order details failed',
                    components:{}
                },null);
            }
            })
    },

    check_phone_info: function (req, callback) { 
        console.log('checkphone',req.user_id)
        con.query(`select * from tbl_order where product_id = `+req.product_id+` AND user_id = `+req.user_id+``, function (err, result) { 
            console.log(result);
            console.log(err)
            if(!err && result.length > 0){
                callback('1',{
                    keyword:'info sucess',
                    components:{}
                }, result[0]);
            } else{
                callback('0', {
                    keyword:'info failed',
                    components:{}
                }, null);
            }
         })
    },

    update_phone_qty: function (req, params, callback) { 
        
        con.query(`UPDATE tbl_order SET product_qty = '`+req.product_qty+`' where id = `+params.id+``, function (err, result) { 
           
            if(!err){
                callback('1', {
                    keyword:'update success',
                    components:{}
                }, result);
            } else {
                callback('0', {
                    keyword:'update failed',
                    components:{}
                },null);
            }
         })
    }, 

    get_phone_cart: function (req, callback) { 
        con.query(`SELECT o.*,p.*,(o.product_qty*p.price) as total FROM tbl_order as o LEFT JOIN tbl_product as p ON o.product_id = p.id where o.user_id =  `+req.user_id+``, function (err, result) { 
            console.log('hiii',req.user_id)
            if(!err){
                callback('1', {
                    keyword:'rest_keyword_get_phone_success',
                    components:{}
                }, result);
            } else {
                callback('0', {
                    keyword:'rest_keyword-get_phone_failed',
                    components:{}
                }, null);
            }
         })
    },

    removeCart: function(req,callback){
        con.query(`delete from tbl_order where product_id = `+req.product_id+` AND user_id = `+req.user_id+``, function(err,result){
            if (!err) {
                callback('1', {
                    keyword: 'item deleted successfully',
                    components: {}
                }, result);
            } else {
                callback('0', {
                    keyword: 'item deleted failed',
                    components: {}
                }, null);
            }
        })
    },


}

module.exports = phone;