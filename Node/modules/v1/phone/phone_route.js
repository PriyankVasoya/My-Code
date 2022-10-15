var express = require('express');
var middleware = require('../../../middleware/headerValidator');
var common = require('../../../config/common');
var phone_model = require('./phone');
var router = express.Router();
var moment = require('moment');

router.get("/search", function (req, res) {
    middleware.decryption(req.body, function (request) {
        var rules = {
            search: 'required'
        }

        const messages = {
            'required': req.language.required,
        }
        request.user_id = req.user_id;
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            phone_model.get_phone_by_search(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.get("/company", function (req, res) {
    middleware.decryption(req.body, function (request) {
        var rules = {
           
        }

        const messages = {
            'required': req.language.required,
        }
        request.user_id = req.user_id;
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            phone_model.get_company_list(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.get("/product_list", function (req, res) {
    phone_model.ProductListByCategory(req, function (responsecode, responsemsg, responsedata) {
        middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
    });        
});

router.post("/product_list_by_category", function (req, res) {

    middleware.decryption(req.body, function (request) {

        var rules = {
            company_id: '',
        }
        
        const messages = {
            'required': req.language.required,
            'in': req.language.in,
        }

        // checks all validation rules defined above and if error send back response
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            phone_model.ProductListByCategory(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});

router.post('/addtocart', function (req, res) { 
    middleware.decryption(req.body, function (request) {
    console.log("hello",req.body)
    var rules = {
        product_id : 'required',
        product_qty : 'required'
    }
    const message = {
        'required': req.language.required
    }

    if(middleware.checkValidationRules(request, res, rules, message,{})){
        phone_model.cartDetails(request, req, function (responsecode, responsemsg, responsedata) { 
            middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
         })
        }
    })
 });

 router.post('/showcart', function (req, res) { 
    middleware.decryption(req.body, function (request) {
    console.log("hello",req.body)
    var rules = {
     
    }
    const message = {
        'required': req.language.required
    }

    if(middleware.checkValidationRules(request, res, rules, message,{})){
        phone_model.get_phone_cart( req, function (responsecode, responsemsg, responsedata) { 
            middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
         })
        }
    })
 });


 router.post("/removecartitem", function (req, res) {
    middleware.decryption(req.body, function (request) {
        var rules = {
            product_id: 'required',
            user_id:'required'
        }

        const messages = {
            'required': req.language.required,
        }
        request.user_id = req.user_id;
        if (middleware.checkValidationRules(request, res, rules, messages, {})) {
            phone_model.removeCart(request, function (responsecode, responsemsg, responsedata) {
                middleware.sendresponse(req, res, 200, responsecode, responsemsg, responsedata);
            });
        }
    });
});







module.exports = router;