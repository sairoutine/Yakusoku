'use strict';

/* エピローグ画面A */

var epilogue = require("../createjs/epilogue_a");
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

	this.epilogue = new CreateJS(new epilogue.ED_A(), 640, 480);

	this.game.playBGM('epilogue');
	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.epilogue.update();

};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// エピローグ終了
	if(this.frame_count === 9800 + 120) {
		this.game.fadeOutBGM(5);
	}
	else if(this.frame_count > 10300 + 120) {
		this.game.notifyEpilogueADone();
	}
	else {
		if(this.frame_count === 8030) {
			// もう一度再生
			this.game.playBGM('epilogue');
		}

		this.epilogue.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.epilogue.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 0, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};




module.exports = Scene;
