var redis = require("redis") ,
    http = require('http') ; 
var httpLogger = http.createServer();

httpLogger.on('request',function(req,res) {

	var client = redis.createClient();
	
	client.on('error',function(err) {
		console.log('error');
	});

	client.select(6);
	
	client.lpop('Logs',function(err,reply) {
		if(err) { 
			return console.error('error : ' + err ) ;
		}

	if(reply) { 
		res.write(reply) ; 
	}
	else { 
		res.write('End of Queue');
	}
	res.end();
	});
	client.quit();
});

httpLogger.listen(8124);

console.log('The Logger Server listening on 8124') ; 


