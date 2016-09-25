(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Config = {
	DEBUG: false,
	IMAGES: {
		title_bg:  'image/title_bg.png',
		press_z:  'image/press_z.png',
		prologue1_bg:  'image/prologue1_bg.png',
		prologue2_bg:  'image/prologue2_bg.png',
		logo:  'image/logo.png',
		side_bar:  'image/side_bar.png',
		fukidashi_normal:  'image/fukidashi_blue.png',
		fukidashi_orange:  'image/fukidashi_orange.png',
		fukidashi_purple:  'image/fukidashi_purple.png',
		// キャラ立ち絵
		aya_normal:  'image/aya_normal.png',
		aya_dissatisfied:  'image/aya_dissatisfied.png',
		aya_smile:  'image/aya_smile.png',

		ganger_normal:  'image/ganger_normal.png',
		ganger_owata:  'image/ganger_owata.png',
		hatena_normal:  'image/ganger_normal.png',
		hatena_owata:  'image/ganger_owata.png',

		renko_normal:  'image/renko_normal.png',
		renko_disappointed:  'image/renko_disappointed.png',
		renko_surprised:  'image/renko_surprised.png',
		renko_trouble:  'image/renko_trouble.png',
		renko_calm:  'image/renko_calm.png',

		merry_normal:  'image/merry_normal.png',
		merry_disappointed:  'image/merry_disappointed.png',
		merry_trouble:  'image/merry_trouble.png',

		// 名前
		name_aya:  'image/name_aya.png',
		name_ganger:  'image/name_ganger.png',
		name_hatena:  'image/name_hatena.png',
		name_merry:  'image/name_merry.png',
		name_renko:  'image/name_renko.png',
		name_yuka:  'image/name_yuka.png',
		name_sanae:  'image/name_sanae.png',
		name_yukari:  'image/name_yukari.png',

		stage1_bg: 'image/stage1_bg.png',
		character_renko:     'image/character_renko.png',
		boss_aya:     'image/boss_aya.png',
		shot:      'image/shot.png',
		item:      'image/item.png',

		enemy:     'image/enemy.png',
		/*
		reimu:     'image/reimu.png',
		shot:      'image/shot.png',
		bullet:    'image/bullet.png',
		item:      'image/item.png',
	   */
	},

	SOUNDS: {
		select: {
			id: 0x01,
			path:   'sound/select.wav',
			volume: 0.80
		},
		boss_shot_small: {
			id: 0x02,
			path: 'sound/boss_shot_small.wav',
			volume: 0.15
		},
		boss_shot_big: {
			id: 0x04,
			path: 'sound/boss_shot_big.wav',
			volume: 0.15
		},
		spellcard: {
			id: 0x08,
			path: 'sound/spellcard.wav',
			volume: 0.15
		},
		dead: {
			id: 0x10,
			path: 'sound/dead.wav',
			volume: 0.08
		},
		enemy_vanish: {
			id: 0x20,
			path: 'sound/enemy_vanish.mp3',
			volume: 0.1
		},
		graze: {
			id: 0x40,
			path: 'sound/graze.wav',
			volume: 0.2
		}


		/*
		shot: {
			id: 0x02,
			path: 'sound/shot.wav',
			volume: 0.08
		},
	   */
	},

	BGMS:{
		title: {
			path:   'bgm/title.mp3',
			volume: 0.60
		},
		prologue: {
			path:   'bgm/prologue.ogg',
			volume: 0.40,
			loopStart: 7.500,
			loopEnd: 60 * 2 + 14.999,
		},
		douchu: {
			path:   'bgm/douchu.ogg',
			volume: 0.40,
			loopStart: 60 * 1 + 39.096,
			loopEnd: 60 * 3 + 18.193,
		},
		stage1: {
			path:   'bgm/stage1.ogg',
			volume: 0.50,
			loopStart: 41.379,
			loopEnd: 60 * 2 + 0.827,
		},
	},
	// テキストの typography スピード
	MESSAGE_SPEED: 10,
	// 喋ってる方が寄る際のpx
	TALKER_MOVE_PX: 5,
	// キャラのサイズ(1/2)
	CHARA_SIZE_RATIO: 0.5,
	// ノベルパートにおける左キャラの(x, y)
	PROLOGUE2_LEFT_X: 0,
	PROLOGUE2_LEFT_Y: 132,
	// ノベルパートにおける右キャラの(x, y)
	PROLOGUE2_RIGHT_X: 283,
	PROLOGUE2_RIGHT_Y: 132,
	// セリフウィンドウの(x, y)
	PROLOGUE2_SERIF_WINDOW_X: 80,
	PROLOGUE2_SERIF_WINDOW_Y: 0,
	// 左の名前プレートの(x, y)
	PROLOGUE2_LEFT_NAME_WINDOW_X: 78,
	PROLOGUE2_LEFT_NAME_WINDOW_Y: 420,
	// 右の名前プレートの(x, y)
	PROLOGUE2_RIGHT_NAME_WINDOW_X: 362,
	PROLOGUE2_RIGHT_NAME_WINDOW_Y: 420,

	// ボス会話パートにおける左キャラの(x, y)
	TALKING_LEFT_X: -59,
	TALKING_LEFT_Y: 132,
	// ボス会話パートにおける右キャラの(x, y)
	TALKING_RIGHT_X: 182,
	TALKING_RIGHT_Y: 132,
	// ボス会話のウィンドウの(x, y)
	TALKING_SERIF_WINDOW_X: 0,
	TALKING_SERIF_WINDOW_Y: 0,
	// ボス会話の左の名前プレートの(x, y)
	TALKING_LEFT_NAME_WINDOW_X: 0,
	TALKING_LEFT_NAME_WINDOW_Y: 420,
	// ボス会話の右の名前プレートの(x, y)
	TALKING_RIGHT_NAME_WINDOW_X: 280,
	TALKING_RIGHT_NAME_WINDOW_Y: 420,

};

// 全素材数
Config.ALL_MATERIAL_NUM = Object.keys(Config.IMAGES).length + Object.keys(Config.SOUNDS).length + Object.keys(Config.BGMS).length;


module.exports = Config;

},{}],2:[function(require,module,exports){
'use strict';

var Constant = {
	DEBUG: true,

	LOADING_SCENE:  0,
	TITLE_SCENE:    1,
	PROLOGUE1_SCENE:2,
	PROLOGUE2_SCENE:3,
	STAGE_SCENE:    4,
	EPILOGUE_SCENE: 5,
	ENDING_SCENE:   6,

	BUTTON_LEFT:  0x01,
	BUTTON_UP:    0x02,
	BUTTON_RIGHT: 0x04,
	BUTTON_DOWN:  0x08,
	BUTTON_Z:     0x10,
	BUTTON_X:     0x20,
	BUTTON_SHIFT: 0x40,
	BUTTON_SPACE: 0x80,

	WAY_STATE:    0,
	TALK1_STATE:  1,
	BOSS_STATE:   2,
	TALK2_STATE:  3,
	RESULT_STATE: 4,
	GAMEOVER_STATE: 5,

	SPELLCARD_START_STATE: 0,
	SPELLCARD_EXEC_STATE:  1,

};

module.exports = Constant;

},{}],3:[function(require,module,exports){
'use strict';

var BulletDictionaries = [
	[
		{
			'vector': { 'r': 5, 'theta': 165, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'vector': { 'r': 5, 'theta': 135, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'vector': { 'r': 5, 'theta': 105, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'vector': { 'r': 5, 'theta':  75, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'vector': { 'r': 5, 'theta':  45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'vector': { 'r': 5, 'theta':  15, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
	],
	[
		{
			'vector': { 'aimed': true, 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 3 } },
		},
	],
];

module.exports = BulletDictionaries;

},{}],4:[function(require,module,exports){
'use strict';

var BulletTypes = [
	// 文：黄色い弾
	{
		'image':       'shot',
		'indexX':           3,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// 文：赤い弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// stage1 道中雑魚：青い円形弾
	{
		'image':       'shot',
		'indexX':           2,
		'indexY':           0,
		'width':           20,
		'height':          20,
		'collisionWidth':  16,
		'collisionHeight': 16,
		'is_rotate':       false
	},
	// 文：オレンジっぽい弾
	{
		'image':       'shot',
		'indexX':           7,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// 文：赤いにじゅうまる弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           4,
		'width':           23,
		'height':          23,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       false
	},

];

module.exports = BulletTypes;

},{}],5:[function(require,module,exports){
'use strict';
var EnemiesParams = [ ] ;
/*
// テスト敵
EnemiesParams.push({
	// 出現フレーム
	'appear_frame': 100,
	// 出現位置x座標
	'x': 240,
	// 出現位置y座標
	'y': 100,
	// 体力
	'vital': 1,
	'powerItem': 0,
	'scoreItem': 1,
	// 撃つ弾の設定
	'shot': [
		{ 'bullet': 1, 'count': 0 },
	],
	// 動き
	'vector': [
		{ "count": 0, "vector": { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } }
	],
});
*/
for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 100 + i * 15,
		'x': 50 + i * 20,
		'y': 0,
		'vital': 1,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 135 }, 'wrange': { 'max': 0.5 } } },
		]
	});
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 300 + i * 15,
		'x': 380 - i * 20,
		'y': 0,
		'vital': 1,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': 45 }, 'wrange': { 'min': -0.5 } } },
		]
	});
}


for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 500 + i * 15,
		'x': 50 + i * 20,
		'y': 0,
		'vital': 1,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 135 }, 'wrange': { 'max': 0.5 } } },
		]
	});
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 700 + i * 15,
		'x': 380 - i * 20,
		'y': 0,
		'vital': 1,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': 45 }, 'wrange': { 'min': -0.5 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 900 + i * ( 80 - i * 5 ),
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
		'appear_frame': 950 + i * ( 80 - i * 5 ),
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

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 1400 + i * 20,
		'x': 50 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 40 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
}

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 1410 + i * 10,
		'x': 25 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 40 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
}

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 1420 + i * 20,
		'x': 430 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 40 }
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 1430 + i * 10,
		'x': 455 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [{ 'bullet': 1, 'count': 40 }],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}


for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame':1700 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 50 : 80 ) + i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': -45 }, 'wrange': { 'min': -1 } } },
			{ 'count': 180,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max':  45 }, 'wrange': { 'max':  1 } } },
		]
	});
}

for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 1900 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 430 : 400 ) - i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max': 225 }, 'wrange': { 'max':  1 } } },
			{ 'count': 180,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': 135 }, 'wrange': { 'min': -1 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2300 + i * ( 80 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2350 + i * ( 80 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2500 + i * ( 80 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2550 + i * ( 80 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2700 + i * ( 80 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2750 + i * ( 80 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'scoreItem': i % 2 === 1 ? 1 : 0,
		'shot': [{ 'bullet': 0, 'count': 40+(i%2)*20 }],
		'vector': [
			{ 'count':   0,          'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;

},{}],6:[function(require,module,exports){
'use strict';

var config = require('./config');
var constant = require('./constant');

// TODO: デバッグ(最初に表示するシーン)
var DEBUG_SCENE;
//DEBUG_SCENE = constant.STAGE_SCENE;


var LoadingScene   = require('./scene/loading');
var TitleScene     = require('./scene/title');
var Prologue1Scene = require('./scene/prologue1');
var Prologue2Scene = require('./scene/prologue2');
var StageScene    = require('./scene/stage');
/*
var EpilogueScene = require('./scene/epilogue');
var EndingScene   = require('./scene/ending');
*/
var Game = function(mainCanvas) {
	// メインCanvas
	this.surface = mainCanvas.getContext('2d');

	this.width = Number(mainCanvas.getAttribute('width'));
	this.height = Number(mainCanvas.getAttribute('height'));

	// WebAudio再生用
	this.audio_context = new window.AudioContext();
	// for legacy browser
	this.audio_context.createGain = this.audio_context.createGain || this.audio_context.createGainNode;
	// 音量調整
	this.audio_gain = this.audio_context.createGain();
	// 再生中の AudioBufferSourceNode
	this.audio_source = null;

	// ゲームの現在のシーン
	this.state = null;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ constant.LOADING_SCENE ] = new LoadingScene(this);
	// タイトル画面
	this.scenes[ constant.TITLE_SCENE ] = new TitleScene(this);
	// プロローグ画面1
	this.scenes[ constant.PROLOGUE1_SCENE ] = new Prologue1Scene(this);
	// プロローグ画面2
	this.scenes[ constant.PROLOGUE2_SCENE ] = new Prologue2Scene(this);
	// ステージ
	this.scenes[ constant.STAGE_SCENE ] = new StageScene(this);

	/*
	// ゲーム画面
	this.scenes[ this.STAGE_SCENE ]   = new StageScene(this);
	// エンディング画面
	this.scenes[ this.ENDING_SCENE ]  = null;
	*/

	// 画像一覧
	this.images = {};

	// SE一覧
	this.sounds = {};

	// BGM一覧
	this.bgms = {};

	// どのSEを再生するかのフラグ
	this.soundflag = 0x00;

	// 経過フレーム数
	this.frame_count = 0;

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;
};

Game.prototype = {
	// 初期化
	init: function () {
		// 経過フレーム数を初期化
		this.frame_count = 0;

		// キー押下フラグ
		this.keyflag = 0x0;

		// 一つ前のフレームで押下されたキー
		this.before_keyflag = 0x0;

		// シーンをローディング画面にする
		this.changeScene(constant.LOADING_SCENE);
	},
	// フォントのロードが完了
	fontLoadingDone: function(){
		if(this.state === constant.LOADING_SCENE) {
			this.currentScene().notifyFontLoadingDone();
		}
	},
	// キー押下
	handleKeyDown: function(e){
		this.keyflag |= this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// キー押下解除
	handleKeyUp: function(e){
		this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// 指定のキーが押下状態か確認する
	isKeyDown: function(flag) {
		return this.keyflag & flag;
	},
	// 指定のキーが押下されたか確認する
	isKeyPush: function(flag) {
		// 1フレーム前に押下されておらず、現フレームで押下されてるなら true
		return !(this.before_keyflag & flag) && this.keyflag & flag;
	},
	// キーコードをBitに変換
	_keyCodeToBitCode: function(keyCode) {
		var flag;
		switch(keyCode) {
			case 16: // shift
				flag = constant.BUTTON_SHIFT;
				break;
			case 32: // space
				flag = constant.BUTTON_SPACE;
				break;
			case 37: // left
				flag = constant.BUTTON_LEFT;
				break;
			case 38: // up
				flag = constant.BUTTON_UP;
				break;
			case 39: // right
				flag = constant.BUTTON_RIGHT;
				break;
			case 40: // down
				flag = constant.BUTTON_DOWN;
				break;
			case 88: // x
				flag = constant.BUTTON_X;
				break;
			case 90: // z
				flag = constant.BUTTON_Z;
				break;
		}
		return flag;
	},
	// シーンを切り替え
	changeScene: function(scene) {
		// シーンから離れる際の処理
		if(this.state !== null) {
			this.currentScene().onunload();
		}

		// シーン切り替え
		this.state = scene;
		// 切り替え後のシーンを初期化
		this.currentScene().init();
	},
	// BGMを再生
	playBGM: function(key) {
		var self = this;

		// 現在のBGM再生をストップ
		self.stopBGM();

		self.audio_source = self._createSourceNode(key);
		self.audio_source.start(0);
	},
	stopBGM: function(bgm) {
		var self = this;
		if(self.audio_source) {
			self.audio_source.stop(0);
		}
		return;
	},
	// BGM の AudioBufferSourceNode インスタンスを作成
	_createSourceNode: function(key) {
		var self = this;
		var arrayBuffer = self.bgms[key];
		var conf = config.BGMS[key];

		var source = self.audio_context.createBufferSource();
		source.buffer = arrayBuffer;

		source.loop = true;
		if(conf.loopStart) { source.loopStart = conf.loopStart; }
		if(conf.loopEnd)   { source.loopEnd = conf.loopEnd; }
		if(conf.volume)    { self.audio_gain.gain.value = conf.volume; }

		source.connect(self.audio_gain);

		self.audio_gain.connect(self.audio_context.destination);
		source.start = source.start || source.noteOn;
		source.stop  = source.stop  || source.noteOff;

		return source;
	},
	// 再生するSEをセット
	playSound: function(key) {
		this.soundflag |= config.SOUNDS[key].id;
	},

	// セットされたフラグにもとづいてSEを再生
	runPlaySound: function() {
		for(var key in config.SOUNDS) {
			// フラグが立ってたら
			if(this.soundflag & config.SOUNDS[key].id) {
				// 再生
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0;
				this.sounds[key].play();

				// フラグを削除
				this.soundflag &= ~config.SOUNDS[key].id;

				// 1フレームに1つしか再生しない
				break;
			}
		}
	},
	// 画像を取得
	getImage: function(key) {
		return this.images[key];
	},
	currentScene: function() {
		return this.scenes[this.state];
	},
	clearCanvas: function() {
		this.surface.clearRect(0, 0, this.width, this.height);
	},

	// ゲーム起動
	run: function(){
		// シーン更新
		this.currentScene().run();
		this.currentScene().updateDisplay();

		// SEを再生
		this.runPlaySound();

		// 押下されたキーを保存しておく
		this.before_keyflag = this.keyflag;

		// 経過フレーム数更新
		this.frame_count++;

		// 次の描画タイミングで再呼び出ししてループ
		requestAnimationFrame(this.run.bind(this));
	},
	// ローディング画面が終わったら
	notifyLoadingDone: function() {
		// オープニング画面に切り替え
		this.changeScene(constant.DEBUG && DEBUG_SCENE ? DEBUG_SCENE : constant.TITLE_SCENE);
	},
	// タイトル画面が終わったら
	notifyTitleDone: function() {
		// プロローグ画面に切り替え
		this.changeScene(constant.PROLOGUE1_SCENE);
	},
	// プロローグ画面1が終わったら
	notifyPrologue1Done: function() {
		// プロローグ画面2に切り替え
		this.changeScene(constant.PROLOGUE2_SCENE);
	},
	// プロローグ画面が終わったら
	notifyPrologue2Done: function() {
		// ステージ画面に切り替え
		this.changeScene(constant.STAGE_SCENE);
	},
	// ステージ画面が終わったら
	notifyStageDone: function() {
		// タイトル画面に切り替え
		this.changeScene(constant.TITLE_SCENE);
	},

};




module.exports = Game;

},{"./config":1,"./constant":2,"./scene/loading":22,"./scene/prologue1":23,"./scene/prologue2":24,"./scene/stage":25,"./scene/title":31}],7:[function(require,module,exports){
'use strict';

/* 雑魚敵の出現管理クラス */

var Logic = function(appear_params) {
	// どこまで敵を出現させたか
	this.enemy_index = 0;

	// 敵のパラメータ一一覧
	this.appear_params = appear_params;
};
Logic.prototype.init = function() {
	this.enemy_index = 0;
};
// 敵生成
Logic.prototype.get = function(frame_count) {
	var params = [];
	// 現在フレームに出現予定の敵を出現させる
	while(this.appear_params[this.enemy_index] &&
		this.appear_params[this.enemy_index].appear_frame === frame_count) {

		params.push(this.appear_params[this.enemy_index]);
		this.enemy_index++ ;
	}

	return params;
};




module.exports = Logic;

},{}],8:[function(require,module,exports){
'use strict';

var Factory = function(Class, stage) {
	this.Class = Class;
	this.stage = stage;

	// 生成したオブジェクト
	this.pool = [];
};

// オブジェクトを生成
Factory.prototype.get = function() {
	var object = new this.Class(this.stage);
	// 初期化
	object.init.apply(object, arguments);

	return object;
};

// オブジェクトを削除
Factory.prototype.free = function(id) {

};


module.exports = Factory;

},{}],9:[function(require,module,exports){
'use strict';

var Factory = require("./factory");

var Manager = function(Class, stage) {
	// StageScene インスタンス
	this.stage = stage;

	// オブジェクト生成クラス
	this.factory = new Factory(Class, stage);

	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// 初期化
Manager.prototype.init = function() {
	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// オブジェクト生成
Manager.prototype.create = function() {
	var obj = this.factory.get.apply(this.factory, arguments);

	this.objects[obj.id] = obj;

	return obj;
};

// オブジェクト削除
Manager.prototype.remove = function(id) {
	delete this.objects[id];

	this.factory.free(id);
};

// フレーム処理
Manager.prototype.run = function(){
	this.frame_count++;

	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].run();
	}

	// 画面外に出たオブジェクトを削除
	this.removeOutOfStageObjects();
};

// 画面外に出たオブジェクトを消去する
Manager.prototype.removeOutOfStageObjects = function() {
	// オブジェクトが画面外に出たかどうか判定
	for(var id in this.objects) {
		if(this.objects[id].isOutOfStage()) {
			this.remove(id);
		}
	}
};

// 画面更新
Manager.prototype.updateDisplay = function(){
	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].updateDisplay();
	}

};

// Object と Manager の衝突判定
Manager.prototype.checkCollisionWithObject = function(obj1) {
	// 衝突判定
	for(var id in this.objects) {
		var obj2 = this.objects[id];
		if(obj1.checkCollision(obj2)) {
			obj1.notifyCollision(obj2);
			obj2.notifyCollision(obj1);
			break;
		}
	}
};

// Manager と Manager の衝突判定
Manager.prototype.checkCollisionWithManager = function(manager) {
	// 衝突判定
	OUT: for(var obj1_id in this.objects) {
		for(var obj2_id in manager.objects) {
			if(this.objects[obj1_id].checkCollision(manager.objects[obj2_id])) {
				var obj1 = this.objects[obj1_id];
				var obj2 = manager.objects[obj2_id];

				// 衝突を通知
				obj1.notifyCollision(obj2);
				obj2.notifyCollision(obj1);
				break OUT;
			}
		}
	}
};

module.exports = Manager;

},{"./factory":8}],10:[function(require,module,exports){
'use strict';

/* セリフを扱うクラス */

var Config = require("../config");



var Logic = function (script) {
	this.timeoutID = null;

	// セリフテキスト
	this.script = script;

	// どこまでスクリプトが進んだか
	this.progress = null;

	this.left_chara_id  = null; // 左のキャラID
	this.left_exp       = null; // 左のキャラの表情
	this.right_chara_id = null; // 右のキャラのID
	this.right_exp      = null; // 右のキャラの表情

	// 今どっちのキャラが喋っているか
	this.pos = null;

	// 吹き出しの種類
	this.fukidashi = null;

	// 現在表示しているメッセージ
	this.line_num = 0;
	this.printing_lines = [];
};

Logic.prototype.init = function () {
	this.progress = -1;
	this.timeoutID = null;
	this.left_chara_id = null;
	this.left_exp = null;
	this.right_chara_id = null;
	this.right_exp = null;
	this.pos  = null;
	this.fukidashi = null;

	this.line_num = 0;
	this.printing_lines = [];

	this.next(); // start
};


Logic.prototype.is_end = function () {
	return this.progress + 1 === this.script.length;
};

Logic.prototype.next = function () {
	this.progress++;

	var script = this.script[this.progress];

	this._showChara(script);

	if(script.serif) {
		this._printMessage(script.serif);
	}
	else {
		// セリフが空ならキャラ画像だけ表示して次へ
		this.next();
	}
};

// 左右に配置するキャラを設定
Logic.prototype._showChara = function(script) {
	if(script.pos) {
		this.pos  = script.pos;
		this.fukidashi = script.fukidashi;

		if(script.pos === "left") {
			this.left_chara_id = script.chara;
			this.left_exp = script.exp;
		}
		else if(script.pos === "right") {
			this.right_chara_id = script.chara;
			this.right_exp = script.exp;
		}
	}
};

// テキストを1文字ずつパラパラと表示する
Logic.prototype._printMessage = function (message) {
	var self = this;

	// 現在実行中のセリフをキャンセル
	if(self.timeoutID !== null) {
		clearTimeout(self.timeoutID);
		self.timeoutID = null;
	}

	var char_list = message.split("");
	var char_length = char_list.length;

	var idx = 0;

	// 表示されているセリフをクリア
	self.line_num = 0;
	self.printing_lines = [];

	var output = function() {
		if (idx >= char_length) return;

		// タイポグラフィの速度
		var speed = Config.MESSAGE_SPEED;

		var ch = char_list[idx];
		idx++;

		if (ch === "\n") {
			self.line_num++;
		}
		else {
			// 初期化
			if(!self.printing_lines[self.line_num]) {
				self.printing_lines[self.line_num] = "";
			}

			// 1文字表示
			self.printing_lines[self.line_num] = self.printing_lines[self.line_num] + ch;
		}

		self.timeoutID = setTimeout(output, speed);
	};
	output();
};

Logic.prototype.right_image = function () {
	return(this.right_chara_id ? this.right_chara_id + "_" + this.right_exp : null);
};
Logic.prototype.left_image = function () {
	return(this.left_chara_id ? this.left_chara_id + "_" + this.left_exp : null);
};

Logic.prototype.right_name = function () {
	return this.right_chara_id ? "name_" + this.right_chara_id : null;
};
Logic.prototype.left_name = function () {
	return this.left_chara_id ? "name_" + this.left_chara_id : null;
};
Logic.prototype.serif_window = function () {
	return this.fukidashi ? "fukidashi_" + this.fukidashi : null;
};


Logic.prototype.is_left_talking = function () {
	return this.pos === "left" ? true : false;
};
Logic.prototype.is_right_talking = function () {
	return this.pos === "right" ? true : false;
};

Logic.prototype.lines = function () {
	return this.printing_lines;
};

module.exports = Logic;

},{"../config":1}],11:[function(require,module,exports){
'use strict';
var Game = require('./game');

// WebAudio
window.AudioContext = window.AudioContext || window.webkitAudioContext;


window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	var game = new Game(mainCanvas);
	// 初期化
	game.init();
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };

	// フォントの読み込みが完了
	if(document.fonts) {
		document.fonts.addEventListener('loadingdone', function() { game.fontLoadingDone(); });
	}
	else {
		// フォントロードに対応してなければ無視
		game.fontLoadingDone();
	}

	// ゲーム起動
	game.run();
};
window.onerror = function (msg, file, line, column, err) {
	/*
	msg: error message
	file: file path
	line: row number
	column: column number
	err: error object
	*/ 
	window.alert(msg + "\n" + line + ":" + column);
};


},{"./game":6}],12:[function(require,module,exports){
'use strict';

/* 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var TenguKaze = require('../spell/stage1/tengukaze');
var Konohamai = require('../spell/stage1/konohamai');


var Shot = require('../object/shot');

// Nフレーム毎にボスをアニメーション
var FRONT_ANIMATION_SPAN = 6;
var LR_ANIMATION_SPAN = 4;

// HP
var VITAL = 60 * 60 * 1;

// ボスの移動速度
var SPEED = 2;

// constructor
var Aya = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	// 発動中スペル
	this.spell_index = 0;

	// スペルカード一覧
	this.spells = [
		null, // 何も発動していない
		new TenguKaze(this),
		new Konohamai(this),
	];
};

// 基底クラスを継承
Util.inherit(Aya, BaseObject);



// ボスを初期位置に置く
Aya.prototype.setInitPosition = function() {
	// ボスの初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 400);
};

// 初期化
Aya.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// ボスを初期位置に置く
	this.setInitPosition();

	// 初期HP
	this.max_vital = VITAL;
	this.vital = VITAL;

	// 発動スペル
	this.spell_index = 0;

	// スペルカード発動！
	this.executeSpell();
};

// 現在のスペルカード
Aya.prototype.currentSpell = function(){
	return this.spells[this.spell_index];
};

// スペルを切り替え
Aya.prototype.executeSpell = function(){
	// 切り替え
	this.spell_index++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};
// 次に発動するスペルがあるかどうか
Aya.prototype.hasNextSpell = function(){
	return this.spells[this.spell_index + 1] ? true : false;
};


// HPを初期化
Aya.prototype.resetVital = function(){
	this.vital = this.max_vital;
};

// HPを初期化
Aya.prototype.isDead = function(){
	return this.vital <= 0;
};



// フレーム処理
Aya.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// スペルカード処理
	this.currentSpell().run();

	// 時間経過でスペルカード発動時間は減っていく
	if(this.currentSpell().isSpellExecute()) {
		this.vital--;
		this.stage.score+=10;
	}

	if(this.isDead() && this.hasNextSpell()) {
		this.resetVital();
		// 次のスペルカード発動！
		this.executeSpell();
	}

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;

	// Nフレーム毎にボスをアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}
};

// 移動
Aya.prototype.moveLeft = function(){
	this.x -= SPEED;
};
Aya.prototype.moveRight = function(){
	this.x += SPEED;
};
Aya.prototype.moveUp = function(){
	this.y -= SPEED;
};
Aya.prototype.moveDown = function(){
	this.y += SPEED;
};

// TODO: refactor
// theta値の方向に移動
Aya.prototype.moveByTheta = function(theta){
	this.x += this.calc_moveX(theta);
	this.y += this.calc_moveY(theta);
};

// θ -> ラジアンに変換
Aya.prototype._theta_to_radian = function(theta){
	return (theta / 180 * Math.PI);
};

// X軸の移動を計算
Aya.prototype.calc_moveX = function(theta) {
	var move_x = SPEED * Math.cos(this._theta_to_radian(theta));
	return move_x;
};

// Y軸の移動を計算
Aya.prototype.calc_moveY = function(theta) {
	var move_y = SPEED * Math.sin(this._theta_to_radian(theta));
	return move_y;
} ;




// 移動アニメーション
Aya.prototype.animateLeft = function(){
		this.indexY = 1;
};
Aya.prototype.animateRight = function(){
		this.indexY = 2;
};
Aya.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// ボスを描画
Aya.prototype.updateDisplay = function(){
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	// スペルカード描画
	this.currentSpell().updateDisplay();
};

// 衝突した時
Aya.prototype.notifyCollision = function(obj) {
	// 自機弾が当たればボスのHPを減らす
	if(obj instanceof Shot) {
		this.vital--;
		this.stage.score+=10;
	}
};



// 当たり判定サイズ
Aya.prototype.collisionWidth  = function() { return 64; };
Aya.prototype.collisionHeight = function() { return 64; };

// スプライトの開始位置
Aya.prototype.spriteX = function() { return this.indexX; };
Aya.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Aya.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Aya.prototype.spriteWidth  = function() { return 128; };
Aya.prototype.spriteHeight = function() { return 128; };




module.exports = Aya;

},{"../constant":2,"../object/shot":19,"../spell/stage1/konohamai":37,"../spell/stage1/tengukaze":38,"../util":39,"./base":13}],13:[function(require,module,exports){
'use strict';

/* オブジェクトの基底クラス */

var Config = require("../config");

var IS_SHOW_COLLISION;
//IS_SHOW_COLLISION = true;

// ステージ外かどうかの判定の余白
var EXTRA_OUT_OF_SIZE = 100;

// オブジェクトを一意に識別するID
var id = 0;

var ObjectBase = function(scene) {
	this.frame_count = 0;

	// StageScene インスタンス
	this.stage = scene;
	// Game インスタンス
	this.game = scene.game;

	// オブジェクトを識別する一意なID
	this.id = ++id;

	// x座標(中心)
	this.x = 0;
	// y座標(中心)
	this.y = 0;

	// 回転
	this.rotate = 0;
};

// 初期化
ObjectBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// 衝突した時
ObjectBase.prototype.notifyCollision = function(obj) {
	console.error('notifyCollision method must be overridden.');
};

// 当たり判定サイズ
ObjectBase.prototype.collisionHeight = function() {
	console.error('collisionHeight method must be overridden.');
};

// 当たり判定サイズ
ObjectBase.prototype.collisionWidth = function() {
	console.error('collisionWidth method must be overridden.');
};

// スプライトの開始位置
ObjectBase.prototype.spriteX = function() {
	console.error('spriteX method must be overridden.');
};

// スプライトの開始位置
ObjectBase.prototype.spriteY = function() {
	console.error('spriteY method must be overridden.');
};

// スプライト画像
ObjectBase.prototype.spriteImage = function() {
	console.error('spriteImage method must be overridden.');
};

// スプライトのサイズ
ObjectBase.prototype.spriteWidth = function() {
	console.error('spriteWidth method must be overridden.');
};

// スプライトのサイズ
ObjectBase.prototype.spriteHeight = function() {
	console.error('spriteHeight method must be overridden.');
};

// フレーム処理
ObjectBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;
};

// 画面更新
ObjectBase.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	var image = this.game.getImage(this.spriteImage());

	ctx.save();

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	// オブジェクトを回転
	ctx.rotate(this.rotate);

	ctx.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteX(), this.spriteHeight() * this.spriteY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-this.spriteWidth()/2, -this.spriteHeight()/2,
		// オブジェクトのゲーム上のサイズ
		this.spriteWidth(),                   this.spriteHeight()
	);
	ctx.restore();

	// TODO: DEBUG
	if(Config.DEBUG && IS_SHOW_COLLISION) {
		ctx.save();
		ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
		ctx.globalAlpha = 0.4;
		ctx.fillRect(this.getCollisionLeftX(), this.getCollisionUpY(), this.collisionWidth(), this.collisionHeight());
		ctx.restore();
	}
};

// Object と Object の衝突判定
ObjectBase.prototype.checkCollisionWithObject = function(obj1) {
	// 衝突判定
	var obj2 = this;
	if(obj1.checkCollision(obj2)) {
		obj1.notifyCollision(obj2);
		obj2.notifyCollision(obj1);
		return true;
	}

	return false;
};

// オブジェクトとオブジェクトの衝突判定を行う
ObjectBase.prototype.checkCollision = function(obj) {
	if(Math.abs(this.x - obj.x) < this.collisionWidth()/2 + obj.collisionWidth()/2 &&
		Math.abs(this.y - obj.y) < this.collisionHeight()/2 + obj.collisionHeight()/2) {
		return true;
	}

	return false;
};

ObjectBase.prototype.getCollisionLeftX = function() {
	return this.x - this.collisionWidth() / 2;
};

ObjectBase.prototype.getCollisionUpY = function() {
	return this.y - this.collisionHeight() / 2;
};

// 画面外に出たかどうかの判定
ObjectBase.prototype.isOutOfStage = function( ) {
	if(this.x + EXTRA_OUT_OF_SIZE < 0 ||
	   this.y + EXTRA_OUT_OF_SIZE < 0 ||
	   this.x > this.stage.width  + EXTRA_OUT_OF_SIZE ||
	   this.y > this.stage.height + EXTRA_OUT_OF_SIZE
	  ) {
		return true;
	}

	return false;
};

module.exports = ObjectBase;

},{"../config":1}],14:[function(require,module,exports){
'use strict';

/* 敵弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

// 弾の種類
var bullet_types = require("../enemy/bullet_types");



var Bullet = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(Bullet, VectorBaseObject);

Bullet.prototype.init = function(type_id, x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = bullet_types[type_id];
	// TODO: リファクタ
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		]
	]);
	// 画像の種類
	this.image            = type.image;
	// スプライト開始位置
	this.indexX           = type.indexX;
	this.indexY           = type.indexY;
	// スプライトサイズ
	this.width            = type.width;
	this.height           = type.height;
	// 当たり判定サイズ
	this.collision_width  = type.collisionWidth;
	this.collision_height = type.collisionHeight;
};
Bullet.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return this.collision_width; };
Bullet.prototype.collisionHeight = function() { return this.collision_height; };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return this.indexX; };
Bullet.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return this.width; };
Bullet.prototype.spriteHeight = function() { return this.height; };

// 衝突した時
Bullet.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);
};

module.exports = Bullet;

},{"../constant":2,"../enemy/bullet_types":4,"../util":39,"./vector_base":20}],15:[function(require,module,exports){
'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var Aya = require('./aya');
var Enemy = require('./enemy');
var Bullet = require('./bullet');


// 自機の移動速度(通常時)
var FAST_SPEED = 4;
// 自機の移動速度(Z押下時)
var SLOW_SPEED = 3;
// Nフレーム毎に自機をアニメーション
var FRONT_ANIMATION_SPAN = 6; // 正面
var LR_ANIMATION_SPAN = 4; // 左右移動
// Nフレーム毎に自機をショット
var SHOT_SPAN = 5;
// 死亡時の無敵時間(フレーム)
var UNHITTABLE_COUNT = 100;
// 初期ライフ
var INIT_LIFE = 5;

// constructor
var Character = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Character, BaseObject);



// 自機を初期位置に置く
Character.prototype.setInitPosition = function() {
	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 100);
};

// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機を初期位置に置く
	this.setInitPosition();

	// 初期ライフ3
	this.life = INIT_LIFE;

	// ステージ開始直後は無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = 0;
};

// 撃つ
Character.prototype.shot = function(){
	// Nフレーム置きにショットを生成
	if(this.frame_count % SHOT_SPAN === 0) {
		this.stage.shot_manager.create(this.x, this.y);
		//this.game.playSound('shot'); TODO
	}
};

// 画面外に出させない
Character.prototype.forbidOutOfStage = function(){
	if(this.x < 0) {
		this.x = 0;
	}
	if(this.x > this.stage.width) {
		this.x = this.stage.width;
	}
	if(this.y < 0) {
		this.y = 0;
	}
	if(this.y > this.stage.height) {
		this.y = this.stage.height;
	}
};

// 自機移動
Character.prototype.moveLeft = function(is_slow){
	this.x -= is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveRight = function(is_slow){
	this.x += is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveUp = function(is_slow){
	this.y -= is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveDown = function(is_slow){
	this.y += is_slow ? SLOW_SPEED : FAST_SPEED;
};

// 移動アニメーション
Character.prototype.animateLeft = function(){
		this.indexY = 1;
};
Character.prototype.animateRight = function(){
		this.indexY = 2;
};
Character.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 自機が無敵状態なら無敵切れか判定
	if(this.is_unhittable && this.unhittable_count + UNHITTABLE_COUNT < this.frame_count) {
		this.is_unhittable = false;
	}

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;
	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}
};

// 自機を描画
Character.prototype.updateDisplay = function(){
	// 無敵状態ならば半透明に
	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 0.7;
	}

	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	if (this.is_unhittable) {
		this.game.surface.globalAlpha = 1.0;
	}
};

// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中なら衝突しない
	if(this.is_unhittable) return false;

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.setInitPosition();

	// 自機を減らす
	this.life--;

	// 無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = this.frame_count;
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾もしくはボスにぶつかったら
	// TODO: Aya -> BossBase
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof Aya) {
		// 死亡音再生
		this.game.playSound('dead');

		// 自機死亡エフェクト生成
		this.stage.effect_manager.create(this.x, this.y);

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};



// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 1; };
Character.prototype.collisionHeight = function() { return 3; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;

},{"../constant":2,"../util":39,"./aya":12,"./base":13,"./bullet":14,"./enemy":17}],16:[function(require,module,exports){
'use strict';

/* エフェクトオブジェクト */

// 何フレームで消滅するか
var VANISH_FRAME = 10;
// エフェクトのサイズ(直径)
var DIAM = 32;

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// constructor
var Effect = function(id, scene) {
	BaseObject.apply(this, arguments);
};
// 基底クラスを継承
Util.inherit(Effect, BaseObject);

// 初期化
Effect.prototype.init = function(x, y) {
	this.x = x;
	this.y = y;
};

// フレーム処理
Effect.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 時間切れ消滅判定
	if(VANISH_FRAME <= this.frame_count) {
		this.stage.effect_manager.remove(this.id);
	}
};

// 描画
Effect.prototype.updateDisplay = function() {
	var x = this.x;
	var y = this.y;
	var r = Math.round(DIAM * this.frame_count * 0.1);

	var cvs = document.createElement('canvas');
	cvs.width = r*2 + 4;
	cvs.height = r*2 + 4;
	var ctx = cvs.getContext('2d');

	// 円の中
	ctx.beginPath();
	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (VANISH_FRAME - this.frame_count + 1) * 0.05;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.fill();

	// 円の外枠
	ctx.beginPath();
	ctx.strokeStyle = 'rgb(255, 255, 255)';
	ctx.globalAlpha = (VANISH_FRAME - this.frame_count + 1) * 0.1;
	ctx.lineWidth = 3;
	ctx.arc(r+2, r+2, r, 0, Math.PI * 2);
	ctx.stroke();

	this.game.surface.drawImage(cvs, x-r-2, y-r-2);
};

module.exports = Effect;

},{"../constant":2,"../util":39,"./base":13}],17:[function(require,module,exports){
'use strict';

/* 敵オブジェクト */

// デフォの敵タイプ
var DEFAULT_ENEMY_TYPE = 3 * 2;

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

var Shot = require('../object/shot');

var bullet_dictionaries = require("../enemy/bullet_dictionaries");

// Nフレーム毎に敵をアニメーション
var ANIMATION_SPAN = 5;


// constructor
var Enemy = function(scene) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Enemy, VectorBaseObject);

// 初期化
Enemy.prototype.init = function(param) {
	// 敵の初期位置
	// VectorbaseObject より先に設定しないと aim が効かない
	this.x = param.x || 0;
	this.y = param.y || 0;

	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, [param.vector]);

	// 敵の体力
	this.vital = param.vital;

	// 撃破された時にパワーアップアイテムを生成するかどうか
	this.powerItem = param.powerItem;

	// 撃破された時にスコア獲得アイテムを生成するかどうか
	this.scoreItem = param.scoreItem;

	// 敵の撃つ弾の設定
	this.shots = param.shot;

	// どの弾を撃つ設定を適用するか
	this.shot_index = 0;

	// 敵の画像種類
	this.indexY = param.type ? param.type * 2 : DEFAULT_ENEMY_TYPE;
};

// フレーム処理
Enemy.prototype.run = function(){
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);

	// 弾を撃つ
	this.shot();

	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};

// 敵弾を撃つ
Enemy.prototype.shot = function(){
	if(!this.shots) { return; }


	while(this.shots[this.shot_index] && this.shots[this.shot_index].count <= this.frame_count) {
		var bullet_params = bullet_dictionaries[ this.shots[this.shot_index].bullet ];

		// 敵弾生成
		for( var i = 0, len = bullet_params.length; i < len; i++) {
			var param = bullet_params[i];

			this.stage.bullet_manager.create(2, this.x, this.y, param.vector); //type_id: 2
		}

		// sound
		this.game.playSound('boss_shot_small');

		this.shot_index++;
	}
};

// 自機弾と衝突
Enemy.prototype.notifyCollision = function(obj) {
	if(!(obj instanceof Shot)) { return; }

	// 自分を消す
	this.stage.enemy_manager.remove(this.id);

	// SEの再生
	this.game.playSound('enemy_vanish');

	// スコアの加算
	this.stage.score += 100;

	// 死亡エフェクト生成
	this.stage.effect_manager.create(this.x, this.y);


	// ポイントアイテムの生成
	if(this.powerItem || this.scoreItem) {
		this.stage.item_manager.create(0, this.x, this.y); // TODO: type_id
	}
};

// 当たり判定サイズ
Enemy.prototype.collisionWidth  = function() { return 20;  };
Enemy.prototype.collisionHeight = function() { return 28; };

// スプライトの開始位置
Enemy.prototype.spriteX = function() { return this.indexX; };
Enemy.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Enemy.prototype.spriteImage = function() { return 'enemy'; };

// スプライトのサイズ
Enemy.prototype.spriteWidth  = function() { return 32; };
Enemy.prototype.spriteHeight = function() { return 32; };


module.exports = Enemy;

},{"../constant":2,"../enemy/bullet_dictionaries":3,"../object/shot":19,"../util":39,"./vector_base":20}],18:[function(require,module,exports){
'use strict';

/* アイテムオブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');

var Item = function(id, scene) {
	VectorBaseObject.apply(this, arguments);

	// スプライトの開始位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Item, VectorBaseObject);

Item.prototype.init = function(type_id, x, y) {
	// アイテムの初期位置は敵の位置
	this.x = x;
	this.y = y;

	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, [
		[
			{
				count: 0,
				'vector': { 'r': 4, 'theta': 270, 'w': 0, 'ra':-0.1, 'wa': 0 },
				is_rotate: false,
			}
		]
	]);

	// 弾のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};

// 衝突した時
Item.prototype.notifyCollision = function(obj) {
	// 獲得したアイテムを消す
	this.stage.item_manager.remove(this.id);

	// グレイズSEの再生
	this.game.playSound('graze');

	// TODO: スコアアイテムとパワーアップアイテムで処理を分ける
	this.stage.score += 1000;
};

// 当たり判定サイズ
Item.prototype.collisionWidth  = function() { return 60; };
Item.prototype.collisionHeight = function() { return 60; };

// スプライトの開始位置
Item.prototype.spriteX = function() { return this.indexX; };
Item.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Item.prototype.spriteImage = function() { return 'item'; };

// スプライトのサイズ
Item.prototype.spriteWidth  = function() { return 16; };
Item.prototype.spriteHeight = function() { return 16; };




module.exports = Item;

},{"../util":39,"./vector_base":20}],19:[function(require,module,exports){
'use strict';

/* 自機弾オブジェクト */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// 自機弾の移動速度
var SPEED = 8;

// constructor
var Shot = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(Shot, BaseObject);

// 初期化
Shot.prototype.init = function(x, y) {
	BaseObject.prototype.init.apply(this, arguments);

	this.x = x;
	this.y = y;
};

// フレーム処理
Shot.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 弾を直進させる
	this.y -= SPEED;
};

// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.shot_manager.remove(this.id);
};

// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return 15;  };
Shot.prototype.collisionHeight = function() { return 15; };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return 0; };
Shot.prototype.spriteY = function() { return 2; };

// スプライト画像
Shot.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return 20; };
Shot.prototype.spriteHeight = function() { return 20; };

module.exports = Shot;

},{"../constant":2,"../util":39,"./base":13}],20:[function(require,module,exports){
'use strict';

/* ベクトルを使って動くオブジェクトの基底クラス */

var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var VectorBase = function(scene) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(VectorBase, BaseObject);

// 初期化
VectorBase.prototype.init = function(vectors) {
	BaseObject.prototype.init.apply(this, arguments);

	// 敵の動き(ベクトル)
	this.vectors = [];

	// どの動きを適用してるか
	this.vector_index = 0;

	var vec;
	for(var i = 0, len = vectors.length; i < len; i++) {
		vec = vectors[i];
		this.vectors.push({
			// どのフレームからこの動きを適用するか
			count: vec.count,

			// ベクトルの大きさ(速度)
			r: vec.vector.r,
			// ベクトルの角度(方向)
			theta: vec.vector.theta || 0,
			// 加速度
			w: vec.vector.w || 0,

			// 角度の加速度
			ra: vec.vector.ra || 0,
			// 加速度の加速度
			wa: vec.vector.wa || 0,

			// 角度の加速度の加速度
			raa: vec.vector.raa || 0,
			// 加速度の加速度の加速度
			waa: vec.vector.waa || 0,

			// 速度の最大値
			trange: vec.vector.trange || null,
			// 角度の最大値
			rrange: vec.vector.rrange || null,
			// 速度の加速度の最大値
			wrange: vec.vector.wrange || null,

			// 角度の加速度の最大値
			rarange: vec.vector.rarange || null,
			// 速度の加速度の加速度の最大値
			warange: vec.vector.warange || null,
			// 自機狙いかどうか
			aimed: vec.vector.aimed,
			// 回転させるかどうか
			is_rotate: vec.is_rotate,
		});
	}

	// 自機狙い設定のオブジェクトのベクトルを自機にむける
	this._calculateAimedVector();
};

// 自機狙いにする
VectorBase.prototype._calculateAimedVector = function() {
	for(var i = 0, len = this.vectors.length; i < len; i++) {
		// 自機狙い設定がされているか確認
		if( ! this.vectors[i].aimed){ continue; }

		// 自機
		var character = this.stage.character;

		var ax = character.x - this.x;
		var ay = character.y - this.y;

		this.vectors[i].theta = this._radian_to_theta(Math.atan2(ay, ax));
	}
};

// フレーム処理
VectorBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 次の動きに変更するか
	if(this.vectors[this.vector_index + 1] &&
	   this.vectors[this.vector_index + 1].count <= this.frame_count) {

		var pre_theta = this.vectors[this.vector_index].theta;

		// 次の動きに変更
		this.vector_index++;

		// 次の動きの角度が空なら前回の角度を引き継ぐ
		if(pre_theta && ! this.vectors[this.vector_index].theta) {
			this.vectors[this.vector_index].theta = pre_theta;
		}
	}

	// 敵を動かす
	this.x += this.calc_moveX();
	this.y += this.calc_moveY();

	var vec = this.vectors[this.vector_index];

	// 加速度を追加
	vec.theta += vec.w;
	vec.r     += vec.ra;
	vec.w     += vec.wa;
	vec.ra    += vec.raa;
	vec.wa    += vec.waa;

	// 最大値を超えないようにする
	vec.theta = this._beInRange( vec.theta, vec.trange);
	vec.r     = this._beInRange( vec.r,     vec.rrange);
	vec.w     = this._beInRange( vec.w,     vec.wrange);
	vec.ra    = this._beInRange( vec.ra,    vec.rarange);
	vec.wa    = this._beInRange( vec.wa,    vec.warange);

	// 回転
	if(vec.is_rotate) {
		this.rotate = this._theta_to_radian(vec.theta + 90);
	}
};

VectorBase.prototype._beInRange = function(value, range) {
	if(range === null) {
		return value;
	}

	if(range.max !== void 0 && value > range.max) {
		value = range.max;
	}

	if(range.min !== void 0 && value < range.min) {
		value = range.min;
	}
	return value;
};


// θ -> ラジアンに変換
VectorBase.prototype._theta_to_radian = function(theta){
	return (theta / 180 * Math.PI);
};

// ラジアン -> θ に変換
VectorBase.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};


// X軸の移動を計算
VectorBase.prototype.calc_moveX = function() {
	var vector = this.vectors[this.vector_index];

	var move_x = vector.r * Math.cos(this._theta_to_radian(vector.theta));
	return move_x;
};

// Y軸の移動を計算
VectorBase.prototype.calc_moveY = function() {
	var vector = this.vectors[this.vector_index];

	var move_y = vector.r * Math.sin(this._theta_to_radian(vector.theta));
	return move_y;
} ;

module.exports = VectorBase;

},{"../constant":2,"../util":39,"./base":13}],21:[function(require,module,exports){
'use strict';

/* シーンの基底クラス */

var BaseScene = function(game) {
	// ゲームインスタンス
	this.game = game;

	// 経過フレーム数
	this.frame_count = 0;
};

// 初期化
BaseScene.prototype.init = function(){
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
BaseScene.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;

};

// 画面更新
BaseScene.prototype.updateDisplay = function(){
	console.error("updateDisplay method must be overridden");
};

// シーンから離れる際
BaseScene.prototype.onunload = function(){
	// 再生中のBGMを停止
	this.game.stopBGM();
};



module.exports = BaseScene;

},{}],22:[function(require,module,exports){
'use strict';

/* ローディング画面 */
var Util = require('../util');
var Config = require('../config');
var BaseScene = require('./base');

var LoadingScene = function(game) {
	BaseScene.apply(this, arguments);

	// 読み込んだ画像の数
	this.loadedImageNum = 0;
	// 読み込んだSEの数
	this.loadedSoundNum = 0;
	// 読み込んだBGMの数
	this.loadedBGMNum = 0;

	// フォントの読み込みが完了したか
	this.fontLoadingDone = false;
};

// 基底クラスを継承
Util.inherit(LoadingScene, BaseScene);

// 初期化
LoadingScene.prototype.init = function() {
	// ゲームで使う画像の読み込み
	this._loadImages();
	// SE の読み込み
	this._loadSounds();
	// BGM の読み込み
	this._loadBGMs();
};

// 読み込んだ素材数
LoadingScene.prototype.loaded_material_num = function() {
	return this.loadedImageNum + this.loadedSoundNum + this.loadedBGMNum;
};
// フォントの読み込み完了
LoadingScene.prototype.notifyFontLoadingDone = function () {
	this.fontLoadingDone = true;
};
// フレーム処理
LoadingScene.prototype.run = function(){
	// 素材を全て読み込んだら
	if(this.loaded_material_num() >= Config.ALL_MATERIAL_NUM && this.fontLoadingDone) {
		// 読み込み終わったことをゲームに通知
		this.game.notifyLoadingDone();
	}
};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var material_num = Config.ALL_MATERIAL_NUM;
	var loaded_material_num = this.loaded_material_num();

	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.textAlign = 'right';
	ctx.font = "30px 'Migu'" ;
	ctx.fillText('Now Loading...', 400, 225);
	ctx.fillText( loaded_material_num + '/' + material_num, 400, 285);
	ctx.restore();
};

LoadingScene.prototype._loadImages = function() {
	var self = this;

	// 画像が読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedImageNum++;
	};

	var image;
	for(var key in Config.IMAGES) {
		image = new Image();
		image.src = Config.IMAGES[key] ;
		image.onload = onload_function;
		this.game.images[key] = image;
	}

};

LoadingScene.prototype._loadSounds = function() {
	var self = this;

	// SEが読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedBGMNum++;
	};

	var conf, audio;
	for(var key in Config.SOUNDS) {
		conf = Config.SOUNDS[key];
		audio = new Audio(conf.path);
		audio.volume = conf.volume;
		audio.addEventListener('canplay', onload_function);
		audio.load();
		this.game.sounds[key] = audio;
	}

};

LoadingScene.prototype._loadBGMs = function() {
	var self = this;

	for(var key in Config.BGMS) {
		/*jshint loopfunc: true */
		(function(key) {
			var conf = Config.BGMS[key];

			self._loadBGM(conf.path, function(audioBuffer) {
				// BGMが読み込まれたら読み込んだ数を+1
				self.loadedBGMNum++;
				self.game.bgms[key] = audioBuffer;
			});
		})(key);
	}
};


LoadingScene.prototype._loadBGM = function(url, successCallback) {
	var self = this;
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if(xhr.status !== 200) {
			return;
		}

		var arrayBuffer = xhr.response;
		self.game.audio_context.decodeAudioData(arrayBuffer, successCallback, function(error) {
			if (error instanceof Error) {
				window.alert(error.message);
			} else {
				window.alert('Error : "decodeAudioData" method.');
			}
		});
	};

	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.send(null);
};
module.exports = LoadingScene;

},{"../config":1,"../util":39,"./base":21}],23:[function(require,module,exports){
'use strict';

/* プロローグ画面1 */
var MESSAGE = require('../serif/prologue1');

// メッセージを表示している期間
var SHOW_MESSAGE_COUNT = 900;

// メッセージテキストのx, y
var MESSAGE_X = 115;
var MESSAGE_Y = 150;

// フォントサイズ(px)
var FONT_SIZE = 27;
// 行間
var FONT_MARGIN = 12;





// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');


var Scene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// 表示期間終了 or Z押下
	if(SHOW_MESSAGE_COUNT < this.frame_count ||
	   this.game.isKeyPush(Constant.BUTTON_Z)) {
		this.game.notifyPrologue1Done();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;

	// 背景画像表示
	this._showBG();
	// メッセージ表示
	this._showMessage();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;
	var prologue1_bg = this.game.getImage('prologue1_bg');

	ctx.drawImage(prologue1_bg,
					0,
					0,
					prologue1_bg.width,
					prologue1_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
};
// 切り替え効果
Scene.prototype._setTransition = function(){
	var ctx = this.game.surface;

	var alpha = 1.0;
	// 切り替え効果
	if( this.frame_count < (SHOW_MESSAGE_COUNT / 3)) {
		// 最初の1/3はフェードイン
		alpha = (this.frame_count * 3) / SHOW_MESSAGE_COUNT;
	}
	else if(SHOW_MESSAGE_COUNT / 3 < this.frame_count && this.frame_count < SHOW_MESSAGE_COUNT * 2 / 3) {
		// 真ん中の1/3は表示
		alpha = 1.0;
	}
	else if(SHOW_MESSAGE_COUNT * 2 / 3 < this.frame_count) {
		// 最後の1/3はフェードアウト
		alpha = (SHOW_MESSAGE_COUNT - this.frame_count) * 3 / SHOW_MESSAGE_COUNT;
	}

	ctx.globalAlpha = alpha;
};
// メッセージ表示
Scene.prototype._showMessage = function(){
	var ctx = this.game.surface;
	ctx.save();

	// 切り替え効果
	this._setTransition();

	// メッセージ表示期間なら
	if(SHOW_MESSAGE_COUNT > this.frame_count) {
		ctx.font = FONT_SIZE + "px 'Migu'" ;
		ctx.textBaseAlign = 'middle';
		ctx.fillStyle = 'rgb( 255, 255, 255 )' ;

		// セリフ表示
		// TODO: DEBUG
		var lines = Config.DEBUG ? document.getElementById("prologue1").value.split("\n") : MESSAGE.split("\n");
		if (lines.length) {
			// セリフテキストの y 座標初期位置
			var y = MESSAGE_Y;

			for(var i = 0, len = lines.length; i < len; i++) {
				ctx.fillText(lines[i], MESSAGE_X, y); // 1行表示

				y+= FONT_SIZE + FONT_MARGIN;
			}
		}
	}

	ctx.restore();
};




module.exports = Scene;

},{"../config":1,"../constant":2,"../serif/prologue1":32,"../util":39,"./base":21}],24:[function(require,module,exports){
'use strict';

/* プロローグ画面2 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var serif = require('../serif/prologue2');

var Serif = require('../logic/serif');

var Scene = function(game) {
	BaseScene.apply(this, arguments);

	this.serif = new Serif(serif);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);
	// TODO: DEBUG
	if(Config.DEBUG) { 
		this.serif.script = JSON.parse(document.getElementById("prologue2").value);
	}
	this.serif.init();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// BGM 再生
	if(this.frame_count === 60) {
		this.game.playBGM('prologue');
	}


	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologue2Done();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;

	// 背景画像表示
	this._showBG();

	if(this.serif.right_image()) {
		// キャラ表示
		this._showRightChara();
	}
	if (this.serif.right_name()) {
		// 名前表示
		this._showName(this.serif.right_name(), Config.PROLOGUE2_RIGHT_NAME_WINDOW_X, Config.PROLOGUE2_RIGHT_NAME_WINDOW_Y);
	}

	if(this.serif.left_image()) {
		// キャラ表示
		this._showLeftChara();
	}
	if (this.serif.left_name()) {
		// 名前表示
		this._showName(this.serif.left_name(), Config.PROLOGUE2_LEFT_NAME_WINDOW_X, Config.PROLOGUE2_LEFT_NAME_WINDOW_Y);
	}

	// セリフウィンドウ表示
	if(this.serif.serif_window()) {
		this._showMessageWindow();
	}

	// セリフ表示
	this._showMessage();
};

// 背景画像表示
Scene.prototype._showBG = function(){
	var ctx = this.game.surface;
	var prologue2_bg = this.game.getImage('prologue2_bg');
	ctx.save();
	ctx.drawImage(prologue2_bg,
					0,
					0,
					prologue2_bg.width,
					prologue2_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
	ctx.restore();
};
// 右のキャラを表示
Scene.prototype._showRightChara = function(){
	var ctx = this.game.surface;
	ctx.save();

	var x = Config.PROLOGUE2_RIGHT_X;
	var y = Config.PROLOGUE2_RIGHT_Y;

	if(!this.serif.is_right_talking()) {
		// 喋ってない方のキャラは薄くなる
		ctx.globalAlpha = 0.5;
	}
	else {
		// 喋ってる方のキャラは真ん中に寄る
		x -= Config.TALKER_MOVE_PX;
		y -= Config.TALKER_MOVE_PX;
	}


	var right_image = this.game.getImage(this.serif.right_image());

	ctx.drawImage(right_image,
					x,
					y,
					right_image.width * Config.CHARA_SIZE_RATIO,
					right_image.height * Config.CHARA_SIZE_RATIO);

	ctx.restore();
};

// 左のキャラを表示
Scene.prototype._showLeftChara = function () {
	var ctx = this.game.surface;
	ctx.save();

	var x = Config.PROLOGUE2_LEFT_X;
	var y = Config.PROLOGUE2_LEFT_Y;

	// 喋ってない方のキャラは薄くなる
	if(!this.serif.is_left_talking()) {
		ctx.globalAlpha = 0.5;
	}
	else {
		// 喋ってる方のキャラは真ん中に寄る
		x -= -Config.TALKER_MOVE_PX; // 左右反転
		y -= Config.TALKER_MOVE_PX;
	}

	var left_image = this.game.getImage(this.serif.left_image());
	ctx.transform(-1, 0, 0, 1, left_image.width * Config.CHARA_SIZE_RATIO, 0); // 左右反転
	ctx.drawImage(left_image,
					-x, // 左右反転
					y,
					left_image.width * Config.CHARA_SIZE_RATIO,
					left_image.height * Config.CHARA_SIZE_RATIO);

	ctx.restore();
};

// 名前表示
Scene.prototype._showName = function(name, x, y){
	var ctx = this.game.surface;
	ctx.save();

	var name_image = this.game.getImage(name);
	ctx.drawImage(name_image,
					x,
					y,
					name_image.width * Config.CHARA_SIZE_RATIO,
					name_image.height * Config.CHARA_SIZE_RATIO);
	ctx.restore();
};

// セリフウィンドウ表示
Scene.prototype._showMessageWindow = function(){
		var ctx = this.game.surface;
		ctx.save();

		var x = Config.PROLOGUE2_SERIF_WINDOW_X;
		var y = Config.PROLOGUE2_SERIF_WINDOW_Y;

		var fukidashi = this.game.getImage(this.serif.serif_window());
		if(this.serif.is_right_talking()) {
			x = -x; // 反転
			ctx.transform(-1, 0, 0, 1, fukidashi.width * Config.CHARA_SIZE_RATIO, 0); // 左右反転
		}
		ctx.drawImage(fukidashi,
						x,
						y,
						fukidashi.width * Config.CHARA_SIZE_RATIO,
						fukidashi.height * Config.CHARA_SIZE_RATIO
		);
		ctx.restore();
};

// セリフ表示
Scene.prototype._showMessage = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	ctx.textBaseAlign = 'middle';
	ctx.fillStyle = 'rgb( 0, 0, 0 )';

	var x, y;
	// セリフ表示
	var lines = this.serif.lines();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		y = 80;

		for(var i = 0, len = lines.length; i < len; i++) {
			ctx.fillText(lines[i], 200, y); // 1行表示

			y+= 30;
		}
	}

	ctx.restore();
};









module.exports = Scene;

},{"../config":1,"../constant":2,"../logic/serif":10,"../serif/prologue2":33,"../util":39,"./base":21}],25:[function(require,module,exports){
'use strict';

/* タイトル画面 */

var Constant = require('../constant');

var DEBUG_STATE;
//DEBUG_STATE = Constant.BOSS_STATE;


// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 3;

// 道中の終了
var WAY_END = 3500;

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Config = require('../config');

// ステージの状態
var WayState = require('./stage/state/way');
var TalkState = require('./stage/state/talk');
var BossState = require('./stage/state/boss');
var ResultState = require('./stage/state/result');
var GameoverState = require('./stage/state/result');

// オブジェクト
var Character = require('../object/character');
var Shot = require('../object/shot');
var Enemy = require('../object/enemy');
var Boss = require('../object/aya');
var Bullet = require('../object/bullet');
var Effect = require('../object/effect');
var Item = require('../object/item');

// セリフ
var serif_before = require('../serif/stage1_before');
var serif_after = require('../serif/stage1_after');

var Manager = require('../logic/manager');


var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// ステージの現在の状態
	this.state = null;
	this.score = 0;

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.WAY_STATE ]      = new WayState(this);
	this.states[ Constant.TALK1_STATE ]    = new TalkState(this, serif_before, Constant.BOSS_STATE);
	this.states[ Constant.BOSS_STATE ]     = new BossState(this);
	this.states[ Constant.TALK2_STATE ]    = new TalkState(this, serif_after, Constant.RESULT_STATE);
	this.states[ Constant.RESULT_STATE ]   = new ResultState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.shot_manager   = new Manager(Shot, this);
	this.character      = new Character(this);
	this.enemy_manager  = new Manager(Enemy, this);
	this.effect_manager = new Manager(Effect, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.shot_manager,
		this.character,
		this.enemy_manager,
		this.effect_manager,
	];

	// state の方で動かす
	this.boss = new Boss(this);
	this.bullet_manager = new Manager(Bullet, this);
	this.item_manager = new Manager(Item, this);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.state = null;
	this.score = 0;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}

	// TODO: DEBUG
	// 道中開始
	this.changeState(Constant.DEBUG && DEBUG_STATE ? DEBUG_STATE : Constant.WAY_STATE);
};

// 現在のシーン
Scene.prototype.currentState = function(){
	return this.states[this.state];
};

// シーンを切り替え
Scene.prototype.changeState = function(state){
	// 切り替え
	this.state = state;
	// 切り替え後の状態を初期化
	this.currentState().init();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].run();
	}

	this.currentState().run();

	// TODO: END フラグをstateに持たせよう

	// 道中の終了
	if(this.state === Constant.WAY_STATE && this.frame_count === WAY_END) {
		// ボスとの会話シーンへ
		this.changeState(Constant.TALK1_STATE);
	}
	// ボス戦の終了
	else if(this.state === Constant.BOSS_STATE && this.boss.isDead() && !this.boss.hasNextSpell()) {
		//ボスのスペルカードが全て無くなった
		this.changeState(Constant.TALK2_STATE);
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}

	this.currentState().updateDisplay();

	// サイドバー表示
	this._showSidebar();
};

// サイドバー表示
Scene.prototype._showSidebar = function(){
	var ctx = this.game.surface;
	var x = this.game.width - SIDE_WIDTH;
	var y = 0;

	ctx.save();
	var side_bar = this.game.getImage('side_bar');
	this.game.surface.drawImage(side_bar,
		0,
		0,
		side_bar.width,
		side_bar.height,
		x,
		y,
		SIDE_WIDTH,
		this.game.height
	);
	ctx.restore();
	this._showText();
};

Scene.prototype._showText = function(){
	var size1 = 18;
	var size2 = 21;

	var x1 = this.game.width - SIDE_WIDTH + 10;
	var x2 = this.game.width - SIDE_WIDTH + 35;

	// 残ライフ
	var life_star_string;
	switch(this.character.life) {
		case 1:
			life_star_string = "★";
			break;
		case 2:
			life_star_string = "★★";
			break;
		case 3:
			life_star_string = "★★★";
			break;
		case 4:
			life_star_string = "★★★★";
			break;
		case 5:
			life_star_string = "★★★★★";
			break;


		default:
			life_star_string = "";
			break;
	}

	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 6, 40, 255 )';
	ctx.textAlign = 'left';
	ctx.font = size1 + "px 'Migu'" ;
	//ctx.fillText("HiScore",   x1, 25);
	ctx.fillText("Score",     x1, 70);
	ctx.fillText("Player",    x1, 130);
	//ctx.fillText("Spell",     x1, 175);
	if(Config.DEBUG) {
		ctx.fillText("Frame",     x1, 235);
	}
	ctx.font = size2 + "px 'Migu'" ;
	// TODO:
	//ctx.fillText("123456789", x2, 50);  // HiScore
	ctx.fillText(this.score, x2, 95);  // Score
	ctx.fillText(life_star_string,     x2, 155); // Player
	//ctx.fillText("★★★★★",     x2, 200); // Spell
	if(Config.DEBUG) {
		ctx.fillText(this.frame_count,     x2, 260); // Frame
	}
	ctx.restore();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;
	var x = 0;
	// 背景画像をスクロールさせる
	var y = (this.frame_count * BACKGROUND_SCROLL_SPEED) % this.game.height;

	ctx.save();

	// 2枚つなげてスクロールさせる
	var stage1_bg = this.game.getImage('stage1_bg');
	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y,
		this.game.width - SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.drawImage(stage1_bg,
		0,
		0,
		stage1_bg.width,
		stage1_bg.height,
		x,
		y - this.game.height,
		this.game.width - SIDE_WIDTH,
		this.game.height
	);

	this.game.surface.restore();
};

// 自機が死亡
Scene.prototype.notifyCharacterDead = function() {
	this.changeState(Constant.RESULT_STATE);
};

module.exports = Scene;

},{"../config":1,"../constant":2,"../logic/manager":9,"../object/aya":12,"../object/bullet":14,"../object/character":15,"../object/effect":16,"../object/enemy":17,"../object/item":18,"../object/shot":19,"../serif/stage1_after":34,"../serif/stage1_before":35,"../util":39,"./base":21,"./stage/state/boss":27,"./stage/state/result":28,"./stage/state/talk":29,"./stage/state/way":30}],26:[function(require,module,exports){
'use strict';

/* ステージ状態の基底クラス */

var BaseState = function(stage) {
	this.stage = stage;
	this.game = stage.game;

	// 経過フレーム数
	this.frame_count = 0;
};

// 初期化
BaseState.prototype.init = function(){
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
BaseState.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;

};

// 画面更新
BaseState.prototype.updateDisplay = function(){
	console.error("updateDisplay method must be overridden");
};

module.exports = BaseState;

},{}],27:[function(require,module,exports){
'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

// スペルカード残り時間のスペース
var VITAL_OUTLINE_MARGIN = 5;

var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.stage.boss.init();
	this.stage.bullet_manager.init();

	// 道中曲を止める
	this.game.stopBGM();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 1) {
		this.game.playBGM('stage1');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Z押しっぱで低速移動
	var is_slow = this.game.isKeyDown(Constant.BUTTON_Z);

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp(is_slow);
	}

	// 画面外に出させない
	character.forbidOutOfStage();

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		character.animateLeft();
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		character.animateRight();
	}
	else {
		// 左右には未移動
		character.animateNeutral();
	}

	// 敵弾と自機の衝突判定
	this.stage.bullet_manager.checkCollisionWithObject(character);

	// ボスと自機の衝突判定
	character.checkCollisionWithObject(this.stage.boss);

	// ボスと自機弾の衝突判定
	this.stage.shot_manager.checkCollisionWithObject(this.stage.boss);

	this.stage.boss.run();
	this.stage.bullet_manager.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.boss.updateDisplay();
	this.stage.bullet_manager.updateDisplay();

	// スペルカード残り時間
	this._showVital();

};
// スペルカード残り時間
State.prototype._showVital = function(){
	var ctx = this.game.surface;
	ctx.save();

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.fillRect(
		VITAL_OUTLINE_MARGIN,
		VITAL_OUTLINE_MARGIN,
		this.stage.boss.vital / this.stage.boss.max_vital * (this.stage.width - VITAL_OUTLINE_MARGIN * 2),
		VITAL_OUTLINE_MARGIN
	);

	ctx.restore();
};



module.exports = State;

},{"../../../config":1,"../../../constant":2,"../../../util":39,"./base":26}],28:[function(require,module,exports){
'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

// メッセージを表示する間隔
var SHOW_MESSAGE_INTERVAL = 50;

// メッセージの黒帯の表示
var RESULT_TRANSITION_COUNT = 100;


var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyStageDone();
	}

};

// 画面更新
State.prototype.updateDisplay = function(){
	this._showScoreWindow();
};
// スコア結果画面表示
State.prototype._showScoreWindow = function(){
	var ctx = this.game.surface;

	ctx.save();

	var alpha = 1.0 ;
	if(this.frame_count < RESULT_TRANSITION_COUNT) {
		alpha = this.frame_count / RESULT_TRANSITION_COUNT;
	}
	else {
		alpha = 1.0;
	}

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	ctx.fillRect(0, 170, this.stage.width, 100);

	ctx.globalAlpha = alpha; // 文字を表示するので戻す
	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Result', 100, 210);
	ctx.textAlign = 'right' ;
	ctx.fillText('Score: ' + this.stage.score, 380, 210);
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect(100, 225, 280, 1);

	// N秒ごとにメッセージを点滅
	if (Math.floor(this.frame_count / SHOW_MESSAGE_INTERVAL) % 2 === 0) {
		ctx.fillText('Press Z to Quit', 300, 250);
	}

	ctx.restore();
};


module.exports = State;

},{"../../../config":1,"../../../constant":2,"../../../util":39,"./base":26}],29:[function(require,module,exports){
'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');


var Serif = require('../../../logic/serif');

var State = function(stage, serif, next_state) {
	BaseState.apply(this, arguments);
	this.serif = new Serif(serif);

	this.next_state = next_state; // セリフパート終了後のstate
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	// TODO: DEBUG
	if(Config.DEBUG) { 
		//this.serif.script = JSON.parse(document.getElementById("stage1_before").value);
	}

	this.serif.init();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);
	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.stage.changeState(this.next_state);
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	if(this.serif.right_image()) {
		// キャラ表示
		this._showRightChara();
	}
	if (this.serif.right_name()) {
		// 名前表示
		this._showName(this.serif.right_name(), Config.TALKING_RIGHT_NAME_WINDOW_X, Config.TALKING_RIGHT_NAME_WINDOW_Y);
	}

	if(this.serif.left_image()) {
		// キャラ表示
		this._showLeftChara();
	}
	if (this.serif.left_name()) {
		// 名前表示
		this._showName(this.serif.left_name(), Config.TALKING_LEFT_NAME_WINDOW_X, Config.TALKING_LEFT_NAME_WINDOW_Y);
	}

	// セリフウィンドウ表示
	if(this.serif.serif_window()) {
		this._showMessageWindow();
	}

	// セリフ表示
	this._showMessage();
};

// 右のキャラを表示
State.prototype._showRightChara = function(){
	var ctx = this.game.surface;
	ctx.save();

	var x = Config.TALKING_RIGHT_X;
	var y = Config.TALKING_RIGHT_Y;

	if(!this.serif.is_right_talking()) {
		// 喋ってない方のキャラは薄くなる
		ctx.globalAlpha = 0.5;
	}
	else {
		// 喋ってる方のキャラは真ん中に寄る
		x -= Config.TALKER_MOVE_PX;
		y -= Config.TALKER_MOVE_PX;
	}


	var right_image = this.game.getImage(this.serif.right_image());

	ctx.drawImage(right_image,
					x,
					y,
					right_image.width * Config.CHARA_SIZE_RATIO,
					right_image.height * Config.CHARA_SIZE_RATIO);

	ctx.restore();
};

// 左のキャラを表示
State.prototype._showLeftChara = function () {
	var ctx = this.game.surface;
	ctx.save();

	var x = Config.TALKING_LEFT_X;
	var y = Config.TALKING_LEFT_Y;

	// 喋ってない方のキャラは薄くなる
	if(!this.serif.is_left_talking()) {
		ctx.globalAlpha = 0.5;
	}
	else {
		// 喋ってる方のキャラは真ん中に寄る
		x -= -Config.TALKER_MOVE_PX; // 左右反転
		y -= Config.TALKER_MOVE_PX;
	}

	var left_image = this.game.getImage(this.serif.left_image());
	ctx.transform(-1, 0, 0, 1, left_image.width * Config.CHARA_SIZE_RATIO, 0); // 左右反転
	ctx.drawImage(left_image,
					-x, // 左右反転
					y,
					left_image.width * Config.CHARA_SIZE_RATIO,
					left_image.height * Config.CHARA_SIZE_RATIO);

	ctx.restore();
};

// 名前表示
State.prototype._showName = function(name, x, y){
	var ctx = this.game.surface;
	ctx.save();

	var name_image = this.game.getImage(name);
	ctx.drawImage(name_image,
					x,
					y,
					name_image.width * Config.CHARA_SIZE_RATIO,
					name_image.height * Config.CHARA_SIZE_RATIO);
	ctx.restore();
};

// セリフウィンドウ表示
State.prototype._showMessageWindow = function(){
		var ctx = this.game.surface;
		ctx.save();

		var x = Config.TALKING_SERIF_WINDOW_X;
		var y = Config.TALKING_SERIF_WINDOW_Y;

		var fukidashi = this.game.getImage(this.serif.serif_window());
		if(this.serif.is_right_talking()) {
			x = -x; // 反転
			ctx.transform(-1, 0, 0, 1, fukidashi.width * Config.CHARA_SIZE_RATIO, 0); // 左右反転
		}
		ctx.drawImage(fukidashi,
						x,
						y,
						fukidashi.width * Config.CHARA_SIZE_RATIO,
						fukidashi.height * Config.CHARA_SIZE_RATIO
		);
		ctx.restore();
};

// セリフ表示
State.prototype._showMessage = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	ctx.textBaseAlign = 'middle';
	ctx.fillStyle = 'rgb( 0, 0, 0 )';

	var x, y;
	// セリフ表示
	var lines = this.serif.lines();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		y = 80;

		for(var i = 0, len = lines.length; i < len; i++) {
			ctx.fillText(lines[i], 120, y); // 1行表示

			y+= 30;
		}
	}

	ctx.restore();
};








module.exports = State;

},{"../../../config":1,"../../../constant":2,"../../../logic/serif":10,"../../../util":39,"./base":26}],30:[function(require,module,exports){
'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

var EnemyAppear = require('../../../logic/enemy_appear');
var stage1_appear = require('../../../enemy/stage1');

var State = function(stage) {
	BaseState.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(stage1_appear);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);
	this.stage.bullet_manager.init();
	this.stage.item_manager.init();
	this.enemy_appear.init();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM('douchu');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Z押しっぱで低速移動
	var is_slow = this.game.isKeyDown(Constant.BUTTON_Z);

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp(is_slow);
	}

	// 画面外に出させない
	character.forbidOutOfStage();

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		character.animateLeft();
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		character.animateRight();
	}
	else {
		// 左右には未移動
		character.animateNeutral();
	}

	// アイテムと自機の衝突判定
	this.stage.item_manager.checkCollisionWithObject(character);
	// 敵と自機の衝突判定
	this.stage.enemy_manager.checkCollisionWithObject(character);
	// 敵弾と自機の衝突判定
	this.stage.bullet_manager.checkCollisionWithObject(character);
	// 敵と自機弾の衝突判定
	this.stage.enemy_manager.checkCollisionWithManager(this.stage.shot_manager);


	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);

	for(var i = 0, len = params.length; i< len; i++) {
		this.stage.enemy_manager.create(params[i]);
	}

	this.stage.bullet_manager.run();
	this.stage.item_manager.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.bullet_manager.updateDisplay();
	this.stage.item_manager.updateDisplay();
};

module.exports = State;

},{"../../../config":1,"../../../constant":2,"../../../enemy/stage1":5,"../../../logic/enemy_appear":7,"../../../util":39,"./base":26}],31:[function(require,module,exports){
'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');


// 画面切り替え効果時間
var SHOW_TRANSITION_COUNT = 100;

// スタートメッセージを表示する間隔
var SHOW_START_MESSAGE_INTERVAL = 50;


var OpeningScene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(OpeningScene, BaseScene);

// 初期化
OpeningScene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.frame_count === 60) {
		this.game.playBGM('title');
	}

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
			this.game.playSound('select');
			this.game.notifyTitleDone();
	}
};

// 画面更新
OpeningScene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;

	ctx.save();

	// 切り替え効果
	if( this.frame_count < SHOW_TRANSITION_COUNT ) {
		ctx.globalAlpha = this.frame_count / SHOW_TRANSITION_COUNT;
	}
	else {
		ctx.globalAlpha = 1.0;
	}

	var title_bg = this.game.getImage('title_bg');
	var press_z = this.game.getImage('press_z');

	// 背景画像表示
	ctx.drawImage(title_bg,
					0,
					0,
					title_bg.width,
					title_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	// N秒ごとに start メッセージを点滅
	if (Math.floor(this.frame_count / SHOW_START_MESSAGE_INTERVAL) % 2 === 0) {
		ctx.drawImage(press_z,
			248, //x座標
			247, //y座標
			press_z.width * Config.CHARA_SIZE_RATIO,
			press_z.height * Config.CHARA_SIZE_RATIO
		);
	}

	ctx.restore();

};

module.exports = OpeningScene;

},{"../config":1,"../constant":2,"../util":39,"./base":21}],32:[function(require,module,exports){
'use strict';

var Serif = [
	"私は博麗神社を目指していた。",
	"「約束を守りなさい」",
	"耳の奥で彼女の言葉が蘇る。",
	"落ち着いた、私と瓜二つの声…。",
	"彼女との出会いは、",
	"ほんの15分ほど前のことだった。"
].join("\n");

module.exports = Serif;

},{}],33:[function(require,module,exports){
'use strict';

// セリフ
var Serif = [{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":null},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"早朝の散歩も良いものね。"},{"pos":"right","exp":null,"chara":null,"fukidashi":"normal","serif":"…約束を守りなさい。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"ん…誰？\n誰かいるの？"},{"pos":"right","exp":"normal","chara":"hatena","fukidashi":null,"serif":"　"},{"pos":"right","exp":"owata","chara":"hatena","fukidashi":"orange","serif":"わたしです"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"なんだ私か。"},{"pos":"right","exp":"normal","chara":"hatena","fukidashi":"normal","serif":"え…。\nちょっとは驚きなさいよ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"驚いたわよ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"で、貴方誰なの？\n見たところ、私に\nそっくりだけど。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"orange","serif":"…ひょっとして、\nドッペルゲンガーってやつ？"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"そのようなものね。\nそんなことより、\n貴方に大事な話があるの。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"なにかしら。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"約束を守りなさい。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"約束？\n何か約束してたっけ。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"ほら、博麗神社に…。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"あぁ、そういえば前に\nメリーと約束してたわ。"},{"pos":"right","exp":null,"chara":null,"fukidashi":null,"serif":null},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"博麗神社の入り口を\n調べようって。\nそのことかしら？"},{"pos":"right","exp":"normal","chara":"merry","fukidashi":"orange","serif":"蓮子？\nこんなところで何してるの？"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"あ、噂をすれば。\nメリー、見て！\n私のドッペルゲンガーが…"},{"pos":"right","exp":"normal","chara":null,"fukidashi":"normal","serif":null},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あれ？いない…。"},{"pos":"right","exp":"normal","chara":"merry","fukidashi":"normal","serif":"どうしたの？"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"それが、\nかくかくしかじかで。"},{"pos":"right","exp":"normal","chara":"merry","fukidashi":"normal","serif":"ふーん。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"覚えてる？前に博霊神社の\n入り口を調べようって\n約束してたこと。"},{"pos":"right","exp":"normal","chara":"merry","fukidashi":"normal","serif":"そうだっけ？"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"ねえ、今から行ってみない？"},{"pos":"right","exp":"trouble","chara":"merry","fukidashi":"normal","serif":"今から？面倒だわ…。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"なんだか気になるのよ。"},{"pos":"right","exp":"disappointed","chara":"merry","fukidashi":"normal","serif":"うっ…急にめまいと頭痛が。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"絶対嘘でしょ、それ。"},{"pos":"right","exp":"disappointed","chara":"merry","fukidashi":"normal","serif":"全身の骨が折れてるかも。"},{"pos":"left","exp":"surprised","chara":"renko","fukidashi":"purple","serif":"さっきまで\n元気だったじゃない！"},{"pos":"right","exp":"trouble","chara":"merry","fukidashi":"normal","serif":"うーん、気が進まないわ。"},{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"はぁ…。そんなに嫌なら\n仕方ないわね。\n私一人で行ってくるわ。"}];
module.exports = Serif;

},{}],34:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":null},{"pos":"right","exp":"dissatisfied","chara":"aya","fukidashi":"normal","serif":"なんだ、ただの迷子ですか。\n記事にもなりませんね。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"博麗神社に行きたいの。"},{"pos":"right","exp":"normal","chara":"aya","fukidashi":"normal","serif":"神社？"},{"pos":"right","exp":"smile","chara":"aya","fukidashi":"orange","serif":"この道をダーって行って\nキュって曲がってギャーン\nって行けばすぐですよ。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"この道をダーって行って\nキュって曲がってギャーン\nね。ありがとう！"}];

module.exports = Serif;

},{}],35:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"見覚えのない場所に\n来てしまったわ。\n道に迷ったようね。"},{"pos":"right","exp":"smile","chara":"aya","fukidashi":"orange","serif":"あやややや。\n挙動の不審な人間を\n発見しました！"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"あぁ、ちょうど良かったわ。\n博麗神社へはどう行けば…"},{"pos":"right","exp":"smile","chara":"aya","fukidashi":"orange","serif":"早速、取材してみようと\n思います！"},{"pos":"left","exp":"trouble","chara":"renko","fukidashi":"normal","serif":"もしもーし？"}];

module.exports = Serif;

},{}],36:[function(require,module,exports){
'use strict';

/* スペルカードの基底クラス */
var Config = require("../../config");
var Constant = require("../../constant");

// カットインの左から右への移動スピード(前)
var CUTIN_FAST_SPEED = 33;
// カットインの左から右への移動スピード(後)
var CUTIN_SLOW_SPEED = 1;
// カットイン画像のY座標
var CUTIN_Y = 332;

// カットインまでの待ち
var CUTIN_SLIDEING_WAIT_COUNT = 30;
// カットインの左から右へスライドする時間
var CUTIN_SLIDEING_COUNT = 10;
// カットインの消失まで待つ時間
var CUTIN_DISAPPEAR_WAIT_COUNT = 45;
// カットイン消失時間
var CUTIN_DISAPPEAR_COUNT = 5;

var SpellBase = function(boss) {
	this.frame_count = 0;

	// Boss インスタンス
	this.boss = boss;
	// StageScene インスタンス
	this.stage = boss.stage;
	// Game インスタンス
	this.game = boss.stage.game;

	this.x = 0;
	this.y = 0;

	this.state = null;
};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;

	// スペルカードエフェクトの x, y
	this.x = 0;
	this.y = CUTIN_Y;

	// スペルカード発動開始
	this.changeState(Constant.SPELLCARD_START_STATE);
};

// スペルカード発動中
SpellBase.prototype.isSpellExecute = function(){
	return this.state === Constant.SPELLCARD_EXEC_STATE ? true : false;
};
// スペルカード開始中
SpellBase.prototype.isSpellStarting = function(){
	return this.state === Constant.SPELLCARD_START_STATE ? true : false;
};
// 状態変更
SpellBase.prototype.changeState = function(state){
	this.state = state;
};

// フレーム処理
SpellBase.prototype.run = function(){
	this.frame_count++;

	// スペルカード発動開始中のみエフェクト座標の更新
	if(!this.isSpellStarting()) return;

	// カットイン発動待ち
	if(this.frame_count < CUTIN_SLIDEING_WAIT_COUNT) {

	}
	else if(this.frame_count === CUTIN_SLIDEING_WAIT_COUNT) {
		// スペルカード発動音
		this.game.playSound("spellcard");
	}
	// 左から右へカットイン移動
	else if(CUTIN_SLIDEING_WAIT_COUNT < this.frame_count && this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT) {
		this.x += CUTIN_FAST_SPEED;
	}
	// 待機中はゆったりと移動
	else if(CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT < this.frame_count &&
			this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT) {
		this.x += CUTIN_SLOW_SPEED;
	}
	// カットインを縮尺
	else if(CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT < this.frame_count &&
			this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT + CUTIN_SLIDEING_COUNT + CUTIN_DISAPPEAR_WAIT_COUNT + CUTIN_DISAPPEAR_COUNT) {
		this.x += CUTIN_FAST_SPEED;
	}
	// カットイン終わり
	else {
		this.changeState(Constant.SPELLCARD_EXEC_STATE);
	}
};

// 描画
SpellBase.prototype.updateDisplay = function(){
	// スペルカード発動開始中のみ描画
	if(!this.isSpellStarting()) return;

	// カットイン発動待ち
	if(this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT) return;

	var ctx = this.game.surface;
	var image = this.game.getImage("aya_normal");

	ctx.save();

	// 画像サイズ
	var image_width  = image.width * Config.CHARA_SIZE_RATIO;
	var image_height = image.height * Config.CHARA_SIZE_RATIO;

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	// 少し透過
	ctx.globalAlpha = 0.7;
	ctx.drawImage(image,
		0,
		0,
		image.width,
		image.height,
		-image_width/2, // 座標を中央合わせ
		-image_height/2, // 座標を中央合わせ
		image_width,
		image_height
	);
	ctx.restore();
};





// スペルカード名
SpellBase.prototype.name = function() {
	console.log("Spell's name method must be implemented");
};

// 撃つ
SpellBase.prototype.shot = function(x, y, r, theta, sprite_x, sprite_y) {
	this.stage.bullet_manager.create(x, y, r, theta, sprite_x, sprite_y);
};

module.exports = SpellBase;

},{"../../config":1,"../../constant":2}],37:[function(require,module,exports){
'use strict';

/* スペルカード */
// TODO: スプライト名もっといい感じに指定できないかな・・・
var BaseSpell = require('./base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
	this.shot_thetas1 = [0, 60, 120, 180, 240, 300];
	this.shot_thetas2 = [0, 60, 120, 180, 240, 300];
	this.maru_shot_theta = 0;

	// config
	this.add_shot_theta = 10;
	this.r = 1.5;
	this.uzumaki_percount = 15;
	this.maru_percount    = 75;
	this.maru_shot_pertheta = 12;

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// まずは中央に移動
	this.is_moving = true;
};

Spell.prototype.run = function() {
	BaseSpell.prototype.run.apply(this, arguments);

	// スペルカード発動演出中
	if(this.isSpellStarting()) return;

	if(this.is_moving) {
		// 移動中
		var ax = this.stage.width/2  - this.boss.x;
		var ay = this.stage.height/2 - this.boss.y;

		var my_theta = this._radian_to_theta(Math.atan2(ay, ax));

		this.boss.animateRight();
		this.boss.moveByTheta(my_theta);

		if(
			Math.floor(this.boss.x) === Math.floor(this.stage.width/2) &&
			Math.floor(this.boss.y) === Math.floor(this.stage.height/2)
		) {
			// 移動終了
			this.is_moving = false;
			this.boss.animateNeutral();
		}
	}
	else {
		// 渦巻き弾
		if(this.frame_count % this.uzumaki_percount === 0) {
			this.uzumaki_shot1();
			this.uzumaki_shot2();
			this.game.playSound('boss_shot_small');
		}

		// 円形弾
		if(this.frame_count % this.maru_percount === 0) {
			// 自機狙い
			this.aimedToChara();
			for (var i=0; i< 360 / this.maru_shot_pertheta; i++) {
				this.maru_shot();
				this.maru_shot_theta += this.maru_shot_pertheta;
			}
			this.game.playSound('boss_shot_big');
		}
	}

};

Spell.prototype.uzumaki_shot1 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas1.length; i++ ) {
		var theta = this.shot_thetas1[i];

		this.shot(0, x, y, {r: r, theta: theta}); // type_id: 0
		this.shot_thetas1[i] += this.add_shot_theta;
	}
};
Spell.prototype.uzumaki_shot2 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas2.length; i++ ) {
		var theta = this.shot_thetas2[i];

		this.shot(0, x, y, {r: r, theta: theta}); // type_id: 0
		this.shot_thetas2[i] -= this.add_shot_theta;
	}
};
Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(4, x, y, {r: r, theta: theta}); // type_id: 1
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = this._radian_to_theta(Math.atan2(ay, ax));
};

// ラジアン -> θ に変換
Spell.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};

Spell.prototype.name = function() { return "風符「天狗風」"; };

module.exports = Spell;

},{"../../constant":2,"../../util":39,"./base":36}],38:[function(require,module,exports){
'use strict';

/* スペルカード */
// TODO: スプライト名もっといい感じに指定できないかな・・・
var BaseSpell = require('./base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
	this.maru_shot_theta = 0;

	// config
	this.r = 1.5;
	this.maru_percount1    = 100;
	this.maru_shot_pertheta = 10;

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};

Spell.prototype.run = function() {
	BaseSpell.prototype.run.apply(this, arguments);

	// スペルカード発動演出中
	if(this.isSpellStarting()) return;

	// 移動
	var shot_time = 600;
	var move_count = this.frame_count % 3600;
	if(shot_time <= move_count && move_count < shot_time + 60) {
		this.boss.moveLeft();
		this.boss.animateLeft();
	}
	else if(shot_time * 2 + 60 <= move_count && move_count < shot_time * 2 + 60 * 2) {
		this.boss.moveRight();
		this.boss.moveDown();
		this.boss.animateRight();
	}
	else if(shot_time * 3 + 60 * 2 <= move_count && move_count < shot_time * 3 + 60 * 3) {
		this.boss.moveRight();
		this.boss.moveUp();
		this.boss.animateRight();
	}
	else if(shot_time * 4 + 60 * 3 <= move_count && move_count < shot_time * 4 + 60 * 4) {
		this.boss.moveLeft();
		this.boss.animateLeft();
	}
	else {
		// 移動してない時

		// 円形弾
		if(
			this.frame_count % this.maru_percount1 === 0  ||
			this.frame_count % this.maru_percount1 === 10 ||
			this.frame_count % this.maru_percount1 === 20
		) {
			// 自機狙い
			this.aimedToChara();
			for (var i=0; i< 360 / this.maru_shot_pertheta; i++) {
				this.maru_shot();
				this.maru_shot_theta += this.maru_shot_pertheta;
			}
			this.game.playSound('boss_shot_big');
		}

		this.boss.animateNeutral();
	}

};

Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(3, x, y, {r: r, theta: theta}); // type_id: 1
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = this._radian_to_theta(Math.atan2(ay, ax));
};

// ラジアン -> θ に変換
Spell.prototype._radian_to_theta = function(radian) {
	return (radian * 180 / Math.PI) | 0;
};




Spell.prototype.name = function() { return "風符「天狗風」"; };

module.exports = Spell;

},{"../../constant":2,"../../util":39,"./base":36}],39:[function(require,module,exports){
'use strict';
var Util = {
	inherit: function( child, parent ) {
		var getPrototype = function(p) {
			if(Object.create) return Object.create(p);

			var F = function() {};
			F.prototype = p;
			return new F();
		};
		child.prototype = getPrototype(parent.prototype);
		child.prototype.constructor = child;
	},
};

module.exports = Util;

},{}]},{},[11]);
