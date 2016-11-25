'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
	this.maru_shot_theta = 0;

	// config
	this.r = 1.5;
	this.maru_percount1    = 100;
	this.maru_shot_pertheta = 10;

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};


Spell.prototype.runInSpellExecute = function() {
	// 移動
	var shot_time = 600;
	var move_count = this.frame_count % 3600;
	if(shot_time <= move_count && move_count < shot_time + 60) {
		this.boss.moveLeft();
		this.boss.animateLeft();
	}
	else if(shot_time * 2 + 60 <= move_count && move_count < shot_time * 2 + 60 * 2) {
		this.boss.moveRight();
		this.boss.moveDown();
		this.boss.animateRight();
	}
	else if(shot_time * 3 + 60 * 2 <= move_count && move_count < shot_time * 3 + 60 * 3) {
		this.boss.moveRight();
		this.boss.moveUp();
		this.boss.animateRight();
	}
	else if(shot_time * 4 + 60 * 3 <= move_count && move_count < shot_time * 4 + 60 * 4) {
		this.boss.moveLeft();
		this.boss.animateLeft();
	}
	else {
		// 移動してない時

		// 円形弾
		if(
			this.frame_count % this.maru_percount1 === 0  ||
			this.frame_count % this.maru_percount1 === 10 ||
			this.frame_count % this.maru_percount1 === 20
		) {
			// 自機狙い
			this.aimedToChara();
			for (var i=0; i< 360 / this.maru_shot_pertheta; i++) {
				this.maru_shot();
				this.maru_shot_theta += this.maru_shot_pertheta;
			}
			this.game.playSound('boss_shot_big');
		}

		this.boss.animateNeutral();
	}

};

Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(Constant.BULLET_TINY_ORANGE, x, y, {r: r, theta: theta});
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = Util.radianToTheta(Math.atan2(ay, ax));
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

module.exports = Spell;
