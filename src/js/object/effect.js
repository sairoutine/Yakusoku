'use strict';

/* エフェクトオブジェクト */

// 何フレームで消滅するか
var VANISH_FRAME = 10;
// エフェクトのサイズ(直径)
var DIAM = 32;

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// constructor
var Effect = function(id, scene) {
	BaseObject.apply(this, arguments);
};
// 基底クラスを継承
Util.inherit(Effect, BaseObject);

// 初期化
Effect.prototype.init = function(x, y) {
	this.x = x;
	this.y = y;
};

// フレーム処理
Effect.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 時間切れ消滅判定
	if(VANISH_FRAME <= this.frame_count) {
		this.stage.effect_manager.remove(this.id);
	}
};

// 描画
Effect.prototype.updateDisplay = function() {
	var x = this.x;
	var y = this.y;
	var r = Math.round(DIAM * this.frame_count * 0.1);

	var cvs = document.createElement('canvas');
	cvs.width = r*2 + 4;
	cvs.height = r*2 + 4;
	var ctx = cvs.getContext('2d');

	// 円の中
	ctx.beginPath();
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (VANISH_FRAME - this.frame_count + 1) * 0.05;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.fill();

	// 円の外枠
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (VANISH_FRAME - this.frame_count + 1) * 0.1;
	ctx.lineWidth = 3;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.stroke();

	this.game.surface.drawImage(cvs, x-r-2, y-r-2);
};

module.exports = Effect;
