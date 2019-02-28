const host = "localhost";
const port = 8080;
const http = require("http")
const http_serv = http.createServer(handleHTTP).listen(port, host)
const io = require("socket.io")
io.listen(http_serv)

function handleIO(socket){
	function disconnect(){
		clearInterval(intv);
		console.log("clear disconnect");
	}

  console.log("client connected");

  socket.on("disconnect", disconnect);

  socket.on("typeit",function(msg){
  	socket.broadkast.emit("messages",msg);
  })
};
