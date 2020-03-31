// グローバルに展開
phina.globalize();
//アセット
var ASSETS = {
  // 画像
  image: {
    "S1":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust1.png",
    "S2":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust2.png",
    "S3":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust3.png",
    "S4":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust4.png",
    "S5":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust5.png",
    "S6":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust6.png",
    "S7":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust7.png",
    "S8":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust8.png",
    "S9":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust9.png",
    "S10":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust10.png",
    "S11":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust11.png",
    "S12":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust12.png",
    "S13":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust13.png",
    "C1":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust14.png",
    "C2":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust15.png",
    "C3":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust16.png",
    "C4":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust17.png",
    "C5":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust18.png",
    "C6":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust19.png",
    "C7":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust20.png",
    "C8":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust21.png",
    "C9":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust22.png",
    "C10":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust23.png",
    "C11":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust24.png",
    "C12":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust25.png",
    "C13":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust26.png",
    "D1":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust27.png",
    "D2":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust28.png",
    "D3":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust29.png",
    "D4":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust30.png",
    "D5":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust31.png",
    "D6":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust32.png",
    "D7":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust33.png",
    "D8":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust34.png",
    "D9":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust35.png",
    "D10":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust36.png",
    "D11":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust37.png",
    "D12":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust38.png",
    "D13":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust39.png",
    "H1":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust40.png",
    "H2":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust41.png",
    "H3":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust42.png",
    "H4":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust43.png",
    "H5":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust44.png",
    "H6":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust45.png",
    "H7":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust46.png",
    "H8":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust47.png",
    "H9":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust48.png",
    "H10":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust49.png",
    "H11":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust50.png",
    "H12":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust51.png",
    "H13":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust52.png",
    "J14":"https://chicodeza.com/wordpress/wp-content/uploads/torannpu-illust53.png",
  },
};
//グローバル
let socket = io();
let player;
let players = new Array();
let labels =  new Array();
let roomName;
let trumps;
let trumpSprites = new Array();
let postTrumps = new Array();
let stageTrumps = new Array();
let stageTrumpSprites = new Array();
let fontSize = 50;
document.body.style.cursor = "pointer";

phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function(option) {
    // 親クラス初期化
    this.superInit(option);
    // 背景色
    this.backgroundColor = 'black';
    
    this.pass =  Shape({
      width: 200,
      height: 50
    });
    this.pass.backgroundColor = 'green';
    this.pass.addChildTo(this);
    this.pass.setPosition(this.gridX.center(-5), this.gridY.center(6.8));
    this.pass.setInteractive(false);
    this.pass.onpointstart = function() {
          socket.emit('changeTurn', player.ID, roomName);
    };
    this.pass.on('pointover', () => {
      this.pass.alpha = 0.5;
    });
    this.pass.on('pointout', () => {
      this.pass.alpha = 1.0;
    });

    this.post =  Shape({
      width: 200,
      height: 50
    });
    this.post.backgroundColor = 'red';
    this.post.addChildTo(this);
    this.post.setPosition(this.gridX.center(5), this.gridY.center(6.8));
    this.post.setInteractive(false);
    this.post.onpointstart = function() {
          socket.emit('postTrumps', postTrumps, roomName);
          socket.emit('changeTurn', player.ID, roomName);
    };
    this.post.on('pointover', () => {
      this.post.alpha = 0.5;
    });
    this.post.on('pointout', () => {
      this.post.alpha = 1.0;
    });

    this.turnFlag = Shape({
      width: 30,
      height: 30
    });
    
    this.opponent =  Shape({
      width: 400,
      height: 75
    });
    this.opponent.backgroundColor = 'white';
    this.opponent.addChildTo(this);
    this.opponent.setPosition(this.gridX.center(5), this.gridY.center(-7.0));

    this.opponent2 =  Shape({
      width: 400,
      height: 75
    });
    this.opponent2.backgroundColor = 'white';
    this.opponent2.addChildTo(this);
    this.opponent2.setPosition(this.gridX.center(0), this.gridY.center(-7.0));

    this.opponent3 =  Shape({
      width: 400,
      height: 75
    });
    this.opponent3.backgroundColor = 'white';
    this.opponent3.addChildTo(this);
    this.opponent3.setPosition(this.gridX.center(-5), this.gridY.center(-7.0));


    //this.createLabel(this, 'idText', 'ID:', 'white', fontSize, 10,10);
    //this.createLabel(this, 'turnText', 'TURN:', 'white', fontSize, 10, 100);
    this.createLabel(this, 'postText', 'POST', 'white', 60, 1085, 705);
    this.createLabel(this, 'passText', 'PASS', 'white', 60, 185, 705);

   /*
    * 以下ゲームのsocket
    */

    //初期socket
    setTimeout(() => {
      socket.emit('joinPlayer', window.prompt("なまえをにゅうりょくしてね！", ""));
      socket.emit('requestTrump');
    }, 100);

    socket.on('connection_test_from_server', (txt) => {
      console.log(txt);
    });

    socket.on('roomResponse', (_roomName) => {
      roomName = _roomName;
    });

    socket.on('joinResponse', (_player) => {
      player = _player;
      //this.createLabel(this, 'player_id', player.ID, 'white', fontSize, 100, 10);
      if(player.ID % 4 === 0) {
        this.turnFlag.show();
        this.pass.setInteractive(true);
        this.post.setInteractive(true);
      }
      else {
        this.pass.hide();
        this.post.hide();
      }
    });

    socket.on('joinOpponent', (_players) => {
      players = _players;
      players = players.filter((val) => {
        return val.ID !== player.ID; 
      })
      this.createOpponentLabel(this);
      console.log(players);
    });
    socket.on('getTrump', (_trumps) => {
      trumps = _trumps;
      this.createPlayerTrumps(this);
    });

    socket.on('turnResponse', (nextPlayerId) => {
      if(player.ID === nextPlayerId) {
        this.turnFlag.show();
        this.pass.show();
        this.pass.setInteractive(true);
        this.post.show();
        this.post.setInteractive(true);
      }
      else {
        this.turnFlag.hide();
        this.pass.hide();
        this.pass.setInteractive(false);
        this.post.hide();
        this.post.setInteractive(false);
      }
      console.log(nextPlayerId);
    });

    socket.on('stageTrumps', (_stageTrumps) => {
      this.clearStageTrumps(this);
      stageTrumps = _stageTrumps;
      this.createStageTrumps(this);
      console.log(stageTrumps);
    });

  },
  // 毎フレーム更新処理
  update: function() {

  },
  createLabel: (self ,_name, _text, _color, _fontSize, _x, _y) => {
    labels[_name] = Label({text: _text, fill: _color, fontSize: _fontSize, x: _x, y: _y}).addChildTo(self).origin.set(0, 0);
  },
  createPlayerTrumps: (self) => {
    for(let i = 0; i < trumps.length; i++){
      //trumpSprites[_name] =
      let trumpMark = trumps[i][0];
      let trumpNum = trumps[i][1];
      let trump = trumpMark + trumpNum;
      
      let trumpSprite = Sprite(trump).addChildTo(self);
      trumpSprite.x = self.gridX.span(i * 1.05 + 1.05);
      trumpSprite.y = self.gridY.center(3.0);
      trumpSprite.setScale(0.2);
      trumpSprite.clickFlag = false;

      trumpSprites.push(trumpSprite);
      trumpSprite.setInteractive(true);
      trumpSprite.onpointstart = function() {
        // 削除
        if(!trumpSprite.clickFlag) {
          trumpSprite.y = self.gridY.center(2.5);
          trumpSprite.clickFlag = true
          postTrumps.push(trump);
          console.log(postTrumps);
        }else {
          trumpSprite.y = self.gridY.center(3.0);
          trumpSprite.clickFlag = false
          postTrumps = postTrumps.filter((val) => {
            return val != trump;
          });
          console.log(postTrumps);
        }
      };
      trumpSprite.on('pointover', () => {
        trumpSprite.alpha = 0.8;
      });
      trumpSprite.on('pointout', () => {
        trumpSprite.alpha = 1.0;
      });
      console.log(trump); 
    }
  },
  createStageTrumps: (self) => {
    for(let i = 0; i < stageTrumps.length; i++) {
      let trump = stageTrumps[i];
      let trumpSprite = Sprite(trump).addChildTo(self);
      trumpSprite.x = self.gridX.span(i * 1.05 + 5);
      trumpSprite.y = self.gridY.center(-2.5);
      trumpSprite.setScale(0.175);

      stageTrumpSprites.push(trumpSprite);
    }
  },
  clearStageTrumps: (self) => {
    for(let i = 0; i < stageTrumpSprites.length; i++) {
      console.log(stageTrumpSprites.length);
      stageTrumpSprites[i].remove();
    }
    stageTrumpSprites = new Array();
  },
  createOpponentLabel: (self) => {
    for(let i = 0; i < players.length; i++) {
      self.createLabel(self, players[i].name, players[i].name, 'black', fontSize, 450 * i + 75, 10);
    }
  }
});

/*
this.sprite = Sprite('H9').addChildTo(this);
    this.sprite.x = this.gridX.center();
    this.sprite.y = this.gridY.center();
    this.sprite.setScale(0.1);
*/

phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    // MainScene から開始
    startLabel: 'main',
    // アセット読み込み
    assets: ASSETS,
    // 表示先のcanvasを指定
    query: '#mycanvas',
    // 画面をフィットさせない
    fit: false,
    width: 1440,
    height: 810,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});