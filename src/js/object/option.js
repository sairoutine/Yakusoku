'use strict';

/* 自機オプションオブジェクト */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// 自機弾のベクトル
var SHOT_VECTOR = { 'r': 8, 'theta': 270 };
// Nフレーム毎に弾を撃つ
var SHOT_SPAN_1 = 50;
var SHOT_SPAN_2 = 5;



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
	BaseObject.prototype.init.apply(this, arguments);
	this.character = character;
	this.local_x = x;
	this.local_y = y;
	this.setCharacterPosition();

};

Option.prototype.run = function() {
	BaseObject.prototype.run.apply(this, arguments);
	// 自機の周辺に移動
	this.setCharacterPosition();

	// レベルアップすると弾を撃つ感覚が速くなる
	var span = this.character.level < 4 ? SHOT_SPAN_1 : SHOT_SPAN_2;

	// 弾を撃つ
	if(this.frame_count % span === 0) {
		this.stage.shot_manager.create(Constant.SHOT_OPTION_TYPE, this.x, this.y, SHOT_VECTOR);
	}
};

// スプライトの開始位置
Option.prototype.spriteX = function() { return 7; };
Option.prototype.spriteY = function() { return 20; };

// スプライト画像
Option.prototype.spriteImage = function() { return 'shot2'; };

// スプライトのサイズ
Option.prototype.spriteWidth  = function() { return 20; };
Option.prototype.spriteHeight = function() { return 16; };

module.exports = Option;
