'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.shotCount = 0;

	this.moveIndex = 0;
	this.moveTo = [
		{x: 300, y: 60},
		{x: 360, y: 100},
		{x: 300, y: 140},

		{x: 240, y: 100},

		{x: 180, y: 60},
		{x: 120, y: 100},
		{x: 180, y: 140},

		{x: 240, y: 100},
	];

};


Spell.prototype.runInSpellExecute = function() {
	// move
	if (!this.boss.isMoving() && this.shotCount >= 10) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y);

		this.moveIndex++;

		if(this.moveIndex >= this.moveTo.length) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	// shot
	if(this.frame_count % 15 === 0) {
		this.shotCount++;

		var type_id = Constant.BULLET_KUNAI_PURPLE;
		var r = 20;
		var aimed_theta = this.calcThetaAimedToChara();

		/* 円形 */
		for (var i = 0; i < 40; i++) {
			var theta = i * 9 + aimed_theta;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

			this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
				{ count: 0, vector: {r: 3, theta: theta} },
			]);
		}
	}
};

Spell.prototype.name = function() { return "罔両「無限呪縛」"; };
Spell.prototype.charaImage = function() { return "yukari_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 100; };

module.exports = Spell;
