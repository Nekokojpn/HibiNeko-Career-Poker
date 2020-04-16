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
const PORT = 3000;

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
    console.log('join!');
    //ルーム処理
    if(playerCount % 4 === 0 && playerCount !== 0) {
        roomID++;
        poker.init();
    }
    let room = 'room' + roomID;
    
    //console.log(io.sockets.adapter.rooms);

    socket.on('connection_test_from_front', (txt, roomName) => {
        console.log(txt);
        io.to(roomName).emit('connection_test_from_server', txt);
    });

    socket.on('joinPlayer', (postName, sercretWord) => {
        if(sercretWord !== '') {
            room = sercretWord;
        }
        
        let roomPlayers = players.filter((val) => {
            return val.roomName === room;
        });
        let playerID = roomPlayers.length;
        let trumps = poker.getCardInfo(playerCount % 4);
        let player = new Player(playerID,postName, trumps.length, room);
        players.push(player);

        socket.join(room);
        socket.emit('joinResponse', player);
        io.to(room).emit('joinOpponent', players.filter((val) => {
            return val.roomName === player.roomName;  
        }));
        socket.emit('roomResponse', room);
        socket.emit('gameInfo', player);
        socket.emit('getTrump', trumps);
        playerCount++;
    });

    socket.on('changeTurn', (player, roomName) => {
        let nextPlayerId = player.ID + 1;
        if(nextPlayerId % 4 === 0) nextPlayerId -= 4;
        let roomPlayers = players.filter((val) => {
            return val.roomName === player.roomName;
        });
        if(nextPlayerId > roomPlayers.length - 1) nextPlayerId -= nextPlayerId % 4;
        io.to(roomName).emit('turnResponse', nextPlayerId);
        console.log(nextPlayerId);
    });

    socket.on('postTrumps', (player, postTrumps) => {
        let stageTrumps = new Array();
        for(let i = 0; i < postTrumps.length; i++) {
            stageTrumps.push(postTrumps[i][0]);
        }
        console.log(player.cardRemain);
        for(let i = 0; i < players.length; i++) {
            if(players[i].ID === player.ID && players[i].roomName === player.roomName) players[i] = player;
        }
        let opponents = players.filter((val) => val.roomName === player.roomName);
        io.to(player.roomName).emit('stageTrumps', stageTrumps);
        io.to(player.roomName).emit('changeOpponentLabel', opponents);
        socket.emit('changeViewTurn', player);
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
    constructor(_playerCount, _playerName, _cardRemain, _roomName) {
        this.ID = _playerCount;
        this.name = _playerName;
        this.cardRemain = _cardRemain;
        this.turnFlag = false;
        this.roomName = _roomName
    }
}