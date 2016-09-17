'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');

var EnemyAppear = require('../../../logic/enemy_appear');
var stage1_appear = require('../../../enemy/stage1');

var State = function(stage) {
	BaseState.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(stage1_appear);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM('douchu');
	}

	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);

	for(var i = 0, len = params.length; i< len; i++) {
		this.stage.enemy_manager.create(params[i]);
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
};

module.exports = State;
