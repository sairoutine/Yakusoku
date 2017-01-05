'use strict';

/* 道中 最初のタイトル表示 */

var BaseState = require('./base');
var Util = require('../../../util');
var Constant = require('../../../constant');

// タイトルの表示期間
var SHOW_TITLE_COUNT = 300;

// BGMの開始タイミング
var PLAY_BGM_COUNT = 60;

var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);
	// state の管理するオブジェクトを初期化
	this.stage.bullet_manager.init();
	this.stage.item_manager.init();

	this.stage.initObjectsWithoutCharacter();
};
// フレーム更新
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === PLAY_BGM_COUNT) {
		this.game.playBGM('douchu');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		character.useBomb();
	}

	// SPACE でポーズ
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.stage.notifyPauseStart();
	}

	// Z押しっぱで低速移動
	var is_slow = this.game.isKeyDown(Constant.BUTTON_SHIFT);

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

	// タイトル表示時間を過ぎたら
	if(this.frame_count > SHOW_TITLE_COUNT) {
		this.stage.notifyStartEnd();
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	ctx.save();

	var alpha = 1.0 ;
	if( this.frame_count < (SHOW_TITLE_COUNT / 3)) {
		// 最初の1/3はフェードイン
		alpha = (this.frame_count * 3) / SHOW_TITLE_COUNT;
	}
	else if(SHOW_TITLE_COUNT / 3 < this.frame_count && this.frame_count < SHOW_TITLE_COUNT * 2 / 3) {
		// 真ん中の1/3は表示
		alpha = 1.0;
	}
	else if(SHOW_TITLE_COUNT * 2 / 3 < this.frame_count) {
		// 最後の1/3はフェードアウト
		alpha = (SHOW_TITLE_COUNT - this.frame_count) * 3 / SHOW_TITLE_COUNT;
	}

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	ctx.fillRect( 0, 170, 480, 100 ) ;

	ctx.globalAlpha = alpha ;
	ctx.fillStyle = 'rgb( 255, 255, 255 )' ;
	ctx.textAlign = 'left' ;
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Stage ' + this.stage.currentStageNo(), 100, 210 ) ;
	ctx.textAlign = 'right' ;
	ctx.font = "14px 'Migu'" ;
	ctx.fillText(this.stage.currentStageDescription(), 380, 250 ) ;
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect( 100, 225, 280, 1 ) ;
	ctx.restore();

};
module.exports = State;
