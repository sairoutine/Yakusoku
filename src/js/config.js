'use strict';

var Constant = require('./constant');

var Config = {
	DEBUG: true,
	//DEBUG_SCENE: Constant.STAGE_SCENE,
	//DEBUG_STATE: Constant.BOSS_STATE,
	//DEBUG_STAGE: 4,
	//DEBUG_SPELL: 0,
	//DEBUG_MUSIC_OFF: true,
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

		/* キャラ立ち絵 */

		// 射命丸 文
		aya_normal:       'image/aya/normal.png',
		aya_dissatisfied: 'image/aya/dissatisfied.png',
		aya_smile:        'image/aya/smile.png',

		// 東風谷 早苗
		sanae_normal:        'image/sanae/normal.png',
		sanae_smile:        'image/sanae/smile.png',
		sanae_dissatisfied:        'image/sanae/dissatisfied.png',

		// 風見 幽香
		yuuka_grin:   'image/yuuka/grin.png',
		yuuka_normal: 'image/yuuka/normal.png',

		// 八雲 紫
		yukari_anger:        'image/yukari/anger.png',
		yukari_disappointed: 'image/yukari/disappointed.png',
		yukari_normal:       'image/yukari/normal.png',

		// ドッペルゲンガー
		ganger_normal: 'image/ganger/normal.png',
		ganger_owata:  'image/ganger/owata.png',
		ganger_smile:  'image/ganger/smile.png',
		hatena_normal: 'image/ganger/normal.png',
		hatena_owata:  'image/ganger/owata.png',
		hatena_smile:  'image/ganger/smile.png',

		// 蓮子
		renko_normal:         'image/renko/normal.png',
		renko_disappointed:   'image/renko/disappointed.png',
		renko_surprised:      'image/renko/surprised.png',
		renko_troubled:       'image/renko/troubled.png',
		renko_troubled_blood: 'image/renko/troubled_blood.png',
		renko_calm:           'image/renko/calm.png',
		renko_calm_blood:     'image/renko/calm_blood.png',
		renko_normal_blood:   'image/renko/normal_blood.png',
		renko_pain:           'image/renko/pain.png',
		renko_pain_blood:     'image/renko/pain_blood.png',
		renko_sad:            'image/renko/sad.png',
		renko_smile_blood:    'image/renko/smile_blood.png',

		// メリー
		merry_normal:       'image/merry/normal.png',
		merry_disappointed: 'image/merry/disappointed.png',
		merry_troubled:     'image/merry/troubled.png',
		merry_anger:        'image/merry/anger.png',
		merry_calm:         'image/merry/calm.png',
		merry_furious:      'image/merry/furious.png',
		merry_grin:         'image/merry/grin.png',
		merry_sad:          'image/merry/sad.png',

		// 名前プレート
		name_aya:    'image/name_aya.png',
		name_ganger: 'image/name_ganger.png',
		name_hatena: 'image/name_hatena.png',
		name_merry:  'image/name_merry.png',
		name_renko:  'image/name_renko.png',
		name_yuuka:  'image/name_yuuka.png',
		name_sanae:  'image/name_sanae.png',
		name_yukari: 'image/name_yukari.png',

		stage1_bg: 'image/stage1_bg.png',
		stage2_bg: 'image/stage2_bg.png',
		stage3_bg: 'image/stage3_bg.png',
		stage4_bg: 'image/stage4_bg.png',
		stage5_bg: 'image/stage5_bg.png',
		character_renko: 'image/character_renko.png',
		boss_aya:        'image/boss_aya.png',
		boss_sanae:      'image/boss_sanae.png',
		boss_yuuka:      'image/boss_yuuka.png',
		boss_yukari:     'image/boss_yukari.png',
		boss_merry:      'image/boss_merry.png',
		shot:      'image/shot.png',
		shot2:      'image/shot2.png',
		beam:      'image/beam.png',
		item:      'image/item.png',

		enemy:     'image/enemy.png',


		magic_circle:     'image/magic_circle.png',
		/*
		reimu:     'image/reimu.png',
		shot:      'image/shot.png',
		bullet:    'image/bullet.png',
		item:      'image/item.png',
	   */
	},
	CJS_IMAGES: [
		{src:"image/createjs/boss_appearance/circle.png", id:"circle"},
		{src:"image/createjs/boss_appearance/dot.png", id:"dot"},
		{src:"image/createjs/boss_appearance/emlight.png", id:"emlight"},
		{src:"image/createjs/epilogue/_01.jpg", id:"_01"},
		{src:"image/createjs/epilogue/_02.jpg", id:"_02"},
		{src:"image/createjs/epilogue/_03.jpg", id:"_03"},
		{src:"image/createjs/epilogue/_04.jpg", id:"_04"},
		{src:"image/createjs/epilogue/_05.jpg", id:"_05"},
		{src:"image/createjs/epilogue/_06.jpg", id:"_06"},
		{src:"image/createjs/epilogue/_07.jpg", id:"_07"},
		{src:"image/createjs/epilogue/_08.jpg", id:"_08"},
		{src:"image/createjs/epilogue/_09.jpg", id:"_09"},
		{src:"image/createjs/epilogue/_10_1.jpg", id:"_10_1"},
		{src:"image/createjs/epilogue/_11.jpg", id:"_11"},
		{src:"image/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/createjs/epilogue/drenko.png", id:"drenko"},
		{src:"image/createjs/epilogue/hakureiShrine.jpg", id:"hakureiShrine"},
		{src:"image/createjs/epilogue/merry.png", id:"merry"},
		{src:"image/createjs/epilogue/renko.png", id:"renko"},
		{src:"image/createjs/epilogue/s1.png", id:"s1"},
		{src:"image/createjs/epilogue/s10.png", id:"s10"},
		{src:"image/createjs/epilogue/s2.png", id:"s2"},
		{src:"image/createjs/epilogue/s3.png", id:"s3"},
		{src:"image/createjs/epilogue/s4.png", id:"s4"},
		{src:"image/createjs/epilogue/s5.png", id:"s5"},
		{src:"image/createjs/epilogue/s6.png", id:"s6"},
		{src:"image/createjs/epilogue/s7.png", id:"s7"},
		{src:"image/createjs/epilogue/s8.png", id:"s8"},
		{src:"image/createjs/epilogue/s9.png", id:"s9"},
		{src:"image/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/createjs/epilogue/voice3.png", id:"voice3"},
		{src:"image/createjs/epilogue/WO.png", id:"WO"},
		{src:"image/createjs/ending/bg.png", id:"bg"},
		{src:"image/createjs/ending/BO.png", id:"BO"},
		{src:"image/createjs/ending/last.png", id:"last"},
		{src:"image/createjs/ending/renko_d.png", id:"renko_d"},
		{src:"image/createjs/ending/renko_d_sil.png", id:"renko_d_sil"},
		{src:"image/createjs/ending/s1.png", id:"s1_e"},
		{src:"image/createjs/ending/s2.png", id:"s2_e"},
		{src:"image/createjs/ending/s3.png", id:"s3_e"},
		{src:"image/createjs/ending/s4.png", id:"s4_e"},
		{src:"image/createjs/ending/WO.png", id:"WO"}
	],
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
		},
		powerup: {
			id: 0x80,
			path: 'sound/powerup.wav',
			volume: 0.4
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
			volume: 0.40
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
		epilogue: {
			path:   'bgm/epilogue.ogg',
			volume: 0.40,
		},
		ending: {
			path:   'bgm/ending.ogg',
			volume: 0.40,
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
Config.ALL_MATERIAL_NUM = Object.keys(Config.IMAGES).length + Object.keys(Config.SOUNDS).length + Object.keys(Config.BGMS).length + Config.CJS_IMAGES.length;

module.exports = Config;
