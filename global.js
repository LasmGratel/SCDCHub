var fs = require("fs");
exports.config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var rediz = require("redis");
var redis = rediz.createClient(exports.config.redisURL);
redis.on('error', function (err) {
	console.log('error event - ' + redis.host + ':' + redis.port + ' - ' + err);
});
exports.redis = redis;