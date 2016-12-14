'use strict';
var Constant = require('../constant');

var __randomizer = 
	{
		random: function () { return Math.random(); }
	};


var appear_frame = 0;
var EnemiesParams = [ ] ;

appear_frame += 10;

for (var i = 0; i < 24; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i*60,
		'x': 60 + (i%3) * 60,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': 0,
		'shot': [
			{ 'type': Constant.BULLET_KUNAI_RED, 'bullet': 8, 'count': 30 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i*60,
		'x': 420 - (i%3) * 60,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': 1,
		'shot': [
			{ 'type': Constant.BULLET_KUNAI_RED, 'bullet': 8, 'count': 30 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 720 + 30;

for (var i = 0; i < 24; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i*60,
		'x': 30 + (i%3) * 60,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'powerItem': 0,
		'shot': [
			{ 'type': Constant.BULLET_KUNAI_PURPLE, 'bullet': 8, 'count': 40 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  50, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 150, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i*60,
		'x': 450 - (i%3) * 60,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'powerItem': 1,
		'shot': [
			{ 'type': Constant.BULLET_KUNAI_PURPLE, 'bullet': 8, 'count': 40 },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  50, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 150, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 720 + 720 + 200;

// 前方に直進する
for( var i = 0; i < 50 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 10,
			'x': parseInt(__randomizer.random() * 480),
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'type': Constant.ENEMY_BLUE_NEUTRAL_TYPE,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			]
		}
	);
}
appear_frame += 250;

var shot = [];
for( var i = 0; i < 12 ; i++ ) {
	shot.push(
		{ 'type': Constant.BULLET_KUNAI_RED, 'bullet': i%2 === 0 ? 3 : 6, 'count': 30 + i*10 }
	);
}
EnemiesParams.push({
	'appear_frame': appear_frame,
	'x': 240,
	'y': 0,
	'vital': 3,
	'type': Constant.ENEMY_RED_NEUTRAL_TYPE,
	'powerItem': 0,
	'shot': shot,
	'vector': [
		{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count': 160, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
	]
});

appear_frame += 200;

EnemiesParams.push({
	'appear_frame': appear_frame,
	'x': 360,
	'y': 0,
	'vital': 3,
	'type': Constant.ENEMY_RED_NEUTRAL_TYPE,
	'powerItem': 0,
	'shot': shot,
	'vector': [
		{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count': 160, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
	]
});

EnemiesParams.push({
	'appear_frame': appear_frame,
	'x': 120,
	'y': 0,
	'vital': 3,
	'type': Constant.ENEMY_RED_NEUTRAL_TYPE,
	'powerItem': 0,
	'shot': shot,
	'vector': [
		{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count': 160, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
	]
});

appear_frame += 200;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 0,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			shot: [
				{ 'type': Constant.BULLET_KUNAI_PURPLE, 'bullet': 5, 'count': 30 + (i%2)*10 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 480,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			shot: [
				{ 'type': Constant.BULLET_KUNAI_PURPLE, 'bullet': 5, 'count': 30 + (i%2)*10 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}

appear_frame += 480;

EnemiesParams.push({
	'appear_frame': appear_frame,
	'x': 240,
	'y': 0,
	'vital': 3,
	'type': Constant.ENEMY_RED_NEUTRAL_TYPE,
	'powerItem': 0,
	'shot': shot,
	'vector': [
		{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
		{ 'count': 160, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
	]
});


// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;
