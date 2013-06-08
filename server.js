var net = require('net') ;
var redis = require('redis') ; 
var tcp_server = net.createServer(function(conn) { 
	
	console.log('Connection Established'); 
	
	var client = redis.createClient();
	
	client.on('error',function(err) { 
		console.log('Error' + err ) ;
	});	
	
	client.select(6) ;
	
	conn.on('data',function(data) { 
		console.log('Driver log: '+ data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort) ; 
	data += "Log From Address: " + conn.remoteAddress + " Port : " + conn.remotePort + "\n" ; 
	client.rpush('Logs',data);
	});
}).listen(9623);

tcp_server.on('close',function(err) { 
	client.quit() ; 
	console.log('closing Connection');
});
console.log('listening on port 9623');

