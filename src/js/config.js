'use strict';

var Constant = require('./constant');

var Config = {
	DEBUG: true,
	//DEBUG_SCENE: Constant.STAGE_SCENE,
	//DEBUG_STATE: Constant.BOSS_STATE,
	//DEBUG_STAGE: 4,
	//DEBUG_SPELL: 1,
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
		renko_anger:          'image/renko/anger.png',
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
		shadow:      'image/shadow.png',
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

		// エピローグC
		{src:"image/createjs/epilogue/bg_ED_C.png", id:"bg_ED_C"},
		{src:"image/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/createjs/epilogue/C01.png", id:"C01"},
		{src:"image/createjs/epilogue/C02.png", id:"C02"},
		{src:"image/createjs/epilogue/C03.png", id:"C03"},
		{src:"image/createjs/epilogue/C04.png", id:"C04"},
		{src:"image/createjs/epilogue/C05.png", id:"C05"},
		{src:"image/createjs/epilogue/C06.png", id:"C06"},
		{src:"image/createjs/epilogue/C07.png", id:"C07"},
		{src:"image/createjs/epilogue/C08.png", id:"C08"},
		{src:"image/createjs/epilogue/C09.png", id:"C09"},
		{src:"image/createjs/epilogue/C10.png", id:"C10"},
		{src:"image/createjs/epilogue/C11.png", id:"C11"},
		{src:"image/createjs/epilogue/C12.png", id:"C12"},
		{src:"image/createjs/epilogue/C13.png", id:"C13"},
		{src:"image/createjs/epilogue/C14.png", id:"C14"},
		{src:"image/createjs/epilogue/end_C.png", id:"end_C"},
		{src:"image/createjs/epilogue/merry_calm.png", id:"merry_calm"},
		{src:"image/createjs/epilogue/merry_disppointed.png", id:"merry_disppointed"},
		{src:"image/createjs/epilogue/merry_nomal.png", id:"merry_nomal"},
		{src:"image/createjs/epilogue/merry_troubled.png", id:"merry_troubled"},
		{src:"image/createjs/epilogue/renko_calm.png", id:"renko_calm"},
		{src:"image/createjs/epilogue/renko_sad.png", id:"renko_sad"},
		{src:"image/createjs/epilogue/renko_troubled.png", id:"renko_troubled"},
		{src:"image/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/createjs/epilogue/voice3.png", id:"voice3"},
		{src:"image/createjs/epilogue/WO.png", id:"WO"},
		// エピローグB
		{src:"image/createjs/epilogue/B01.png", id:"B01"},
		{src:"image/createjs/epilogue/B02.png", id:"B02"},
		{src:"image/createjs/epilogue/B03.png", id:"B03"},
		{src:"image/createjs/epilogue/B04.png", id:"B04"},
		{src:"image/createjs/epilogue/B05.png", id:"B05"},
		{src:"image/createjs/epilogue/B06.png", id:"B06"},
		{src:"image/createjs/epilogue/B07.png", id:"B07"},
		{src:"image/createjs/epilogue/B08.png", id:"B08"},
		{src:"image/createjs/epilogue/B09.png", id:"B09"},
		{src:"image/createjs/epilogue/bg_ED_C.png", id:"bg_ED_C"},
		{src:"image/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/createjs/epilogue/end_B.png", id:"end_B"},
		{src:"image/createjs/epilogue/renko_sad.png", id:"renko_sad"},
		{src:"image/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/createjs/epilogue/WO.png", id:"WO"},
		// エピローグA
		{src:"image/createjs/epilogue/A01.png", id:"A01"},
		{src:"image/createjs/epilogue/A02.png", id:"A02"},
		{src:"image/createjs/epilogue/A03.png", id:"A03"},
		{src:"image/createjs/epilogue/A04.png", id:"A04"},
		{src:"image/createjs/epilogue/A05.png", id:"A05"},
		{src:"image/createjs/epilogue/A06.png", id:"A06"},
		{src:"image/createjs/epilogue/A07.png", id:"A07"},
		{src:"image/createjs/epilogue/A08.png", id:"A08"},
		{src:"image/createjs/epilogue/A09.png", id:"A09"},
		{src:"image/createjs/epilogue/A10.png", id:"A10"},
		{src:"image/createjs/epilogue/A11.png", id:"A11"},
		{src:"image/createjs/epilogue/A12.png", id:"A12"},
		{src:"image/createjs/epilogue/A13.png", id:"A13"},
		{src:"image/createjs/epilogue/A14.png", id:"A14"},
		{src:"image/createjs/epilogue/A15.png", id:"A15"},
		{src:"image/createjs/epilogue/A16.png", id:"A16"},
		{src:"image/createjs/epilogue/A17.png", id:"A17"},
		{src:"image/createjs/epilogue/A18.png", id:"A18"},
		{src:"image/createjs/epilogue/A19.png", id:"A19"},
		{src:"image/createjs/epilogue/A20.png", id:"A20"},
		{src:"image/createjs/epilogue/A21.png", id:"A21"},
		{src:"image/createjs/epilogue/A22.png", id:"A22"},
		{src:"image/createjs/epilogue/A23.png", id:"A23"},
		{src:"image/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/createjs/epilogue/cut01.png", id:"cut01"},
		{src:"image/createjs/epilogue/cut02.png", id:"cut02"},
		{src:"image/createjs/epilogue/cut03.png", id:"cut03"},
		{src:"image/createjs/epilogue/cut04.png", id:"cut04"},
		{src:"image/createjs/epilogue/cut05.png", id:"cut05"},
		{src:"image/createjs/epilogue/cut06.png", id:"cut06"},
		{src:"image/createjs/epilogue/cut07.png", id:"cut07"},
		{src:"image/createjs/epilogue/cut08.png", id:"cut08"},
		{src:"image/createjs/epilogue/cut09.png", id:"cut09"},
		{src:"image/createjs/epilogue/cut10.png", id:"cut10"},
		{src:"image/createjs/epilogue/cut11.png", id:"cut11"},
		{src:"image/createjs/epilogue/ganger_nomal.png", id:"ganger_nomal"},
		{src:"image/createjs/epilogue/ganger_smile.png", id:"ganger_smile"},
		{src:"image/createjs/epilogue/hakureiShrine.png", id:"hakureiShrine"},
		{src:"image/createjs/epilogue/merry_sad.png", id:"merry_sad"},
		{src:"image/createjs/epilogue/renko_anger.png", id:"renko_anger"},
		{src:"image/createjs/epilogue/renko_calm_blood.png", id:"renko_calm_blood"},
		{src:"image/createjs/epilogue/renko_nomal_blood.png", id:"renko_nomal_blood"},
		{src:"image/createjs/epilogue/renko_pain.png", id:"renko_pain"},
		{src:"image/createjs/epilogue/renko_pain_blood.png", id:"renko_pain_blood"},
		{src:"image/createjs/epilogue/renko_smile_blood.png", id:"renko_smile_blood"},
		{src:"image/createjs/epilogue/renko_troubled_blood.png", id:"renko_troubled_blood"},
		{src:"image/createjs/epilogue/RO.png", id:"RO"},
		{src:"image/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/createjs/epilogue/voice3.png", id:"voice3"},
		{src:"image/createjs/epilogue/WO.png", id:"WO"},
		// スタッフロール
		{src:"image/createjs/staffroll/bg.png", id:"bg"},
		{src:"image/createjs/staffroll/BO.png", id:"BO"},
		{src:"image/createjs/staffroll/e01.png", id:"e01"},
		{src:"image/createjs/staffroll/e02.png", id:"e02"},
		{src:"image/createjs/staffroll/e03.png", id:"e03"},
		{src:"image/createjs/staffroll/e04.png", id:"e04"},
		{src:"image/createjs/staffroll/e05.png", id:"e05"},
		{src:"image/createjs/staffroll/e06.png", id:"e06"},
		{src:"image/createjs/staffroll/renko_d.png", id:"renko_d"},
		{src:"image/createjs/staffroll/renko_d_sil.png", id:"renko_d_sil"},
		{src:"image/createjs/staffroll/s01.png", id:"s01"},
		{src:"image/createjs/staffroll/s02.png", id:"s02"},
		{src:"image/createjs/staffroll/s03.png", id:"s03"},
		{src:"image/createjs/staffroll/s04.png", id:"s04"},
		{src:"image/createjs/staffroll/s05.png", id:"s05"},
		{src:"image/createjs/staffroll/s06.png", id:"s06"},
		{src:"image/createjs/staffroll/s07.png", id:"s07"},
		// エンド
		{src:"image/createjs/end/BO.png", id:"BO"},
		{src:"image/createjs/end/end_A.png", id:"end_A"},
		{src:"image/createjs/end/l01.png", id:"l01"},
		{src:"image/createjs/end/l02.png", id:"l02"},
		{src:"image/createjs/end/l03.png", id:"l03"},
		{src:"image/createjs/end/l04.png", id:"l04"},
		{src:"image/createjs/end/l05.png", id:"l05"},
		{src:"image/createjs/end/l06.png", id:"l06"},
		{src:"image/createjs/end/l07.png", id:"l07"},
		{src:"image/createjs/end/l08.png", id:"l08"},
		{src:"image/createjs/end/l09.png", id:"l09"},
		{src:"image/createjs/end/l10.png", id:"l10"},
		{src:"image/createjs/end/l11.png", id:"l11"},
		{src:"image/createjs/end/l12.png", id:"l12"},
		{src:"image/createjs/end/l13.png", id:"l13"},
		{src:"image/createjs/end/l14.png", id:"l14"},
		{src:"image/createjs/end/l15.png", id:"l15"},
		{src:"image/createjs/end/l16.png", id:"l16"},
		{src:"image/createjs/end/l17.png", id:"l17"},
		{src:"image/createjs/end/l18.png", id:"l18"},
		{src:"image/createjs/end/l19.png", id:"l19"},
		{src:"image/createjs/end/l20.png", id:"l20"},
		{src:"image/createjs/end/l21.png", id:"l21"},
		{src:"image/createjs/end/last.png", id:"last"},
		{src:"image/createjs/end/WO.png", id:"WO"},
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
		},
		kirakira: {
			id: 0x100,
			path: 'sound/kira2.mp3',
			volume: 0.2
		},
		boss_powerup: {
			id: 0x200,
			path: 'sound/boss_powerup.wav',
			volume: 1.0
		},

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
			path:   'bgm/title.ogg',
			volume: 0.40,
			loopStart: 29.142,
			loopEnd: 60 * 1 + 24.000,
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
		stage5: {
			path:   'bgm/stage5.ogg',
			volume: 0.50,
			loopStart: 60 * 2 + 8,
			loopEnd: 60 * 3 + 12,
		},
		epilogue: {
			path:   'bgm/epilogue.ogg',
			volume: 0.40,
		},
		staffroll: {
			path:   'bgm/title.ogg', // タイトル曲と同じ
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
