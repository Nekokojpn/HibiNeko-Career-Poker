//ファイル読み込み
let NekoCareerPoker = require('./public/js/NekoCareerPoker.js');
let poker = new NekoCareerPoker();
poker.init();//ソートまでされる
//console.log(poker.getCardInfo(0));//カード情報
//console.log(poker.getCardInfo(1));
//console.log(poker.getCardInfo(2));
//console.log(poker.getCardInfo(3));

//サーバ処理
var express = require('express');
var app = express();
app.use('/static', express.static(__dirname + '/public'));
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//ルート
app.get('/' , function(req, res){
    res.sendFile(__dirname+'/view/index.html');
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
    if(playerCount % 4 === 0 && playerCount !== 0) {
        roomID++;
        poker.init();
    }
    let room = 'room' + roomID;
    socket.join(room);
    //console.log(io.sockets.adapter.rooms);

    socket.on('connection_test_from_front', (txt, roomName) => {
        console.log(txt);
        io.to(roomName).emit('connection_test_from_server', txt);
    });

    socket.on('joinPlayer', (postName) => {
        let trumps = poker.getCardInfo(playerCount % 4);
        let player = new Player(playerCount,postName, roomID, trumps.length, room);
        players.push(player);
        socket.emit('joinResponse', player);
        io.to(room).emit('joinOpponent', players.filter((val) => {
            return val.roomID === player.roomID;  
        }));
        socket.emit('roomResponse', room);
        socket.emit('gameInfo', player);
        socket.emit('getTrump', trumps);
        playerCount++;
    });

    socket.on('requestTrump', () => {
        socket.emit('getTrump', poker.getCardInfo(3));
    });

    socket.on('changeTurn', (player_id, roomName) => {
        let nextPlayerId = player_id + 1;
        if(nextPlayerId % 4 === 0) nextPlayerId -= 4;
        if(nextPlayerId > players.length - 1) nextPlayerId -= nextPlayerId % 4;
        io.to(roomName).emit('turnResponse', nextPlayerId);
        console.log(nextPlayerId);
    });

    socket.on('postTrumps', (player_id, postTrumps) => {
        let player = players.find((val) => val.ID === player_id);
        player.cardRemain -= postTrumps.length;
        for(let i = 0; i < players.length; i++) {
            if(players[i].ID === player.ID) players[i] = player;
        }
        let opponents = players.filter((val) => val.roomName === player.roomName);
        io.to(player.roomName).emit('stageTrumps', postTrumps);
        io.to(player.roomName).emit('changeOpponentLabel', opponents);
        socket.emit('changeViewTurn', player);
    });

    socket.on('chat_from_front', (message,roomName) => {
        console.log(message);
        console.log(roomName);
        io.to(roomName).emit('chat_from_server', message);
        io.to(roomName).emit('changeViewTurn');
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

class Player {
    constructor(_playerCount, _playerName, _roomID, _cardRemain, _roomName) {
        this.ID = _playerCount;
        this.name = _playerName;
        this.roomID = _roomID;
        this.cardRemain = _cardRemain;
        this.turnFlag = false;
        this.roomName = _roomName
    }
}