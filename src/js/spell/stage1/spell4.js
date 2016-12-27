'use strict';

/* TODO:
ビームにアタリ判定をいつか・・・

*/

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');
var mersenne = require('../../logic/mersenne');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
	// 乱数初期化
	mersenne.init_seed(1000);
};


Spell.prototype.runInSpellExecute = function() {
	var vector = {r: 10, theta: 5.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	var vector2 = {r: 10, theta: -10.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	if(this.boss.vital >= 10 && this.boss.is_show) {
		this.boss.is_show = false;
		this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.boss.x, this.boss.y, vector);
	}
	else {
		if(this.frame_count % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.stage.width, this.stage.height/3, vector);
			this.game.playSound('boss_shot_small');
		}
		if((this.frame_count+25) % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, 0, this.stage.height/3, vector2);
			this.game.playSound('boss_shot_small');
		}
	}


	if (this.frame_count % 3 !== 0) {
		var r =  this._getRandomValue({ 'min': 2, 'max': 3 }) ;
		var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

		this.shot(Constant.BULLET_TINY_YELLOW, this.me.x, this.me.y, [
			{
				count: 0,
				vector: {r: r, theta: theta}
			}
		]);
	}
};
Spell.prototype.onend = function() {
	this.boss.is_show = true;
};


Spell.prototype.name = function() { return "「幻想風靡」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 150; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;
