'use strict';

var Config = {
	DEBUG: true,
	IMAGES: {
		title_bg:  'image/title_bg.png',
		prologue1_1_bg:  'image/prologue_bg.png',
		prologue2_bg:  'image/prologue_bg.png',
		logo:  'image/logo.png',
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
		/*
		reimu:     'image/reimu.png',
		shot:      'image/shot.png',
		enemy:     'image/enemy.png',
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
		prologue1: {
			path:   'bgm/prologue.mp3',
			volume: 0.40
		},
		prologue2: {
			path:   'bgm/prologue.mp3',
			volume: 0.40
		},
		douchu: {
			path:   'bgm/douchu.mp3',
			volume: 0.40
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
