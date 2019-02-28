function handleHTTP(req,res) {
	if (req.method == "GET") {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end",function(){
				req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
				static_files.serve(req,res);
			});
			debugger;
			req.resume();
		}
		else {
			res.writeHead(403);
			res.end("Get outta here!");
		}
	}
	else {
		res.writeHead(403);
		res.end("Get outta here!");
	}
}


var host = "127.0.0.1",
port = 8006,
http = require("http"),
http_serv = http.createServer(handleHTTP),
node_static = require("node-static"),
static_files = new node_static.Server(__dirname),
io = require("socket.io").listen(http_serv);
debugger;

function handleIO(socket){
	function disconnect(){
		clearInterval(intv);
		console.log("clear disconnect");
	}

	function getmsg(msg) {
		io.sockets.emit("broadcast",msg+"_test");// Receive the message from the client
		//io.broadcast.emit // Send the message to everyone including the current sucket
	}
	function spy(move){
		socket.broadcast.emit("spy","move"); // Send the message to everybody except this sucket
	}
  console.log("client connected");

  socket.on("disconnect", disconnect);
	socket.on("msg",getmsg);
	socket.on("spy",spy);

	var intv = setInterval(function(){
		socket.emit("hello",new Date());
	},1000);
  // socket.on("typeit",function(msg){
  // 	socket.broadcast.emit("messages",msg);
  // })
};

// configure socket.io
// io.configure(function(){
// 	io.enable("browser client minification"); // send minified client
// 	io.enable("browser client etag"); // apply etag caching logic based on version number
// 	io.set("log level", 1); // reduce logging
// 	io.set("transports", [
// 		"websocket",
// 		"xhr-polling",
// 		"jsonp-polling"
// 	]);
// });


http_serv.listen(port, host);
io.on("connection",handleIO)
