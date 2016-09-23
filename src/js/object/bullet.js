'use strict';

/* 敵弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

var Bullet = function(scene) {
	VectorBaseObject.apply(this, arguments);
	// 敵弾のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};
Util.inherit(Bullet, VectorBaseObject);

Bullet.prototype.init = function(x, y, r, theta, sprite_x, sprite_y) {
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
Bullet.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return 13; };
Bullet.prototype.collisionHeight = function() { return 20; };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return this.indexX; };
Bullet.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return 13; };
Bullet.prototype.spriteHeight = function() { return 20; };




module.exports = Bullet;
