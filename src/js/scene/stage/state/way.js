'use strict';

var BaseScene = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');



var State = function(stage) {
	BaseScene.apply(this, arguments);
};
Util.inherit(State, BaseScene);

// 初期化
State.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	// TODO:
	//this.game.playBGM('douchu');
};

// フレーム処理
State.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// 自機
	this.stage.character.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	// 自機描画
	this.stage.character.updateDisplay();
};

module.exports = State;
