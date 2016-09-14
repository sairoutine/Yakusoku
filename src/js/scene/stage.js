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

// ステージの状態
var WayState = require('./stage/state/way');
var TalkState = require('./stage/state/talk');
var BossState = require('./stage/state/boss');
var ResultState = require('./stage/state/result');
var GameoverState = require('./stage/state/result');

// オブジェクト
var Character = require('../object/character');
var Shot = require('../object/shot.js');
var Enemy = require('../object/enemy.js');


var Manager = require('../logic/manager');


var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// ステージの現在の状態
	this.state = null;

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.WAY_STATE ]    = new WayState(this);
	this.states[ Constant.TALK_STATE ]   = new TalkState(this);
	this.states[ Constant.BOSS_STATE ]   = new BossState(this);
	this.states[ Constant.RESULT_STATE ] = new ResultState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.character = new Character(this);
	this.shot_manager = new Manager(Shot, this);
	this.enemy_manager = new Manager(Enemy, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.shot_manager,
		this.character,
	];
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.state = null;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}

	// TODO: 削除
	this.game.stopBGM();

	// 道中開始
	this.changeState(Constant.WAY_STATE);
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
	this.currentState().init();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].run();
	}

	this.currentState().run();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}

	// サイドバー表示
	this._showSidebar();
};

// サイドバー表示
Scene.prototype._showSidebar = function(){
	var ctx = this.game.surface;
	var x = this.game.width - SIDE_WIDTH;
	var y = 0;

	ctx.save();
	var side_bar = this.game.getImage('side_bar');
	this.game.surface.drawImage(side_bar,
		0,
		0,
		side_bar.width,
		side_bar.height,
		x,
		y,
		SIDE_WIDTH,
		this.game.height
	);
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
