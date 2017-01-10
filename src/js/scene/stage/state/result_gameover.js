'use strict';

// ゲームオーバー リザルト

var BaseState = require('./result_base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var ResultState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(ResultState, BaseState);

ResultState.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.selectIndex = 0;
};

ResultState.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);
	if(!this.isInTransition()) {
		if(this.game.isKeyPush(Constant.BUTTON_UP)) {
			this.game.playSound('select');
			this.selectIndex = 0;
		}
		else if(this.game.isKeyPush(Constant.BUTTON_DOWN)) {
			this.game.playSound('select');
			this.selectIndex = 1;
		}
	}
};

var RESULT_TRANSITION_COUNT = 100;
// スコア結果画面のオーバーライド
ResultState.prototype._showScoreWindow = function(){
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
	ctx.fillRect(0, 140, this.stage.width, 180);

	ctx.globalAlpha = alpha; // 文字を表示するので戻す

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'center';
	ctx.font = "18px 'Migu'" ;
	ctx.fillText(this.resultName(), this.stage.width/2, 180);


	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Result', 100, 210);
	ctx.textAlign = 'right' ;
	ctx.fillText('Score: ' + this.stage.score, 380, 210);
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect(100, 225, 280, 1);

	ctx.textAlign = 'center';

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 1.0 * alpha;
	}
	else {
		ctx.globalAlpha = 0.2 * alpha;
	}

	ctx.fillText('Continue', this.stage.width/2, 265);

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 0.2 * alpha;
	}
	else {
		ctx.globalAlpha = 1.0 * alpha;
	}

	ctx.fillText('Quit', this.stage.width/2, 295);

	ctx.restore();
};




// リザルト画面が終了した
ResultState.prototype.notifyResultEnd = function () {
	if(this.selectIndex === 0) {
		// Continue
		this.stage.notifyRetry();
	}
	else if(this.selectIndex === 1) {
		// Quit
		this.stage.notifyStageQuit();
	}
};

ResultState.prototype.resultName = function(){
	return "GAME OVER...";
};



module.exports = ResultState;
