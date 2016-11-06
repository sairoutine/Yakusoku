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

// 自機のポジションに移動
Option.prototype.setCharacterPosition = function() {
	this.y = this.character.y + this.local_y;
	this.x = this.character.x + this.local_x;
};

Option.prototype.init = function(character, x, y) {
	this.character = character;
	this.local_x = x;
	this.local_y = y;
	this.setCharacterPosition();

};

Option.prototype.run = function() {
	this.setCharacterPosition();
	BaseObject.prototype.run.apply(this, arguments);

};

// スプライトの開始位置
Option.prototype.spriteX = function() { return 7; };
Option.prototype.spriteY = function() { return 16; };

// スプライト画像
Option.prototype.spriteImage = function() { return 'shot2'; };

// スプライトのサイズ
Option.prototype.spriteWidth  = function() { return 20; };
Option.prototype.spriteHeight = function() { return 20; };

module.exports = Option;
