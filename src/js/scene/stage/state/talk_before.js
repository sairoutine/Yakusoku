'use strict';

// ボス戦前のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ情報
TalkState.prototype.serifInfo = function(){
	return this.stage.currentStageSerifBefore();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyBeforeTalkEnd();
};

module.exports = TalkState;
