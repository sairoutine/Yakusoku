'use strict';

/* スペルカードの基底クラス */
var Config = require("../config");
var Constant = require("../constant");

// カットインの左から右への移動スピード(前)
var CUTIN_FAST_SPEED = 33;
// カットインの左から右への移動スピード(後)
var CUTIN_SLOW_SPEED = 1;
// カットイン画像のY座標
var CUTIN_Y = 332;

// カットインまでの待ち
var CUTIN_SLIDEING_WAIT_COUNT = 30;
// カットインの左から右へスライドする時間
var CUTIN_SLIDEING_COUNT = 10;
// カットインの消失まで待つ時間
var CUTIN_DISAPPEAR_WAIT_COUNT = 45;
// カットイン消失時間
var CUTIN_DISAPPEAR_COUNT = 5;

var SpellBase = function(boss) {
	this.frame_count = 0;

	// Boss インスタンス
	this.boss = boss;
	// StageScene インスタンス
	this.stage = boss.stage;
	// Game インスタンス
	this.game = boss.stage.game;

	this.x = 0;
	this.y = 0;

	this.state = null;
};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;

	// スペルカードエフェクトの x, y
	this.x = 0;
	this.y = CUTIN_Y;

	// スペルカード発動開始
	this.changeState(Constant.SPELLCARD_START_STATE);
};

// スペルカード発動中
SpellBase.prototype.isSpellExecute = function(){
	return this.state === Constant.SPELLCARD_EXEC_STATE ? true : false;
};
// スペルカード開始中
SpellBase.prototype.isSpellStarting = function(){
	return this.state === Constant.SPELLCARD_START_STATE ? true : false;
};
// 状態変更
SpellBase.prototype.changeState = function(state){
	this.state = state;
};

// フレーム処理
SpellBase.prototype.run = function(){
	this.frame_count++;

	// スペルカード発動開始中のみエフェクト座標の更新
	if(!this.isSpellStarting()) return;

	// カットイン発動待ち
	if(this.frame_count < CUTIN_SLIDEING_WAIT_COUNT) {

	}
	else if(this.frame_count === CUTIN_SLIDEING_WAIT_COUNT) {
		// スペルカード発動音
		this.game.playSound("spellcard");
	}
	// 左から右へカットイン移動
	else if(CUTIN_SLIDEING_WAIT_COUNT < this.frame_count && this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT) {
		this.x += CUTIN_FAST_SPEED;
	}
	// 待機中はゆったりと移動
	else if(CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT < this.frame_count &&
			this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT) {
		this.x += CUTIN_SLOW_SPEED;
	}
	// カットインを縮尺
	else if(CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT < this.frame_count &&
			this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT + CUTIN_DISAPPEAR_COUNT) {
		this.x += CUTIN_FAST_SPEED;
	}
	// カットイン終わり
	else {
		this.changeState(Constant.SPELLCARD_EXEC_STATE);
	}
};

// 描画
SpellBase.prototype.updateDisplay = function(){
	// スペルカード発動開始中のみ描画
	if(!this.isSpellStarting()) return;

	// カットイン発動待ち
	if(this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT) return;

	var ctx = this.game.surface;
	var image = this.game.getImage(this.charaImage());

	ctx.save();

	// 画像サイズ
	var image_width  = image.width * Config.CHARA_SIZE_RATIO;
	var image_height = image.height * Config.CHARA_SIZE_RATIO;

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	// 少し透過
	ctx.globalAlpha = 0.7;
	ctx.drawImage(image,
		0,
		0,
		image.width,
		image.height,
		-image_width/2, // 座標を中央合わせ
		-image_height/2, // 座標を中央合わせ
		image_width,
		image_height
	);
	ctx.restore();
};

// スペルカード名
SpellBase.prototype.name = function() {
	console.log("Spell's name method must be implemented");
};

// カットインキャラ画像
SpellBase.prototype.charaImage = function() {
	console.log("Spell's charaImage method must be implemented");
};

// 撃つ
SpellBase.prototype.shot = function(x, y, r, theta, sprite_x, sprite_y) {
	this.stage.bullet_manager.create(x, y, r, theta, sprite_x, sprite_y);
};

module.exports = SpellBase;
