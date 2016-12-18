'use strict';

/* アイテムオブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

var Item = function(id, scene) {
	VectorBaseObject.apply(this, arguments);

	// スプライトの開始位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Item, VectorBaseObject);

Item.prototype.init = function(type_id, x, y) {
	// アイテムの初期位置は敵の位置
	this.x = x;
	this.y = y;

	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				'vector': { 'r': 4, 'theta': 270, 'ra': -0.1, rrange: {min: -3}, },
				is_rotate: false,
			}
		]
	]);

	this.type_id = type_id;

	if(this.isPower()) {
		// 弾のスプライト上の位置
		this.indexX = 0; this.indexY = 0;
	}
	else if(this.isScore()) {
		// 弾のスプライト上の位置
		this.indexX = 4; this.indexY = 0;
	}

	// 自機に吸引されるかどうか
	this.is_vacuum = false;
};

Item.prototype.run = function() {
	if(this.is_vacuum) {
		this.setVector([
			{
				count: 0,
				'vector': { 'r': 10, aimed: true },
			}
		]);
	}

	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 衝突した時
Item.prototype.notifyCollision = function(obj) {
	// 獲得したアイテムを消す
	this.stage.item_manager.remove(this.id);

	// グレイズSEの再生
	this.game.playSound('graze');

	if(this.isPower()) {
		this.stage.score += 100;

		this.stage.character.addPower(1);
	}
	else if(this.isScore()) {
		this.stage.score += 1000;
	}

};

Item.prototype.isScore = function() {
	return(this.type_id === Constant.ITEM_SCORE_TYPE ? true : false);
};

Item.prototype.isPower = function() {
	return(this.type_id === Constant.ITEM_POWER_TYPE ? true : false);
};

// グレイズした時
Item.prototype.notifyGraze = function(obj) {
	// グレイズ範囲に入ったら、自機に向かって吸引させる
	this.is_vacuum = true;
};

// ボムの使用を通知
Item.prototype.notifyUseBomb = function() {
	// ボムを使ったら、自機に向かって吸引させる
	this.is_vacuum = true;
};

// 当たり判定サイズ
Item.prototype.collisionWidth  = function() { return 60; };
Item.prototype.collisionHeight = function() { return 60; };

// グレイズ判定サイズ
Item.prototype.grazeHeight = function() { return 100; };
Item.prototype.grazeWidth  = function() { return 100; };

// スプライトの開始位置
Item.prototype.spriteX = function() { return this.indexX; };
Item.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Item.prototype.spriteImage = function() { return 'item'; };

// スプライトのサイズ
Item.prototype.spriteWidth  = function() { return 17; };
Item.prototype.spriteHeight = function() { return 17; };




module.exports = Item;
