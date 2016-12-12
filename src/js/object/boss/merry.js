'use strict';

/* ステージ5ボス マエリベリー・ハーン */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage1/spell1');

// constructor
var Merry = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
	]);
};

// 基底クラスを継承
Util.inherit(Merry, BaseObject);


// 当たり判定サイズ
Merry.prototype.collisionWidth  = function() { return 64; };
Merry.prototype.collisionHeight = function() { return 64; };

// スプライトの開始位置
Merry.prototype.spriteX = function() { return this.indexX; };
Merry.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Merry.prototype.spriteImage = function() { return 'boss_merry'; };

// スプライトのサイズ
Merry.prototype.spriteWidth  = function() { return 128; };
Merry.prototype.spriteHeight = function() { return 128; };

// BGM
Merry.prototype.bgm = function() { return 'stage1'; };

module.exports = Merry;

