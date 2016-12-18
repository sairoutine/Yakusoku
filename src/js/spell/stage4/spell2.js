'use strict';

/* 幽香 蝶を生成するオブジェクト */

// 基底クラス
var VectorBaseObject = require('../../object/vector_base');
var Util = require('../../util');
var Constant = require('../../constant');

var MagicCircle = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(MagicCircle, VectorBaseObject);

MagicCircle.prototype.init = function(x, y, vector, is_inverse) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);
};

MagicCircle.prototype.run = function() {
	VectorBaseObject.prototype.run.apply(this, arguments);

	// 魔法陣を回転する
	this.rotate++;

	if(this.rotate >= 360 || this.rotate <= 0) {
		this.rorate = 0;
	}

	if(this.frame_count > 100 && this.frame_count % 100 === 0) {
		for (var i = 1; i <= 6; i++) {
			var theta = 60 * i + Util.radianToTheta(this.rotate);
			this.stage.bullet_manager.create(Constant.BULLET_DOUBLEBALL_PURPLE, this.x, this.y, {r: 3, theta: theta});
		}
	}
};

MagicCircle.prototype.updateDisplay = function() {
	// 魔法陣を透過
	var ctx = this.game.surface;
	ctx.globalAlpha = 0.5;
	VectorBaseObject.prototype.updateDisplay.apply(this, arguments);
	ctx.globalAlpha = 1.0;
};




// 当たり判定サイズ
MagicCircle.prototype.collisionWidth  = function() { return 0; };
MagicCircle.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
MagicCircle.prototype.grazeHeight  = function() { return 0; };
MagicCircle.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
MagicCircle.prototype.spriteX = function() { return 0; };
MagicCircle.prototype.spriteY = function() { return 0; };

// スプライト画像
MagicCircle.prototype.spriteImage = function() { return "magic_circle"; };

// スプライトのサイズ
MagicCircle.prototype.spriteWidth  = function() { return 300; };
MagicCircle.prototype.spriteHeight = function() { return 300; };


MagicCircle.prototype.scale = function() { return 0.25; };

/* スペルカード */
var BaseSpell = require('../base');
var Manager = require('../../logic/manager');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	this.magic_circle_manager = new Manager(MagicCircle, this.stage);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
	this.is_init = false;
};


Spell.prototype.runInSpellExecute = function() {
	if(!this.is_init) {
		this.is_init = true;


		for (var i = 1; i <= 5; i++) {
			this.magic_circle_manager.create(this.boss.x, this.boss.y, [
				{ count: 0, vector: {r: 5, theta: 72 * i, w: 1, ra: -0.05, rrange: {min: 0}} },
			]);
		}
	}

	if(this.frame_count % 100 === 0) {
		var r = 10;
		var aimed_theta = this.calcThetaAimedToChara();

		for (var j = 0; j < 8; j++) {
			var theta = aimed_theta + j * 45;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );


			this.shot(Constant.BULLET_BIG_PURPLE, this.boss.x + offset_x, this.boss.y + offset_y, {r: 4, theta: theta});
		}
	}

	this.magic_circle_manager.run();

};

Spell.prototype.updateDisplayInSpellExecute = function () {

	this.magic_circle_manager.updateDisplay();
};




Spell.prototype.name = function() { return "境符「スキマツアーへご招待」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 240; };

module.exports = Spell;
