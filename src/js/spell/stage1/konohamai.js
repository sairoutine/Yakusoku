'use strict';

/* スペルカード */
// TODO: スプライト名もっといい感じに指定できないかな・・・
var BaseSpell = require('./base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
	this.shot_thetas1 = [0, 60, 120, 180, 240, 300];
	this.shot_thetas2 = [0, 60, 120, 180, 240, 300];
	this.maru_shot_theta = 0;

	// config
	this.add_shot_theta = 10;
	this.r = 1.5;
	this.uzumaki_percount = 15;
	this.maru_percount    = 75;
	this.maru_shot_pertheta = 12;

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// まずは中央に移動
	this.is_moving = true;
};

Spell.prototype.run = function() {
	BaseSpell.prototype.run.apply(this, arguments);

	// スペルカード発動演出中
	if(this.isSpellStarting()) return;

	if(this.is_moving) {
		// 移動中
		var ax = this.stage.width/2  - this.boss.x;
		var ay = this.stage.height/2 - this.boss.y;

		var my_theta = this._radian_to_theta(Math.atan2(ay, ax));

		this.boss.animateRight();
		this.boss.moveByTheta(my_theta);

		if(
			Math.floor(this.boss.x) === Math.floor(this.stage.width/2) &&
			Math.floor(this.boss.y) === Math.floor(this.stage.height/2)
		) {
			// 移動終了
			this.is_moving = false;
			this.boss.animateNeutral();
		}
	}
	else {
		// 渦巻き弾
		if(this.frame_count % this.uzumaki_percount === 0) {
			this.uzumaki_shot1();
			this.uzumaki_shot2();
			this.game.playSound('boss_shot_small');
		}

		// 円形弾
		if(this.frame_count % this.maru_percount === 0) {
			// 自機狙い
			this.aimedToChara();
			for (var i=0; i< 360 / this.maru_shot_pertheta; i++) {
				this.maru_shot();
				this.maru_shot_theta += this.maru_shot_pertheta;
			}
			this.game.playSound('boss_shot_big');
		}
	}

};

Spell.prototype.uzumaki_shot1 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas1.length; i++ ) {
		var theta = this.shot_thetas1[i];

		this.shot(0, x, y, {r: r, theta: theta}); // type_id: 0
		this.shot_thetas1[i] += this.add_shot_theta;
	}
};
Spell.prototype.uzumaki_shot2 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas2.length; i++ ) {
		var theta = this.shot_thetas2[i];

		this.shot(0, x, y, {r: r, theta: theta}); // type_id: 0
		this.shot_thetas2[i] -= this.add_shot_theta;
	}
};
Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(4, x, y, {r: r, theta: theta}); // type_id: 1
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = this._radian_to_theta(Math.atan2(ay, ax));
};

// ラジアン -> θ に変換
Spell.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};

Spell.prototype.name = function() { return "風符「天狗風」"; };

module.exports = Spell;
