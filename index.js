var engine = require('engine.io-client')
var url = 'http://localhost:5000';
var num = 500;

var sockets = [];
for (var i=0; i<num; i++) {
  var socket = engine(url);
  socket.on('open', function(){
    socket.on('message', function(data){
      var d = JSON.parse(data);
      var now = Date.now();
      var rtt = now - d.date;
      console.log(rtt);
    });
  });
  sockets.push(socket);
}
sockets.forEach(function(socket) {
    socket.send(JSON.stringify({date : Date.now()}));
});
