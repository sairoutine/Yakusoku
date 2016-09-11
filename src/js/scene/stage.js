'use strict';

/* タイトル画面 */

// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 2;


// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');


var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// ステージの現在の状態
	this.state = null;

	// ステージの状態一覧
	this.states = [];
	/*
	this.scenes[ constant.WAY_STATE ]    = new WayState(this);
	this.scenes[ constant.TALK_STATE ]   = new TalkState(this);
	this.scenes[ constant.BOSS_STATE ]   = new BossState(this);
	this.scenes[ constant.RESULT_STATE ] = new ResultState(this);
	*/
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.state = null;

	// 道中開始
	this.changeState(Constant.WAY_STATE);
	//TODO: this.game.playBGM('title');
};

// 現在のシーン
Scene.prototype.currentState = function(){
	return this.states[this.state];
};

// シーンを切り替え
Scene.prototype.changeState = function(state){
	// 切り替え
	this.state = state;
	// 切り替え後の状態を初期化
	//this.currentState().init();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);
	//this.currentState().run();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	//this.currentState().updateDisplay();

	// サイドバー表示
	this._showSidebar();
};

// サイドバー表示
Scene.prototype._showSidebar = function(){
	var ctx = this.game.surface;
	var x = this.game.width - SIDE_WIDTH;
	var y = 0;

	ctx.save();
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(x, y, SIDE_WIDTH, this.game.height);
	ctx.fillStyle = 'rgb(255, 255, 255)';

	ctx.restore();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;
	var x = 0;
	// 背景画像をスクロールさせる
	var y = (this.frame_count * BACKGROUND_SCROLL_SPEED) % this.game.height;

	ctx.save();

	// 2枚つなげてスクロールさせる
	var stage1_bg = this.game.getImage('stage1_bg');
	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y,
		this.game.width - SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y - this.game.height,
		this.game.width - SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.restore();
};



module.exports = Scene;
