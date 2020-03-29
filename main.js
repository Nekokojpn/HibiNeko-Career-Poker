//サーバ処理
var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//ルート
app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

//サーバ監視
http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});

//ゲーム処理
let players = new Array();
let playerCount = 0;
let roomID = 0;
//socket
io.on('connection',function(socket){
    //ルーム処理
    if(playerCount % 4 === 0 && playerCount !== 0) roomID++;
    var room = 'room' + roomID;
    socket.join(room);
    //console.log(io.sockets.adapter.rooms);

    socket.on('connection_test_from_front', (txt, roomName) => {
        console.log(txt);
        io.to(roomName).emit('connection_test_from_server', txt);
    });

    socket.on('joinPlayer', () => {
        let player = new Player(playerCount);
        players.push(player);
        socket.emit('joinResponse', player);
        socket.emit('roomResponse', room);
        playerCount++;
    });

    socket.on('changeTurn', (player_id, roomName) => {
        let nextPlayerId = player_id + 1;
        if(nextPlayerId % 4 === 0) nextPlayerId -= 4;
        if(nextPlayerId > players.length - 1) nextPlayerId -= nextPlayerId % 4;
        io.to(roomName).emit('turnResponse', nextPlayerId);
        console.log(nextPlayerId);
    });

    socket.on('chat_from_front', (message,roomName) => {
        console.log(message);
        console.log(roomName);
        io.to(roomName).emit('chat_from_server', message);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

class Player {
    constructor(playerCount) {
        this.ID = playerCount;
        this.name = '';
        this.cardRemain = 13;
        this.turnFlag = false;
    }
}
