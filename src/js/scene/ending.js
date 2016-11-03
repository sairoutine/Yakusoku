'use strict';

/* エンディング画面 */

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

	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16" + "px 'Migu'" ;

	ctx.fillText("エンディング(仮画面)", 30, 30);


	ctx.restore();
};

module.exports = Scene;
