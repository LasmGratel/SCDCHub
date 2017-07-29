var express = require('express');
var router = express.Router();
var global = require('../global');
var series = require('async/series');

var plugins = [];
var categories = [];

/* GET home page. */
router.get('/', function (req, res, next) {
	global.redis.keys('*', function (err, replies) {
		replies.forEach(function (pluginName) {
			if (pluginName !== 'categories')
				global.redis.hkeys(pluginName, function (err1, replies1) {
					replies1.forEach(function (key) {
						global.redis.hmget(pluginName, key, function (err2, reply) {
							if (typeof(plugins[pluginName]) !== 'object')
								plugins[pluginName] = {};
							plugins[pluginName].name = pluginName;
							plugins[pluginName][key] = reply[0];
						});
					});
				});
			else
				global.redis.smembers(pluginName, function (err1, replies1) {
					categories = replies1;
				});
		});
	});
	setTimeout(
		function () {
			res.render('index', {
				plugins: plugins,
				categories: categories
			})
		}, 10);
});

module.exports = router;