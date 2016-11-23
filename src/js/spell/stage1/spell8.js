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
};

Spell.prototype.runInSpellExecute = function() {
	var r =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector = {r: r, theta: theta};

	var r2 =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta2 = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector2 = {r: r2, theta: theta2};

	this.shot(0, this.boss.x, this.boss.y, vector); //type_id
	this.shot(1, this.boss.x, this.boss.y, vector2); //type_id
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

Spell.prototype.initX = function() { return this.stage.width/2; };
Spell.prototype.initY = function() { return this.stage.height/3; };

Spell.prototype._getRandomValue = function( range ) {
	var differ = range.max - range.min ;
	return ((Math.random() * differ) | 0) + range.min;
};

// 初期 x, y 座標

module.exports = Spell;
