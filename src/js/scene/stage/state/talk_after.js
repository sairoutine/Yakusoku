'use strict';

// ボス戦後のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

TalkState.prototype.serifInfo = function(){
	return this.stage.currentStageSerifAfter();
};
TalkState.prototype.nextState = function () {
	return Constant.RESULT_STATE;
};

module.exports = TalkState;
