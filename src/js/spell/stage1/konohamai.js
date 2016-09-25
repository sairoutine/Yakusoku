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
	this.add_shot_theta = 5;
	this.r = 1.5;
	this.uzumaki_percount = 5;
	this.maru_percount    = 75;
	this.maru_shot_pertheta = 10;

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};

Spell.prototype.run = function() {
	BaseSpell.prototype.run.apply(this, arguments);

	// スペルカード発動演出中
	if(this.isSpellStarting()) return;

	// 渦巻き弾
	if(this.frame_count % this.uzumaki_percount === 0) {
		this.uzumaki_shot1();
		this.uzumaki_shot2();
		this.game.playSound('boss_shot_small');
	}

	// 円形弾
	if(this.frame_count % this.maru_percount === 0) {
		for (var i=0; i< 360 / this.maru_shot_pertheta; i++) {
			this.maru_shot();
			this.maru_shot_theta += this.maru_shot_pertheta;
		}
		this.game.playSound('boss_shot_big');
	}

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
		this.boss.animateNeutral();
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

	this.shot(1, x, y, {r: r, theta: theta}); // type_id: 1
};

Spell.prototype.name = function() { return "風符「天狗風」"; };

module.exports = Spell;
