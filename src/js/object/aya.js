'use strict';

/* 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var TenguKaze = require('../spell/stage1/tengukaze');
var Konohamai = require('../spell/stage1/konohamai');

// Nフレーム毎にボスをアニメーション
var ANIMATION_SPAN = 6;

// HP
var VITAL = 60 * 60 * 2; // 2分

// ボスの移動速度
var SPEED = 2;

// constructor
var Boss = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	// 発動中スペル
	this.spell_index = 0;

	// スペルカード一覧
	this.spells = [
		null, // 何も発動していない
		new TenguKaze(this),
		new Konohamai(this),
	];
};

// 基底クラスを継承
Util.inherit(Boss, BaseObject);



// ボスを初期位置に置く
Boss.prototype.setInitPosition = function() {
	// ボスの初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 400);
};

// 初期化
Boss.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// ボスを初期位置に置く
	this.setInitPosition();

	// 初期HP
	this.max_vital = VITAL;
	this.vital = VITAL;

	// 発動スペル
	this.spell_index = 0;

	// スペルカード発動！
	this.executeSpell();
};

// 現在のスペルカード
Boss.prototype.currentSpell = function(){
	return this.spells[this.spell_index];
};

// スペルを切り替え
Boss.prototype.executeSpell = function(){
	// 切り替え
	this.spell_index++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};
// 次に発動するスペルがあるかどうか
Boss.prototype.hasNextSpell = function(){
	return this.spells[this.spell_index + 1] ? true : false;
};


// HPを初期化
Boss.prototype.resetVital = function(){
	this.vital = this.max_vital;
};

// HPを初期化
Boss.prototype.isDead = function(){
	return this.vital <= 0;
};



// フレーム処理
Boss.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// スペルカード処理
	this.currentSpell().run();

	// 時間経過でスペルカード発動時間は減っていく
	if(this.currentSpell().isSpellExecute()) {
		this.vital -= 100;
	}

	if(this.isDead() && this.hasNextSpell()) {
		this.resetVital();
		// 次のスペルカード発動！
		this.executeSpell();
	}


	// Nフレーム毎にボスをアニメーション
	if(this.frame_count % ANIMATION_SPAN === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら
		if(this.indexX > 2) {
			// 最初のスプライトに戻る
			this.indexX = 0;
		}
	}
};

// TODO: aimed で動かしたい
// 移動
Boss.prototype.moveLeft = function(){
	this.x -= SPEED;
};
Boss.prototype.moveRight = function(){
	this.x += SPEED;
};
Boss.prototype.moveUp = function(){
	this.y -= SPEED;
};
Boss.prototype.moveDown = function(){
	this.y += SPEED;
};

// 移動アニメーション
Boss.prototype.animateLeft = function(){
		this.indexY = 1;
};
Boss.prototype.animateRight = function(){
		this.indexY = 2;
};
Boss.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// ボスを描画
Boss.prototype.updateDisplay = function(){
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	// スペルカード描画
	this.currentSpell().updateDisplay();
};

// 当たり判定サイズ
Boss.prototype.collisionWidth  = function() { return 128; };
Boss.prototype.collisionHeight = function() { return 128; };

// スプライトの開始位置
Boss.prototype.spriteX = function() { return this.indexX; };
Boss.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Boss.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Boss.prototype.spriteWidth  = function() { return 128; };
Boss.prototype.spriteHeight = function() { return 128; };




module.exports = Boss;
