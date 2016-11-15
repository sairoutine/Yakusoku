'use strict';

/* 雑魚敵の出現管理クラス */

var Logic = function(appear_params) {
	// どこまで敵を出現させたか
	this.enemy_index = 0;

	// 敵のパラメータ一一覧
	this.appear_params = appear_params;
};
Logic.prototype.init = function() {
	this.enemy_index = 0;
};
// 敵生成
Logic.prototype.get = function(frame_count) {
	var params = [];
	// 現在フレームに出現予定の敵を出現させる
	while(!this.isEnd() &&
		this.appear_params[this.enemy_index].appear_frame === frame_count) {

		params.push(this.appear_params[this.enemy_index]);
		this.enemy_index++ ;
	}

	return params;
};

// 敵生成が全て終了したか
Logic.prototype.isEnd = function() {
	return this.appear_params[this.enemy_index] ? false : true;
};

// 最後に敵が出現した際のフレームを取得
Logic.prototype.getLastEnemyAppearCount = function() {
	return this.appear_params[this.appear_params.length-1].appear_frame;
};
module.exports = Logic;
