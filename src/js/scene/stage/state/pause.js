'use strict';

// ポーズ

var BaseState = require('./base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var PauseState = function(stage) {
	BaseState.apply(this, arguments);

	this.selectIndex = 0;
};
Util.inherit(PauseState, BaseState);

// フレーム処理
PauseState.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_UP)) {
		this.game.playSound('select');
		this.selectIndex = 0;
	}
	else if(this.game.isKeyPush(Constant.BUTTON_DOWN)) {
		this.game.playSound('select');
		this.selectIndex = 1;
	}
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.game.playSound('select');

		// Continue
		this.stage.notifyPauseEnd();
	}
	else if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		this.game.playSound('select');
		if(this.selectIndex === 0) {
			// Continue
			this.stage.notifyPauseEnd();
		}
		else if(this.selectIndex === 1) {
			// Quit
			this.stage.notifyStageQuit();
		}
	}
};

// 画面更新
PauseState.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	ctx.save();

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = 0.7; // 半透明
	ctx.fillRect(0, 0, this.stage.width, this.stage.height);

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'center';
	ctx.font = "18px 'Migu'" ;

	ctx.textBaseAlign = 'middle';

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 1.0;
	}
	else {
		ctx.globalAlpha = 0.2;
	}

	ctx.fillText( 'Continue', 240, 200 ) ;

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 0.2;
	}
	else {
		ctx.globalAlpha = 1.0;
	}

	ctx.fillText( 'Quit',     240, 240 ) ;
	ctx.restore();
};

module.exports = PauseState;
