'use strict';

/* ステージ1ボス 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage1/spell1');
var Spell2 = require('../../spell/stage1/spell2');
var Spell3 = require('../../spell/stage1/spell3');
var Spell4 = require('../../spell/stage1/spell4');

// constructor
var Aya = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
		new Spell4(this),
	]);
};

// 基底クラスを継承
Util.inherit(Aya, BaseObject);


// スプライトの開始位置
Aya.prototype.spriteX = function() { return this.indexX; };
Aya.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Aya.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Aya.prototype.spriteWidth  = function() { return 128; };
Aya.prototype.spriteHeight = function() { return 128; };

// BGM
Aya.prototype.bgm = function() { return 'stage1'; };

Aya.prototype.MAX_VITAL = function() { return 60 * 45; };


module.exports = Aya;
