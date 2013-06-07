var spawn = require('child_process').spawn ; 
var net = require('net'); 

var client = new net.Socket(); 
client.setEncoding('utf8');


 


var logs = spawn('tail',['-f','/var/log/syslog']);
logs.stdout.setEncoding('utf8');
logs.stdout.on('data',function(data) {
	
	client.connect('9623','127.0.0.1',function() { 
	console.log('Connection with the server established');	
	client.write(data);
		client.end(); 
	});
	

			
	console.log(data);
	
});
logs.stderr.on('data',function(err) { 
	console.log('stderr: ' + data ) ; 
});

logs.on('exit',function(exit_code) { 
	console.log('Child process exit code: ' + code ) ;
	client.end();
})



