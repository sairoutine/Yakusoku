'use strict';

// ボス戦前のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Config = require('../../../config');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ情報
TalkState.prototype.serifInfo = function(){
	// TODO: DEBUG
	if(Config.DEBUG) {
		var serif = document.getElementById("stage1_before").value;
		if(serif.length > 1) {
			return JSON.parse(serif);
		}
	}

	return this.stage.currentStageSerifBefore();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyBeforeTalkEnd();
};

module.exports = TalkState;
