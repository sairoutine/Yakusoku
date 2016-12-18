'use strict';


/* 幽香 蝶を生成するオブジェクト */

// 基底クラス
var VectorBaseObject = require('../../object/vector_base');
var Util = require('../../util');
var Constant = require('../../constant');

// 蝶の種類
var TYPE_IDS = [
	Constant.BULLET_BUTTERFLY_ORANGE,
	Constant.BULLET_BUTTERFLY_AQUA,
	Constant.BULLET_BUTTERFLY_PURPLE,
	Constant.BULLET_BUTTERFLY_YELLOW,
	Constant.BULLET_BUTTERFLY_BLUE,
	Constant.BULLET_BUTTERFLY_LIMEGREEN,
	Constant.BULLET_BUTTERFLY_RED,
];




var ButterFlyGenerator = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(ButterFlyGenerator, VectorBaseObject);

ButterFlyGenerator.prototype.init = function(x, y, vector) {
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

ButterFlyGenerator.prototype.run = function() {
	VectorBaseObject.prototype.run.apply(this, arguments);

	if(this.frame_count % 60 === 0) {
/*
	BULLET_BUTTERFLY_ORANGE:    14,
	BULLET_BUTTERFLY_AQUA:      15,
	BULLET_BUTTERFLY_PURPLE:    16,
	BULLET_BUTTERFLY_YELLOW:    17,
	BULLET_BUTTERFLY_BLUE:      18,
	BULLET_BUTTERFLY_LIMEGREEN: 19,
	BULLET_BUTTERFLY_RED:       20,
*/
		for (var i = 0; i < 10; i++) {
			var type_id = TYPE_IDS[this._getRandomValue({max: TYPE_IDS.length, min: 0})];
			var theta = i * 36;

			var r = 20;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

			//this.stage.bullet_manager.create(type_id, this.x + offset_x, this.y + offset_y, {r: 0, theta: theta, ra: 0.1, rrange: {max: 2}});
			this.stage.bullet_manager.create(type_id, this.x + offset_x, this.y + offset_y, {r: 2, theta: theta});
		}
	}
};
ButterFlyGenerator.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 当たり判定サイズ
ButterFlyGenerator.prototype.collisionWidth  = function() { return 0; };
ButterFlyGenerator.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
ButterFlyGenerator.prototype.grazeHeight  = function() { return 0; };
ButterFlyGenerator.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
ButterFlyGenerator.prototype.spriteX = function() { return 4; };
ButterFlyGenerator.prototype.spriteY = function() { return 1; };

// スプライト画像
ButterFlyGenerator.prototype.spriteImage = function() { return "shot"; };

// スプライトのサイズ
ButterFlyGenerator.prototype.spriteWidth  = function() { return 64; };
ButterFlyGenerator.prototype.spriteHeight = function() { return 64; };







/* スペルカード */
var BaseSpell = require('../base');
var Manager = require('../../logic/manager');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	this.generator_manager = new Manager(ButterFlyGenerator, this.stage);
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
			this.generator_manager.create(this.boss.x, this.boss.y, [
				{ count: 0, vector: {r: 5, theta: 90 + 72 * i, ra: -0.1} },
				{ count: 30, vector: {r: 0, theta: 0, ra: 0} },
			]);
		}
	}

	this.generator_manager.run();

	if(this.boss.vital < 10) {
		this.generator_manager.removeAll();
	}
};


Spell.prototype.updateDisplayInSpellExecute = function () {

	this.generator_manager.updateDisplay();
};

Spell.prototype.name = function() { return "花符「日回りの蝶」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 100; };

module.exports = Spell;
