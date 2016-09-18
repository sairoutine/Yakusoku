'use strict';

/* 敵弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

var BulletObject = function(scene) {
	VectorBaseObject.apply(this, arguments);
	// 敵弾のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};
Util.inherit(BulletObject, VectorBaseObject);

BulletObject.prototype.init = function(x, y, r, theta, sprite_x, sprite_y) {
	// TODO: リファクタ
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				vector: {r: r, theta: theta},
				is_rotate: true,
			}
		]
	]);
	this.x = x;
	this.y = y;

	// TODO:
	this.indexX = sprite_x || 0;
	this.indexY = sprite_y || 0;
};
BulletObject.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
BulletObject.prototype.collisionWidth  = function() { return 13; };
BulletObject.prototype.collisionHeight = function() { return 20; };

// スプライトの開始位置
BulletObject.prototype.spriteX = function() { return this.indexX; };
BulletObject.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
BulletObject.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
BulletObject.prototype.spriteWidth  = function() { return 13; };
BulletObject.prototype.spriteHeight = function() { return 20; };




module.exports = BulletObject;
