'use strict';

// クリア リザルト

var BaseState = require('./result_base');
var Util = require('../../../util');

var ResultState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(ResultState, BaseState);

// リザルト画面が終了した
ResultState.prototype.notifyResultEnd = function () {
	this.stage.notifyClearEnd();
};

ResultState.prototype.resultName = function(){
	return "STAGE CLEAR !";
};


module.exports = ResultState;
