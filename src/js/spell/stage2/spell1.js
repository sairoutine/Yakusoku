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

Spell.prototype.name = function() { return "風符「蝉しぐれ」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 100; };

Spell.prototype.baseCount = function( ) { return 600; };

Spell.prototype.shotParam = function( ) {
	return [
		{ 'bullet': 0, 'type': Constant.BULLET_TINY_YELLOW, 'count': [  10,  20,  30,  40 ]},
		{ 'bullet': 1, 'type': Constant.BULLET_TINY_RED,    'count': [ 210, 220, 230, 240 ]},
		{ 'bullet': 0, 'type': Constant.BULLET_TINY_YELLOW, 'count': [ 410, 420, 430, 440 ]},
	];
};
Spell.prototype.moveParam = function( ) {
	return [
		{ x: 140, y: 200, startCount: 100, moveCount: 100},
		{ x: 340, y: 200, startCount: 300, moveCount: 100},
		{ x: 240, y: 100, startCount: 500, moveCount: 100},
	];
};

Spell.prototype.bulletDictionary = function( ) {
	var createAyaSpell4_1 = function( ) {
		var array = [ ] ;
		var r = 30 ;
		for( var i = 0; i < 36; i++ ) {
			var count = i * 1;
			var theta = ( ( i * 10 ) + 90 ) % 360 ;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( theta ) ),
				'y': r * Math.sin( Util.thetaToRadian( theta ) ),
				'count': count,
				'vector': { 'r': 2 + ( i / 50 ), 'theta': theta }
			};
			array.push( v ) ;
		}
		return array ;
	} ;
	var createAyaSpell4_2 = function( ) {
		var array = [ ] ;
		var r = 30 ;
		for( var i = 0; i < 36; i++ ) {
			var count = i * 1 ;
			var t = ( ( i * -10 ) + 450 ) % 360 ;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( t ) ),
				'y': r * Math.sin( Util.thetaToRadian( t ) ),
				'count': count,
				'vector': { 'r': 2 + ( i / 50 ), 'theta': t }
			} ;
			array.push( v ) ;
		}
		return array ;
	};

	var BulletDictionaries = [];
	BulletDictionaries[0] = createAyaSpell4_1();
	BulletDictionaries[1] = createAyaSpell4_2();
	return BulletDictionaries;
};

module.exports = Spell;
