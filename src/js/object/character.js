'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var Aya = require('./aya');
var Enemy = require('./enemy');
var Bullet = require('./bullet');


// 自機の移動速度(通常時)
var FAST_SPEED = 4;
// 自機の移動速度(Z押下時)
var SLOW_SPEED = 3;
// Nフレーム毎に自機をアニメーション
var FRONT_ANIMATION_SPAN = 6; // 正面
var LR_ANIMATION_SPAN = 4; // 左右移動
// Nフレーム毎に自機をショット
var SHOT_SPAN = 5;
// 死亡時の無敵時間(フレーム)
var UNHITTABLE_COUNT = 100;
// 初期ライフ
var INIT_LIFE = 3;

// constructor
var Character = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Character, BaseObject);



// 自機を初期位置に置く
Character.prototype.setInitPosition = function() {
	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 100);
};

// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機を初期位置に置く
	this.setInitPosition();

	// 初期ライフ3
	this.life = INIT_LIFE;

	// ステージ開始直後は無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = 0;
};

// 撃つ
Character.prototype.shot = function(){
	// Nフレーム置きにショットを生成
	if(this.frame_count % SHOT_SPAN === 0) {
		this.stage.shot_manager.create(this.x, this.y);
		//this.game.playSound('shot'); TODO
	}
};

// 画面外に出させない
Character.prototype.forbidOutOfStage = function(){
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.x > this.stage.width) {
		this.x = this.stage.width;
	}
	if(this.y < 0) {
		this.y = 0;
	}
	if(this.y > this.stage.height) {
		this.y = this.stage.height;
	}
};

// 自機移動
Character.prototype.moveLeft = function(is_slow){
	this.x -= is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveRight = function(is_slow){
	this.x += is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveUp = function(is_slow){
	this.y -= is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveDown = function(is_slow){
	this.y += is_slow ? SLOW_SPEED : FAST_SPEED;
};

// 移動アニメーション
Character.prototype.animateLeft = function(){
		this.indexY = 1;
};
Character.prototype.animateRight = function(){
		this.indexY = 2;
};
Character.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 自機が無敵状態なら無敵切れか判定
	if(this.is_unhittable && this.unhittable_count + UNHITTABLE_COUNT < this.frame_count) {
		this.is_unhittable = false;
	}

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;
	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}
};

// 自機を描画
Character.prototype.updateDisplay = function(){
	// 無敵状態ならば半透明に
	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 0.7;
	}

	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 1.0;
	}
};

// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中なら衝突しない
	if(this.is_unhittable) return false;

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.setInitPosition();

	// 自機を減らす
	this.life--;

	// 無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = this.frame_count;
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾もしくはボスにぶつかったら
	// TODO: Aya -> BossBase
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof Aya) {
		// 死亡音再生
		this.game.playSound('dead');

		// 自機死亡エフェクト生成
		this.stage.effect_manager.create(this.x, this.y);

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};



// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 8; };
Character.prototype.collisionHeight = function() { return 8; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;
