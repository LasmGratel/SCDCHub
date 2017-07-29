var express = require('express');
var router = express.Router();
var global = require('../global');

/* GET home page. */

var plugin = {};

router.get('/:plugin', function (req, res, next) {
	plugin.name = req.params.plugin;
	global.redis.hkeys(req.params.plugin, function (err1, replies1) {
		replies1.forEach(function (key) {
			global.redis.hmget(req.params.plugin, key, function (err2, reply) {
				plugin[key] = reply[0];
			});
		});
	});
	setTimeout(
		function () {
			res.render('plugin', {
				plugin: plugin
			})
		}, 10);
});

module.exports = router;