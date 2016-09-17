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
		ganger_owata:  'image/ganger_owata.png',

		renko_normal:  'image/renko_normal.png',
		renko_disappointed:  'image/renko_disappointed.png',
		renko_surprised:  'image/renko_surprised.png',
		renko_trouble:  'image/renko_trouble.png',

		hatena_normal:  'image/ganger_normal.png',
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
			path:   'bgm/prologue.ogg',
			volume: 0.40,
			loopStart: 7.500,
			loopEnd: 60 * 2 + 15,
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
