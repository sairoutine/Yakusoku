'use strict';

/* ステージ状態の基底クラス */

var BaseState = function(stage) {
	this.stage = stage;
	this.game = stage.game;

	// 経過フレーム数
	this.frame_count = 0;
};

// 初期化
BaseState.prototype.init = function(){
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
BaseState.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;

};

// 画面更新
BaseState.prototype.updateDisplay = function(){
	console.error("updateDisplay method must be overridden");
};

module.exports = BaseState;
