'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

// スペルカード残り時間のスペース
var VITAL_OUTLINE_MARGIN = 5;

var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.stage.boss.init();
	this.stage.bullet_manager.init();

	// 道中曲を止める
	this.game.stopBGM();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM('stage1');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
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



	this.stage.boss.run();
	this.stage.bullet_manager.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.boss.updateDisplay();
	this.stage.bullet_manager.updateDisplay();

	// スペルカード残り時間
	this._showVital();

};
// スペルカード残り時間
State.prototype._showVital = function(){
	var ctx = this.game.surface;
	ctx.save();

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.fillRect(
		VITAL_OUTLINE_MARGIN,
		VITAL_OUTLINE_MARGIN,
		this.stage.boss.vital / this.stage.boss.max_vital * this.stage.width - VITAL_OUTLINE_MARGIN * 2,
		VITAL_OUTLINE_MARGIN
	);

	ctx.restore();
};



module.exports = State;
