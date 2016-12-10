'use strict';
var Constant = require('../constant');
var EnemiesParams = [ ] ;
var __randomizer = 
	{
		random: function () { return Math.random(); }
	};

// 2分 = 7200 frame

var EnemiesParams = [ ] ;

// 弾を撒きながら前方に直進する
for( var i = 0; i < 100 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 100 + i * 5,
			'x': parseInt(__randomizer.random() * 480),
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 2, 'count': 10 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			]
		}
	);
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 700 + i * 15,
			'x': 170 - i * 20,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
				{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': 45 }, 'wrange': { 'min': -0.5 } } },
			]
		}
	);
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 800 + i * 15,
			'x': 260 + i * 20,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
				{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 135 }, 'wrange': { 'max': 0.5 } } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1000 + i * 15,
			'x': 0,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1180 + i * 15,
			'x': 480,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1550 + i * 15,
			'x': 0,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1720 + i * 15,
			'x': 480,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1730 + i * 15,
			'x': 0,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 0, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1730 + i * 15,
			'x': 480,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 0, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2120 + i * ( 80 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}




for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2170 + i * ( 80 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}


for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2700 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 50 : 80 ) + i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 10 + (i%10)*2 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  10,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': -45 }, 'wrange': { 'min': -1 } } },
			{ 'count': 150,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max':  45 }, 'wrange': { 'max':  1 } } },
		]
	});
}

for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2910 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 430 : 400 ) - i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 10 + (i%10)*2 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  10,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max': 225 }, 'wrange': { 'max':  1 } } },
			{ 'count': 150,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': 135 }, 'wrange': { 'min': -1 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;
