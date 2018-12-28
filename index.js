var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var messages = []

io.on('connection', function(socket){
  socket.on('chat message', function(message){
    message['date'] = new Date(Date.now()).toLocaleString()
    messages.push(message)
    io.emit('chat message', message);
  });
  socket.on('init', function() {
    io.emit('init', messages);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
