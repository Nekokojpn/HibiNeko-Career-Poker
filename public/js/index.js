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
  },
};
//グローバル
let socket = io();
let player;
let labels =  new Array();
let roomName;
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
    // 以下にコードを書いていく
    this.cards = Shape();
    this.cards.backgroundColor = 'red';
    this.cards.addChildTo(this);
    this.cards.setPosition(this.gridX.center(), this.gridY.center());
    this.cards.setInteractive(true);
    this.cards.onpointstart = function() {
          socket.emit('connection_test_from_front', 'cards', roomName);
    };
    this.cards.on('pointover', (event) => {
      this.cards.alpha = 0.5;
    });
    this.cards.on('pointout', (event) => {
      this.cards.alpha = 1.0;
    });
    

    this.pass =  Shape();
    this.pass.backgroundColor = 'white';
    this.pass.addChildTo(this);
    this.pass.setPosition(this.gridX.center(), this.gridY.center(5));
    this.pass.setInteractive(false);
    this.pass.onpointstart = function() {
          socket.emit('changeTurn', player.ID, roomName);
    };
    this.pass.on('pointover', (event) => {
      this.pass.alpha = 0.5;
    });
    this.pass.on('pointout', (event) => {
      this.pass.alpha = 1.0;
    });

    this.post =  Shape();
    this.post.backgroundColor = 'green';
    this.post.addChildTo(this);
    this.post.setPosition(this.gridX.center(5), this.gridY.center(5));
    this.post.setInteractive(true);
    this.post.onpointstart = function() {
          socket.emit('connection_test_from_front', 'post', roomName);
    };
    this.post.on('pointover', (event) => {
      this.post.alpha = 0.5;
    });
    this.post.on('pointout', (event) => {
      this.post.alpha = 1.0;
    });

    this.chatField = Shape({
      width: 400,
      height: 520
    });
    this.chatField.backgroundColor = 'red';
    this.chatField.addChildTo(this).origin.set(0, 0);
    this.chatField.setPosition(1520,0);

    this.turnFlag = Shape({
      width: 30,
      height: 30
    });
    this.turnFlag.backgroundColor = 'yellow';
    this.turnFlag.addChildTo(this);
    this.turnFlag.setPosition(this.gridX.center(-4.5), this.gridY.center(-4.0));
    this.turnFlag.hide();


    this.createLabel(this, 'idText', 'ID:', 'white', fontSize, 10,10);
    this.createLabel(this, 'turnText', 'TURN:', 'white', fontSize, 10, 100);

    this.sprite = Sprite('H9').addChildTo(this);
    this.sprite.x = this.gridX.center();
    this.sprite.y = this.gridY.center();
    this.sprite.setScale(0.1);

   /*
    * 以下ゲームのsocket
    */

    //初期socket
    setTimeout(() => {
      socket.emit('joinPlayer');
    }, 100);

    socket.on('connection_test_from_server', (txt) => {
      console.log(txt);
    });

    socket.on('roomResponse', (_roomName) => {
      roomName = _roomName;
      console.log(roomName);
    })

    socket.on('joinResponse', (playerInfo) => {
      player = playerInfo;
      console.log(player);
      this.createLabel(this, 'player_id', player.ID, 'white', fontSize, 100, 10);
      if(player.ID % 4 === 0) {
        this.turnFlag.show();
        this.pass.setInteractive(true);
      }
      else this.pass.hide();
    });

    socket.on('turnResponse', (nextPlayerId) => {
      if(player.ID === nextPlayerId) {
        this.turnFlag.show();
        this.pass.show();
        this.pass.setInteractive(true);
      }
      else {
        this.turnFlag.hide();
        this.pass.hide();
        this.pass.setInteractive(false);
      }
      console.log(nextPlayerId);
    });

    
  },
  // 毎フレーム更新処理
  update: function() {

  },
  createLabel: (self ,_name, _text, _color, _fontSize, _x, _y) => {
    labels[_name] = Label({text: _text, fill: _color, fontSize: _fontSize, x: _x, y: _y}).addChildTo(self).origin.set(0, 0);
  }
});

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
    width: 960,
    height: 540,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.run();
});