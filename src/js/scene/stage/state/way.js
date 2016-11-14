'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

var EnemyAppear = require('../../../logic/enemy_appear');

var State = function(stage, stage_appear) {
	BaseState.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(stage_appear);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);
	this.stage.bullet_manager.init();
	this.stage.item_manager.init();
	this.enemy_appear.init();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM('douchu');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		//TODO: character.useBomb();
	}

	// Z押しっぱで低速移動
	var is_slow = this.game.isKeyDown(Constant.BUTTON_Z);

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp(is_slow);
	}

	// 画面外に出させない
	character.forbidOutOfStage();

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		character.animateLeft();
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		character.animateRight();
	}
	else {
		// 左右には未移動
		character.animateNeutral();
	}

	// アイテムと自機の衝突判定
	this.stage.item_manager.checkCollisionWithObject(character);
	if(Number(document.getElementById("invincible").value) === 0) { // TODO: DEBUG
		// 敵と自機の衝突判定
		this.stage.enemy_manager.checkCollisionWithObject(character);
		// 敵弾と自機の衝突判定
		this.stage.bullet_manager.checkCollisionWithObject(character);
	}
	// 敵と自機弾の衝突判定
	this.stage.enemy_manager.checkCollisionWithManager(this.stage.shot_manager);
	// 敵弾と自機のグレイズ判定
	this.stage.bullet_manager.checkGrazeWithObject(character);
	// アイテムと自機のグレイズ判定
	this.stage.item_manager.checkGrazeWithObject(character);

	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);

	for(var i = 0, len = params.length; i< len; i++) {
		this.stage.enemy_manager.create(params[i]);
	}

	this.stage.bullet_manager.run();
	this.stage.item_manager.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.bullet_manager.updateDisplay();
	this.stage.item_manager.updateDisplay();
};

module.exports = State;
