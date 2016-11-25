'use strict';

/* TODO:
文の移動にいい感じのsoundをつけたいな
ビームに貫通属性つけたいな(フラグで一度自分にぶつかったら判定しないのも入れる)
ビームの矩形判定ガバガバ(矩形の回転に対応していない)
文に当たり判定が残りっぱなし
rand は組み込みのrandにしたくないね
*/

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
		this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.boss.x, this.boss.y, vector2);
	}
	else {
		if(this.frame_count % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.stage.width, this.stage.height/3, vector);
		}
		if((this.frame_count+25) % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, 0, this.stage.height/3, vector2);
		}
	}


	var r =  this._getRandomValue({ 'min': 2, 'max': 3 }) ;
	var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

	this.shot(Constant.BULLET_TINY_YELLOW, this.me.x, this.me.y, [
		{
			count: 0,
			vector: {r: r, theta: theta}
		}
	]);


	if(this.boss.vital < 10) {
		this.boss.is_show = true;
	}
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 150; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;
