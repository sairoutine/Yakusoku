'use strict';

/* ベクトルを使って動くオブジェクトの基底クラス */

var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var VectorBase = function(scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(VectorBase, BaseObject);

// 初期化
VectorBase.prototype.init = function(vectors) {
	BaseObject.prototype.init.apply(this, arguments);

	// 動きを設定
	this.setVector(vectors);
};

// 動きを設定
VectorBase.prototype.setVector = function(vectors) {
	// 敵の動き(ベクトル)
	this.vectors = [];

	// どの動きを適用してるか
	this.vector_index = 0;

	var vec;
	for(var i = 0, len = vectors.length; i < len; i++) {
		vec = vectors[i];
		this.vectors.push({
			// どのフレームからこの動きを適用するか
			count: vec.count,

			// ベクトルの大きさ(速度)
			r: vec.vector.r,
			// ベクトルの角度(方向)
			theta: vec.vector.theta || 0,
			// 角度の加速度
			w: vec.vector.w || 0,
			// 速度の加速度
			ra: vec.vector.ra || 0,
			// 角度の加速度の加速度
			wa: vec.vector.wa || 0,
			// 速度の加速度の加速度
			raa: vec.vector.raa || 0,
			// 角度の加速度の加速度の加速度
			waa: vec.vector.waa || 0,

			// 角度の最大値
			trange: vec.vector.trange || null,
			// 速度の最大値
			rrange: vec.vector.rrange || null,
			// 速度の加速度の最大値
			wrange: vec.vector.wrange || null,

			// 角度の加速度の最大値
			rarange: vec.vector.rarange || null,
			// 速度の加速度の加速度の最大値
			warange: vec.vector.warange || null,
			// 自機狙いかどうか
			aimed: vec.vector.aimed,
			// 回転させるかどうか
			is_rotate: vec.is_rotate,
		});
	}

	// 自機狙い設定のベクトルについて、自機にむける
	this._calculateAimedVector();
};

// 自機狙いにする
VectorBase.prototype._calculateAimedVector = function() {
	var i = this.vector_index;

	// 自機狙い設定がされているか確認
	if( ! this.vectors[i].aimed) return;

	// 自機
	var character = this.stage.character;

	var ax = character.x - this.x;
	var ay = character.y - this.y;

	this.vectors[i].theta = this._radian_to_theta(Math.atan2(ay, ax));
};

// フレーム処理
VectorBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 次の動きに変更するか
	if(this.vectors[this.vector_index + 1] &&
	   this.vectors[this.vector_index + 1].count <= this.frame_count) {

		var pre_theta = this.vectors[this.vector_index].theta;

		// 次の動きに変更
		this.vector_index++;

		// 自機狙い設定のベクトルについて、自機にむける
		this._calculateAimedVector();

		// 次の動きの角度が空なら前回の角度を引き継ぐ
		if(pre_theta && ! this.vectors[this.vector_index].theta) {
			this.vectors[this.vector_index].theta = pre_theta;
		}
	}

	// 敵を動かす
	this.x += this.calc_moveX();
	this.y += this.calc_moveY();

	var vec = this.vectors[this.vector_index];

	// 加速度を追加
	vec.theta += vec.w;
	vec.r     += vec.ra;
	vec.w     += vec.wa;
	vec.ra    += vec.raa;
	vec.wa    += vec.waa;

	// 最大値を超えないようにする
	vec.theta = this._beInRange( vec.theta, vec.trange);
	vec.r     = this._beInRange( vec.r,     vec.rrange);
	vec.w     = this._beInRange( vec.w,     vec.wrange);
	vec.ra    = this._beInRange( vec.ra,    vec.rarange);
	vec.wa    = this._beInRange( vec.wa,    vec.warange);

	// 回転
	if(vec.is_rotate) {
		this.rotate = this._theta_to_radian(vec.theta + 90);
	}
};

VectorBase.prototype._beInRange = function(value, range) {
	if(range === null) {
		return value;
	}

	if(range.max !== void 0 && value > range.max) {
		value = range.max;
	}

	if(range.min !== void 0 && value < range.min) {
		value = range.min;
	}
	return value;
};


// θ -> ラジアンに変換
VectorBase.prototype._theta_to_radian = function(theta){
	return (theta / 180 * Math.PI);
};

// ラジアン -> θ に変換
VectorBase.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};


// X軸の移動を計算
VectorBase.prototype.calc_moveX = function() {
	var vector = this.vectors[this.vector_index];

	var move_x = vector.r * Math.cos(this._theta_to_radian(vector.theta));
	return move_x;
};

// Y軸の移動を計算
VectorBase.prototype.calc_moveY = function() {
	var vector = this.vectors[this.vector_index];

	var move_y = vector.r * Math.sin(this._theta_to_radian(vector.theta));
	return move_y;
} ;

module.exports = VectorBase;
