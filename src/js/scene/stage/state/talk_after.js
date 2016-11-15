'use strict';

// ボス戦後のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ
TalkState.prototype.serifInfo = function(){
	return this.stage.currentStageSerifAfter();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyAfterTalkEnd();
};


module.exports = TalkState;
