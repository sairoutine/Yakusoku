'use strict';

/* エピローグ画面1 */

var epilogue = require("../createjs/epilogue");
var CreateJS = require("../logic/createjs");

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

	this.epilogue = new CreateJS(new epilogue.epilogue(), 640, 480);
	this.game.playBGM('epilogue');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	this.epilogue.update();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.epilogue.canvas, 0, 0);
	ctx.restore();
};

module.exports = Scene;
