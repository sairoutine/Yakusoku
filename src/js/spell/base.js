'use strict';

/* スペルカードの基底クラス */
var Config = require("../config");
var Constant = require("../constant");
var Util = require("../util");

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
var CUTIN_DISAPPEAR_WAIT_COUNT = 100;
// カットイン消失時間
var CUTIN_DISAPPEAR_COUNT = 20;


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

	// スペカの実行開始時間
	this.frame_count_exec_start = null;
};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;

	// スペルカードエフェクトの x, y
	this.x = 0;
	this.y = CUTIN_Y;

	// スペカの実行開始時間
	this.frame_count_exec_start = 0;

	// スペルカード発動開始
	this.changeState(Constant.SPELLCARD_START_STATE);
};

// スペカ実行開始からのフレーム数
SpellBase.prototype.frameCountStartedBySpellExec = function(){
	return this.frame_count - this.frame_count_exec_start;
};

// スペルカード開始中
SpellBase.prototype.isSpellStarting = function(){
	return this.state === Constant.SPELLCARD_START_STATE ? true : false;
};
// スペルカード発動中
SpellBase.prototype.isSpellExecute = function(){
	return this.state === Constant.SPELLCARD_EXEC_STATE ? true : false;
};
// ボス移動中
SpellBase.prototype.isBossMoving = function(){
	return this.state === Constant.SPELLCARD_BOSSMOVE_STATE ? true : false;
};
// 状態変更
SpellBase.prototype.changeState = function(state){
	this.state = state;
};

// フレーム処理
SpellBase.prototype.run = function(){
	this.frame_count++;

	if(this.isSpellStarting()) {
		// スペカ発動演出
		this.runInSpellStarting();
	}
	else if(this.isBossMoving()) {
		// ボス移動中
		this.runInBossMoving();
	}
	else {
		// スペカ実行
		this.runInSpellExecute();
	}
};

// スペル発動演出
SpellBase.prototype.runInSpellStarting = function(){
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
		if(this.initX() !== void 0 && this.initY() !== void 0) { // 初期位置がセットされていれば
			// ボスを初期位置へ移動
			this.boss.setMoveTo(this.initX(), this.initY());

			this.changeState(Constant.SPELLCARD_BOSSMOVE_STATE);
		}
		else {
			// スペカ実行開始時のフレームを保存
			this.frame_count_exec_start = this.frame_count;

			// スペカ実行
			this.changeState(Constant.SPELLCARD_EXEC_STATE);
		}
	}
};

// ボス移動中
SpellBase.prototype.runInBossMoving = function(){
	// 移動が終了したらスペカ実行モードへ
	if(!this.boss.isMoving()) {
		// スペカ実行開始時のフレームを保存
		this.frame_count_exec_start = this.frame_count;

		this.changeState(Constant.SPELLCARD_EXEC_STATE);
	}
};

// 描画
SpellBase.prototype.updateDisplay = function(){
	if(this.isSpellStarting()) {
		// スペカ発動演出
		this.updateDisplayInSpellStarting();
	}
	else if(this.isBossMoving()) {
		// ボス移動中
		this.updateDisplayInBossMoving();
	}
	else {
		// スペカ実行
		this.updateDisplayInSpellExecute();
	}
};

// スペルカード発動中のカットイン
SpellBase.prototype.updateDisplayInSpellStarting = function () {
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

// ボス移動中の描画
SpellBase.prototype.updateDisplayInBossMoving = function () {
};

// スペカ実行の描画
SpellBase.prototype.updateDisplayInSpellExecute = function () {
};

// 撃つ
SpellBase.prototype.shot = function(type_id, x, y, vector) {
	return this.stage.bullet_manager.create(type_id, x, y, vector);
};

// 自機狙いのtheta を返す
SpellBase.prototype.calcThetaAimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	return Util.radianToTheta(Math.atan2(ay, ax));
};

// スペルカード名
SpellBase.prototype.name = function() {
	console.error("Spell's name method must be implemented");
};

// カットインキャラ画像
SpellBase.prototype.charaImage = function() {
	console.error("Spell's charaImage method must be implemented");
};

// スペカ実行
SpellBase.prototype.runInSpellExecute = function(){
	console.error("Spell's runInSpellExecute method must be implemented");
};

// 初期 x, y 座標
SpellBase.prototype.initX = function( ) {
};
SpellBase.prototype.initY = function( ) {
};

// スペル終了時の処理
SpellBase.prototype.onend = function( ) {
};

module.exports = SpellBase;
