var express = require('express');
var router = express.Router();
var global = require('../global');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.header("Content-Type: text/json; charset=utf-8");
	switch (req.param('method')) {
		case 'addPlugin':
			var plugin = {
				name: req.param("name"),
				version: req.param("version"),
				createdTime: req.param("createdTime"),
				description: req.param("description"),
				pictureUrl: req.param("pictureUrl")
			};
			if (!plugin.name || !plugin.version || !plugin.createdTime || !plugin.description)
				res.send('{"error":"Required parameter name, version, createdTime, description"}');
			else {
				global.redis.hset(plugin.name, 'version', plugin.version);
				global.redis.hset(plugin.name, 'createdTime', plugin.createdTime);
				global.redis.hset(plugin.name, 'description', plugin.version);
				global.redis.hset(plugin.name, 'pictureUrl', plugin.version);
			}
			break;
		case 'addCategory':
			global.redis.sadd("categories", req.param('name'));
	}
	res.send(req.param("gg"));
});

module.exports = router;