'use strict';

/* 雑魚敵の出現管理クラス */

var Logic = function(appear_params) {
	// どこまで敵を出現させたか
	this.enemy_index = 0;

	// 敵のパラメータ一一覧
	this.appear_params = appear_params;
};

// 敵生成
Logic.prototype.get = function(frame_count) {
	var params = [];
	// 現在フレームに出現予定の敵を出現させる
	while(this.appear_params[this.enemy_index] &&
		this.appear_params[this.enemy_index].appear_frame === frame_count) {

		params.push(this.appear_params[this.enemy_index]);
		this.enemy_index++ ;
	}

	return params;
};




module.exports = Logic;
