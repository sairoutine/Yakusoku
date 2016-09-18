'use strict';

/* 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var TenguKaze = require('../spell/stage1/tengukaze');

// Nフレーム毎にボスをアニメーション
var ANIMATION_SPAN = 6;

// HP
var VITAL = 60 * 60;


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
	this.spell = 0;

	// スペルカード発動！
	this.executeSpell();
};

// 現在のスペルカード
Boss.prototype.currentSpell = function(){
	return this.spells[this.spell];
};

// スペルを切り替え
Boss.prototype.executeSpell = function(state){
	// 切り替え
	this.spell++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};


// フレーム処理
Boss.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// スペルカード処理
	this.currentSpell().run();

	// 時間経過でスペルカード発動時間は減っていく
	this.vital--;

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

// ボスを描画
Boss.prototype.updateDisplay = function(){
	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);
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