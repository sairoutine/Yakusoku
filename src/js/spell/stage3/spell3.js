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

			this.game.playSound('boss_shot_small');
			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();

			/* 円形 */
			for (var i = 0; i < 36; i++) {
				var theta = i * 10 + aimed_theta;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				var type_id = Constant.BULLET_TINY_YELLOW;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0, theta: theta} },
						{ count: 25 , vector: {r: 3.5 + 0.4*j, theta: theta} },
					]);
				}
			}

			var r = 20;
			/* 交差 */
			for (var i = 0; i < 20; i++) {
				var theta = i * 18;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				theta += (i%2===0 ? -90 : 90);

				var type_id = Constant.BULLET_TINY_RED;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0.5*j, theta: theta, ra: 0.05} },
					]);
				}
			}
		}
	}


};

Spell.prototype.name = function() { return "花符「サンフラワーゲーム」"; };
Spell.prototype.charaImage = function() { return "yuuka_normal"; };

Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;
