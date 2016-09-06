'use strict';

var Config = {
	IMAGES: {
		title_bg:  'image/title_bg.png',
		prologue_bg:  'image/prologue_bg.jpg',
		renko_normal:  'image/renko_normal.jpg',
		merry_normal:  'image/merry_normal.jpg',
		ganger_normal:  'image/ganger_normal.jpg',
		/*
		stage1_bg: 'image/stage1_bg.jpg',
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
		prologue: {
			path:   'bgm/prologue.mp3',
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
	PROLOGUE_LEFT_X: 20,
	PROLOGUE_LEFT_Y: 130,
	// ノベルパートにおける右キャラの(x, y)
	PROLOGUE_RIGHT_X: 350,
	PROLOGUE_RIGHT_Y: 130,
	CHARA: {
		"ganger": {
			name: "？？？",
		},
		"renko": {
			name: "蓮子",
		},
		"merry": {
			name: "メリー",
		},
	}
};

// 全素材数
Config.ALL_MATERIAL_NUM = Object.keys(Config.IMAGES).length + Object.keys(Config.SOUNDS).length + Object.keys(Config.BGMS).length;


module.exports = Config;
