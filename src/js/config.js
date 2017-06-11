'use strict';

var Constant = require('./constant');

var Config = {
	DEBUG: false,
	//DEBUG_SCENE: Constant.STAGE_SCENE,
	//DEBUG_STATE: Constant.GAMEOVER_STATE,
	//DEBUG_STAGE: 4,
	//DEBUG_SPELL: 2,
	//DEBUG_MUSIC_OFF: true,
	TRIAL: false,
	// エンディングの分岐条件
	THRESHOLD_EPILOGUE_A: 4500000,
	THRESHOLD_EPILOGUE_B: 3000000,
	IMAGES: {
		title_bg:  'image/trial/title_bg.png',
		press_z:  'image/trial/pressZ.png',
		press_x:  'image/trial/pressX.png',

		num:  'image/trial/num.png',
		player:  'image/trial/player.png',
		score:  'image/trial/score.png',
		spell:  'image/trial/spell.png',
		power:  'image/trial/power.png',
		star:  'image/trial/star.png',

		prologue1_bg:  'image/trial/prologue1_bg.png',
		prologue2_bg:  'image/trial/prologue2_bg.png',
		logo:  'image/trial/logo.png',
		side_bar:  'image/trial/side_bar.png',
		fukidashi_normal:  'image/trial/fukidashi_blue.png',
		fukidashi_orange:  'image/trial/fukidashi_orange.png',
		fukidashi_purple:  'image/trial/fukidashi_purple.png',

		/* キャラ立ち絵 */

		// 射命丸 文
		aya_normal:       'image/trial/aya/normal.png',
		aya_dissatisfied: 'image/trial/aya/dissatisfied.png',
		aya_smile:        'image/trial/aya/smile.png',

		// 東風谷 早苗
		sanae_normal:        'image/production/sanae/normal.png',
		sanae_smile:        'image/production/sanae/smile.png',
		sanae_dissatisfied:        'image/production/sanae/dissatisfied.png',

		// 風見 幽香
		yuuka_grin:   'image/production/yuuka/grin.png',
		yuuka_normal: 'image/production/yuuka/normal.png',

		// 八雲 紫
		yukari_anger:        'image/production/yukari/anger.png',
		yukari_disappointed: 'image/production/yukari/disappointed.png',
		yukari_normal:       'image/production/yukari/normal.png',

		// ドッペルゲンガー
		ganger_normal: 'image/trial/ganger/normal.png',
		ganger_owata:  'image/trial/ganger/owata.png',
		ganger_smile:  'image/trial/ganger/smile.png',
		hatena_normal: 'image/trial/ganger/normal.png',
		hatena_owata:  'image/trial/ganger/owata.png',
		hatena_smile:  'image/trial/ganger/smile.png',

		// 蓮子
		renko_normal:         'image/trial/renko/normal.png',
		renko_anger:          'image/trial/renko/anger.png',
		renko_disappointed:   'image/trial/renko/disappointed.png',
		renko_surprised:      'image/trial/renko/surprised.png',
		renko_troubled:       'image/trial/renko/troubled.png',
		renko_troubled_blood: 'image/trial/renko/troubled_blood.png',
		renko_calm:           'image/trial/renko/calm.png',
		renko_calm_blood:     'image/trial/renko/calm_blood.png',
		renko_normal_blood:   'image/trial/renko/normal_blood.png',
		renko_pain:           'image/trial/renko/pain.png',
		renko_pain_blood:     'image/trial/renko/pain_blood.png',
		renko_sad:            'image/trial/renko/sad.png',
		renko_smile_blood:    'image/trial/renko/smile_blood.png',

		// メリー
		merry_normal:       'image/trial/merry/normal.png',
		merry_disappointed: 'image/trial/merry/disappointed.png',
		merry_troubled:     'image/trial/merry/troubled.png',
		merry_anger:        'image/trial/merry/anger.png',
		merry_calm:         'image/trial/merry/calm.png',
		merry_furious:      'image/trial/merry/furious.png',
		merry_grin:         'image/trial/merry/grin.png',
		merry_sad:          'image/trial/merry/sad.png',

		// 名前プレート
		name_aya:    'image/trial/name_aya.png',
		name_ganger: 'image/trial/name_ganger.png',
		name_hatena: 'image/trial/name_hatena.png',
		name_merry:  'image/trial/name_merry.png',
		name_renko:  'image/trial/name_renko.png',
		name_yuuka:  'image/production/name_yuuka.png',
		name_sanae:  'image/production/name_sanae.png',
		name_yukari: 'image/production/name_yukari.png',

		stage1_bg: 'image/trial/stage1_bg.png',
		stage2_bg: 'image/production/stage2_bg.png',
		stage3_bg: 'image/production/stage3_bg.png',
		stage4_bg: 'image/production/stage4_bg.png',
		stage5_bg: 'image/production/stage5_bg.png',
		shadow:      'image/trial/shadow.png',
		character_renko: 'image/trial/character_renko.png',
		boss_aya:        'image/trial/boss_aya.png',
		boss_sanae:      'image/production/boss_sanae.png',
		boss_yuuka:      'image/production/boss_yuuka.png',
		boss_yukari:     'image/production/boss_yukari.png',
		boss_merry:      'image/production/boss_merry.png',
		shot:      'image/trial/shot.png',
		shot2:      'image/trial/shot2.png',
		beam:      'image/trial/beam.png',
		item:      'image/trial/item.png',

		enemy:     'image/trial/enemy.png',


		magic_circle:     'image/trial/magic_circle.png',
	},
	CJS_IMAGES: [
		// ボス出現エフェクト
		{src:"image/trial/createjs/boss_appearance/circle.png", id:"circle"},
		{src:"image/trial/createjs/boss_appearance/dot.png", id:"dot"},
		{src:"image/trial/createjs/boss_appearance/emlight.png", id:"emlight"},
		// 爆発エフェクト
		{src:"image/trial/createjs/explosion/ef_circle.png", id:"ef_circle"},
		{src:"image/trial/createjs/explosion/ef_smoke.png", id:"ef_smoke"},
		{src:"image/trial/createjs/explosion/ef_smoke_b.png", id:"ef_smoke_b"},
		{src:"image/trial/createjs/explosion/ef_smoke_s.png", id:"ef_smoke_s"},
		{src:"image/trial/createjs/explosion/maru.png", id:"maru"},
		// エピローグC
		{src:"image/production/createjs/epilogue/bg_ED_C.png", id:"bg_ED_C"},
		{src:"image/production/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/production/createjs/epilogue/C01.png", id:"C01"},
		{src:"image/production/createjs/epilogue/C02.png", id:"C02"},
		{src:"image/production/createjs/epilogue/C03.png", id:"C03"},
		{src:"image/production/createjs/epilogue/C04.png", id:"C04"},
		{src:"image/production/createjs/epilogue/C05.png", id:"C05"},
		{src:"image/production/createjs/epilogue/C06.png", id:"C06"},
		{src:"image/production/createjs/epilogue/C07.png", id:"C07"},
		{src:"image/production/createjs/epilogue/C08.png", id:"C08"},
		{src:"image/production/createjs/epilogue/C09.png", id:"C09"},
		{src:"image/production/createjs/epilogue/C10.png", id:"C10"},
		{src:"image/production/createjs/epilogue/C11.png", id:"C11"},
		{src:"image/production/createjs/epilogue/C12.png", id:"C12"},
		{src:"image/production/createjs/epilogue/C13.png", id:"C13"},
		{src:"image/production/createjs/epilogue/C14.png", id:"C14"},
		{src:"image/production/createjs/epilogue/end_C.png", id:"end_C"},
		{src:"image/production/createjs/epilogue/merry_calm.png", id:"merry_calm"},
		{src:"image/production/createjs/epilogue/merry_disppointed.png", id:"merry_disppointed"},
		{src:"image/production/createjs/epilogue/merry_nomal.png", id:"merry_nomal"},
		{src:"image/production/createjs/epilogue/merry_troubled.png", id:"merry_troubled"},
		{src:"image/production/createjs/epilogue/renko_calm.png", id:"renko_calm"},
		{src:"image/production/createjs/epilogue/renko_sad.png", id:"renko_sad"},
		{src:"image/production/createjs/epilogue/renko_troubled.png", id:"renko_troubled"},
		{src:"image/production/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/production/createjs/epilogue/voice3.png", id:"voice3"},
		{src:"image/production/createjs/epilogue/WO.png", id:"WO"},
		// エピローグB
		{src:"image/production/createjs/epilogue/B01.png", id:"B01"},
		{src:"image/production/createjs/epilogue/B02.png", id:"B02"},
		{src:"image/production/createjs/epilogue/B03.png", id:"B03"},
		{src:"image/production/createjs/epilogue/B04.png", id:"B04"},
		{src:"image/production/createjs/epilogue/B05.png", id:"B05"},
		{src:"image/production/createjs/epilogue/B06.png", id:"B06"},
		{src:"image/production/createjs/epilogue/B07.png", id:"B07"},
		{src:"image/production/createjs/epilogue/B08.png", id:"B08"},
		{src:"image/production/createjs/epilogue/B09.png", id:"B09"},
		{src:"image/production/createjs/epilogue/bg_ED_C.png", id:"bg_ED_C"},
		{src:"image/production/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/production/createjs/epilogue/end_B.png", id:"end_B"},
		{src:"image/production/createjs/epilogue/renko_sad.png", id:"renko_sad"},
		{src:"image/production/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/production/createjs/epilogue/WO.png", id:"WO"},
		// エピローグA
		{src:"image/production/createjs/epilogue/A01.png", id:"A01"},
		{src:"image/production/createjs/epilogue/A02.png", id:"A02"},
		{src:"image/production/createjs/epilogue/A03.png", id:"A03"},
		{src:"image/production/createjs/epilogue/A04.png", id:"A04"},
		{src:"image/production/createjs/epilogue/A05.png", id:"A05"},
		{src:"image/production/createjs/epilogue/A06.png", id:"A06"},
		{src:"image/production/createjs/epilogue/A07.png", id:"A07"},
		{src:"image/production/createjs/epilogue/A08.png", id:"A08"},
		{src:"image/production/createjs/epilogue/A09.png", id:"A09"},
		{src:"image/production/createjs/epilogue/A10.png", id:"A10"},
		{src:"image/production/createjs/epilogue/A11.png", id:"A11"},
		{src:"image/production/createjs/epilogue/A12.png", id:"A12"},
		{src:"image/production/createjs/epilogue/A13.png", id:"A13"},
		{src:"image/production/createjs/epilogue/A14.png", id:"A14"},
		{src:"image/production/createjs/epilogue/A15.png", id:"A15"},
		{src:"image/production/createjs/epilogue/A16.png", id:"A16"},
		{src:"image/production/createjs/epilogue/A17.png", id:"A17"},
		{src:"image/production/createjs/epilogue/A18.png", id:"A18"},
		{src:"image/production/createjs/epilogue/A19.png", id:"A19"},
		{src:"image/production/createjs/epilogue/A20.png", id:"A20"},
		{src:"image/production/createjs/epilogue/A21.png", id:"A21"},
		{src:"image/production/createjs/epilogue/A22.png", id:"A22"},
		{src:"image/production/createjs/epilogue/A23.png", id:"A23"},
		{src:"image/production/createjs/epilogue/BO.png", id:"BO"},
		{src:"image/production/createjs/epilogue/cut01.png", id:"cut01"},
		{src:"image/production/createjs/epilogue/cut02.png", id:"cut02"},
		{src:"image/production/createjs/epilogue/cut03.png", id:"cut03"},
		{src:"image/production/createjs/epilogue/cut04.png", id:"cut04"},
		{src:"image/production/createjs/epilogue/cut05.png", id:"cut05"},
		{src:"image/production/createjs/epilogue/cut06.png", id:"cut06"},
		{src:"image/production/createjs/epilogue/cut07.png", id:"cut07"},
		{src:"image/production/createjs/epilogue/cut08.png", id:"cut08"},
		{src:"image/production/createjs/epilogue/cut09.png", id:"cut09"},
		{src:"image/production/createjs/epilogue/cut10.png", id:"cut10"},
		{src:"image/production/createjs/epilogue/cut11.png", id:"cut11"},
		{src:"image/production/createjs/epilogue/ganger_nomal.png", id:"ganger_nomal"},
		{src:"image/production/createjs/epilogue/ganger_smile.png", id:"ganger_smile"},
		{src:"image/production/createjs/epilogue/hakureiShrine.png", id:"hakureiShrine"},
		{src:"image/production/createjs/epilogue/merry_sad.png", id:"merry_sad"},
		{src:"image/production/createjs/epilogue/renko_anger.png", id:"renko_anger"},
		{src:"image/production/createjs/epilogue/renko_calm_blood.png", id:"renko_calm_blood"},
		{src:"image/production/createjs/epilogue/renko_nomal_blood.png", id:"renko_nomal_blood"},
		{src:"image/production/createjs/epilogue/renko_pain.png", id:"renko_pain"},
		{src:"image/production/createjs/epilogue/renko_pain_blood.png", id:"renko_pain_blood"},
		{src:"image/production/createjs/epilogue/renko_smile_blood.png", id:"renko_smile_blood"},
		{src:"image/production/createjs/epilogue/renko_troubled_blood.png", id:"renko_troubled_blood"},
		{src:"image/production/createjs/epilogue/RO.png", id:"RO"},
		{src:"image/production/createjs/epilogue/voice1.png", id:"voice1"},
		{src:"image/production/createjs/epilogue/voice3.png", id:"voice3"},
		{src:"image/production/createjs/epilogue/WO.png", id:"WO"},
		// スタッフロール
		{src:"image/production/createjs/staffroll/bg.png", id:"bg"},
		{src:"image/production/createjs/staffroll/BO.png", id:"BO"},
		{src:"image/production/createjs/staffroll/e01.png", id:"e01"},
		{src:"image/production/createjs/staffroll/e02.png", id:"e02"},
		{src:"image/production/createjs/staffroll/e03.png", id:"e03"},
		{src:"image/production/createjs/staffroll/e04.png", id:"e04"},
		{src:"image/production/createjs/staffroll/e05.png", id:"e05"},
		{src:"image/production/createjs/staffroll/e06.png", id:"e06"},
		{src:"image/production/createjs/staffroll/renko_d.png", id:"renko_d"},
		{src:"image/production/createjs/staffroll/renko_d_sil.png", id:"renko_d_sil"},
		{src:"image/production/createjs/staffroll/s01.png", id:"s01"},
		{src:"image/production/createjs/staffroll/s02.png", id:"s02"},
		{src:"image/production/createjs/staffroll/s03.png", id:"s03"},
		{src:"image/production/createjs/staffroll/s04.png", id:"s04"},
		{src:"image/production/createjs/staffroll/s05.png", id:"s05"},
		{src:"image/production/createjs/staffroll/s06.png", id:"s06"},
		{src:"image/production/createjs/staffroll/s07.png", id:"s07"},
		// エンド
		{src:"image/production/createjs/end/BO.png", id:"BO"},
		{src:"image/production/createjs/end/end_A.png", id:"end_A"},
		{src:"image/production/createjs/end/l01.png", id:"l01"},
		{src:"image/production/createjs/end/l02.png", id:"l02"},
		{src:"image/production/createjs/end/l03.png", id:"l03"},
		{src:"image/production/createjs/end/l04.png", id:"l04"},
		{src:"image/production/createjs/end/l05.png", id:"l05"},
		{src:"image/production/createjs/end/l06.png", id:"l06"},
		{src:"image/production/createjs/end/l07.png", id:"l07"},
		{src:"image/production/createjs/end/l08.png", id:"l08"},
		{src:"image/production/createjs/end/l09.png", id:"l09"},
		{src:"image/production/createjs/end/l10.png", id:"l10"},
		{src:"image/production/createjs/end/l11.png", id:"l11"},
		{src:"image/production/createjs/end/l12.png", id:"l12"},
		{src:"image/production/createjs/end/l13.png", id:"l13"},
		{src:"image/production/createjs/end/l14.png", id:"l14"},
		{src:"image/production/createjs/end/l15.png", id:"l15"},
		{src:"image/production/createjs/end/l16.png", id:"l16"},
		{src:"image/production/createjs/end/l17.png", id:"l17"},
		{src:"image/production/createjs/end/l18.png", id:"l18"},
		{src:"image/production/createjs/end/l19.png", id:"l19"},
		{src:"image/production/createjs/end/l20.png", id:"l20"},
		{src:"image/production/createjs/end/l21.png", id:"l21"},
		{src:"image/production/createjs/end/last.png", id:"last"},
		{src:"image/production/createjs/end/WO.png", id:"WO"},
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
			volume: 0.25
		},
		boss_shot_big: {
			id: 0x04,
			path: 'sound/boss_shot_big.wav',
			volume: 0.25
		},
		spellcard: {
			id: 0x08,
			path: 'sound/spellcard.wav',
			volume: 0.30
		},
		dead: {
			id: 0x10,
			path: 'sound/dead.wav',
			volume: 0.15
		},
		enemy_vanish: {
			id: 0x20,
			path: 'sound/enemy_vanish.wav',
			volume: 0.2
		},
		graze: {
			id: 0x40,
			path: 'sound/graze.wav',
			volume: 0.4
		},
		powerup: {
			id: 0x80,
			path: 'sound/powerup.wav',
			volume: 0.8
		},
		kirakira: {
			id: 0x100,
			path: 'sound/kira2.wav',
			volume: 0.4
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

	// BGM ファイルはogg と m4a の二種類を用意してください
	BGMS:{
		title: {
			path:   'bgm/trial/title',
			volume: 0.40,
			loopStart: 29.142,
			loopEnd: 60 * 1 + 24.000,
		},
		prologue: {
			path:   'bgm/trial/prologue',
			volume: 0.40,
			loopStart: 7.500,
			loopEnd: 60 * 2 + 14.999,
		},
		douchu: {
			path:   'bgm/trial/douchu',
			volume: 0.40,
			loopStart: 60 * 1 + 39.096,
			loopEnd: 60 * 3 + 18.193,
		},
		stage1: {
			path:   'bgm/trial/stage1',
			volume: 0.50,
			loopStart: 41.379,
			loopEnd: 60 * 2 + 0.827,
		},
		stage2: {
			path:   'bgm/production/stage2',
			volume: 0.50,
			loopStart: 54.857,
			loopEnd: 60 * 3 + 12,
		},
		stage3: {
			path:   'bgm/production/stage3',
			volume: 0.50,
			loopStart: 0.103,
			loopEnd: 60 * 6 + 37.344,
		},
		stage4: {
			path:   'bgm/production/stage4',
			volume: 0.50,
			loopStart: 60 * 2 + 10.909,
			loopEnd: 60 * 3 + 38.181,
		},
		stage5: {
			path:   'bgm/production/stage5',
			volume: 0.50,
			loopStart: 60 * 2 + 8,
			loopEnd: 60 * 3 + 12,
		},
		epilogue: {
			path:   'bgm/production/epilogue',
			volume: 0.40,
		},
		staffroll: {
			path:   'bgm/trial/title', // タイトル曲と同じ
			volume: 0.40,
		},
		ending: {
			path:   'bgm/production/ending',
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
