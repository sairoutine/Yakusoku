'use strict';

/* 幽香 ビーム */

var BaseObject = require('../../object/base');
var Util = require('../../util');
var Constant = require('../../constant');
var mersenne = require('../../logic/mersenne');

// 花の色の種類
var TYPE_IDS = [
	Constant.BULLET_TINY_RED,
	Constant.BULLET_TINY_LIMEGREEN,
	Constant.BULLET_TINY_YELLOW,
	Constant.BULLET_TINY_AQUA,
	Constant.BULLET_TINY_ORANGE,
];

var Beam = function(scene) {
	BaseObject.apply(this, arguments);
};

Util.inherit(Beam, BaseObject);

Beam.prototype.init = function(x, y) {
	BaseObject.prototype.init.apply(this, arguments);
	this.boss_x = x;
	this.boss_y = y;

	this.theta = 0;
	this.is_show = true;

	this.bullet_waiting_time = 0;
};

Beam.prototype.run = function() {
	BaseObject.prototype.run.apply(this, arguments);

	/* move beam */
	if(this.theta > 360) {
		this.is_show = false;
		return;
	}

	this.theta+=5;

	var r = 120;
	var offset_x = r * Math.cos( Util.thetaToRadian( this.theta ) );
	var offset_y = r * Math.sin( Util.thetaToRadian( this.theta ) );

	this.x = this.boss_x + offset_x;
	this.y = this.boss_y + offset_y;

	this.rotate = Util.thetaToRadian(this.theta + 90);

	/* create bullet */
	if(this.frame_count % 3 === 0) {
		this.bullet_waiting_time += 2;
		var count = 200 - this.bullet_waiting_time;

		for (var i = 0; i < 2; i++) {
			var i2 = i*2;
			if(this.frame_count % 6 === 0) i2-=1;

			//this._createBullet(this.x - (offset_x/4)*i2, this.y - (offset_y/4)*i2, count);
			this._createBullet(this.x + (offset_x/4)*i2, this.y + (offset_y/4)*i2, count);
		}
	}
};
Beam.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;

Beam.prototype._createBullet = function(x, y, count) {
	var type_id = TYPE_IDS[this._getRandomValue({max: TYPE_IDS.length, min: 0})];
	for (var i = 0; i < 5; i++) {
		var theta = i * 72;

		var r = 10;
		var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
		var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

		var toward = this._getRandomValue({max: 360, min: 0});
		this.stage.bullet_manager.create(type_id, x + offset_x, y + offset_y, [
			{ count: 0 , vector: {r: 0, theta: theta} },
			{ count: count, vector: {r: 2, theta: toward} },
		]);
	}
};


// 当たり判定サイズ
Beam.prototype.collisionWidth  = function() { return 0; };
Beam.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
Beam.prototype.grazeHeight  = function() { return 0; };
Beam.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
Beam.prototype.spriteX = function() { return 0; };
Beam.prototype.spriteY = function() { return 0; };

// スプライト画像
Beam.prototype.spriteImage = function() { return "beam"; };

// スプライトのサイズ
Beam.prototype.spriteWidth  = function() { return 20; };
Beam.prototype.spriteHeight = function() { return 256; };














/* スペルカード */
var BaseSpell = require('../base');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.moveIndex = 1;
	this.moveTo = [{x: 100, y: 100}, {x: 380, y: 100}];

	this.beam = null;
	mersenne.init_seed(1000);
};


Spell.prototype.runInSpellExecute = function() {

	if (this.frame_count % 300 === 0) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y, 100);

		this.moveIndex++;

		if(this.moveIndex > 1) {
			this.moveIndex = 0;
		}
	}

	if(this.boss.isMoving()) { this.beam = null; return; }

	if(!this.beam) {
		this.beam = new Beam(this.stage);
		this.beam.init(this.boss.x, this.boss.y);
		this.game.playSound('kirakira');

	}
	else {
		this.beam.run();
	}


};

Spell.prototype.updateDisplayInSpellExecute = function () {
	if(this.beam && this.beam.is_show) {
		this.beam.updateDisplay();
	}
};




Spell.prototype.name = function() { return "花符「幻想開花」"; };
Spell.prototype.charaImage = function() { return "yuuka_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;


module.exports = Spell;
