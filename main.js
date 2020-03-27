//サーバ処理
var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//ルート
app.get('/' , function(req, res){
   // res.sendFile(__dirname+'/index.html');
    res.sendFile(__dirname+'/NekoCareerPoker.js');
});

//サーバ監視
http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});


//socket
io.on('connection',function(socket){

});