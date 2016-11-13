'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var Aya = require('./aya');
var Enemy = require('./enemy');
var Bullet = require('./bullet');
var Option = require('./option');
var Spell = require('../spell/renko/spell1');
var Manager = require('../logic/manager');


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
// ボム発動時間(フレーム)
var BOMB_COUNT = 500;
// 初期ライフ
var INIT_LIFE = 5;
// 初期ボム数
var INIT_BOMB = 5;

// 自機弾のベクトル(初期)
var SHOT_VECTOR_0 = { 'r': 8, 'theta': 270 };
// 自機弾のベクトル(1強化後)
var SHOT_VECTOR_1_1 = { 'r': 8, 'theta': 265 };
var SHOT_VECTOR_1_2 = { 'r': 8, 'theta': 270 };
var SHOT_VECTOR_1_3 = { 'r': 8, 'theta': 275 };





// constructor
var Character = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	this.spell = new Spell(this);

	this.option_manager = new Manager(Option, stage);
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

	// 初期ボム数
	this.bombs = INIT_BOMB;

	// ボム使用中かどうか
	this.is_using_bomb = false;

	// ボムを使用した際のフレームを保存
	this.using_bomb_count = 0;

	// ステージ開始直後は無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = 0;

	this.power = 0; // パワーアップアイテムで獲得したパワー
	this.level = 0; // 自機のレベル
};

// 撃つ
Character.prototype.shot = function(){
	// Nフレーム置きにショットを生成
	if(this.frame_count % SHOT_SPAN === 0) {

		// レベルアップ後
		if (this.level >= 1) {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_1);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_2);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_3);
		}
		// レベルアップ前
		else {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_0);
		}
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
	// 自機がボム使用中なら期限切れか判定
	if(this.is_using_bomb && this.using_bomb_count + BOMB_COUNT < this.frame_count) {
		this.is_using_bomb = false;
	}

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;
	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}

	// ボム使用中ならボムの発動
	if(this.is_using_bomb) {
		this.spell.run();
	}

	// レベルアップ判定
	this._checkLevelUp();

	// オプション
	this.option_manager.run();
};

// レベルアップ判定
Character.prototype._checkLevelUp = function () {
	var before_level = this.level;
	var after_level = this._calcLevelUp();

	if(after_level > before_level) {
		this.level = after_level;
		this._actionLevelUp();
	}
};

// 現在のレベルをpower から計算
Character.prototype._calcLevelUp = function () {
	var power = this.power;
	if(8 > power) {
		return 0;
	}
	else if(32 > power) {
		return 1;
	}
	else if(64 > power) {
		return 2;
	}
	else if(96 > power) {
		return 3;
	}
	else if(128 > power) {
		return 4;
	}
};

// レベルアップした時の処理
Character.prototype._actionLevelUp = function () {
	this.game.playSound('powerup');

	switch (this.level) {

		case 1:
			// 3way 弾になる
			break;
		case 2:
			// オプションが2つに
			this.option_manager.create(this, 20, 0);
			this.option_manager.create(this, -20, 0);
			break;
		case 3:
			// オプションが4つに
			this.option_manager.removeAll();
			this.option_manager.create(this, 20, -10);
			this.option_manager.create(this, -20, -10);
			this.option_manager.create(this, 30, 0);
			this.option_manager.create(this, -30, 0);
			break;
		case 4:
			// オプションの弾を撃つ感覚が速くなる
			break;
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

	// ボム使用中ならスペカカットインを表示
	if(this.is_using_bomb) {
		this.spell.updateDisplay();
	}

	// オプションの描画
	this.option_manager.updateDisplay();
};

// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中 or ボム使用中なら敵or 敵弾 or ボスに衝突しても無視
	// TODO: Aya -> BossBase
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof Aya) {
		if(this.is_unhittable || this.is_using_bomb) return false;
	}

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

// ボムの使用
Character.prototype.useBomb = function() {
	if(this.bombs <= 0) {
		return;
	}

	if(this.is_using_bomb) {
		return;
	}

	// ボム所持数を減らす
	this.bombs--;

	// ボムを使用した際のフレームを保存
	this.using_bomb_count = this.frame_count;

	// ボム使用中
	this.is_using_bomb = true;

	// ザコ敵を vanish する
	this.stage.enemy_manager.notifyUseBomb();

	// 敵の弾を vanish する
	this.stage.bullet_manager.notifyUseBomb();

	// ボムを生成
	this.spell.init();
};

// グレイズしたことを通知
Character.prototype.notifyGraze = function(obj) {
	if(!(obj instanceof Bullet)) return; // 弾のみグレイズするとスコア加算する

	if(obj.is_graze) return; // 既にグレイズ済の弾は判定しない

	this.game.playSound('graze');

	this.stage.score += 100;
};

// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 1; };
Character.prototype.collisionHeight = function() { return 3; };

// グレイズ判定サイズ
Character.prototype.grazeHeight  = function() { return 48; };
Character.prototype.grazeWidth = function() { return 48; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;
