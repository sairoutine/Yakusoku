'use strict';

// ボス戦後のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Config = require('../../../config');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ
TalkState.prototype.serifInfo = function(){
	if(Config.DEBUG) {
		var serif = document.getElementById("stage1_after").value;
		if(serif.length > 1) {
			return JSON.parse(serif);
		}
	}

	return this.stage.currentStageSerifAfter();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyAfterTalkEnd();
};


module.exports = TalkState;
