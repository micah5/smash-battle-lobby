var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var messages = []

app.get('/messages', function(req, res){
  res.send(JSON.stringify(messages));
});

app.post('/message', function(req, res) {
  incoming_message(req.body)
  res.send(JSON.stringify({ success: true }));
});

function incoming_message(message) {
  if (message.id == null && message.chat == null) {
    console.log('send error message')
    //todo: send error message
  } else {
    message['date'] = new Date(Date.now()).toLocaleString()
    messages.push(message)
    io.emit('chat message', message);
  }
}

io.on('connection', function(socket){
  socket.on('chat message', function(message){
    incoming_message(message)
  });
  socket.on('init', function() {
    io.emit('init', messages);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
