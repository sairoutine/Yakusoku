'use strict';

/* エンディング */

var ending = require("../createjs/ending");
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

	this.ending = new CreateJS(new ending.ending(), 640, 480);
	this.game.playBGM('ending');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// エンディング終了
	if(this.frame_count > 3600) {
		this.game.notifyEndingDone();
	}
	else {
		this.ending.update();
	}

};

// 画面更新
Scene.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.ending.canvas, 0, 0);
	ctx.restore();
};

module.exports = Scene;
