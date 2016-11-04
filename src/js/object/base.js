'use strict';

/* オブジェクトの基底クラス */

var Config = require("../config");

var IS_SHOW_COLLISION;
//IS_SHOW_COLLISION = true;

// ステージ外かどうかの判定の余白
var EXTRA_OUT_OF_SIZE = 100;

// オブジェクトを一意に識別するID
var id = 0;

var ObjectBase = function(scene) {
	this.frame_count = 0;

	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	// オブジェクトを識別する一意なID
	this.id = ++id;

	// x座標(中心)
	this.x = 0;
	// y座標(中心)
	this.y = 0;

	// 回転
	this.rotate = 0;
};

// 初期化
ObjectBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// 衝突した時
ObjectBase.prototype.notifyCollision = function(obj) {
	console.error('notifyCollision method must be overridden.');
};

// 当たり判定サイズ
ObjectBase.prototype.collisionHeight = function() {
	console.error('collisionHeight method must be overridden.');
};

// 当たり判定サイズ
ObjectBase.prototype.collisionWidth = function() {
	console.error('collisionWidth method must be overridden.');
};

// グレイズ判定サイズ
ObjectBase.prototype.grazeHeight = function() {
	console.error('grazeHeight method must be overridden.');
};

// グレイズ判定サイズ
ObjectBase.prototype.grazeWidth = function() {
	console.error('grazeWidth method must be overridden.');
};


// スプライトの開始位置
ObjectBase.prototype.spriteX = function() {
	console.error('spriteX method must be overridden.');
};

// スプライトの開始位置
ObjectBase.prototype.spriteY = function() {
	console.error('spriteY method must be overridden.');
};

// スプライト画像
ObjectBase.prototype.spriteImage = function() {
	console.error('spriteImage method must be overridden.');
};

// スプライトのサイズ
ObjectBase.prototype.spriteWidth = function() {
	console.error('spriteWidth method must be overridden.');
};

// スプライトのサイズ
ObjectBase.prototype.spriteHeight = function() {
	console.error('spriteHeight method must be overridden.');
};

// フレーム処理
ObjectBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;
};

// 画面更新
ObjectBase.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	var image = this.game.getImage(this.spriteImage());

	ctx.save();

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	// オブジェクトを回転
	ctx.rotate(this.rotate);

	ctx.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteX(), this.spriteHeight() * this.spriteY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-this.spriteWidth()/2, -this.spriteHeight()/2,
		// オブジェクトのゲーム上のサイズ
		this.spriteWidth(),                   this.spriteHeight()
	);
	ctx.restore();

	// TODO: DEBUG
	if(Config.DEBUG && IS_SHOW_COLLISION) {
		ctx.save();
		ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
		ctx.globalAlpha = 0.4;
		ctx.fillRect(this.getCollisionLeftX(), this.getCollisionUpY(), this.collisionWidth(), this.collisionHeight());
		ctx.restore();
	}
};

// Object と Object の衝突判定
ObjectBase.prototype.checkCollisionWithObject = function(obj1) {
	// 衝突判定
	var obj2 = this;
	if(obj1.checkCollision(obj2)) {
		obj1.notifyCollision(obj2);
		obj2.notifyCollision(obj1);
		return true;
	}

	return false;
};

// オブジェクトとオブジェクトの衝突判定を行う
ObjectBase.prototype.checkCollision = function(obj) {
	if(Math.abs(this.x - obj.x) < this.collisionWidth()/2 + obj.collisionWidth()/2 &&
		Math.abs(this.y - obj.y) < this.collisionHeight()/2 + obj.collisionHeight()/2) {
		return true;
	}

	return false;
};

ObjectBase.prototype.getCollisionLeftX = function() {
	return this.x - this.collisionWidth() / 2;
};

ObjectBase.prototype.getCollisionUpY = function() {
	return this.y - this.collisionHeight() / 2;
};

// グレイズしたかどうか
ObjectBase.prototype.checkGraze = function(obj) {
	if(Math.abs(this.x - obj.x) < this.grazeWidth()/2 + obj.grazeWidth()/2 &&
		Math.abs(this.y - obj.y) < this.grazeHeight()/2 + obj.grazeHeight()/2) {
		return true;
	}

	return false;
};




// 画面外に出たかどうかの判定
ObjectBase.prototype.isOutOfStage = function( ) {
	if(this.x + EXTRA_OUT_OF_SIZE < 0 ||
	   this.y + EXTRA_OUT_OF_SIZE < 0 ||
	   this.x > this.stage.width  + EXTRA_OUT_OF_SIZE ||
	   this.y > this.stage.height + EXTRA_OUT_OF_SIZE
	  ) {
		return true;
	}

	return false;
};

// ボムの使用を通知
ObjectBase.prototype.notifyUseBomb = function() {
};

// グレイズしたことを通知
ObjectBase.prototype.notifyGraze = function() {
};

module.exports = ObjectBase;
