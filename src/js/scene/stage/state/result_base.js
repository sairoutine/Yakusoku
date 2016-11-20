'use strict';

/* 結果画面基底クラス */
var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

// メッセージを表示する間隔
var SHOW_MESSAGE_INTERVAL = 50;

// メッセージの黒帯の表示
var RESULT_TRANSITION_COUNT = 100;



var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.transitionStartFrame = 0;
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	if(this.isTransitionEnd()) {
		this.game.stopBGM();
		this.notifyResultEnd();
	}
	else {
		if(this.game.isKeyPush(Constant.BUTTON_Z)) {
				this.game.playSound('select');

				this.setTransition();
		}
	}
};

State.prototype.isInTransition = function(){
	return this.transitionStartFrame ? true : false;
};
State.prototype.isTransitionEnd = function(){
	return this.isInTransition() && (this.transitionStartFrame + RESULT_TRANSITION_COUNT < this.frame_count);
};
State.prototype.setTransition = function(){
	this.transitionStartFrame = this.frame_count;
};


// 画面更新
State.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	this._showScoreWindow();

	if(this.isInTransition()) {
		ctx.save();
		var alpha = 1.0 ;
		if(this.transitionStartFrame + RESULT_TRANSITION_COUNT >= this.frame_count) {
			alpha = (this.frame_count - this.transitionStartFrame) / RESULT_TRANSITION_COUNT;
		}
		else {
			alpha = 1.0;
		}
		ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
		ctx.globalAlpha = alpha;
		ctx.fillRect(0, 0, this.stage.width, this.stage.height);

		ctx.restore();
	}

};
// スコア結果画面表示
State.prototype._showScoreWindow = function(){
	var ctx = this.game.surface;

	ctx.save();

	var alpha = 1.0 ;
	if(this.frame_count < RESULT_TRANSITION_COUNT) {
		alpha = this.frame_count / RESULT_TRANSITION_COUNT;
	}
	else {
		alpha = 1.0;
	}

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	ctx.fillRect(0, 170, this.stage.width, 100);

	ctx.globalAlpha = alpha; // 文字を表示するので戻す
	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Result', 100, 210);
	ctx.textAlign = 'right' ;
	ctx.fillText('Score: ' + this.stage.score, 380, 210);
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect(100, 225, 280, 1);

	// N秒ごとにメッセージを点滅
	if (Math.floor(this.frame_count / SHOW_MESSAGE_INTERVAL) % 2 === 0) {
		ctx.fillText('Press Z to Quit', 300, 250);
	}

	ctx.restore();
};

// リザルト画面終了
State.prototype.notifyResultEnd = function(){
	console.error("notifyResultEnd method must be overridden");
};


module.exports = State;
