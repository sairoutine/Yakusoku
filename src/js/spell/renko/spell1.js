'use strict';

/* 自機スペルカード */

// 何個ボムをばらまくか
var BOMB_NUM = 12;

// 何フレーム毎にボムをばらまくか
var BOMB_PER_COUNT = 45;

var BaseSpell = require('../base');
var Constant = require('../../constant');
var Util = require('../../util');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};

Spell.prototype.runInSpellExecute = function() {
	// ボム生成
	if(this.frame_count % BOMB_PER_COUNT === 0) {
		for(var i = 0; i < BOMB_NUM; i++) {
			this.stage.shot_manager.create(Constant.SHOT_BOMB_TYPE,
				this.stage.character.x,
				this.stage.character.y,
				{ 'r': 0, 'theta': ((360 / BOMB_NUM) | 0) * i, 'ra': 0.05, 'raa': 0.01 }
			);
		}

		this.game.playSound('boss_shot_big');
	}
};


Spell.prototype.name = function() { return "蓮子スペルカード1"; };
Spell.prototype.charaImage = function() { return "renko_normal"; };

module.exports = Spell;
