var express = require('express');
var middleware = require('../../../middleware/headerValidator');
var common = require('../../../config/common');
var auth_model = require('./auth_model');
const { request } = require('express');
var router = express.Router();

//Signup
router.post("/signup", function (req, res) {

    // request method decryption
    console.log("1",req.body)
    middleware.decryption(req.body, function (request) {
        var rules = {
            name: 'required',
            email: 'required|email',
            password: 'required',
          
        }
        const messages = {
            'required': req.language.required,
            'in': req.language.in,
        }
        request.language = req.lang;

        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            auth_model.signUpUsers(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

// user login
router.post("/login", function (req, res) {

    middleware.decryption(req.body, function (request) {

        var request = request
        var rules = {
         
            email: 'required|email',
            password: 'required',
     
        }

        const messages = {
            'required': req.language.required,
            'in': req.language.in,
        }
        request.lang = req.lang 
        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            auth_model.checkLogin(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.post("/forgotpassword", function (req, res) {

    middleware.decryption(req.body, function (request) {
console.log("hiiii")
        var request = request
        var rules = {
            email: 'required|email'
        }

        const messages = {
            'required': req.language.required,
            'email': req.language.email,
        }

        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            auth_model.forgotPassword(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.post("/changepassword", function (req, res) {

    middleware.decryption(req.body, function (request) {

        var request = request
        var rules = {
            old_password: 'required',
            new_password: 'required',
        }

        const messages = {
            'required': req.language.required
        }

        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            auth_model.changePassword(req.user_id, request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

// API for profile Show
router.get("/profileshow", function (req, res) {
    // middleware.decryption(req, function (request) {
        // var request= JSON.parse(req.body);

        if (middleware.checkValidationRules(request, res, {})) {
            auth_model.profileshow(req.user_id, request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    // });
});

router.post("/editprofile", function (req, res) {
    middleware.decryption(req.body, function (request) {
        var rules = {
            name: 'required',
            email: 'required',

        }
        const messages = {
            'required': req.language.required
        }
        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            auth_model.editProfile(req.user_id, request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.get("/company", function (req, res) {
    // middleware.decryption(req, function (request) {
        // var request= JSON.parse(req.body);

        if (middleware.checkValidationRules(request, res, {})) {
            auth_model.Company(req.user_id, request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    // });
});
    
router.post("/logout", function (req, res) {

    var updusers = {
        is_online: "0"
    };
    auth_model.updateCustomer(req.user_id, updusers, function (userprofile, error) {
        if (userprofile != null) {
            var deviceparam = {
                token: "",
            
            };
            common.updateDeviceInfo(req.user_id, 'User', deviceparam, function (respond) {
                middleware.sendresponse(req, res, 200, '1', {
                    keyword: 'rest_keywords_userlogout_success',
                    components: {}
                }, null);
            });
        } else {
            middleware.sendresponse(req, res, 200, '0', {
                keyword: 'rest_keywords_something_went_wrong',
                components: {}
            }, null);
        }
    });
});




module.exports = router;