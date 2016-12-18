'use strict';

/* スペルカード */
var BaseSpell = require('../param_base');
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
	BaseSpell.prototype.runInSpellExecute.apply(this, arguments);
};

Spell.prototype.name = function() { return "?????????"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return this.stage.width/2; };
Spell.prototype.initY = function( ) { return this.stage.height/2; };

Spell.prototype.baseCount = function( ) { return 465; };

Spell.prototype.shotParam = function( ) {
	var r_num        = 20; // 弾幕の円の半径(大きいほど外側への弾の数が増えていく)
	var shotParam = [];

	for(var i = 0; i<r_num; i++) {
		var type = i%2 ? Constant.BULLET_TINY_LIMEGREEN : Constant.BULLET_TINY_BLUE;

		shotParam.push({
			'bullet':i, 'type': type, 'count': [ 1 ]
		});
	}

	return shotParam;
};

Spell.prototype.moveParam = function( ) {
	return [];
};

Spell.prototype.bulletDictionary = function( ) {
	var r_space      = 17; // 弾幕の円の半径(小さいほど外側に行く方の弾の間隔が短くなっていく)
	var r_num        = 20; // 弾幕の円の半径(大きいほど外側への弾の数が増えていく)
	var density      = 48; // 弾と隣の弾の間隔
	var spread_speed = 6;  // 弾を撒く速さ

	var BulletDictionaries = [];

	for (var j = 1; j <= r_num; j++) {
		var array = [];
		var r = r_space * j;
		for( var k = 0; k < density; k++ ) {
			var count = k;
			var theta = ( ( k * 360/density ) + 450 ) % 360;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( theta ) ),
				'y': r * Math.sin( Util.thetaToRadian( theta ) ),
				'count': count + j * density/spread_speed,
				'vector': [
					{ 'count': 0, 'vector': { 'r': 0, 'theta': theta, } },
					{ 'count': (density/spread_speed-k)+(r_num-j)*density/spread_speed + 100, 'vector': { 'r':2.5, theta: theta + 180} },
				],
			} ;
			array.push( v ) ;
		}


		BulletDictionaries.push(array);
	}

	return BulletDictionaries;
};

module.exports = Spell;
