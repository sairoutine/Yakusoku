'use strict';

/* ステージ2ボス 東風谷早苗 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage2/spell1');
var Spell2 = require('../../spell/stage2/spell2');
var Spell3 = require('../../spell/stage2/spell3');

// constructor
var Sanae = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Sanae, BaseObject);


// スプライトの開始位置
Sanae.prototype.spriteX = function() { return this.indexX; };
Sanae.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Sanae.prototype.spriteImage = function() { return 'boss_sanae'; };

// スプライトのサイズ
Sanae.prototype.spriteWidth  = function() { return 128; };
Sanae.prototype.spriteHeight = function() { return 128; };

// BGM
Sanae.prototype.bgm = function() { return 'stage2'; };

Sanae.prototype.MAX_VITAL = function() { return 60 * 60; };


module.exports = Sanae;
