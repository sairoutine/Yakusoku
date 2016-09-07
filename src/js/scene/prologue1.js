'use strict';

/* プロローグ画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var Scene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	//TODO: this.game.playBGM('prologue1');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	/*
	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologue1Done();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
	*/
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	var prologue2_bg = this.game.getImage('prologue1_1_bg');

	// 背景画像表示
	this.game.surface.drawImage(prologue2_bg,
					0,
					0,
					prologue2_bg.width,
					prologue2_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
	this.game.surface.restore();


};

module.exports = Scene;
