'use strict';

var Constant = {
	DEBUG: true,

	LOADING_SCENE:  0,
	TITLE_SCENE:    1,
	PROLOGUE_SCENE: 2,
	STAGE_SCENE:    3,
	EPILOGUE_SCENE: 4,
	ENDING_SCENE:   5,

	BUTTON_LEFT:  0x01,
	BUTTON_UP:    0x02,
	BUTTON_RIGHT: 0x04,
	BUTTON_DOWN:  0x08,
	BUTTON_Z:     0x10,
	BUTTON_X:     0x20,
	BUTTON_SHIFT: 0x40,
	BUTTON_SPACE: 0x80,

	IMAGES: {
		/*
		title_bg:  'image/title_bg.png',
		stage1_bg: 'image/stage1_bg.jpg',
		reimu:     'image/reimu.png',
		shot:      'image/shot.png',
		enemy:     'image/enemy.png',
		bullet:    'image/bullet.png',
		item:      'image/item.png',
	   */
	},

	SOUNDS: {
		/*
		select: {
			id: 0x01,
			path:   'sound/select.wav',
			volume: 1.00
		},
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
		/*
		title: {
			path:   'bgm/title.mp3',
			volume: 0.40
		},
		stage1: {
			path:   'bgm/stage1.mp3',
			volume: 0.50
		},
	   */
	},
};

// 全素材数
Constant.ALL_MATERIAL_NUM = Object.keys(Constant.IMAGES).length + Object.keys(Constant.SOUNDS).length + Object.keys(Constant.BGMS).length;


module.exports = Constant;
