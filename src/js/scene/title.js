'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var boss_appearance = require("../createjs/boss_appearance");
var cjs = require("../createjs");

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

	var exportRoot = new boss_appearance.boss_appearance();
	var canvas = document.createElement('canvas');
	canvas.width = this.game.width;
	canvas.height = this.game.height;

	var stage = new cjs.Stage(canvas);
	stage.addChild(exportRoot);

	this.stage = stage;
	this.neko = canvas;
};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);
	this.stage.update();

	if(this.frame_count === 60) {
		this.game.playBGM('title');
	}

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyTitleDone();
	}
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;

	ctx.save();

	// 切り替え効果
	if( this.frame_count < SHOW_TRANSITION_COUNT ) {
		ctx.globalAlpha = this.frame_count / SHOW_TRANSITION_COUNT;
	}
	else {
		ctx.globalAlpha = 1.0;
	}

	var title_bg = this.game.getImage('title_bg');
	var press_z = this.game.getImage('press_z');

	// 背景画像表示
	ctx.drawImage(title_bg,
					0,
					0,
					title_bg.width,
					title_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	// N秒ごとに start メッセージを点滅
	if (Math.floor(this.frame_count / SHOW_START_MESSAGE_INTERVAL) % 2 === 0) {
		ctx.drawImage(press_z,
			248, //x座標
			247, //y座標
			press_z.width * Config.CHARA_SIZE_RATIO,
			press_z.height * Config.CHARA_SIZE_RATIO
		);
	}

	ctx.restore();


	ctx.save();
	ctx.drawImage(this.neko, 0, 0);
	ctx.restore();
};

module.exports = OpeningScene;
