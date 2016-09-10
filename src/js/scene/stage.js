'use strict';

/* タイトル画面 */

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

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);
	this.currentState().run();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.currentState().updateDisplay();

};

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



module.exports = Scene;
