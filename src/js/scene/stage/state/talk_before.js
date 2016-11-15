'use strict';

// ボス戦前のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

TalkState.prototype.serifInfo = function(){
	return this.stage.currentStageSerifBefore();
};
TalkState.prototype.nextState = function () {
	return Constant.BOSS_STATE;
};

module.exports = TalkState;
