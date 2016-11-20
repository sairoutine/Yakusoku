'use strict';

var Util = require('../util');

var createAyaSpell4 = function( ) {
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

var BulletDictionaries = [];

BulletDictionaries[0] = createAyaSpell4();

module.exports = BulletDictionaries;
