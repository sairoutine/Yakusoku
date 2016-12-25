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
		{x: 200, y: 100},
		{x: 300, y: 100},
		{x: 400, y: 100},
		{x: 300, y: 100},
		{x: 200, y: 100},
		{x: 100, y: 100},
	];

	this.shotCount = 0;
};


Spell.prototype.runInSpellExecute = function() {

	if (!this.boss.isMoving() && this.shotCount >= 3) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y);

		this.moveIndex++;

		if(this.moveIndex > 5) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	if(!this.boss.isMoving()) {
		if(this.frame_count % 50 === 0){
			this.shotCount++;

			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();

			/* 交差 */
			for (var i = 0; i < 20; i++) {
				var theta = i * 18 + aimed_theta;

				var type_id = Constant.BULLET_TINY_RED;
				for (var j = 0; j < 10; j++) {
					var r = 20 * 0.5*j;
					var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
					var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );
					theta += (i%2===0 ? -90 : 90);

					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0.5*j, theta: theta, ra: 0.05} },
					]);
				}
			}
		}
	}
};

Spell.prototype.name = function() { return "?????????"; };
Spell.prototype.charaImage = function() { return "merry_furious"; };

Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;
