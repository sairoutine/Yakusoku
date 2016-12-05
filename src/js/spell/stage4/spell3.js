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

	this.moveIndex = 0;
	this.moveTo = [
		{x: 100, y: 100},
		{x: 400, y: 100},
		{x: 100, y: 400},
		{x: 400, y: 400},
	];

	this.shotCount = 0;

};


Spell.prototype.runInSpellExecute = function() {
	if(this.boss.isMoving()) {
		this.boss.is_show = false;
	}
	else {
		this.boss.is_show = true;
	}

	if (!this.boss.isMoving() && this.shotCount >= 3) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y, 100);

		this.moveIndex++;

		if(this.moveIndex >= this.moveTo.length) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	if(!this.boss.isMoving()) {
		if(this.frame_count % 50 === 0){
			this.shotCount++;

			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();

			/* 円形 */
			for (var i = 0; i < 40; i++) {
				var theta = i * 9 + aimed_theta;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				var type_id = Constant.BULLET_KUNAI_PURPLE;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0, theta: theta} },
						{ count: 25 , vector: {r: 3 + 0.4*j, theta: theta} },
					]);
				}
			}
		}
	}
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 100; };

module.exports = Spell;
