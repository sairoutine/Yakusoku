(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Config = {
	DEBUG: true,
	IMAGES: {
		title_bg:  'image/title_bg.png',
		prologue1_1_bg:  'image/prologue_bg.png',
		prologue2_bg:  'image/prologue_bg.png',
		logo:  'image/logo.png',
		side_bar:  'image/side_bar.png',
		fukidashi_normal:  'image/serif.png',
		// キャラ立ち絵
		aya_normal:  'image/aya_normal.png',
		ganger_normal:  'image/ganger_normal.png',
		hatena_normal:  'image/ganger_normal.png',
		merry_normal:  'image/merry_normal.png',
		renko_normal:  'image/renko_normal.png',

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
		/*
		shot: {
			id: 0x02,
			path: 'sound/shot.wav',
			volume: 0.08
		},
		enemy_vanish: {
			id: 0x04,
			path: 'sound/enemy_vanish.wav',
			volume: 0.1
		},
		dead: {
			id: 0x08,
			path: 'sound/dead.wav',
			volume: 0.08
		},
		graze: {
			id: 0x10,
			path: 'sound/graze.wav',
			volume: 0.1
		}
	   */
	},

	BGMS:{
		title: {
			path:   'bgm/title.mp3',
			volume: 0.40
		},
		prologue: {
			path:   'bgm/prologue.mp3',
			volume: 0.40
		},
		douchu: {
			path:   'bgm/douchu.wav',
			volume: 0.40,
			loopStart: 60 * 1 + 14.322,
			loopEnd: 60 * 2 + 53.419,
		},

		/*
		stage1: {
			path:   'bgm/stage1.mp3',
			volume: 0.50
		},
	   */
	},
	// テキストの typography スピード
	MESSAGE_SPEED: 10,
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
	TALK_STATE:   1,
	BOSS_STATE:   2,
	RESULT_STATE: 3,
	GAMEOVER_STATE: 4,
};

module.exports = Constant;

},{}],3:[function(require,module,exports){
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
	'vital': 3,
	  'powerItem': i % 2 === 0 ? 1 : 0,
	  'scoreItem': i % 2 === 1 ? 1 : 0,
	// 撃つ弾の設定
	'shot': [
		{ 'bullet': 20, 'type': 6, 'count': [ 10 ], 'loop': true },
		//{ 'bullet': 11, 'type': 6, 'count': [ 100 ], 'loop': true },
		//{ 'bullet': 8, 'type': 7, 'count': [ 0 ], 'loop': true, 'r': 20 },
	],
	// 動き
	'v': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 },
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

},{}],4:[function(require,module,exports){
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
	this.context = new window.AudioContext();

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
		// シーン切り替え
		this.state = scene;
		// 切り替え後のシーンを初期化
		this.currentScene().init();
	},
	// BGMを再生
	playBGM: function(bgm) {
		var self = this;
		var conf = config.BGMS[bgm];

		// 全てのBGM再生をストップ
		self.stopBGM();

		var source = self.context.createBufferSource();
		self.audio_source = source;
		source.buffer = self.bgms[bgm];

		source.loop = true;
		if(conf.loopStart) { source.loopStart = conf.loopStart; }
		if(conf.loopEnd)   { source.loopEnd = conf.loopEnd; }
		// TODO: audio.volume = conf.volume;
		source.connect(self.context.destination);
		source.start = source.start || source.noteOn;
		source.stop  = source.stop  || source.noteOff;
		source.start();

		// cache
	},
	stopBGM: function(bgm) {
		var self = this;
		if(self.audio_source) {
			console.log("aa");
			self.audio_source.stop(0);
		}
		return;
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

};




module.exports = Game;

},{"./config":1,"./constant":2,"./scene/loading":16,"./scene/prologue1":17,"./scene/prologue2":18,"./scene/stage":19,"./scene/title":25}],5:[function(require,module,exports){
'use strict';

/* 雑魚敵の出現管理クラス */

var Logic = function(appear_params) {
	// どこまで敵を出現させたか
	this.enemy_index = 0;

	// 敵のパラメータ一一覧
	this.appear_params = appear_params;
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

module.exports = Manager;

},{"./factory":6}],8:[function(require,module,exports){
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

	// TODO: DEBUG
	if(Config.DEBUG) { 
		this.script = JSON.parse(document.getElementById("prologue2").value);
	}

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

},{"../config":1}],9:[function(require,module,exports){
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


},{"./game":4}],10:[function(require,module,exports){
'use strict';

/* オブジェクトの基底クラス */

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
	// スプライトの描画開始座標
	var sprite_x = Math.round(this.x - this.spriteWidth() / 2);
	var sprite_y = Math.round(this.y - this.spriteHeight() / 2);

	var image = this.game.getImage(this.spriteImage());

	this.game.surface.save();
	// オブジェクト描画

	this.game.surface.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteX(), this.spriteHeight() * this.spriteY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// オブジェクトのゲーム上の位置
		sprite_x,                             sprite_y,
		// オブジェクトのゲーム上のサイズ
		this.spriteWidth(),                   this.spriteHeight()
	);
	this.game.surface.restore();
};

// オブジェクトとオブジェクトの衝突判定を行う
ObjectBase.prototype.checkCollision = function(obj) {
	if( this.inCollisionArea(obj.getCollisionLeftX(),  obj.getCollisionUpY()) ||
		this.inCollisionArea(obj.getCollisionLeftX(),  obj.getCollisionBottomY()) ||
		this.inCollisionArea(obj.getCollisionRightX(), obj.getCollisionUpY()) ||
		this.inCollisionArea(obj.getCollisionRightX(), obj.getCollisionBottomY()) ||
		this.inCollisionArea(obj.x,                    obj.y)
	  ) {
		return true ;
	}

	return false ;
};

ObjectBase.prototype.getCollisionLeftX = function() {
	return this.x - this.collisionWidth() / 2;
};


ObjectBase.prototype.getCollisionRightX = function() {
	return this.x + this.collisionWidth() / 2;
};

ObjectBase.prototype.getCollisionUpY = function() {
	return this.y - this.collisionHeight() / 2;
};

ObjectBase.prototype.getCollisionBottomY = function() {
	return this.y + this.collisionHeight() / 2;
};

ObjectBase.prototype.inCollisionArea = function(x, y) {
	if( x >= this.getCollisionLeftX() && x <= this.getCollisionRightX() &&
		y >= this.getCollisionUpY()  && y <= this.getCollisionBottomY()) {
		return true;
	}

	return false ;
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

},{}],11:[function(require,module,exports){
'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// 自機の移動速度(通常時)
var FAST_SPEED = 4;
// 自機の移動速度(Z押下時)
var SLOW_SPEED = 3;
// Nフレーム毎に自機をアニメーション
var ANIMATION_SPAN = 6;
// Nフレーム毎に自機をショット
var SHOT_SPAN = 5;
// 死亡時の無敵時間(フレーム)
var UNHITTABLE_COUNT = 100;
// 初期ライフ
var INIT_LIFE = 3;

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

// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		// Nフレーム置きにショットを生成
		if(this.frame_count % SHOT_SPAN === 0) {
			this.stage.shot_manager.create(this.x, this.y);
			//this.game.playSound('shot'); TODO
		}
	}

	// 移動速度
	var speed = this.game.isKeyDown(Constant.BUTTON_Z) ? SLOW_SPEED : FAST_SPEED;

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		this.x -= speed;
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		this.x += speed;
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		this.y += speed;
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		this.y -= speed;
	}

	// 画面外に出させない
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


	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		this.indexY = 1;
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		this.indexY = 2;
	}
	else {
		// 左右には未移動
		this.indexY = 0;
	}

	// 自機が無敵状態なら無敵切れか判定
	if(this.is_unhittable && this.unhittable_count + UNHITTABLE_COUNT < this.frame_count) {
		this.is_unhittable = false;
	}

	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % ANIMATION_SPAN === 0) {
		// 次のスプライトに
		this.indexX++;

		// 自機が未移動状態かつスプライトを全て表示しきったら
		if(this.indexY === 0 && this.indexX > 2) {
			// 最初のスプライトに戻る
			this.indexX = 0;
		}
		// TODO: スプライトのspanを変える。最初に戻るのは移動中もかわらん
		// 自機が移動状態かつスプライトを全て表示しきったら
		else if((this.indexY === 1 || this.indexY === 2) && this.indexX > 2) {
			// 移動中を除く最初のスプライトに戻る
			this.indexX = 0;
		}
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

/*
// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中なら衝突しない
	if(this.is_unhittable) {
		return false;
	}

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾にぶつかったら
	if(obj instanceof Bullet || obj instanceof Enemy) {
		// 死亡音再生
		this.game.playSound('dead');

		// 自機死亡エフェクト生成
		this.stage.effectmanager.create(this);

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};
*/

/*
// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.x = (this.stage.width / 2);
	this.y = ( this.stage.height - 100);

	// 自機を減らす
	this.life -= 1;

	// 無敵状態にする
	this.is_unhittable = true;

	// 無敵状態になったフレームを保存
	this.unhittable_count = this.frame_count;
};
*/

// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 4; };
Character.prototype.collisionHeight = function() { return 4; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;

},{"../constant":2,"../util":28,"./base":10}],12:[function(require,module,exports){
'use strict';

/* 敵オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

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
	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, [param.vector]);

	// 敵の初期位置
	this.x = param.x || 0;
	this.y = param.y || 0;

	// 敵の体力
	this.vital = param.vital;

	// 撃破された時にパワーアップアイテムを生成するかどうか
	this.powerItem = param.powerItem;

	// 撃破された時にスコア獲得アイテムを生成するかどうか
	this.scoreItem = param.scoreItem;

	// 敵の撃つ弾の設定
	this.shots = param.shot;

	// どの弾を撃つ設定を適用するか
	this.shotCountIndex = 0;
};

// フレーム処理
Enemy.prototype.run = function(){
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);

	/*
	// 弾を撃つ
	this.shot();
	*/
	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};
/*
// 弾を撃つ
Enemy.prototype.shot = function(){
	if(!this.shots) {
		return;
	}

	if(this.shots.shotCount[ this.shotCountIndex ] &&
	   this.shots.shotCount[ this.shotCountIndex ] <= this.frame_count) {
		this.shotCountIndex++;

		this.stage.bulletmanager.create(this);
		this.game.playSound('shot');
	}
};

// 衝突した時
Enemy.prototype.notifyCollision = function(obj) {
	// 自機弾と衝突
	if(obj instanceof Shot) {
		// 自分を消す
		this.stage.enemymanager.remove(this.id);

		// SEの再生
		this.game.playSound('enemy_vanish');

		// スコアの加算
		this.stage.score += 100;

		// 死亡エフェクト再生
		this.stage.effectmanager.create(this);

		// ポイントアイテムの生成
		if(this.powerItem || this.scoreItem) {
			this.stage.itemmanager.create(this);
		}
	}
};
*/

// 当たり判定サイズ
Enemy.prototype.collisionWidth  = function() { return this.spriteWidth();  };
Enemy.prototype.collisionHeight = function() { return this.spriteHeight(); };

// スプライトの開始位置
Enemy.prototype.spriteX = function() { return this.indexX; };
Enemy.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Enemy.prototype.spriteImage = function() { return 'enemy'; };

// スプライトのサイズ
Enemy.prototype.spriteWidth  = function() { return 32; };
Enemy.prototype.spriteHeight = function() { return 32; };


module.exports = Enemy;

},{"../constant":2,"../util":28,"./vector_base":14}],13:[function(require,module,exports){
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

/*
// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.shotmanager.remove(this.id);
};
*/




// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return this.spriteWidth();  };
Shot.prototype.collisionHeight = function() { return this.spriteHeight(); };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return 0; };
Shot.prototype.spriteY = function() { return 2; };

// スプライト画像
Shot.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return 20; };
Shot.prototype.spriteHeight = function() { return 20; };




module.exports = Shot;

},{"../constant":2,"../util":28,"./base":10}],14:[function(require,module,exports){
'use strict';

/* ベクトルを使って動くオブジェクトの基底クラス */

var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var VectorBase = function(id, scene) {
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
			aimed: vec.aimed,
		});
	}

	// 自機狙い設定のオブジェクトのベクトルを自機にむける
	this._calculateAimedVector();
};

// 自機狙いにする
VectorBase.prototype._calculateAimedVector = function() {
	for(var i = 0, len = this.vectors; i < len; i++) {
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

},{"../constant":2,"../util":28,"./base":10}],15:[function(require,module,exports){
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

module.exports = BaseScene;

},{}],16:[function(require,module,exports){
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
			var url = conf.path;

			self._loadBGM(conf.path, function(audioBuffer) {
				// BGMが読み込まれたら読み込んだ数を+1
				self.loadedBGMNum++;
				self.game.bgms[key] = audioBuffer;
			});
		})(key);
	}
};


LoadingScene.prototype._loadBGM = function(url, successCallback, errorCallback) {
	var self = this;
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if (xhr.status === 200) {
			var arrayBuffer = xhr.response;
			self.game.context.decodeAudioData(arrayBuffer, successCallback, function(error) {
				if (error instanceof Error) {
					window.alert(error.message);
				} else {
					window.alert('Error : "decodeAudioData" method.');
				}
			});
		}
	};

	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';  // XMLHttpRequest Level 2
	xhr.send(null);
};
module.exports = LoadingScene;

},{"../config":1,"../util":28,"./base":15}],17:[function(require,module,exports){
'use strict';

/* プロローグ画面1 */
var MESSAGE = require('../serif/prologue1');

// メッセージを表示している期間
var SHOW_MESSAGE_COUNT = 300;

// メッセージウィンドウの上下左右の余白
var MESSAGE_WINDOW_OUTLINE_MARGIN = 20;
var MESSAGE_WINDOW_INLINE_MARGIN  = 50;

// フォントサイズ(px)
var FONT_SIZE = 24;
// 行間
var FONT_MARGIN = 6;





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
	// メッセージウィンドウ表示
	this._showMessageWindow();
	// メッセージ表示
	this._showMessage();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;
	var prologue1_bg = this.game.getImage('prologue1_1_bg');

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
// メッセージウィンドウ表示
Scene.prototype._showMessageWindow = function(){
	var ctx = this.game.surface;
	ctx.save();

	ctx.globalAlpha = 0.5;
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.fillRect(
		MESSAGE_WINDOW_OUTLINE_MARGIN,
		MESSAGE_WINDOW_OUTLINE_MARGIN,
		this.game.width - MESSAGE_WINDOW_OUTLINE_MARGIN * 2,
		this.game.height - MESSAGE_WINDOW_OUTLINE_MARGIN * 2
	);

	ctx.restore();
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
		ctx.textBaseAlign = 'middle' ;
		ctx.fillStyle = 'rgb( 255, 255, 255 )' ;

		// セリフ表示
		// TODO: DEBUG
		var lines = Config.DEBUG ? document.getElementById("prologue1").value.split("\n") : MESSAGE.split("\n");
		if (lines.length) {
			// セリフテキストの y 座標初期位置
			var y = MESSAGE_WINDOW_INLINE_MARGIN;

			for(var i = 0, len = lines.length; i < len; i++) {
				ctx.fillText(lines[i], MESSAGE_WINDOW_INLINE_MARGIN, y); // 1行表示

				y+= FONT_SIZE + FONT_MARGIN;
			}
		}
	}

	ctx.restore();
};




module.exports = Scene;

},{"../config":1,"../constant":2,"../serif/prologue1":26,"../util":28,"./base":15}],18:[function(require,module,exports){
'use strict';

/* プロローグ画面2 */

// キャラのサイズ(1/2)
var CHARA_SIZE_RATIO = 0.5;

// 喋ってる方が寄る際のpx
var TALKER_MOVE_PX = 5;


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
	this.serif.init();

	this.game.playBGM('prologue');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

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
		x -= TALKER_MOVE_PX;
		y -= TALKER_MOVE_PX;
	}


	var right_image = this.game.getImage(this.serif.right_image());

	ctx.drawImage(right_image,
					x,
					y,
					right_image.width * CHARA_SIZE_RATIO,
					right_image.height * CHARA_SIZE_RATIO);

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
		x -= -TALKER_MOVE_PX; // 左右反転
		y -= TALKER_MOVE_PX;
	}

	var left_image = this.game.getImage(this.serif.left_image());
	ctx.transform(-1, 0, 0, 1, left_image.width * CHARA_SIZE_RATIO, 0); // 左右反転
	ctx.drawImage(left_image,
					-x, // 左右反転
					y,
					left_image.width * CHARA_SIZE_RATIO,
					left_image.height * CHARA_SIZE_RATIO);

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
					name_image.width * CHARA_SIZE_RATIO,
					name_image.height * CHARA_SIZE_RATIO);
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
			ctx.transform(-1, 0, 0, 1, fukidashi.width * CHARA_SIZE_RATIO, 0); // 左右反転
		}
		ctx.drawImage(fukidashi,
						x,
						y,
						fukidashi.width * CHARA_SIZE_RATIO,
						fukidashi.height * CHARA_SIZE_RATIO
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

},{"../config":1,"../constant":2,"../logic/serif":8,"../serif/prologue2":27,"../util":28,"./base":15}],19:[function(require,module,exports){
'use strict';

/* タイトル画面 */

// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 2;


// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');

// ステージの状態
var WayState = require('./stage/state/way');
var TalkState = require('./stage/state/talk');
var BossState = require('./stage/state/boss');
var ResultState = require('./stage/state/result');
var GameoverState = require('./stage/state/result');

// オブジェクト
var Character = require('../object/character');
var Shot = require('../object/shot.js');
var Enemy = require('../object/enemy.js');


var Manager = require('../logic/manager');


var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// ステージの現在の状態
	this.state = null;

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.WAY_STATE ]    = new WayState(this);
	this.states[ Constant.TALK_STATE ]   = new TalkState(this);
	this.states[ Constant.BOSS_STATE ]   = new BossState(this);
	this.states[ Constant.RESULT_STATE ] = new ResultState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.character = new Character(this);
	this.shot_manager = new Manager(Shot, this);
	this.enemy_manager = new Manager(Enemy, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.shot_manager,
		this.character,
		this.enemy_manager,
	];
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.state = null;

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}

	// 道中開始
	this.changeState(Constant.WAY_STATE);
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
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}

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


	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 255, 151, 151 )';
	ctx.textAlign = 'left';
	ctx.font = size1 + "px 'Migu'" ;
	ctx.fillText("HiScore",   x1, 25);
	ctx.fillText("Score",     x1, 70);
	ctx.fillText("Player",    x1, 130);
	ctx.fillText("Spell",     x1, 175);
	ctx.font = size2 + "px 'Migu'" ;
	// TODO:
	ctx.fillText("123456789", x2, 50);  // HiScore
	ctx.fillText("123456789", x2, 95);  // Score
	ctx.fillText("★★★★★",     x2, 155); // Player
	ctx.fillText("★★★★★",     x2, 200); // Spell
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



module.exports = Scene;

},{"../constant":2,"../logic/manager":7,"../object/character":11,"../object/enemy.js":12,"../object/shot.js":13,"../util":28,"./base":15,"./stage/state/boss":21,"./stage/state/result":22,"./stage/state/talk":23,"./stage/state/way":24}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

// キー押下
BaseScene.prototype.handleKeyDown = function(e){
};

// キーを離す
BaseScene.prototype.handleKeyUp = function(e){
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

module.exports = BaseScene;

},{}],22:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],23:[function(require,module,exports){
arguments[4][21][0].apply(exports,arguments)
},{"dup":21}],24:[function(require,module,exports){
'use strict';

var BaseScene = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');

var EnemyAppear = require('../../../logic/enemy_appear');
var stage1_appear = require('../../../enemy/stage1');

var State = function(stage) {
	BaseScene.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(stage1_appear);
};
Util.inherit(State, BaseScene);

// 初期化
State.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	this.game.stopBGM();
};

// フレーム処理
State.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM('douchu');
	}

	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);

	for(var i = 0, len = params.length; i< len; i++) {
		this.stage.enemy_manager.create(params[i]);
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
};

module.exports = State;

},{"../../../config":1,"../../../enemy/stage1":3,"../../../logic/enemy_appear":5,"../../../util":28,"./base":20}],25:[function(require,module,exports){
'use strict';

/* タイトル画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');


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

	//TODO: this.game.playBGM('title');
};

// フレーム処理
OpeningScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

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

	ctx.font = "24px 'Migu'" ;
	ctx.textAlign = 'center' ;
	ctx.textBaseAlign = 'middle' ;
	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;

	// N秒ごとに start メッセージを点滅
	if (Math.floor(this.frame_count / SHOW_START_MESSAGE_INTERVAL) % 2 === 0) {
		ctx.fillText('Press Z to Start', 450, 350);
	}

	ctx.restore();

};

module.exports = OpeningScene;

},{"../constant":2,"../util":28,"./base":15}],26:[function(require,module,exports){
'use strict';

var Serif = ["蝉の鳴き声が聞こえる。","蓮子は湖のほとりにきている。","メリーと湖で涼もうと約束していた。","蓮子は珍しく先に到着した。","携帯情報端末を見ると、","8月31日の午前9時50分を回ったところ。","夜なら星を見れば時間がわかるのだけど。","約束まで、あと10分。","メリーの事だから早めに来るだろう、","と考えていた時に、背後から物音が聞こえる。","メリーだと思い振り向くと、","自分にそっくりな容姿の女の子が立っていた。"].join("\n");

module.exports = Serif;

},{}],27:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [
	{
		serif: null,
		fukidashi: null,
		chara: "ganger",
		pos: "right",
		exp: "normal",
	},
	{
		serif: null,
		fukidashi: null,
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "約束を守りなさい。\n早く博霊神社に行かないと。",
		fukidashi: "normal",
		chara: "ganger",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "え、そんな約束してたっけ？",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: null,
		fukidashi: null,
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "どうしたの？",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "実はかくかくしかじかで",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "ふーん",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "約束といえば、前に博霊神社の\n入り口を調べようって\n約束してたわね。",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "そうだっけ？",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "なんだか気になるわ。\nねえ、今から行ってみない？",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "今から！？面倒だわ…。",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "そんな事言わずに\n行きましょうよ。",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "うっ…急にめまいと\nフラつきと腹痛と頭痛が",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "さっきまで\n元気だったじゃない！",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
	{
		serif: "うーん、気が進まないわ。",
		fukidashi: "normal",
		chara: "merry",
		pos: "right",
		exp: "normal",
	},
	{
		serif: "はぁ…。そんなに嫌なら\n仕方ないわね。\n私一人で行ってくるわ。",
		fukidashi: "normal",
		chara: "renko",
		pos: "left",
		exp: "normal",
	},
];

module.exports = Serif;

},{}],28:[function(require,module,exports){
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

},{}]},{},[9]);
