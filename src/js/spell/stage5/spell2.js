'use strict';

/* スペルカード */
var BaseSpell = require('../base');
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
	this.boss.setMoveTo(this.stage.width / 2, this.stage.height / 2);
};

Spell.prototype.runInSpellExecute = function() {
	if(this.boss.isMoving()) return;

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

};

Spell.prototype.uzumaki_shot1 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas1.length; i++ ) {
		var theta = this.shot_thetas1[i];

		this.shot(Constant.BULLET_TINY_YELLOW, x, y, {r: r, theta: theta});
		this.shot_thetas1[i] += this.add_shot_theta;
	}
};
Spell.prototype.uzumaki_shot2 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas2.length; i++ ) {
		var theta = this.shot_thetas2[i];

		this.shot(Constant.BULLET_TINY_YELLOW, x, y, {r: r, theta: theta});
		this.shot_thetas2[i] -= this.add_shot_theta;
	}
};
Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(Constant.BULLET_DOUBLEBALL_RED, x, y, {r: r, theta: theta});
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = Util.radianToTheta(Math.atan2(ay, ax));
};

Spell.prototype.name = function() { return "?????????"; };

Spell.prototype.charaImage = function() { return "aya_normal"; };

module.exports = Spell;
