'use strict';

/* ステージ3ボス 風見幽香 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage3/spell1');
var Spell2 = require('../../spell/stage3/spell2');
var Spell3 = require('../../spell/stage3/spell3');

// constructor
var Yuuka = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Yuuka, BaseObject);


// スプライトの開始位置
Yuuka.prototype.spriteX = function() { return this.indexX; };
Yuuka.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Yuuka.prototype.spriteImage = function() { return 'boss_yuuka'; };

// スプライトのサイズ
Yuuka.prototype.spriteWidth  = function() { return 128; };
Yuuka.prototype.spriteHeight = function() { return 128; };

// BGM
Yuuka.prototype.bgm = function() { return 'stage3'; };

Yuuka.prototype.MAX_VITAL = function() { return 60 * 75; };

module.exports = Yuuka;
