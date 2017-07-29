var express = require('express');
var router = express.Router();
var global = require('../global');

/* GET home page. */
router.get('/:plugin', function (req, res, next) {
	res.send(req.params.plugin);
});

module.exports = router;