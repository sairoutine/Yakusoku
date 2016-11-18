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

	// 移動先
	this.boss.setMoveTo(this.stage.width / 2, this.stage.height /3);
};


Spell.prototype.runInSpellExecute = function() {
	var kankaku = 5;
	var vec = {r: 2, theta: 135};

	if(this.frame_count % 40 === 0) {
		this.game.playSound('boss_shot_small');
		for(var i = 0; i <= kankaku; i++) {
			this.shot(0, (this.stage.width/kankaku * i), 0, vec); // type_id:
			this.shot(0, this.stage.width, (this.stage.height/kankaku * i), vec); // type_id:
		}
	}

	if(this.frame_count % (24*5) === 0) {
		this.game.playSound('boss_shot_big');
		var theta = this.calcThetaAimedToChara();
		for (var j = 0; j < 10; j++) {
			this.shot(5, this.boss.x, this.boss.y, {r: 0.1, theta: theta + j * 360 / 10, ra: 0.05, rrange: {max: 10}}); // type_id:
		}
	}
};

Spell.prototype.name = function() { return "風符「蝉しぐれ」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

module.exports = Spell;
