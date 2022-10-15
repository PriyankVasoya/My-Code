var express = require('express');
var router = express.Router();
const middleware = require('../../middleware/headerValidator');

var auth = require('./Auth/route');
var phone = require('./phone/phone_route');

router.use('/', middleware.extractHeaderLanguage);
router.use('/', middleware.validateHeaderApiKey);
router.use('/', middleware.validateHeaderToken);

router.use('/auth/',auth);
router.use('/phone/',phone);

module.exports = router;
