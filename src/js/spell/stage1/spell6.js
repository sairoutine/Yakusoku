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
	var vector = {r: 10, theta: 5.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	var vector2 = {r: 10, theta: -10.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	if(this.boss.vital >= 10 && this.boss.is_show) {
		this.boss.is_show = false;
		this.shot(7, this.boss.x, this.boss.y, vector2); //type_id
	}
	else {
		if(this.frame_count % 50 === 0) {
			this.shot(7, this.stage.width, this.stage.height/3, vector); //type_id
		}
		if((this.frame_count+25) % 50 === 0) {
			this.shot(7, 0, this.stage.height/3, vector2); //type_id
		}

	}


	if(this.boss.vital < 10) {
		this.boss.is_show = true;
	}
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 150; };


// 初期 x, y 座標

module.exports = Spell;
