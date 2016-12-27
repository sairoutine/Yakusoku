'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');


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

};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.frame_count === 60) {
		this.game.playBGM('title');
	}

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyTitleDoneToStart();
	}
	else if(this.game.isKeyPush(Constant.BUTTON_X)) {
			this.game.playSound('select');
			this.game.notifyTitleDoneToPrologue();
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
	var press_x = this.game.getImage('press_x');

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

	// press Z
	ctx.drawImage(press_z,
		226, //x座標
		220, //y座標
		press_z.width * Config.CHARA_SIZE_RATIO,
		press_z.height * Config.CHARA_SIZE_RATIO
	);

	// press X
	ctx.drawImage(press_x,
		226, //x座標
		290, //y座標
		press_x.width * Config.CHARA_SIZE_RATIO,
		press_x.height * Config.CHARA_SIZE_RATIO
	);

	ctx.restore();

};

module.exports = OpeningScene;
