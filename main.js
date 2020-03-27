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

//ゲーム処理
let players = new Array();
let playerCount = 0;

//socket
io.on('connection',function(socket){
    socket.on('connection_test_from_front', (txt) => {
        console.log(txt);
        io.emit('connection_from_server', txt);
    });

    socket.on('joinPlayer', () => {
        let player = new Player(playerCount);
        players.push(player);
        console.log(player.ID);
        socket.emit('joinResponse', player);
        playerCount++;
    });

    socket.on('changeTurn', (player_id) => {
        let nextPlayerId = player_id + 1;
        if(nextPlayerId > players.length - 1) nextPlayerId = 0;
        io.emit('turnResponse', nextPlayerId);
        console.log(nextPlayerId);
    })

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

class Player {
    constructor(playerCount) {
        this.ID = playerCount;
        this.name = '';
        this.turnFlag = false;
    }
}