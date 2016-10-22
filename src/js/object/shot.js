'use strict';

/* 自機弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

// 弾の種類
var shot_types = require("../shot_types");

// 自機弾の移動速度
var SPEED = 8;

// constructor
var Shot = function(stage) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(Shot, VectorBaseObject);

Shot.prototype.init = function(type_id, x, y) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = shot_types[type_id];
	// TODO: リファクタ
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				vector: type.vector,
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
Shot.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return this.collision_width; };
Shot.prototype.collisionHeight = function() { return this.collision_height; };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return this.indexX; };
Shot.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Shot.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return this.width; };
Shot.prototype.spriteHeight = function() { return this.height; };

// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.shot_manager.remove(this.id);
};

module.exports = Shot;
