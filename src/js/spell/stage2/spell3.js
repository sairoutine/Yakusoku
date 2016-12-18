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

Spell.prototype.name = function() { return "奇跡「客星の誕生」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 150; };

Spell.prototype.baseCount = function( ) { return 100; };

Spell.prototype.shotParam = function( ) {
	return [
		{ 'bullet':0, 'type': Constant.BULLET_BALL_BLUE, 'count': [ 20 ]},
	];
};

Spell.prototype.moveParam = function( ) {
	return [];
};

Spell.prototype.bulletDictionary = function( ) {
var spell5_1 = function( ) {
  var array = [ ] ;
  var r = 50 ;
  var r2 = 100 ;
  var points = [ ] ;
  var span = 10 ;
  for( var i = 0; i < 5; i++ ) {
    points[ i ] = ( 126 + 144 * i ) % 360 ;
  }
  for( var i = 0; i < 5; i++ ) {
    var t1 = points[ i ] ;
    var t2 = points[ ( i + 1 ) % 5 ] ;
    var x1 = r * Math.cos( Util.thetaToRadian( t1 ) ) ;
    var y1 = r * Math.sin( Util.thetaToRadian( t1 ) ) ;
    var x2 = r * Math.cos( Util.thetaToRadian( t2 ) ) ;
    var y2 = r * Math.sin( Util.thetaToRadian( t2 ) ) ;
    for( var j = 0; j < span; j++ ) {
      var count = ( j + i * span ) ;
      var x = x1 + ( x2 - x1 ) / span * j ;
      var y = y1 + ( y2 - y1 ) / span * j ;
      var t = Util.radianToTheta( Math.atan2( y, x ) ) ;
      for( var k = 0; k < 5; k++ ) {
        var at = points[ k ] ;
        var ax = x + r2 * Math.cos( Util.thetaToRadian( at ) ) ;
        var ay = y + r2 * Math.sin( Util.thetaToRadian( at ) ) ;
        var v = { 'x': ax,
                  'y': ay,
                  'count': count,
                  'vector': [
                    { 'count': 0,            'vector': { 'r': 0, 'theta': t, } },
                    { 'count': span*6-count, 'vector': { 'r': 2, 'w': 0 } }
                  ]
                } ;
        array.push( v ) ;
      }
    }
  }
  return array ;
} ;

	var BulletDictionaries = [];
	BulletDictionaries[0] = spell5_1();
	return BulletDictionaries;
};

module.exports = Spell;
