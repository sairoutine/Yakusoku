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

Shot.prototype.init = function(type_id, x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = shot_types[type_id];

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
		for(var i=0, len=vector.length; i<len; i++) {
			vector[i].is_rotate = type.is_rotate;
		}
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);

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

	// 敵と接触しても消滅しないかどうか
	this.is_penetration = type.is_penetration;

	// 最後に衝突したオブジェクトのID
	this.is_last_damage_obj_id = null;
};
Shot.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

Shot.prototype.updateDisplay = function(){
	// 自機弾は透過して表示する
	this.game.surface.globalAlpha = 0.7;
	VectorBaseObject.prototype.updateDisplay.apply(this, arguments);
	this.game.surface.globalAlpha = 1.0;
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
	// 最後に衝突したオブジェクトのIDを保存
	this.is_last_damage_obj_id = obj.id;

	// 貫通する弾なら消えない
	if(this.is_penetration) return;

	// 自分を消す
	this.stage.shot_manager.remove(this.id);
};
// obj に対してダメージが与えられるかどうか
Shot.prototype.isEnableDamage = function(obj) {
	// 最後にダメージを与えた敵には重複してダメージを与えない
	// 貫通する弾だとフレーム毎にダメージを与えてしまうため
	if(this.is_last_damage_obj_id === obj.id) return false;

	return true;
};


module.exports = Shot;
