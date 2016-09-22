'use strict';

/* タイトル画面 */

var Constant = require('../constant');

var DEBUG_COUNT;
//DEBUG_COUNT = 3400;

var DEBUG_STATE;
DEBUG_STATE = Constant.BOSS_STATE;


// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 2;

// 道中の終了
var WAY_END = 3500;

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Config = require('../config');

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
var Boss = require('../object/aya.js');
var Bullet = require('../object/bullet.js');

// セリフ
var serif_before = require('../serif/stage1_before');
var serif_after = require('../serif/stage1_after');

var Manager = require('../logic/manager');


var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// ステージの現在の状態
	this.state = null;

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.WAY_STATE ]    = new WayState(this);
	this.states[ Constant.TALK1_STATE ]   = new TalkState(this, serif_before);
	this.states[ Constant.BOSS_STATE ]   = new BossState(this);
	this.states[ Constant.TALK2_STATE ]   = new TalkState(this, serif_after);
	this.states[ Constant.RESULT_STATE ] = new ResultState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.character = new Character(this);
	this.shot_manager = new Manager(Shot, this);
	this.enemy_manager = new Manager(Enemy, this);
	this.boss = new Boss(this);
	this.bullet_manager = new Manager(Bullet, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.shot_manager,
		this.character,
		this.enemy_manager,
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

	// TODO: DEBUG
	if(Constant.DEBUG && DEBUG_COUNT) {
		this.frame_count = DEBUG_COUNT;
	}

	// TODO: DEBUG
	// 道中開始
	this.changeState(Constant.DEBUG && DEBUG_STATE ? DEBUG_STATE : Constant.WAY_STATE);
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

	// TODO: END フラグをstateに持たせよう

	// 道中の終了
	if(this.state === Constant.WAY_STATE && this.frame_count === WAY_END) {
		// ボスとの会話シーンへ
		this.changeState(Constant.TALK1_STATE);
	}
	// ボス前会話の終了
	else if(this.state === Constant.TALK1_STATE && this.currentState().serif.is_end()) {
		this.changeState(Constant.BOSS_STATE);
	}
	// ボス戦の終了
	else if(this.state === Constant.BOSS_STATE && this.boss.isDead() && !this.boss.hasNextSpell()) {
		//ボスのスペルカードが全て無くなった
		this.changeState(Constant.TALK2_STATE);
	}
	// ボス後会話の終了
	else if(this.state === Constant.TALK2_STATE && this.currentState().serif.is_end()) {
		this.changeState(Constant.RESULT_STATE);
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}

	this.currentState().updateDisplay();

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
	this._showText();
};

Scene.prototype._showText = function(){
	var size1 = 18;
	var size2 = 21;

	var x1 = this.game.width - SIDE_WIDTH + 10;
	var x2 = this.game.width - SIDE_WIDTH + 35;


	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.font = size1 + "px 'Migu'" ;
	ctx.fillText("HiScore",   x1, 25);
	ctx.fillText("Score",     x1, 70);
	ctx.fillText("Player",    x1, 130);
	ctx.fillText("Spell",     x1, 175);
	if(Config.DEBUG) {
		ctx.fillText("Frame",     x1, 235);
	}
	ctx.font = size2 + "px 'Migu'" ;
	// TODO:
	ctx.fillText("123456789", x2, 50);  // HiScore
	ctx.fillText("123456789", x2, 95);  // Score
	ctx.fillText("★★★★★",     x2, 155); // Player
	ctx.fillText("★★★★★",     x2, 200); // Spell
	if(Config.DEBUG) {
		ctx.fillText(this.frame_count,     x2, 260); // Frame
	}
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
