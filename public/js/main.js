(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Config = {
	IMAGES: {
		title_bg:  'image/title_bg.png',
		prologue_bg:  'image/prologue_bg.jpg',
		renko_normal:  'image/renko_normal.jpg',
		merry_normal:  'image/merry_normal.jpg',
		ganger_normal:  'image/ganger_normal.jpg',
		/*
		stage1_bg: 'image/stage1_bg.jpg',
		reimu:     'image/reimu.png',
		shot:      'image/shot.png',
		enemy:     'image/enemy.png',
		bullet:    'image/bullet.png',
		item:      'image/item.png',
	   */
	},

	SOUNDS: {
		select: {
			id: 0x01,
			path:   'sound/select.wav',
			volume: 0.80
		},
		/*
		shot: {
			id: 0x02,
			path: 'sound/shot.wav',
			volume: 0.08
		},
		enemy_vanish: {
			id: 0x04,
			path: 'sound/enemy_vanish.wav',
			volume: 0.1
		},
		dead: {
			id: 0x08,
			path: 'sound/dead.wav',
			volume: 0.08
		},
		graze: {
			id: 0x10,
			path: 'sound/graze.wav',
			volume: 0.1
		}
	   */
	},

	BGMS:{
		title: {
			path:   'bgm/title.mp3',
			volume: 0.40
		},
		prologue: {
			path:   'bgm/prologue.mp3',
			volume: 0.40
		},

		/*
		stage1: {
			path:   'bgm/stage1.mp3',
			volume: 0.50
		},
	   */
	},
	// テキストの typography スピード
	MESSAGE_SPEED: 10,
	// ノベルパートにおける左キャラの(x, y)
	PROLOGUE_LEFT_X: 20,
	PROLOGUE_LEFT_Y: 130,
	// ノベルパートにおける右キャラの(x, y)
	PROLOGUE_RIGHT_X: 350,
	PROLOGUE_RIGHT_Y: 130,
	CHARA: {
		"ganger": {
			name: "？？？",
		},
		"renko": {
			name: "蓮子",
		},
		"merry": {
			name: "メリー",
		},
	}
};

// 全素材数
Config.ALL_MATERIAL_NUM = Object.keys(Config.IMAGES).length + Object.keys(Config.SOUNDS).length + Object.keys(Config.BGMS).length;


module.exports = Config;

},{}],2:[function(require,module,exports){
'use strict';

var Constant = {
	DEBUG: true,

	LOADING_SCENE:  0,
	TITLE_SCENE:    1,
	PROLOGUE_SCENE: 2,
	STAGE_SCENE:    3,
	EPILOGUE_SCENE: 4,
	ENDING_SCENE:   5,

	BUTTON_LEFT:  0x01,
	BUTTON_UP:    0x02,
	BUTTON_RIGHT: 0x04,
	BUTTON_DOWN:  0x08,
	BUTTON_Z:     0x10,
	BUTTON_X:     0x20,
	BUTTON_SHIFT: 0x40,
	BUTTON_SPACE: 0x80,
};

module.exports = Constant;

},{}],3:[function(require,module,exports){
'use strict';

var config = require('./config');
var constant = require('./constant');

var LoadingScene  = require('./scene/loading');
var TitleScene    = require('./scene/title');
var PrologueScene    = require('./scene/prologue');
/*
var PrologueScene = require('./scene/prologue');
var StageScene    = require('./scene/stage');
var EpilogueScene = require('./scene/epilogue');
var EndingScene   = require('./scene/ending');
*/
var Game = function(mainCanvas) {
	// メインCanvas
	this.surface = mainCanvas.getContext('2d');

	this.width = Number(mainCanvas.getAttribute('width'));
	this.height = Number(mainCanvas.getAttribute('height'));

	// ゲームの現在のシーン
	this.state = null;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ constant.LOADING_SCENE ] = new LoadingScene(this);
	// タイトル画面
	this.scenes[ constant.TITLE_SCENE ] = new TitleScene(this);
	// プロローグ画面
	this.scenes[ constant.PROLOGUE_SCENE ] = new PrologueScene(this);

	/*
	// ゲーム画面
	this.scenes[ this.STAGE_SCENE ]   = new StageScene(this);
	// エンディング画面
	this.scenes[ this.ENDING_SCENE ]  = null;
	*/

	// 画像一覧
	this.images = {};

	// SE一覧
	this.sounds = {};

	// BGM一覧
	this.bgms = {};

	// どのSEを再生するかのフラグ
	this.soundflag = 0x00;

	// 経過フレーム数
	this.frame_count = 0;

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;
};

Game.prototype = {
	// 初期化
	init: function () {
		// 経過フレーム数を初期化
		this.frame_count = 0;

		// キー押下フラグ
		this.keyflag = 0x0;

		// 一つ前のフレームで押下されたキー
		this.before_keyflag = 0x0;

		// シーンをローディング画面にする
		this.changeScene(constant.LOADING_SCENE);
	},
	// キー押下
	handleKeyDown: function(e){
		this.keyflag |= this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// キー押下解除
	handleKeyUp: function(e){
		this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// 指定のキーが押下状態か確認する
	isKeyDown: function(flag) {
		return this.keyflag & flag;
	},
	// 指定のキーが押下されたか確認する
	isKeyPush: function(flag) {
		// 1フレーム前に押下されておらず、現フレームで押下されてるなら true
		return !(this.before_keyflag & flag) && this.keyflag & flag;
	},
	// キーコードをBitに変換
	_keyCodeToBitCode: function(keyCode) {
		var flag;
		switch(keyCode) {
			case 16: // shift
				flag = constant.BUTTON_SHIFT;
				break;
			case 32: // space
				flag = constant.BUTTON_SPACE;
				break;
			case 37: // left
				flag = constant.BUTTON_LEFT;
				break;
			case 38: // up
				flag = constant.BUTTON_UP;
				break;
			case 39: // right
				flag = constant.BUTTON_RIGHT;
				break;
			case 40: // down
				flag = constant.BUTTON_DOWN;
				break;
			case 88: // x
				flag = constant.BUTTON_X;
				break;
			case 90: // z
				flag = constant.BUTTON_Z;
				break;
		}
		return flag;
	},
	// シーンを切り替え
	changeScene: function(scene) {
		// シーン切り替え
		this.state = scene;
		// 切り替え後のシーンを初期化
		this.currentScene().init();
	},
	// BGMを再生
	playBGM: function(bgm) {
		// 全てのBGM再生をストップ
		for(var key in this.bgms) {
			this.bgms[key].pause();
			this.bgms[key].currentTime = 0;
		}

		// 再生をループする
		this.bgms[bgm].loop = true;
		// 再生
		this.bgms[bgm].play();
	},
	// 再生するSEをセット
	playSound: function(key) {
		this.soundflag |= config.SOUNDS[key].id;
	},
	// セットされたフラグにもとづいてSEを再生
	runPlaySound: function() {
		for(var key in config.SOUNDS) {
			// フラグが立ってたら
			if(this.soundflag & config.SOUNDS[key].id) {
				// 再生
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0;
				this.sounds[key].play();

				// フラグを削除
				this.soundflag &= ~config.SOUNDS[key].id;

				// 1フレームに1つしか再生しない
				break;
			}
		}
	},
	// 画像を取得
	getImage: function(key) {
		return this.images[key];
	},
	currentScene: function() {
		return this.scenes[this.state];
	},
	// ゲーム起動
	run: function(){
		// シーン更新
		this.currentScene().run();
		this.currentScene().updateDisplay();

		// SEを再生
		this.runPlaySound();

		// 押下されたキーを保存しておく
		this.before_keyflag = this.keyflag;

		// 経過フレーム数更新
		this.frame_count++;

		// 次の描画タイミングで再呼び出ししてループ
		requestAnimationFrame(this.run.bind(this));
	},
	// ローディング画面が終わったら
	notifyLoadingDone: function() {
		// オープニング画面に切り替え
		this.changeScene(constant.TITLE_SCENE);
	},
	// タイトル画面が終わったら
	notifyTitleDone: function() {
		// プロローグ画面に切り替え
		this.changeScene(constant.PROLOGUE_SCENE);
	},
	// プロローグ画面が終わったら
	notifyPrologueDone: function() {
		// ステージ画面に切り替え
		this.changeScene(constant.STAGE_SCENE);
	},

};




module.exports = Game;

},{"./config":1,"./constant":2,"./scene/loading":7,"./scene/prologue":8,"./scene/title":9}],4:[function(require,module,exports){
'use strict';

/* セリフを扱うクラス */

var Config = require("../config");



var Logic = function (script) {
	this.timeoutID = null;

	// セリフテキスト
	this.script = script;

	// どこまでスクリプトが進んだか
	this.progress = null;

	this.left_chara_id  = null; // 左のキャラID
	this.left_exp       = null; // 左のキャラの表情
	this.right_chara_id = null; // 右のキャラのID
	this.right_exp      = null; // 右のキャラの表情

	// 今どっちのキャラが喋っているか
	this.pos = null;

	// 現在表示しているメッセージ
	this.line_num = 0;
	this.printing_lines = [];
};

Logic.prototype.init = function () {
	this.progress = -1;
	this.timeoutID = null;
	this.left_chara_id = null;
	this.left_exp = null;
	this.right_chara_id = null;
	this.right_exp = null;
	this.pos  = null;

	this.line_num = 0;
	this.printing_lines = [];

	this.next(); // start
};


Logic.prototype.is_end = function () {
	return this.progress + 1 === this.script.length;
};

Logic.prototype.next = function () {
	this.progress++;

	var script = this.script[this.progress];

	this._showChara(script);

	if(script.serif) {
		this._printMessage(script.serif);
	}
	else {
		// セリフが空ならキャラ画像だけ表示して次へ
		this.next();
	}
};

// 左右に配置するキャラを設定
Logic.prototype._showChara = function(script) {
	if(script.pos) {
		this.pos  = script.pos;

		if(script.pos === "left") {
			this.left_chara_id = script.chara;
			this.left_exp = script.exp;
		}
		else if(script.pos === "right") {
			this.right_chara_id = script.chara;
			this.right_exp = script.exp;
		}
	}
};

// テキストを1文字ずつパラパラと表示する
Logic.prototype._printMessage = function (message) {
	var self = this;

	// 現在実行中のセリフをキャンセル
	if(self.timeoutID !== null) {
		clearTimeout(self.timeoutID);
		self.timeoutID = null;
	}

	var char_list = message.split("");
	var char_length = char_list.length;

	var idx = 0;

	// 表示されているセリフをクリア
	self.line_num = 0;
	self.printing_lines = [];

	var output = function() {
		if (idx >= char_length) return;

		// タイポグラフィの速度
		var speed = Config.MESSAGE_SPEED;

		var ch = char_list[idx];
		idx++;

		if (ch === "\n") {
			self.line_num++;
		}
		else {
			// 初期化
			if(!self.printing_lines[self.line_num]) {
				self.printing_lines[self.line_num] = "";
			}

			// 1文字表示
			self.printing_lines[self.line_num] = self.printing_lines[self.line_num] + ch;
		}

		self.timeoutID = setTimeout(output, speed);
	};
	output();
};

Logic.prototype.right_image = function () {
	return(this.right_chara_id ? this.right_chara_id + "_" + this.right_exp : null);
};
Logic.prototype.left_image = function () {
	return(this.left_chara_id ? this.left_chara_id + "_" + this.left_exp : null);
};
Logic.prototype.text_name = function () {
	if (this.is_left_talking()) {
		return Config.CHARA[this.left_chara_id].name;
	}
	else if (this.is_right_talking()) {
		return Config.CHARA[this.right_chara_id].name;
	}
};
Logic.prototype.is_left_talking = function () {
	return this.pos === "left" ? true : false;
};
Logic.prototype.is_right_talking = function () {
	return this.pos === "right" ? true : false;
};

Logic.prototype.lines = function () {
	return this.printing_lines;
};

module.exports = Logic;

},{"../config":1}],5:[function(require,module,exports){
'use strict';
var Game = require('./game');

window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	var game = new Game(mainCanvas);
	// 初期化
	game.init();
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };
	// ゲーム起動
	game.run();
};

},{"./game":3}],6:[function(require,module,exports){
'use strict';

/* シーンの基底クラス */

var BaseScene = function(game) {
	// ゲームインスタンス
	this.game = game;

	// 経過フレーム数
	this.frame_count = 0;
};

// 初期化
BaseScene.prototype.init = function(){
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// キー押下
BaseScene.prototype.handleKeyDown = function(e){
};

// キーを離す
BaseScene.prototype.handleKeyUp = function(e){
};


// フレーム処理
BaseScene.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;

};

// 画面更新
BaseScene.prototype.updateDisplay = function(){
	console.error("updateDisplay method must be overridden");
};

module.exports = BaseScene;

},{}],7:[function(require,module,exports){
'use strict';

/* ローディング画面 */
var Util = require('../util');
var Config = require('../config');
var BaseScene = require('./base');

var LoadingScene = function(game) {
	BaseScene.apply(this, arguments);

	// 読み込んだ画像の数
	this.loadedImageNum = 0;
	// 読み込んだSEの数
	this.loadedSoundNum = 0;
	// 読み込んだBGMの数
	this.loadedBGMNum = 0;
};

// 基底クラスを継承
Util.inherit(LoadingScene, BaseScene);

// 初期化
LoadingScene.prototype.init = function() {
	// ゲームで使う画像の読み込み
	this._loadImages();
	// SE の読み込み
	this._loadSounds();
	// BGM の読み込み
	this._loadBGMs();
};

// 読み込んだ素材数
LoadingScene.prototype.loaded_material_num = function() {
	return this.loadedImageNum + this.loadedSoundNum + this.loadedBGMNum;
};

// フレーム処理
LoadingScene.prototype.run = function(){
	// 素材を全て読み込んだら
	if(this.loaded_material_num() >= Config.ALL_MATERIAL_NUM) {
		// 読み込み終わったことをゲームに通知
		this.game.notifyLoadingDone();
	}
};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){
	var material_num = Config.ALL_MATERIAL_NUM;
	var loaded_material_num = this.loaded_material_num();

	this.game.surface.save( ) ;
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height);
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.textAlign = 'right';
	this.game.surface.font = "30px 'Comic Sans MS'" ;
	this.game.surface.fillText('Now Loading...', 400, 225);
	this.game.surface.fillText( loaded_material_num + '/' + material_num, 400, 285);
	this.game.surface.restore();
};

LoadingScene.prototype._loadImages = function() {
	var self = this;

	// 画像が読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedImageNum++;
	};

	var image;
	for(var key in Config.IMAGES) {
		image = new Image();
		image.src = Config.IMAGES[key] ;
		image.onload = onload_function;
		this.game.images[key] = image;
	}

};

LoadingScene.prototype._loadSounds = function() {
	var self = this;

	// SEが読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedBGMNum++;
	};

	var conf, audio;
	for(var key in Config.SOUNDS) {
		conf = Config.SOUNDS[key];
		audio = new Audio(conf.path);
		audio.volume = conf.volume;
		audio.addEventListener('canplay', onload_function);
		audio.load();
		this.game.sounds[key] = audio;
	}

};

LoadingScene.prototype._loadBGMs = function() {
	var self = this;

	// BGMが読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedBGMNum++;
	};

	var conf, audio;
	for(var key in Config.BGMS) {
		conf = Config.BGMS[key];
		audio = new Audio(conf.path);
		audio.volume = conf.volume;
		audio.addEventListener('canplay', onload_function);
		audio.load();
		this.game.bgms[key] = audio;
	}
};


module.exports = LoadingScene;

},{"../config":1,"../util":11,"./base":6}],8:[function(require,module,exports){
'use strict';

/* プロローグ画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var serif = require('../serif/prologue');

var Serif = require('../logic/serif');

var Scene = function(game) {
	BaseScene.apply(this, arguments);

	this.serif = new Serif(serif);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);
	this.serif.init();

	//TODO: this.game.playBGM('prologue');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologueDone();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	var prologue_bg = this.game.getImage('prologue_bg');

	// 背景画像表示
	this.game.surface.drawImage(prologue_bg,
					0,
					0,
					prologue_bg.width,
					prologue_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
	this.game.surface.restore();

	if(this.serif.right_image()) {
		this.game.surface.save();

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_right_talking()) {
			this.game.surface.globalAlpha = 0.5;
		}
		var right_image = this.game.getImage(this.serif.right_image());

		this.game.surface.drawImage(right_image,
						Config.PROLOGUE_RIGHT_X,
						Config.PROLOGUE_RIGHT_Y,
						right_image.width * 0.25,
						right_image.height * 0.25);

		this.game.surface.restore();
	}

	if(this.serif.left_image()) {
		this.game.surface.save();

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_left_talking()) {
			this.game.surface.globalAlpha = 0.5;
		}

		var left_image = this.game.getImage(this.serif.left_image());

		this.game.surface.drawImage(left_image,
						Config.PROLOGUE_LEFT_X,
						Config.PROLOGUE_LEFT_Y,
						left_image.width * 0.5,
						left_image.height * 0.5);

		this.game.surface.restore();
	}

	// メッセージウィンドウ表示
	this.game.surface.save();

	this.game.surface.globalAlpha = 0.5;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.fillRect(5, 345, 630, 125);

	this.game.surface.restore();

	// メッセージウィンドウ 名前欄表示
	this.game.surface.save();

	this.game.surface.globalAlpha = 0.5;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.fillRect(5, 305, 100, 40);

	this.game.surface.restore();

	// テキスト表示
	this.game.surface.save();

	this.game.surface.font = "24px 'Comic Sans MS'";
	this.game.surface.textAlign = 'left';
	this.game.surface.textBaseAlign = 'middle';
	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )';

	// 名前表示
	if (this.serif.text_name()) {
		this.game.surface.fillText(this.serif.text_name(), 15, 340);
	}

	// セリフ表示
	var lines = this.serif.lines();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		var y = 380;

		for(var i = 0, len = lines.length; i < len; i++) {
			this.game.surface.fillText(lines[i], 15, y); // 1行表示

			y+= 30;
		}
	}

	this.game.surface.restore();

};

module.exports = Scene;

},{"../config":1,"../constant":2,"../logic/serif":4,"../serif/prologue":10,"../util":11,"./base":6}],9:[function(require,module,exports){
'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');


// 画面切り替え効果時間
var SHOW_TRANSITION_COUNT = 100;

// スタートメッセージを表示する間隔
var SHOW_START_MESSAGE_INTERVAL = 50;


var OpeningScene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(OpeningScene, BaseScene);

// 初期化
OpeningScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	//TODO: this.game.playBGM('title');
};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyTitleDone();
	}
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	// 切り替え効果
	if( this.frame_count < SHOW_TRANSITION_COUNT ) {
		this.game.surface.globalAlpha = this.frame_count / SHOW_TRANSITION_COUNT;
	}
	else {
		this.game.surface.globalAlpha = 1.0;
	}

	var title_bg = this.game.getImage('title_bg');

	// 背景画像表示
	this.game.surface.drawImage(title_bg,
					0,
					0,
					title_bg.width,
					title_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	this.game.surface.font = "24px 'Comic Sans MS'" ;
	this.game.surface.textAlign = 'center' ;
	this.game.surface.textBaseAlign = 'middle' ;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;

	// N秒ごとに start メッセージを点滅
	if (Math.floor(this.frame_count / SHOW_START_MESSAGE_INTERVAL) % 2 === 0) {
		this.game.surface.fillText('Press Z to Start', 450, 350);
	}

	this.game.surface.restore();

};

module.exports = OpeningScene;

},{"../constant":2,"../util":11,"./base":6}],10:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [
	{
		serif: "今日は8月31日。",
		chara: null,
		pos: null,
		exp: null,
	},
	{
		serif: null,
		chara: "ganger",
		pos: "right",
		exp: "normal",
	},
	{
		serif: null,
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "約束を守りなさい。早く博霊神社に行かないと。",
		chara: "ganger",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "え、そんな約束してたっけ？",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: null,
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "どうしたの？",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "実はかくかくしかじかで",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "ふーん",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "約束といえば、前に博霊神社の入り口を\n調べようって約束してたわね。",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "そうだっけ？",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "なんだか気になるわ。ねえ、今から行ってみない？",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "今から！？面倒だわ…。",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "そんな事言わずに行きましょうよ。",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "うっ…急にめまいとフラつきと腹痛と頭痛が",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "さっきまで元気だったじゃない！",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "うーん、気が進まないわ。",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "はぁ…。そんなに嫌なら仕方ないわね。\n私一人で行ってくるわ。",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
];

module.exports = Serif;

},{}],11:[function(require,module,exports){
'use strict';
var Util = {
	inherit: function( child, parent ) {
		var getPrototype = function(p) {
			if(Object.create) return Object.create(p);

			var F = function() {};
			F.prototype = p;
			return new F();
		};
		child.prototype = getPrototype(parent.prototype);
		child.prototype.constructor = child;
	},
};

module.exports = Util;

},{}]},{},[5]);
