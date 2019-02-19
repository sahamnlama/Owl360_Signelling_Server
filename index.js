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
    
    socket.on('start_stream', function(data){
        console.log(data);
        socket.broadcast.emit('start_stream', data);
    });
    
    socket.on('close_stream', function(data){
        console.log(data);
        socket.broadcast.emit('close_stream', data);
    });
    
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
    
    socket.on('request_visitor_folder', function(data){
        console.log(data);
        socket.broadcast.emit('request_visitor_folder', data);
    });
    
    socket.on('visitor_folder', function(data){
        console.log(data);
        socket.broadcast.emit('visitor_folder_list', data);
    });
    
    socket.on('request_visitor_images', function(data){
        console.log(data);
        socket.broadcast.emit('request_visitor_images', data);
    });
    
     socket.on('visitor_image1', function(image){
        socket.broadcast.emit('visitor_image1', image);
     });

     socket.on('visitor_image2', function(image){
        socket.broadcast.emit('visitor_image2', image);
     });

     socket.on('visitor_image3', function(image){
        socket.broadcast.emit('visitor_image3', image);
     });
    
     socket.on('update_visitor_folder', function(data){
        socket.broadcast.emit('update_visitor_folder', data);
     });

     socket.on('ack_update_visitor_folder', function(data){
        socket.broadcast.emit('ack_update_visitor_folder', data);
     });
   
    
     //Visitor push notification
     socket.on('send_visitor_pushnotification', function(data){
        socket.broadcast.emit('send_visitor_pushnotification', data);
     });
});

http.listen(port, function(){
    log.info("Server listen through the port %s", port);
});


