// Express
const express = require('express')
const app = express()
 
const server = app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
})
 
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>')
});
 
// ↓ここからSocketIOの処理
const io = require('socket.io')(server)
 
io.on('connection', function(socket) {
  console.log(`a user connected[id:${ socket.id }]`)
  socket.on('POST_MESSAGE', function(data) {
    console.log(`posted[name:${ data.name },message:${ data.message }]`)
    io.emit('MESSAGE', data)
  })
})
 