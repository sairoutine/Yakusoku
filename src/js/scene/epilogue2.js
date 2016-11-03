'use strict';

/* プロローグ画面2 */
var SHOW_MESSAGE_COUNT = 600;
/*
蓮子は、ドッペルゲンガーと手を繋いで、現実の世界へ向かう。
目覚めた蓮子は、ベッドから立ち上がり、病室の窓から飛び降りる。
*/



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
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if (SHOW_MESSAGE_COUNT + 300 < this.frame_count) {
		//TODO: this.game.notifyEpilogue2Done();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	// 背景画像表示
	this._showBG();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;

	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, this.game.width, this.game.height);

	ctx.save();

	if(this.frame_count < SHOW_MESSAGE_COUNT) {
		// 切り替え効果
		this._setTransition();
		var epilogue2_1_bg = this.game.getImage('epilogue2_1_bg');

		ctx.drawImage(epilogue2_1_bg,
						0,
						0,
						epilogue2_1_bg.width,
						epilogue2_1_bg.height,
						0,
						0,
						this.game.width,
						this.game.height);
	}
	else {
		var epilogue2_2_bg = this.game.getImage('epilogue2_2_bg');
		ctx.drawImage(epilogue2_2_bg,
						0,
						0,
						epilogue2_2_bg.width,
						epilogue2_2_bg.height,
						0,
						0,
						this.game.width,
						this.game.height);

	}
	ctx.restore();
};
// 切り替え効果
Scene.prototype._setTransition = function(){
	var ctx = this.game.surface;

	var alpha = 1.0;
	// 切り替え効果
	if( this.frame_count < (SHOW_MESSAGE_COUNT / 3)) {
		// 最初の1/3はフェードイン
		alpha = (this.frame_count * 3) / SHOW_MESSAGE_COUNT;
	}
	else if(SHOW_MESSAGE_COUNT / 3 < this.frame_count && this.frame_count < SHOW_MESSAGE_COUNT * 2 / 3) {
		// 真ん中の1/3は表示
		alpha = 1.0;
	}
	else if(SHOW_MESSAGE_COUNT * 2 / 3 < this.frame_count) {
		// 最後の1/3はフェードアウト
		alpha = (SHOW_MESSAGE_COUNT - this.frame_count) * 3 / SHOW_MESSAGE_COUNT;
	}

	ctx.globalAlpha = alpha;
};
module.exports = Scene;
