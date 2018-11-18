var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var Log = require('log'),
    log = new Log('debug');


var port = process.env.PORT || 3332;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
    res.redirect("index.html");
});

app.get('/video', function(req, res){
    res.redirect("videoChat.html");
});

io.on('connection', function(socket){
    socket.on('stream', function(image){
       socket.broadcast.emit('stream', image);
    });

    socket.on("join", function(data){
        socket.broadcast.emit("join", data);
    });

    socket.on("callee_arrived", function(data){
        console.log("callee arrived");
        socket.broadcast.emit("callee_arrived", data);
    });

    socket.on("new_ice_candidate", function(data){
        socket.broadcast.emit("new_ice_candidate", data);
    });

    socket.on("new_description", function(data){
        socket.broadcast.emit("new_description", data);
    });
});

http.listen(port, function(){
    log.info("Server listen through the port %s", port);
});

