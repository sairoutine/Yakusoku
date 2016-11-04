'use strict';

/* アイテムオブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');

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

	// 弾のスプライト上の位置
	this.indexX = 0; this.indexY = 0;

	// 自機とグレイズ済かどうか
	this.is_graze = false;
};

Item.prototype.run = function() {
	// 自機とグレイズ済あるいは
	// 時期がボム使用中なら、キャラに向けて逐一ベクトルを修正
	if(this.is_graze || this.stage.character.is_using_bomb) {
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

	// TODO: スコアアイテムとパワーアップアイテムで処理を分ける
	this.stage.score += 1000;
};

// グレイズした時
Item.prototype.notifyGraze = function(obj) {
	// このアイテムは既にグレイズ済
	this.is_graze = true;
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
Item.prototype.spriteWidth  = function() { return 16; };
Item.prototype.spriteHeight = function() { return 16; };




module.exports = Item;
