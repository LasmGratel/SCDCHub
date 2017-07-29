var express = require('express');
var router = express.Router();
var global = require('../global');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('information', {
		config: global.config
	});
});

module.exports = router;
