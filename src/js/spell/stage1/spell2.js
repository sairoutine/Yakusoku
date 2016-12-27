'use strict';

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
	var r =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector = {r: r, theta: theta};

	var r2 =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta2 = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector2 = {r: r2, theta: theta2};

	if(this.frame_count % 3 !== 0) {
		this.shot(Constant.BULLET_TINY_YELLOW, this.boss.x, this.boss.y, vector);
		this.shot(this.frame_count % 2 === 0 ? Constant.BULLET_TINY_RED : Constant.BULLET_TINY_GRAY,    this.boss.x, this.boss.y, vector2);
	}
	if(this.frame_count % 9 === 0) {
		this.game.playSound('boss_shot_small');
	}
};

Spell.prototype.name = function() { return "風符「五月雨の紅葉」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

Spell.prototype.initX = function() { return this.stage.width/2; };
Spell.prototype.initY = function() { return this.stage.height/3; };

Spell.prototype._getRandomValue = function( range ) {
	var differ = range.max - range.min ;
	return ((mersenne.random() * differ) | 0) + range.min;
};

// 初期 x, y 座標

module.exports = Spell;
