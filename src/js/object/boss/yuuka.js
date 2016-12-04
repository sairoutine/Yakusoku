'use strict';

/* ステージ3ボス 風見幽香 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage1/spell1');

// constructor
var Yuuka = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
	]);
};

// 基底クラスを継承
Util.inherit(Yuuka, BaseObject);


// 当たり判定サイズ
Yuuka.prototype.collisionWidth  = function() { return 64; };
Yuuka.prototype.collisionHeight = function() { return 64; };

// スプライトの開始位置
Yuuka.prototype.spriteX = function() { return this.indexX; };
Yuuka.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Yuuka.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Yuuka.prototype.spriteWidth  = function() { return 128; };
Yuuka.prototype.spriteHeight = function() { return 128; };

// BGM
Yuuka.prototype.bgm = function() { return 'stage1'; };

module.exports = Yuuka;