'use strict';
var Constant = require('../constant');

var appear_frame = 0;
var EnemiesParams = [ ] ;

var appear_frame = 10;
for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 0,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}
appear_frame += 720;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 480,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

appear_frame += 720;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 0,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 480,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

appear_frame += 1000;

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 20,
		'x': 50 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 20,
		'x': 430 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}

appear_frame += 10;

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 10,
		'x': 25 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 10,
		'x': 455 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}

appear_frame += 720;

for(var i = 0; i < 8; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + 260 * i,
		'x': 120,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + 130 + 260 * i,
		'x': 360,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;
