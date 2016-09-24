'use strict';

/* 敵弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

// 弾の種類
var bullet_types = require("../enemy/bullet_types");



var Bullet = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(Bullet, VectorBaseObject);

Bullet.prototype.init = function(type_id, x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = bullet_types[type_id];
	// TODO: リファクタ
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		]
	]);
	// 画像の種類
	this.image            = type.image;
	// スプライト開始位置
	this.indexX           = type.indexX;
	this.indexY           = type.indexY;
	// スプライトサイズ
	this.width            = type.width;
	this.height           = type.height;
	// 当たり判定サイズ
	this.collision_width  = type.collisionWidth;
	this.collision_height = type.collisionHeight;
};
Bullet.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return this.collision_width; };
Bullet.prototype.collisionHeight = function() { return this.collision_height; };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return this.indexX; };
Bullet.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return this.width; };
Bullet.prototype.spriteHeight = function() { return this.height; };

// 衝突した時
Bullet.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);
};

module.exports = Bullet;
