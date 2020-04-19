//ファイル読み込み
let NekoCareerPoker = require('./public/js/NekoCareerPoker.js');

//let poker = new NekoCareerPoker();
//poker.init();//ソートまでされる
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
let roomTrumps = new Array();
//socket
io.on('connection',function(socket){
    console.log('join!');
    //ルーム処理
    if(playerCount % 4 === 0 && playerCount !== 0) {
        roomID++;
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
        if(playerID <= 3) { 
            if(roomTrumps[room] === undefined) {
                let createdPoker = new NekoCareerPoker();
                createdPoker.init();
                roomTrumps[room] = createdPoker;
            }
            let roomPoker = roomTrumps[room];
            let trumps = roomPoker.getCardInfo(playerID);
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
            playerCount++
        } else {
            socket.emit('overPlayers', room);
        }
    });

    socket.on('changeTurn', (player, judgment) => {
        //console.log(judgment);
        let testFive = 0;
        //judgment
        //playerID + 1 + どのくらい飛ばすか
        let nextPlayerId = player.ID + 1;
        if(testFive < 2) {
            nextPlayerId += testFive;
        } else {
            nextPlayerId = player.ID;
        }
        

        let roomPlayers = players.filter((val) => {
            return val.roomName === player.roomName;
        });
        console.log(nextPlayerId);
        console.log(roomPlayers.length - 1);
        if(nextPlayerId > roomPlayers.length - 1) nextPlayerId -= nextPlayerId % 4;console.log('test');
        io.to(player.roomName).emit('turnResponse', nextPlayerId);
    });

    socket.on('postTrumps', (postInfo) => {
        /*
         * define
         */
        let player = postInfo[0];
        let postTrumps = postInfo[1];
        let judgment = postInfo[2];
        let sevenPost = postInfo[3];
        let stageTrumps = new Array();
        console.log(sevenPost);
        //場のカード切り出し
        for(let i = 0; i < postTrumps.length; i++) {
            stageTrumps.push(postTrumps[i][0]);
        }
        //プレイヤー更新
        for(let i = 0; i < players.length; i++) {
            if(players[i].ID === player.ID && players[i].roomName === player.roomName) players[i] = player;
        }
        //playerID + 1 + どのくらい飛ばすか
        let nextPlayerId = player.ID + 1;
        //部屋のプレイヤーを切り出す
        let roomPlayers = players.filter((val) => {
            return val.roomName === player.roomName;
        });

        /*
         * turnJudgment
         */
        //define
        console.log(judgment);
        if(judgment) {
            let testFive = judgment['5'];
            let testEight = true;
            //5とび
            if(testFive === 1) {
                nextPlayerId += testFive;
            } else if(testFive > 1) {
                nextPlayerId = player.ID;
                //１週回ったから場を流す
                stageTrumps = '';
            }
        }
        //8切り
        if(judgment['8']) {
            nextPlayerId = player.ID;
            stageTrumps = '';
        }
        //1週回ったら最初のプレイヤーに戻す
        if(nextPlayerId > roomPlayers.length - 1) nextPlayerId = nextPlayerId % 4;
        
        /*
         * socket
         */
        //ターン
        io.to(player.roomName).emit('turnResponse', nextPlayerId, sevenPost);
        //場のトランプを送信
        io.to(player.roomName).emit('stageTrumps', stageTrumps);
        //相手プレイヤーの情報を送信
        io.to(player.roomName).emit('changeOpponentLabel', roomPlayers);
        //プレイヤー情報(vue.js,画面右下)
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