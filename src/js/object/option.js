'use strict';

/* 自機オプションオブジェクト */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');

var Option = function(id, scene) {
	BaseObject.apply(this, arguments);
};
// 基底クラスを継承
Util.inherit(Option, BaseObject);

Option.prototype.init = function(character) {
	this.character = character;
};

Option.prototype.run = function() {
	BaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
Option.prototype.collisionWidth  = function() { return 60; };
Option.prototype.collisionHeight = function() { return 60; };

// スプライトの開始位置
Option.prototype.spriteX = function() { return this.indexX; };
Option.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Option.prototype.spriteImage = function() { return 'shot2'; };

// スプライトのサイズ
Option.prototype.spriteWidth  = function() { return 16; };
Option.prototype.spriteHeight = function() { return 16; };

module.exports = Option;
