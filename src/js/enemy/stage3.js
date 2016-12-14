'use strict';
var Constant = require('../constant');

var appear_frame = 0;
var EnemiesParams = [ ] ;

appear_frame += 50;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * ( 120 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 25;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * ( 120 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}
appear_frame += 1000;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * (120 - i * 5),
			'x': 0,
			'y': 10 + (i%4) * 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': i % 2 ? 1 : 3, 'count': 40+(i%2)*20, 'type': Constant.BULLET_DOUBLEBALL_RED },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

appear_frame += 30;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * (120 - i * 5),
			'x': 480,
			'y': 10 + (i%4) * 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': i % 2 ? 1 : 3, 'count': 40+(i%2)*20, 'type': Constant.BULLET_DOUBLEBALL_RED },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}
appear_frame += 1000;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + parseInt(i/2) * ( 120 - parseInt(i/2) * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 50;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + parseInt(i/2) * ( 120 - parseInt(i/2) * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 1000;

for( var i = 0; i < 12 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': i * 20,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 4, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

for( var i = 0; i < 12 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': 480 - i * 20,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 4, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 200;

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': i * 25,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 50;

for( var i = 0; i < 8; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': 480 - i * 25,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;
