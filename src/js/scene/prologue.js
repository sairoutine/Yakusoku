'use strict';

/* プロローグ画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');

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

	this.game.playBGM('prologue');
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

	// TODO:

	// 右キャラ表示
	this.serif.right_image();

	// 左キャラ表示
	this.serif.left_image();

	// メッセージウィンドウ表示


	// メッセージ表示
	this.serif.text_name();
	this.serif.text();


	/*
	this.game.surface.font = "24px 'Comic Sans MS'" ;
	this.game.surface.textAlign = 'center' ;
	this.game.surface.textBaseAlign = 'middle' ;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )' ;

	// N秒ごとに start メッセージを点滅
	if (Math.floor(this.frame_count / SHOW_START_MESSAGE_INTERVAL) % 2 === 0) {
		this.game.surface.fillText('Press Z to Start', 450, 350);
	}
	*/
	this.game.surface.restore();

};

module.exports = Scene;
