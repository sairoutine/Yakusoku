'use strict';

/* 自機スペルカード */

// 何回ボムをばらまくか
var SHOT_NUM = 8;

// 1発につき何個ボムをばらまくか
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

	this.shot_num = 0;
};

Spell.prototype.runInSpellExecute = function() {
	// SHOT_NUM 回数しかボムを発射しない
	if(this.shot_num >= SHOT_NUM) return;

	// ボムの初期位置が蓮子からどれだけ離れているか
	var r = 30;

	// ボム生成
	if(this.frame_count % BOMB_PER_COUNT === 0) {
		for(var i = 0; i < BOMB_NUM; i++) {
			var theta = ((360 / BOMB_NUM) | 0) * i;
			var ax = r * Math.cos(Util.thetaToRadian(theta));
			var ay = r * Math.sin(Util.thetaToRadian(theta));

			this.stage.shot_manager.create(
				Constant.SHOT_BOMB_TYPE,
				this.stage.character.x + ax,
				this.stage.character.y + ay,
				{ 'r': 0, 'theta': theta, 'ra': 0.05, 'raa': 0.01 }
			);
		}

		this.game.playSound('boss_shot_big');

		this.shot_num++;
	}
};


Spell.prototype.name = function() { return "蓮子スペルカード1"; };
Spell.prototype.charaImage = function() { return "renko_normal"; };

module.exports = Spell;
