(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over eachother's state.

  If you want to use this as a substitute for Math.random(), use the random()
  method like so:

  var m = new MersenneTwister();
  var randomNumber = m.random();

  You can also call the other genrand_{foo}() methods on the instance.

  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:

  var m = new MersenneTwister(123);

  and that will always produce the same random sequence.

  Sean McCullough (banksean@gmail.com)
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_seed(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var MersenneTwister = function(seed) {
	if (seed == undefined) {
		seed = new Date().getTime();
	}

	/* Period parameters */
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	if (seed.constructor == Array) {
		this.init_by_array(seed, seed.length);
	}
	else {
		this.init_seed(seed);
	}
}

/* initializes mt[N] with a seed */
/* origin name init_genrand */
MersenneTwister.prototype.init_seed = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
}

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_seed(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
}

/* generates a random number on [0,0xffffffff]-interval */
/* origin name genrand_int32 */
MersenneTwister.prototype.random_int = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)  /* if init_seed() has not been called, */
			this.init_seed(5489);  /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
}

/* generates a random number on [0,0x7fffffff]-interval */
/* origin name genrand_int31 */
MersenneTwister.prototype.random_int31 = function() {
	return (this.random_int()>>>1);
}

/* generates a random number on [0,1]-real-interval */
/* origin name genrand_real1 */
MersenneTwister.prototype.random_incl = function() {
	return this.random_int()*(1.0/4294967295.0);
	/* divided by 2^32-1 */
}

/* generates a random number on [0,1)-real-interval */
MersenneTwister.prototype.random = function() {
	return this.random_int()*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on (0,1)-real-interval */
/* origin name genrand_real3 */
MersenneTwister.prototype.random_excl = function() {
	return (this.random_int() + 0.5)*(1.0/4294967296.0);
	/* divided by 2^32 */
}

/* generates a random number on [0,1) with 53-bit resolution*/
/* origin name genrand_res53 */
MersenneTwister.prototype.random_long = function() {
	var a=this.random_int()>>>5, b=this.random_int()>>>6;
	return(a*67108864.0+b)*(1.0/9007199254740992.0);
}

/* These real versions are due to Isaku Wada, 2002/01/09 added */

module.exports = MersenneTwister;

},{}],2:[function(require,module,exports){
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

	// sound ファイルはogg と m4a の二種類を用意してください
	SOUNDS: {
		select: {
			id: 0x01,
			path:   'sound/select',
			volume: 0.80
		},
		boss_shot_small: {
			id: 0x02,
			path: 'sound/boss_shot_small',
			volume: 0.25
		},
		boss_shot_big: {
			id: 0x04,
			path: 'sound/boss_shot_big',
			volume: 0.25
		},
		spellcard: {
			id: 0x08,
			path: 'sound/spellcard',
			volume: 0.30
		},
		dead: {
			id: 0x10,
			path: 'sound/dead',
			volume: 0.15
		},
		enemy_vanish: {
			id: 0x20,
			path: 'sound/enemy_vanish',
			volume: 0.2
		},
		graze: {
			id: 0x40,
			path: 'sound/graze',
			volume: 0.4
		},
		powerup: {
			id: 0x80,
			path: 'sound/powerup',
			volume: 0.8
		},
		kirakira: {
			id: 0x100,
			path: 'sound/kira2',
			volume: 0.4
		},
		boss_powerup: {
			id: 0x200,
			path: 'sound/boss_powerup',
			volume: 1.0
		},

		/*
		shot: {
			id: 0x02,
			path: 'sound/shot',
			volume: 0.08
		},
	   */
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

// 画像素材(体験版)
Config.IMAGES = {
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

	stage1_bg: 'image/trial/stage1_bg.png',
	shadow:      'image/trial/shadow.png',
	character_renko: 'image/trial/character_renko.png',
	boss_aya:        'image/trial/boss_aya.png',
	shot:      'image/trial/shot.png',
	shot2:      'image/trial/shot2.png',
	beam:      'image/trial/beam.png',
	item:      'image/trial/item.png',

	enemy:     'image/trial/enemy.png',


	magic_circle:     'image/trial/magic_circle.png',
};

// 画像(完成版)
if (!Config.TRIAL) {
	Object.assign(Config.IMAGES, {
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

		// 名前プレート
		name_yuuka:  'image/production/name_yuuka.png',
		name_sanae:  'image/production/name_sanae.png',
		name_yukari: 'image/production/name_yukari.png',

		stage2_bg: 'image/production/stage2_bg.png',
		stage3_bg: 'image/production/stage3_bg.png',
		stage4_bg: 'image/production/stage4_bg.png',
		stage5_bg: 'image/production/stage5_bg.png',

		boss_sanae:      'image/production/boss_sanae.png',
		boss_yuuka:      'image/production/boss_yuuka.png',
		boss_yukari:     'image/production/boss_yukari.png',
		boss_merry:      'image/production/boss_merry.png',
	});
}

Config.CJS_IMAGES = [
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
];

if(!Config.TRIAL) {
	Config.CJS_IMAGES.push(
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
		{src:"image/production/createjs/end/WO.png", id:"WO"}
	);
}

// BGM ファイルはogg と m4a の二種類を用意してください

// BGM(体験版用)
Config.BGMS = {
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
};

// BGM(完成版)
if (!Config.TRIAL) {
	Object.assign(Config.BGMS, {
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
	});
}

// 全素材数
Config.ALL_MATERIAL_NUM = Object.keys(Config.IMAGES).length + Object.keys(Config.SOUNDS).length + Object.keys(Config.BGMS).length + Config.CJS_IMAGES.length;

module.exports = Config;

},{"./constant":3}],3:[function(require,module,exports){
'use strict';

var Constant = {
	LOADING_SCENE:   0,
	TITLE_SCENE:     1,
	CONFIG_SCENE:    2,
	PROLOGUE2_SCENE: 3,
	STAGE_SCENE:     4,
	EPILOGUE_A_SCENE: 5,
	EPILOGUE_B_SCENE: 6,
	EPILOGUE_C_SCENE: 7,
	STAFFROLL_SCENE:  8,
	END_SCENE:        9,

	BUTTON_LEFT:  0x01,
	BUTTON_UP:    0x02,
	BUTTON_RIGHT: 0x04,
	BUTTON_DOWN:  0x08,
	BUTTON_Z:     0x10,
	BUTTON_X:     0x20,
	BUTTON_SHIFT: 0x40,
	BUTTON_SPACE: 0x80,

	START_STATE:  0,
	WAY_STATE:    1,
	TALK1_STATE:  2,
	BOSS_STATE:   3,
	TALK2_STATE:  4,
	CLEAR_STATE:  5,
	GAMEOVER_STATE: 6,
	PAUSE_STATE: 7,

	SPELLCARD_START_STATE:    0,
	SPELLCARD_BOSSMOVE_STATE: 1,
	SPELLCARD_EXEC_STATE:     2,
	SPELLCARD_END_STATE:      3,

	SHOT_NORMAL_TYPE: 0,
	SHOT_BOMB_TYPE:   1,
	SHOT_OPTION_TYPE: 2,

	BULLET_BALL_BLUE:      10,
	BULLET_BALL_LIMEGREEN: 11,

	BULLET_TINY_RED:       22,
	BULLET_TINY_LIMEGREEN: 23,
	BULLET_TINY_BLUE:      24,
	BULLET_TINY_YELLOW:    25,
	BULLET_TINY_AQUA:      26,
	BULLET_TINY_ORANGE:    27,
	BULLET_TINY_PURPLE:    28,
	BULLET_TINY_GRAY:      29,

	BULLET_DOUBLEBALL_RED: 38,
	BULLET_DOUBLEBALL_PURPLE: 39,

	BULLET_BIG_ORANGE:     49,
	BULLET_BIG_LIMEGREEN:  40,
	BULLET_BIG_PURPLE:     41,

	BULLET_KUNAI_RED:      52,
	BULLET_KUNAI_PURPLE:   53,
	BULLET_KUNAI_LIMEGREEN:54,

	BULLET_BEAM_YELLOW:    64,

	BULLET_BUTTERFLY_ORANGE:    75,
	BULLET_BUTTERFLY_PURPLE:    76,
	BULLET_BUTTERFLY_YELLOW:    77,
	BULLET_BUTTERFLY_BLUE:      78,
	BULLET_BUTTERFLY_LIMEGREEN: 79,
	BULLET_BUTTERFLY_RED:       70,
	BULLET_BUTTERFLY_AQUA:      71,

	ITEM_POWER_TYPE: 0,
	ITEM_SCORE_TYPE:  1,

	ENEMY_PURPLE_NEUTRAL_TYPE: 1,
	ENEMY_RED_NEUTRAL_TYPE:    2,
	ENEMY_BLUE_NEUTRAL_TYPE:   3,
	ENEMY_GREEN_NEUTRAL_TYPE:  4,
};

// デフォルトのキーコンフィグ
Constant.DEFAULT_KEYCONFIG = {
	0: Constant.BUTTON_Z,
	1: Constant.BUTTON_X,
	4: Constant.BUTTON_SHIFT,
	6: Constant.BUTTON_SPACE,
};

module.exports = Constant;

},{}],4:[function(require,module,exports){
'use strict';
require("easeljs");
require("tweenjs");
require("movieclipjs");
require("preloadjs");
var cjs = window.createjs;

module.exports = cjs;

},{"easeljs":98,"movieclipjs":99,"preloadjs":100,"tweenjs":101}],5:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.boss_appearance = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_87 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(87).call(this.frame_87));

	// circle
	this.instance = new lib.circle_motion();
	this.instance.setTransform(480,480);
	this.instance.alpha = 0.602;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27).to({_off:false},0).wait(61));

	// housya
	this.instance_1 = new lib.emlight_motion();
	this.instance_1.setTransform(480,480);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(27).to({_off:false},0).to({_off:true},60).wait(1));

	// maru
	this.instance_2 = new lib.dot_1();
	this.instance_2.setTransform(480,480);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({_off:true},60).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


// symbols:
(lib.circle = function() {
	this.initialize(img.circle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,480);


(lib.dot = function() {
	this.initialize(img.dot);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.emlight = function() {
	this.initialize(img.emlight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.emlight_image = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.emlight();
	this.instance.setTransform(-149.9,-149.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.dot_imge = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.dot();
	this.instance.setTransform(-149.9,-149.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.circle_image = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.circle();
	this.instance.setTransform(-239.9,-239.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-239.9,-239.9,480,480);


(lib.emlight_roll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.emlight_image();
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:360},59).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.emlight_motion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.emlight_roll();
	this.instance.setTransform(0,0,0.47,0.47);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.63,scaleY:1.63,rotation:45,alpha:1},14).to({scaleX:1,scaleY:1,rotation:90,alpha:0},45).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.4,-70.4,140.9,140.9);


(lib.dot_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.dot_imge();
	this.instance.alpha = 0;
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.69,scaleY:1.69,alpha:1},28).to({scaleX:2.43,scaleY:2.43,alpha:0},31).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.circle_roll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.circle_image("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:90},14).to({rotation:180},15).to({rotation:270.1},15).to({rotation:360},15).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.9,-239.9,480,480);


(lib.circle_alpha = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_18 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(18).call(this.frame_18));

	// レイヤー 2
	this.instance = new lib.circle_roll();
	this.instance.setTransform(0,0,1.146,1.146);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},18).wait(1));

	// レイヤー 1
	this.instance_1 = new lib.circle_roll();
	this.instance_1.setTransform(0,0,1.146,1.146);
	this.instance_1.alpha = 0;
	this.instance_1.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({alpha:1},18).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-274.9,-274.9,550,550);


(lib.circle_motion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_165 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(165).call(this.frame_165));

	// レイヤー 1
	this.instance = new lib.circle_alpha();
	this.instance.setTransform(0,0,0.35,0.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.81,scaleY:1.81},68,cjs.Ease.get(1)).to({scaleX:0.93,scaleY:0.93},34,cjs.Ease.get(-0.99)).to({scaleX:0.35,scaleY:0.35},30,cjs.Ease.get(1)).to({scaleX:0.38,scaleY:0.38},16,cjs.Ease.get(-0.99)).to({scaleX:0.4,scaleY:0.4},17,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.2,-96.2,192.5,192.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],6:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.epilog = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_180 = function() {
		//playSound("ending003_MSTwav");
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(180).call(this.frame_180).wait(10458));

	// ed
	this.instance = new lib.end_A_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10298).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// BO
	this.instance_1 = new lib.BO_1("synched",0);
	this.instance_1.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},59).wait(10580));

	// l01.png
	this.instance_2 = new lib.l01_1("synched",0);
	this.instance_2.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(401).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(9848));

	// l02.png
	this.instance_3 = new lib.l02_1("synched",0);
	this.instance_3.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(833).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(338).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(9388));

	// l03.png
	this.instance_4 = new lib.l03_1("synched",0);
	this.instance_4.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1293).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8956));

	// l04.png
	this.instance_5 = new lib.l04_1("synched",0);
	this.instance_5.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1725).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(346).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8488));

	// l05.png
	this.instance_6 = new lib.l05_1("synched",0);
	this.instance_6.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2193).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(345).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8021));

	// l06.png
	this.instance_7 = new lib.l06_1("synched",0);
	this.instance_7.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2660).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(393).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(7506));

	// l07.png
	this.instance_8 = new lib.l07_1("synched",0);
	this.instance_8.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(3175).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(332).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(7052));

	// l08.png
	this.instance_9 = new lib.l08_1("synched",0);
	this.instance_9.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3629).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(375).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(6555));

	// l09.png
	this.instance_10 = new lib.l09_1("synched",0);
	this.instance_10.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(4126).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(351).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(6082));

	// l10.png
	this.instance_11 = new lib.l10_1("synched",0);
	this.instance_11.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(4599).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(5650));

	// l11.png
	this.instance_12 = new lib.l11_1("synched",0);
	this.instance_12.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(5031).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(397).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(5131));

	// l12.png
	this.instance_13 = new lib.l12_1("synched",0);
	this.instance_13.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(5550).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(4699));

	// l13.png
	this.instance_14 = new lib.l13_1("synched",0);
	this.instance_14.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(5982).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(360).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(4217));

	// l14.png
	this.instance_15 = new lib.l14_1("synched",0);
	this.instance_15.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(6464).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(3785));

	// l15.png
	this.instance_16 = new lib.l15_1("synched",0);
	this.instance_16.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(6896).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(3353));

	// l16.png
	this.instance_17 = new lib.l16_1("synched",0);
	this.instance_17.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(7328).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(424).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(2807));

	// l17.png
	this.instance_18 = new lib.l17_1("synched",0);
	this.instance_18.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(7874).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(349).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(2336));

	// l18.png
	this.instance_19 = new lib.l18_1("synched",0);
	this.instance_19.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(8345).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(393).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(1821));

	// l19.png
	this.instance_20 = new lib.l19_1("synched",0);
	this.instance_20.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(8860).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(1389));

	// l20.png
	this.instance_21 = new lib.l20_1("synched",0);
	this.instance_21.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(9292).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(957));

	// l21.png
	this.instance_22 = new lib.l21_1("synched",0);
	this.instance_22.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(9724).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(525));

	// WO
	this.instance_23 = new lib.WO_1("synched",0);
	this.instance_23.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(59).to({startPosition:0,_off:false},0).wait(121).to({startPosition:0},0).to({alpha:0},119).to({_off:true},1).wait(8701).to({startPosition:0,_off:false},0).to({alpha:1},1187).wait(451));

	// lastcut
	this.instance_24 = new lib.lastcut("synched",0);
	this.instance_24.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({scaleX:0.7,scaleY:0.7},10188).wait(451));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.end_A = function() {
	this.initialize(img.end_A);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.l01 = function() {
	this.initialize(img.l01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l02 = function() {
	this.initialize(img.l02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l03 = function() {
	this.initialize(img.l03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l04 = function() {
	this.initialize(img.l04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l05 = function() {
	this.initialize(img.l05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l06 = function() {
	this.initialize(img.l06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l07 = function() {
	this.initialize(img.l07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l08 = function() {
	this.initialize(img.l08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l09 = function() {
	this.initialize(img.l09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l10 = function() {
	this.initialize(img.l10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l11 = function() {
	this.initialize(img.l11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l12 = function() {
	this.initialize(img.l12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l13 = function() {
	this.initialize(img.l13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l14 = function() {
	this.initialize(img.l14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l15 = function() {
	this.initialize(img.l15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l16 = function() {
	this.initialize(img.l16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l17 = function() {
	this.initialize(img.l17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l18 = function() {
	this.initialize(img.l18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l19 = function() {
	this.initialize(img.l19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l20 = function() {
	this.initialize(img.l20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l21 = function() {
	this.initialize(img.l21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.last = function() {
	this.initialize(img.last);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.WO_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.lastcut = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.last();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.l21_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l21();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l20_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l20();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l19_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l19();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l18_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l18();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l17_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l17();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l16_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l16();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l15_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l15();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l14_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l13_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l13();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l12_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l12();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l11_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l11();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l10_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l09();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l08_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l08();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.end_A_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_A();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,150,30);


(lib.BO_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],7:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_A = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// BO
	this.instance = new lib.bo("synched",0);
	this.instance.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(10032).to({startPosition:0,_off:false},0).to({alpha:1},20).wait(153));

	// RO
	this.instance_1 = new lib.ro("synched",0);
	this.instance_1.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(478).to({startPosition:0,_off:false},0).to({alpha:0},6).to({_off:true},1).wait(386).to({alpha:1,_off:false},0).to({alpha:0},6).to({_off:true},1).wait(9417));

	// WO
	this.instance_2 = new lib.wo("synched",0);
	this.instance_2.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7362).to({startPosition:0,_off:false},0).to({alpha:1},67).wait(595).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2210));

	// textmask_1
	this.instance_3 = new lib.wo("synched",0);
	this.instance_3.setTransform(312,69,0.375,0.063,0,0,180,320,240);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(198).to({startPosition:0,_off:false},0).to({regX:318.9,scaleX:0.17,x:378.7},28).to({_off:true},1).wait(264).to({regX:320,scaleX:0.38,x:312,_off:false},0).to({scaleX:0.23,x:358.3},4).to({_off:true},1).wait(92).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(6).to({regX:320,scaleX:0.38,x:312},0).to({scaleX:0.2,x:368.3},15).to({_off:true},1).wait(392).to({scaleX:0.38,x:312,_off:false},0).to({scaleX:0.19,x:370},33).to({_off:true},1).wait(334).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(4).to({regX:320,scaleX:0.38,x:312},0).to({regX:319.2,scaleX:0.03,x:423.4},29).to({_off:true},1).wait(224).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(10).to({regX:320,scaleX:0.38,x:312},0).to({regX:319.2,scaleX:0.03,x:423.4},34).to({_off:true},1).wait(287).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(4).to({startPosition:0},0).to({regX:319.2,scaleX:0.03,x:423.4},27).to({_off:true},1).wait(195).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(10).to({startPosition:0},0).to({regX:319.2,scaleX:0.03,x:423.4},30).to({_off:true},1).wait(211).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.2,scaleX:0.19,x:371.1},26).to({_off:true},1).wait(241).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({scaleX:0.19,x:372.5},19).to({_off:true},1).wait(347).to({regX:320.1,scaleX:0.36,x:315.8,_off:false},0).wait(4).to({scaleX:0.37,x:315.2},0).to({regX:319.9,scaleX:0.11,x:398},30).to({_off:true},1).wait(342).to({regX:320.1,scaleX:0.37,x:313.9,_off:false},0).wait(9).to({regX:319.9,scaleX:0.37,x:314.2},0).to({regX:320,scaleX:0.26,x:348.9},5).to({_off:true},1).wait(297).to({regX:319.9,scaleX:0.37,x:313.9,_off:false},0).wait(5).to({regX:320,scaleX:0.37,x:314.2},0).to({regX:320.2,scaleX:0.16,x:381.1},15).to({_off:true},1).wait(383).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(8).to({startPosition:0},0).to({scaleX:0.22,x:360.5},21).to({_off:true},1).wait(314).to({scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({regX:320.3,scaleX:0.07,x:408.9},43).to({_off:true},1).wait(377).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({scaleX:0.28,x:341.2},10).to({_off:true},1).wait(333).to({scaleX:0.37,x:315.2,_off:false},0).wait(7).to({regX:320.1,x:315.1},0).to({regX:319.9,scaleX:0.25,x:352},15).to({_off:true},1).wait(243).to({regX:320,scaleX:0.36,x:315.4,_off:false},0).wait(10).to({scaleX:0.37},0).to({regX:319.8,scaleX:0.13,x:389.5},20).to({_off:true},1).wait(165).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({regX:326.2,scaleX:0,x:430.9},39).to({_off:true},1).wait(336).to({regX:320,scaleX:0.37,x:315.4,_off:false},0).wait(6).to({regX:319.9,scaleX:0.36,x:315.8},0).to({regX:319.7,scaleX:0.07,x:411},32).to({_off:true},1).wait(328).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.7,scaleX:0.09,x:403.9},34).to({_off:true},1).wait(297).to({regX:319.9,scaleX:0.37,x:315.2,_off:false},0).wait(5).to({scaleX:0.36,x:315.8},0).to({regX:320,scaleX:0.15,x:385.4},26).to({_off:true},1).wait(235).to({scaleX:0.38,x:312,_off:false},0).wait(7).to({startPosition:0},0).to({scaleX:0.17,x:378.4},20).to({_off:true},1).wait(3161));

	// textmask_2
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(198).to({startPosition:0,_off:false},0).wait(57).to({startPosition:0},0).to({regX:319.2,scaleX:0.16,x:414.6},30).to({_off:true},1).wait(302).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(50).to({startPosition:0},0).to({regX:319.9,scaleX:0.21,x:397.5},28).to({_off:true},1).wait(335).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(70).to({startPosition:0},0).to({regX:319.9,scaleX:0.29,x:370.8},31).to({_off:true},1).wait(1335).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(46).to({startPosition:0},0).to({scaleX:0.16,x:414.5},30).to({_off:true},1).wait(196).to({scaleX:0.43,x:328,_off:false},0).wait(39).to({startPosition:0},0).to({scaleX:0.21,x:398},30).to({_off:true},1).wait(301).to({scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({scaleX:0.19,x:404.5},32).to({_off:true},1).wait(283).to({scaleX:0.43,x:328,_off:false},0).wait(44).to({startPosition:0},0).to({scaleX:0.3,x:369.7},10).to({_off:true},1).wait(257).to({scaleX:0.43,x:328,_off:false},0).wait(37).to({startPosition:0},0).to({regX:319.6,scaleX:0.05,x:447},42).to({_off:true},1).wait(324).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(49).to({startPosition:0},0).to({scaleX:0.16,x:412.7},36).to({_off:true},1).wait(258).to({scaleX:0.43,x:328,_off:false},0).wait(64).to({startPosition:0},0).to({regX:317.8,scaleX:0.01,x:461.1},49).to({_off:true},1).wait(311).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(27).to({startPosition:0},0).to({scaleX:0.15,x:415.5},26).to({_off:true},1).wait(756).to({scaleX:0.43,x:328,_off:false},0).wait(72).to({startPosition:0},0).to({scaleX:0.08,x:437.6},36).to({_off:true},1).wait(271).to({scaleX:0.43,x:328,_off:false},0).wait(66).to({startPosition:0},0).to({regX:319.9,scaleX:0.15,x:415.8},34).to({_off:true},1).wait(266).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(82).to({startPosition:0},0).to({regX:319.8,scaleX:0.14,x:419.7},40).to({_off:true},1).wait(214).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({regX:319.9,scaleX:0.29,x:371.3},15).to({_off:true},1).wait(3379));

	// textmask_3
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(198).to({startPosition:0,_off:false},0).wait(94).to({startPosition:0},0).to({regX:318.8,scaleX:0.12,x:393.4},31).to({_off:true},1).wait(678).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(149).to({startPosition:0},0).to({scaleX:0.22,x:361.3},29).to({_off:true},1).wait(1531).to({scaleX:0.38,x:312,_off:false},0).wait(97).to({startPosition:0},0).to({regX:319.4,scaleX:0.01,x:429.5},37).to({_off:true},1).wait(236).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(127).to({startPosition:0},0).to({regX:320.1,scaleX:0.03,x:422.5},34).to({_off:true},1).wait(215).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(83).to({startPosition:0},0).to({scaleX:0.07,x:409},10).to({_off:true},1).wait(218).to({scaleX:0.38,x:312,_off:false},0).wait(121).to({startPosition:0},0).to({regX:318.6,scaleX:0.02,x:427.3},46).to({_off:true},1).wait(236).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(124).to({startPosition:0},0).to({scaleX:0.19,x:370.8},26).to({_off:true},1).wait(193).to({scaleX:0.38,x:312,_off:false},0).wait(163).to({startPosition:0},0).to({scaleX:0.06,x:412.2},35).to({_off:true},1).wait(226).to({scaleX:0.38,x:312,_off:false},0).wait(93).to({startPosition:0},0).to({regX:319.8,scaleX:0.14,x:387.3},34).to({_off:true},1).wait(682).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(158).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:377.7},22).to({_off:true},1).wait(199).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(120).to({startPosition:0},0).to({scaleX:0.09,x:402},36).to({_off:true},1).wait(210).to({scaleX:0.38,x:312,_off:false},0).wait(136).to({startPosition:0},0).to({regX:320.2,scaleX:0.17,x:379.2},29).to({_off:true},1).wait(3627));

	// text
	this.instance_6 = new lib.A01();
	this.instance_6.setTransform(80,0,0.5,0.5);

	this.instance_7 = new lib.A02();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.A03();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.A04();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.A05();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.A06();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.A07();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.A08();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.A09();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.instance_15 = new lib.A10();
	this.instance_15.setTransform(80,0,0.5,0.5);

	this.instance_16 = new lib.A11();
	this.instance_16.setTransform(80,0,0.5,0.5);

	this.instance_17 = new lib.A12();
	this.instance_17.setTransform(80,0,0.5,0.5);

	this.instance_18 = new lib.A13();
	this.instance_18.setTransform(80,0,0.5,0.5);

	this.instance_19 = new lib.A14();
	this.instance_19.setTransform(80,0,0.5,0.5);

	this.instance_20 = new lib.A15();
	this.instance_20.setTransform(80,0,0.5,0.5);

	this.instance_21 = new lib.A16();
	this.instance_21.setTransform(80,0,0.5,0.5);

	this.instance_22 = new lib.A17();
	this.instance_22.setTransform(80,0,0.5,0.5);

	this.instance_23 = new lib.A18();
	this.instance_23.setTransform(80,0,0.5,0.5);

	this.instance_24 = new lib.A19();
	this.instance_24.setTransform(80,0,0.5,0.5);

	this.instance_25 = new lib.A20();
	this.instance_25.setTransform(80,0,0.5,0.5);

	this.instance_26 = new lib.A21();
	this.instance_26.setTransform(80,0,0.5,0.5);

	this.instance_27 = new lib.A22();
	this.instance_27.setTransform(80,0,0.5,0.5);

	this.instance_28 = new lib.A23();
	this.instance_28.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},198).to({state:[]},280).to({state:[{t:this.instance_7}]},13).to({state:[{t:this.instance_8}]},97).to({state:[]},284).to({state:[{t:this.instance_9}]},130).to({state:[{t:this.instance_10}]},368).to({state:[{t:this.instance_11}]},258).to({state:[]},246).to({state:[{t:this.instance_12}]},86).to({state:[{t:this.instance_13}]},227).to({state:[{t:this.instance_14}]},252).to({state:[{t:this.instance_15}]},273).to({state:[{t:this.instance_16}]},371).to({state:[{t:this.instance_17}]},377).to({state:[{t:this.instance_18}]},312).to({state:[{t:this.instance_19}]},404).to({state:[{t:this.instance_20}]},344).to({state:[{t:this.instance_21}]},425).to({state:[{t:this.instance_22}]},348).to({state:[]},142).to({state:[{t:this.instance_23}]},124).to({state:[{t:this.instance_24}]},196).to({state:[{t:this.instance_25}]},380).to({state:[{t:this.instance_26}]},367).to({state:[{t:this.instance_27}]},337).to({state:[{t:this.instance_28}]},267).to({state:[]},203).wait(2986));

	// voice_base03
	this.instance_29 = new lib.voice_3("synched",0);
	this.instance_29.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(478).to({startPosition:0,_off:false},0).to({_off:true},110).wait(2872).to({skewY:180,_off:false},0).to({_off:true},716).wait(6119));

	// voice_base01
	this.instance_30 = new lib.voice_1("synched",0);
	this.instance_30.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(188).to({startPosition:0,_off:false},0).to({_off:true},290).wait(110).to({startPosition:0,_off:false},0).to({_off:true},284).wait(115).to({startPosition:0,_off:false},0).to({_off:true},887).wait(80).to({skewY:180,_off:false},0).wait(233).to({skewY:0},0).wait(252).to({skewY:180},0).wait(273).to({skewY:0},0).wait(371).to({skewY:180},0).to({_off:true},377).wait(716).to({skewY:0,_off:false},0).wait(1117).to({skewY:180},0).to({_off:true},142).wait(124).to({startPosition:0,_off:false},0).wait(196).to({skewY:0},0).wait(380).to({skewY:180},0).wait(367).to({skewY:0},0).wait(337).to({skewY:180},0).wait(267).to({skewY:0},0).to({_off:true},203).wait(2986));

	// anger.png
	this.instance_31 = new lib.renko_anger_1("single",0);
	this.instance_31.setTransform(67.5,382,1,1,0,0,0,178.5,250);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(155).to({startPosition:0,_off:false},0).wait(1).to({x:76.2,alpha:0.078},0).wait(1).to({x:84.5,alpha:0.148},0).wait(1).to({x:92.6,alpha:0.23},0).wait(1).to({x:100.3,alpha:0.301},0).wait(1).to({x:107.7,alpha:0.359},0).wait(1).to({x:114.7,alpha:0.43},0).wait(1).to({x:121.4,alpha:0.48},0).wait(1).to({x:127.7,alpha:0.539},0).wait(1).to({x:133.7,alpha:0.602},0).wait(1).to({x:139.2,alpha:0.641},0).wait(1).to({x:144.4,alpha:0.691},0).wait(1).to({x:149.3,alpha:0.73},0).wait(1).to({x:153.7,alpha:0.781},0).wait(1).to({x:157.7,alpha:0.809},0).wait(1).to({x:161.4,alpha:0.852},0).wait(1).to({x:164.7,alpha:0.879},0).wait(1).to({x:167.7,alpha:0.898},0).wait(1).to({x:170.3,alpha:0.93},0).wait(1).to({x:172.5,alpha:0.949},0).wait(1).to({x:174.4,alpha:0.961},0).wait(1).to({x:175.9,alpha:0.98},0).wait(1).to({x:177,alpha:0.988},0).wait(1).to({x:177.9},0).wait(1).to({x:178.4,alpha:1},0).wait(1).to({x:178.5},0).to({_off:true},298).wait(9817));

	// pain.png
	this.instance_32 = new lib.renko_pain_1("single",0);
	this.instance_32.setTransform(169.9,386.5,1,1,0,0,0,178.5,250);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(478).to({startPosition:0,_off:false},0).wait(3).to({x:186.3,y:375.4},0).wait(3).to({x:170.7,y:375.5},0).wait(3).to({x:183.1,y:386.2},0).wait(3).to({x:178.5,y:382},0).wait(402).to({startPosition:0},0).to({alpha:0},6).to({_off:true},1).wait(9396));

	// pain_blood.png
	this.instance_33 = new lib.renko_pain_blood_1("single",0);
	this.instance_33.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(872).to({startPosition:0,_off:false},0).to({_off:true},756).wait(8667));

	// troubled_blood.png
	this.instance_34 = new lib.renko_troubled_blood_1("single",0);
	this.instance_34.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1628).to({startPosition:0,_off:false},0).wait(326).to({startPosition:1},0).wait(233).to({startPosition:0},0).wait(252).to({startPosition:1},0).to({_off:true},273).wait(748).to({startPosition:1,_off:false},0).to({_off:true},716).wait(6119));

	// calm_blood.png
	this.instance_35 = new lib.renko_calm_blood_1("single",0);
	this.instance_35.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(2712).to({startPosition:0,_off:false},0).wait(371).to({startPosition:1},0).to({_off:true},377).wait(716).to({startPosition:0,_off:false},0).to({_off:true},344).wait(773).to({startPosition:1,_off:false},0).to({_off:true},462).wait(4540));

	// smile_blood.png
	this.instance_36 = new lib.renko_smile_blood_1("single",0);
	this.instance_36.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(4520).to({startPosition:0,_off:false},0).to({_off:true},773).wait(5002));

	// nomal_blood.png
	this.instance_37 = new lib.renko_nomal_blood_1("single",0);
	this.instance_37.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(5755).to({startPosition:0,_off:false},0).wait(380).to({startPosition:1},0).wait(367).to({startPosition:0},0).wait(337).to({startPosition:1},0).wait(267).to({startPosition:0},0).wait(203).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:178.6},0).wait(1).to({startPosition:0},0).wait(1).to({x:178.7},0).wait(1).to({x:178.9},0).wait(1).to({x:179},0).wait(1).to({x:179.2},0).wait(1).to({x:179.4},0).wait(1).to({x:179.6},0).wait(1).to({x:179.9},0).wait(1).to({x:180.2},0).wait(1).to({x:180.5},0).wait(1).to({x:180.9},0).wait(1).to({x:181.2},0).wait(1).to({x:181.6},0).wait(1).to({x:182.1},0).wait(1).to({x:182.5},0).wait(1).to({x:183},0).wait(1).to({x:183.5},0).wait(1).to({x:184.1},0).wait(1).to({x:184.7},0).wait(1).to({x:185.3},0).wait(1).to({x:185.9},0).wait(1).to({x:186.6},0).wait(1).to({x:187.3},0).wait(1).to({x:188},0).wait(1).to({x:188.7},0).wait(1).to({x:189.5},0).wait(1).to({x:190.3},0).wait(1).to({x:191.1},0).wait(1).to({x:192},0).wait(1).to({x:192.9},0).wait(1).to({x:193.8},0).wait(1).to({x:194.7},0).wait(1).to({x:195.7},0).wait(1).to({x:196.6},0).wait(1).to({x:197.6},0).wait(1).to({x:198.7},0).wait(1).to({x:199.7},0).wait(1).to({x:200.8},0).wait(1).to({x:201.9},0).wait(1).to({x:203},0).wait(1).to({x:204.2},0).wait(1).to({x:205.3},0).wait(1).to({x:206.5},0).wait(1).to({x:207.7},0).wait(1).to({x:208.9},0).wait(1).to({x:210.2},0).wait(1).to({x:211.4},0).wait(1).to({x:212.7},0).wait(1).to({x:214},0).wait(1).to({x:215.3},0).wait(1).to({x:216.6},0).wait(1).to({x:217.9},0).wait(1).to({x:219.3},0).wait(1).to({x:220.6},0).wait(1).to({x:222},0).wait(1).to({x:223.4},0).wait(1).to({x:224.7},0).wait(1).to({x:226.1},0).wait(1).to({x:227.5},0).wait(1).to({x:228.9},0).wait(1).to({x:230.3},0).wait(1).to({x:231.7},0).wait(1).to({x:233},0).wait(1).to({x:234.4},0).wait(1).to({x:235.8},0).wait(1).to({x:237.2},0).wait(1).to({x:238.6},0).wait(1).to({x:240},0).wait(1).to({x:241.3},0).wait(1).to({x:242.7},0).wait(1).to({x:244},0).wait(1).to({x:245.4},0).wait(1).to({x:246.7},0).wait(1).to({x:248},0).wait(1).to({x:249.3},0).wait(1).to({x:250.6},0).wait(1).to({x:251.9},0).wait(1).to({x:253.1},0).wait(1).to({x:254.3},0).wait(1).to({x:255.5},0).wait(1).to({x:256.7},0).wait(1).to({x:257.9},0).wait(1).to({x:259.1},0).wait(1).to({x:260.2},0).wait(1).to({x:261.3},0).wait(1).to({x:262.3},0).wait(1).to({x:263.4},0).wait(1).to({x:264.4},0).wait(1).to({x:265.4},0).wait(1).to({x:266.4},0).wait(1).to({x:267.3},0).wait(1).to({x:268.2},0).wait(1).to({x:269.1},0).wait(1).to({x:269.9},0).wait(1).to({x:270.7},0).wait(1).to({x:271.5},0).wait(1).to({x:272.3},0).wait(1).to({x:273},0).wait(1).to({x:273.7},0).wait(1).to({x:274.3},0).wait(1).to({x:274.9},0).wait(1).to({x:275.5},0).wait(1).to({x:276},0).wait(1).to({x:276.6},0).wait(1).to({x:277},0).wait(1).to({x:277.5},0).wait(1).to({x:277.9},0).wait(1).to({x:278.3},0).wait(1).to({x:278.6},0).wait(1).to({x:278.9},0).wait(1).to({x:279.2},0).wait(1).to({x:279.4},0).wait(1).to({x:279.6},0).wait(1).to({x:279.7},0).wait(1).to({x:279.9},0).wait(1).to({x:280},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},62).wait(2804));

	// sad.png
	this.instance_38 = new lib.merry_sad_1("single",0);
	this.instance_38.setTransform(542.5,382,1,1,0,0,0,178.5,250);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(3460).to({startPosition:0,_off:false},0).wait(1).to({x:506.2},0).wait(1).to({x:487},0).wait(1).to({x:475.8},0).wait(1).to({x:469.1},0).wait(1).to({x:465.1},0).wait(1).to({x:462.9},0).wait(1).to({x:461.8},0).wait(1).to({x:461.5},0).wait(1).to({x:455,y:374.3},0).wait(3).to({x:464.1,y:384.1},0).wait(3).to({x:463.9,y:381},0).wait(3).to({x:460.5,y:383.3},0).wait(3).to({x:461.5,y:382},0).wait(695).to({startPosition:1},0).wait(1117).to({startPosition:0},0).wait(186).to({startPosition:0},0).wait(1).to({x:461.7},0).wait(1).to({x:462.1,alpha:0.988},0).wait(1).to({x:462.8,alpha:0.98},0).wait(1).to({x:463.8,alpha:0.969},0).wait(1).to({x:465.1,alpha:0.961},0).wait(1).to({x:466.7,alpha:0.941},0).wait(1).to({x:468.5,alpha:0.91},0).wait(1).to({x:470.5,alpha:0.891},0).wait(1).to({x:472.8,alpha:0.859},0).wait(1).to({x:475.3,alpha:0.828},0).wait(1).to({x:478,alpha:0.801},0).wait(1).to({x:480.9,alpha:0.762},0).wait(1).to({x:484,alpha:0.719},0).wait(1).to({x:487.2,alpha:0.68},0).wait(1).to({x:490.6,alpha:0.641},0).wait(1).to({x:494,alpha:0.602},0).wait(1).to({x:497.6,alpha:0.551},0).wait(1).to({x:501.2,alpha:0.512},0).wait(1).to({x:504.9,alpha:0.461},0).wait(1).to({x:508.7,alpha:0.422},0).wait(1).to({x:512.4,alpha:0.371},0).wait(1).to({x:516.1,alpha:0.328},0).wait(1).to({x:519.8,alpha:0.281},0).wait(1).to({x:523.4,alpha:0.238},0).wait(1).to({x:526.9,alpha:0.191},0).wait(1).to({x:530.3,alpha:0.148},0).wait(1).to({x:533.6,alpha:0.109},0).wait(1).to({x:536.7,alpha:0.07},0).wait(1).to({x:539.7,alpha:0.039},0).wait(1).to({x:542.5,alpha:0},0).to({_off:true},1).wait(4785));

	// nomal.png
	this.instance_39 = new lib.ganger_nomal_1("single",1);
	this.instance_39.setTransform(601.5,382,1,1,0,0,0,178.5,250);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1874).to({startPosition:1,_off:false},0).wait(1).to({x:585.5,alpha:0.109},0).wait(1).to({x:571.5,alpha:0.211},0).wait(1).to({x:559.2,alpha:0.301},0).wait(1).to({x:548.4,alpha:0.379},0).wait(1).to({x:538.8,alpha:0.449},0).wait(1).to({x:530.4,alpha:0.512},0).wait(1).to({x:522.8,alpha:0.559},0).wait(1).to({x:516.1,alpha:0.609},0).wait(1).to({x:510.1,alpha:0.648},0).wait(1).to({x:504.7,alpha:0.691},0).wait(1).to({x:499.8,alpha:0.73},0).wait(1).to({x:495.5,alpha:0.762},0).wait(1).to({x:491.6,alpha:0.789},0).wait(1).to({x:488.1,alpha:0.809},0).wait(1).to({x:485,alpha:0.828},0).wait(1).to({x:482.2,alpha:0.852},0).wait(1).to({x:479.7,alpha:0.871},0).wait(1).to({x:477.4,alpha:0.891},0).wait(1).to({x:475.4,alpha:0.898},0).wait(1).to({x:473.6,alpha:0.91},0).wait(1).to({x:472,alpha:0.93},0).wait(1).to({x:470.5,alpha:0.941},0).wait(1).to({x:469.2,alpha:0.949},0).wait(1).to({x:468.1},0).wait(1).to({x:467.1,alpha:0.961},0).wait(1).to({x:466.2},0).wait(1).to({x:465.4,alpha:0.969},0).wait(1).to({x:464.7,alpha:0.98},0).wait(1).to({x:464.1},0).wait(1).to({x:463.6},0).wait(1).to({x:463.2,alpha:0.988},0).wait(1).to({x:462.8},0).wait(1).to({x:462.5},0).wait(1).to({x:462.2,alpha:1},0).wait(1).to({x:462},0).wait(1).to({x:461.9},0).wait(1).to({x:461.7},0).wait(1).to({x:461.6},0).wait(1).to({startPosition:1},0).wait(1).to({x:461.5},0).wait(1).to({startPosition:1},0).wait(39).to({startPosition:0},0).wait(233).to({startPosition:1},0).wait(252).to({startPosition:0},0).wait(273).to({startPosition:1},0).wait(371).to({startPosition:0},0).to({_off:true},377).wait(2028).to({x:513.6,alpha:0,_off:false},0).wait(1).to({x:508.7,alpha:0.09},0).wait(1).to({x:504.2,alpha:0.18},0).wait(1).to({x:500,alpha:0.262},0).wait(1).to({x:496,alpha:0.34},0).wait(1).to({x:492.3,alpha:0.41},0).wait(1).to({x:488.8,alpha:0.48},0).wait(1).to({x:485.4,alpha:0.539},0).wait(1).to({x:482.3,alpha:0.602},0).wait(1).to({x:479.4,alpha:0.66},0).wait(1).to({x:476.7,alpha:0.711},0).wait(1).to({x:474.2,alpha:0.762},0).wait(1).to({x:471.9,alpha:0.801},0).wait(1).to({x:469.8,alpha:0.84},0).wait(1).to({x:468,alpha:0.879},0).wait(1).to({x:466.3,alpha:0.91},0).wait(1).to({x:464.9,alpha:0.93},0).wait(1).to({x:463.7,alpha:0.961},0).wait(1).to({x:462.8,alpha:0.98},0).wait(1).to({x:462.1,alpha:0.988},0).wait(1).to({x:461.7,alpha:1},0).wait(1).to({x:461.5},0).wait(246).to({startPosition:1},0).to({_off:true},380).wait(4160));

	// smile.png
	this.instance_40 = new lib.ganger_smile_1("single",0);
	this.instance_40.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(6135).to({startPosition:0,_off:false},0).wait(367).to({startPosition:1},0).wait(337).to({startPosition:0},0).wait(267).to({startPosition:0},0).wait(203).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:461.4},0).wait(1).to({x:461.3},0).wait(1).to({x:461.2},0).wait(1).to({x:461},0).wait(1).to({x:460.8},0).wait(1).to({x:460.6},0).wait(1).to({x:460.3},0).wait(1).to({x:460.1},0).wait(1).to({x:459.7},0).wait(1).to({x:459.4},0).wait(1).to({x:459},0).wait(1).to({x:458.6},0).wait(1).to({x:458.2},0).wait(1).to({x:457.7},0).wait(1).to({x:457.2},0).wait(1).to({x:456.7},0).wait(1).to({x:456.2},0).wait(1).to({x:455.6},0).wait(1).to({x:455},0).wait(1).to({x:454.3},0).wait(1).to({x:453.6},0).wait(1).to({x:452.9},0).wait(1).to({x:452.2},0).wait(1).to({x:451.4},0).wait(1).to({x:450.6},0).wait(1).to({x:449.8},0).wait(1).to({x:448.9},0).wait(1).to({x:448.1},0).wait(1).to({x:447.1},0).wait(1).to({x:446.2},0).wait(1).to({x:445.2},0).wait(1).to({x:444.2},0).wait(1).to({x:443.2},0).wait(1).to({x:442.2},0).wait(1).to({x:441.1},0).wait(1).to({x:440},0).wait(1).to({x:438.9},0).wait(1).to({x:437.7},0).wait(1).to({x:436.5},0).wait(1).to({x:435.3},0).wait(1).to({x:434.1},0).wait(1).to({x:432.9},0).wait(1).to({x:431.6},0).wait(1).to({x:430.3},0).wait(1).to({x:429},0).wait(1).to({x:427.7},0).wait(1).to({x:426.3},0).wait(1).to({x:425},0).wait(1).to({x:423.6},0).wait(1).to({x:422.2},0).wait(1).to({x:420.8},0).wait(1).to({x:419.4},0).wait(1).to({x:418},0).wait(1).to({x:416.5},0).wait(1).to({x:415.1},0).wait(1).to({x:413.6},0).wait(1).to({x:412.1},0).wait(1).to({x:410.7},0).wait(1).to({x:409.2},0).wait(1).to({x:407.7},0).wait(1).to({x:406.2},0).wait(1).to({x:404.7},0).wait(1).to({x:403.2},0).wait(1).to({x:401.8},0).wait(1).to({x:400.3},0).wait(1).to({x:398.8},0).wait(1).to({x:397.3},0).wait(1).to({x:395.8},0).wait(1).to({x:394.4},0).wait(1).to({x:392.9},0).wait(1).to({x:391.5},0).wait(1).to({x:390.1},0).wait(1).to({x:388.6},0).wait(1).to({x:387.2},0).wait(1).to({x:385.9},0).wait(1).to({x:384.5},0).wait(1).to({x:383.1},0).wait(1).to({x:381.8},0).wait(1).to({x:380.5},0).wait(1).to({x:379.2},0).wait(1).to({x:377.9},0).wait(1).to({x:376.7},0).wait(1).to({x:375.4},0).wait(1).to({x:374.2},0).wait(1).to({x:373.1},0).wait(1).to({x:371.9},0).wait(1).to({x:370.8},0).wait(1).to({x:369.7},0).wait(1).to({x:368.7},0).wait(1).to({x:367.6},0).wait(1).to({x:366.6},0).wait(1).to({x:365.7},0).wait(1).to({x:364.7},0).wait(1).to({x:363.8},0).wait(1).to({x:363},0).wait(1).to({x:362.1},0).wait(1).to({x:361.3},0).wait(1).to({x:360.6},0).wait(1).to({x:359.8},0).wait(1).to({x:359.1},0).wait(1).to({x:358.5},0).wait(1).to({x:357.9},0).wait(1).to({x:357.3},0).wait(1).to({x:356.7},0).wait(1).to({x:356.2},0).wait(1).to({x:355.7},0).wait(1).to({x:355.3},0).wait(1).to({x:354.9},0).wait(1).to({x:354.6},0).wait(1).to({x:354.2},0).wait(1).to({x:354},0).wait(1).to({x:353.7},0).wait(1).to({x:353.5},0).wait(1).to({x:353.3},0).wait(1).to({x:353.2},0).wait(1).to({x:353.1},0).wait(1).to({x:353},0).wait(1).to({startPosition:0},0).to({_off:true},62).wait(2804));

	// 11.png
	this.instance_41 = new lib.cut11_1("synched",0);
	this.instance_41.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(10062).to({startPosition:0,_off:false},0).to({alpha:1},14).wait(219));

	// 10.png
	this.instance_42 = new lib.cut10_1("synched",0);
	this.instance_42.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(9836).to({startPosition:0,_off:false},0).to({alpha:1},60).to({_off:true},180).wait(219));

	// 09.png
	this.instance_43 = new lib.cut09_1("synched",0);
	this.instance_43.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(9531).to({startPosition:0,_off:false},0).to({alpha:1},31).to({_off:true},334).wait(399));

	// 08.png
	this.instance_44 = new lib.cut08_1("synched",0);
	this.instance_44.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(9341).to({startPosition:0,_off:false},0).to({alpha:1},35).to({_off:true},186).wait(733));

	// 07.png
	this.instance_45 = new lib.cut07_1("synched",0);
	this.instance_45.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(9089).to({startPosition:0,_off:false},0).to({alpha:1},60).to({_off:true},227).wait(919));

	// 06.png
	this.instance_46 = new lib.cut06_1("synched",0);
	this.instance_46.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_46.alpha = 0;
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(8999).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},120).wait(1146));

	// 05.png
	this.instance_47 = new lib.cut05_1("synched",0);
	this.instance_47.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(8849).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},150).wait(1266));

	// 04.png
	this.instance_48 = new lib.cut04_1("synched",0);
	this.instance_48.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_48.alpha = 0;
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(8579).to({startPosition:0,_off:false},0).to({alpha:1},29).to({_off:true},271).wait(1416));

	// 03.png
	this.instance_49 = new lib.cut03_1("synched",0);
	this.instance_49.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_49.alpha = 0;
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(8366).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},213).wait(1686));

	// 02.png
	this.instance_50 = new lib.cut02_1("synched",0);
	this.instance_50.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_50.alpha = 0;
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(8267).to({startPosition:0,_off:false},0).to({alpha:1},39).to({_off:true},90).wait(1899));

	// 01.png
	this.instance_51 = new lib.cut01_1("synched",0);
	this.instance_51.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(8024).to({startPosition:0,_off:false},0).to({_off:true},282).wait(1989));

	// hakureiShrine
	this.instance_52 = new lib.hakureiShrine();
	this.instance_52.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_52}]}).to({state:[]},7430).wait(2865));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.A01 = function() {
	this.initialize(img.A01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A02 = function() {
	this.initialize(img.A02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A03 = function() {
	this.initialize(img.A03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A04 = function() {
	this.initialize(img.A04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A05 = function() {
	this.initialize(img.A05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A06 = function() {
	this.initialize(img.A06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A07 = function() {
	this.initialize(img.A07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A08 = function() {
	this.initialize(img.A08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A09 = function() {
	this.initialize(img.A09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A10 = function() {
	this.initialize(img.A10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A11 = function() {
	this.initialize(img.A11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A12 = function() {
	this.initialize(img.A12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A13 = function() {
	this.initialize(img.A13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A14 = function() {
	this.initialize(img.A14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A15 = function() {
	this.initialize(img.A15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A16 = function() {
	this.initialize(img.A16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A17 = function() {
	this.initialize(img.A17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A18 = function() {
	this.initialize(img.A18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A19 = function() {
	this.initialize(img.A19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A20 = function() {
	this.initialize(img.A20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A21 = function() {
	this.initialize(img.A21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A22 = function() {
	this.initialize(img.A22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A23 = function() {
	this.initialize(img.A23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.cut01 = function() {
	this.initialize(img.cut01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut02 = function() {
	this.initialize(img.cut02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut03 = function() {
	this.initialize(img.cut03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut04 = function() {
	this.initialize(img.cut04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut05 = function() {
	this.initialize(img.cut05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut06 = function() {
	this.initialize(img.cut06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut07 = function() {
	this.initialize(img.cut07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut08 = function() {
	this.initialize(img.cut08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut09 = function() {
	this.initialize(img.cut09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut10 = function() {
	this.initialize(img.cut10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut11 = function() {
	this.initialize(img.cut11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.ganger_nomal = function() {
	this.initialize(img.ganger_nomal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.ganger_smile = function() {
	this.initialize(img.ganger_smile);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.hakureiShrine = function() {
	this.initialize(img.hakureiShrine);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.merry_sad = function() {
	this.initialize(img.merry_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_anger = function() {
	this.initialize(img.renko_anger);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_calm_blood = function() {
	this.initialize(img.renko_calm_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_nomal_blood = function() {
	this.initialize(img.renko_nomal_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_pain = function() {
	this.initialize(img.renko_pain);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_pain_blood = function() {
	this.initialize(img.renko_pain_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_smile_blood = function() {
	this.initialize(img.renko_smile_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_troubled_blood = function() {
	this.initialize(img.renko_troubled_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.RO = function() {
	this.initialize(img.RO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.voice1 = function() {
	this.initialize(img.voice1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.voice3 = function() {
	this.initialize(img.voice3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.wo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.voice_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice3();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.voice_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.ro = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.RO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.renko_troubled_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_troubled_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_smile_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_smile_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_pain_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_pain_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_pain_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_pain();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_nomal_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_nomal_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_calm_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_calm_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_anger_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_anger();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_sad_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_sad();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.ganger_smile_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.ganger_smile();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.ganger_nomal_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.ganger_nomal();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.cut11_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut11();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut10_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut09();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut08_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut08();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.bo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],8:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};

(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_B = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// ed
	this.instance = new lib.end_B_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3654).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// textmask_bk
	this.instance_1 = new lib.bo("synched",0);
	this.instance_1.setTransform(322.5,237.8,0.174,0.063,0,0,0,320.2,240.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3223).to({startPosition:0,_off:false},0).to({regX:320.1,scaleX:0.01,x:373.6},12).to({_off:true},1).wait(276).to({regX:320.2,scaleX:0.17,x:322.5,alpha:0,_off:false},0).to({alpha:1},88).to({_off:true},1).wait(394));

	// voice_b09
	this.instance_2 = new lib.B09();
	this.instance_2.setTransform(262,216,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},3223).to({state:[]},378).wait(394));

	// BO
	this.instance_3 = new lib.bo("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2995).to({startPosition:0,_off:false},0).to({alpha:1},63).wait(847));

	// textmask_1
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(316,69,0.362,0.063,0,0,180,320.1,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(207).to({startPosition:0,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.14,x:387.3},31).to({_off:true},1).wait(267).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(11).to({startPosition:0},0).to({regX:320,scaleX:0.12,x:392.5},43).to({_off:true},1).wait(344).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:378.9},24).to({_off:true},1).wait(305).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},20).to({_off:true},1).wait(314).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320,scaleX:0.13,x:390.8},31).to({_off:true},1).wait(428).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.8,scaleX:0.01,x:428.4},44).to({_off:true},1).wait(292).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.3,scaleX:0.16,x:381.1},30).to({_off:true},1).wait(313).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.2,x:369.5},19).to({_off:true},1).wait(1225));

	// textmask_2
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(207).to({startPosition:0,_off:false},0).wait(66).to({startPosition:0},0).to({regX:319.9,scaleX:0.13,x:422.6},32).to({_off:true},1).wait(207).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(77).to({startPosition:0},0).to({regX:319.6,scaleX:0.05,x:447},44).to({_off:true},1).wait(277).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(56).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:410.9},41).to({_off:true},1).wait(239).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(41).to({startPosition:0},0).to({regX:320.1,scaleX:0.05,x:447.9},42).to({_off:true},1).wait(256).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(57).to({startPosition:0},0).to({scaleX:0.19,x:402.3},28).to({_off:true},1).wait(379).to({scaleX:0.43,x:328,_off:false},0).wait(82).to({startPosition:0},0).to({regX:319.9,scaleX:0.21,x:396.6},29).to({_off:true},1).wait(230).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(53).to({startPosition:0},0).to({scaleX:0.14,x:420.9},36).to({_off:true},1).wait(259).to({scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({regX:319.9,scaleX:0.25,x:385.5},22).to({_off:true},1).wait(1166));

	// textmask_3
	this.instance_6 = new lib.wo("synched",0);
	this.instance_6.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1249).to({startPosition:0,_off:false},0).wait(103).to({startPosition:0},0).to({scaleX:0.06,x:414.4},42).to({_off:true},1).wait(194).to({scaleX:0.38,x:312,_off:false},0).wait(119).to({startPosition:0},0).to({regX:320.2,scaleX:0.03,x:422.7},45).to({_off:true},1).wait(991).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(132).to({startPosition:0},0).to({regX:319.9,scaleX:0.15,x:384.7},31).to({_off:true},1).wait(1086));

	// text
	this.instance_7 = new lib.B01();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.B02();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.B03();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.B04();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.B05();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.B06();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.B07();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.B08();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},207).to({state:[{t:this.instance_8}]},306).to({state:[{t:this.instance_9}]},399).to({state:[{t:this.instance_10}]},337).to({state:[{t:this.instance_11}]},340).to({state:[{t:this.instance_12}]},465).to({state:[{t:this.instance_13}]},342).to({state:[{t:this.instance_14}]},349).wait(1250));

	// voice_base01
	this.instance_15 = new lib.voice_1("synched",0);
	this.instance_15.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(197).to({startPosition:0,_off:false},0).wait(3798));

	// renko_sad.png
	this.instance_16 = new lib.renko_sad_1("single",0);
	this.instance_16.setTransform(178.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16}]}).wait(3995));

	// hakureiShrine
	this.instance_17 = new lib.bg_ED_C();
	this.instance_17.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17}]}).wait(3995));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,632);


// symbols:
(lib.B01 = function() {
	this.initialize(img.B01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B02 = function() {
	this.initialize(img.B02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B03 = function() {
	this.initialize(img.B03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B04 = function() {
	this.initialize(img.B04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B05 = function() {
	this.initialize(img.B05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B06 = function() {
	this.initialize(img.B06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B07 = function() {
	this.initialize(img.B07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B08 = function() {
	this.initialize(img.B08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B09 = function() {
	this.initialize(img.B09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,96);


(lib.bg_ED_C = function() {
	this.initialize(img.bg_ED_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.end_B = function() {
	this.initialize(img.end_B);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.renko_sad = function() {
	this.initialize(img.renko_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.voice1 = function() {
	this.initialize(img.voice1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.wo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.voice_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.renko_sad_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_sad();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.end_B_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_B();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,150,30);


(lib.bo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],9:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_C = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});
	// ed
	this.instance = new lib.end_C_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3982).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// textmask_bk
	this.instance_1 = new lib.bo("synched",0);
	this.instance_1.setTransform(305.8,237.8,0.829,0.063,0,0,0,320,240.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3440).to({startPosition:0,_off:false},0).to({regX:319.4,scaleX:0.02,x:564.7},206).to({_off:true},1).wait(193).to({regX:320,scaleX:0.83,x:305.8,alpha:0,_off:false},0).to({alpha:1},88).to({_off:true},1).wait(394));

	// voice_c14
	this.instance_2 = new lib.C14();
	this.instance_2.setTransform(70,216,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},3440).to({state:[]},489).wait(394));

	// BO
	this.instance_3 = new lib.bo("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(3196).to({startPosition:0,_off:false},0).to({alpha:1},73).wait(964));

	// textmask_1
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(316,69,0.362,0.063,0,0,180,320.1,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(207).to({startPosition:0,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.26,x:348.8},14).to({_off:true},1).wait(169).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(11).to({startPosition:0},0).to({scaleX:0.25,x:352.5},22).to({_off:true},1).wait(179).to({scaleX:0.36,x:316,_off:false},0).wait(7).to({startPosition:0},0).to({scaleX:0.25,x:352.5},10).to({_off:true},1).wait(156).to({scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},20).to({_off:true},1).wait(186).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},18).to({_off:true},1).wait(243).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.28,x:344},14).to({_off:true},1).wait(281).to({scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.3,scaleX:0.08,x:405.5},24).to({_off:true},1).wait(256).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.26,x:350},14).to({_off:true},1).wait(265).to({scaleX:0.36,x:316,_off:false},0).wait(9).to({startPosition:0},0).to({scaleX:0.24,x:356},11).to({_off:true},1).wait(151).to({scaleX:0.36,x:316,_off:false},0).wait(6).to({startPosition:0},0).to({regX:320.2,scaleX:0.18,x:374.5},21).to({_off:true},1).wait(166).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(10).to({startPosition:0},0).to({scaleX:0.24,x:356},18).to({_off:true},1).wait(252).to({scaleX:0.36,x:316,_off:false},0).wait(10).to({startPosition:0},0).to({scaleX:0.26,x:349.5},19).to({_off:true},1).wait(156).to({scaleX:0.36,x:316,_off:false},0).wait(12).to({startPosition:0},0).to({regX:320.3,scaleX:0.08,x:407},28).to({_off:true},1).wait(1313));

	// textmask_2
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(997).to({startPosition:0,_off:false},0).wait(44).to({startPosition:0},0).to({scaleX:0.22,x:395},19).to({_off:true},1).wait(203).to({scaleX:0.43,x:328,_off:false},0).wait(41).to({startPosition:0},0).to({scaleX:0.08,x:437},29).to({_off:true},1).wait(230).to({scaleX:0.43,x:328,_off:false},0).wait(47).to({startPosition:0},0).to({scaleX:0.15,x:417},29).to({_off:true},1).wait(209).to({scaleX:0.43,x:328,_off:false},0).wait(43).to({startPosition:0},0).to({scaleX:0.13,x:423.5},38).to({_off:true},1).wait(569).to({scaleX:0.43,x:328,_off:false},0).wait(43).to({startPosition:0},0).to({regX:320.1,scaleX:0.1,x:431},34).to({_off:true},1).wait(203).wait(186).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(62).to({startPosition:0},0).to({scaleX:0.16,x:414.5},29).to({_off:true},1).wait(1262));

	// textmask_3
	this.instance_6 = new lib.wo("synched",0);
	this.instance_6.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1264).to({startPosition:0,_off:false},0).wait(90).to({startPosition:0},0).to({scaleX:0.3,x:336},11).to({_off:true},1).wait(199).to({scaleX:0.38,x:312,_off:false},0).wait(86).to({startPosition:0},0).to({scaleX:0.2,x:369},24).to({_off:true},1).wait(2647));

	// text
	this.instance_7 = new lib.C01();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.C02();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.C03();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.C04();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.C05();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.C06();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.C07();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.C08();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.instance_15 = new lib.C09();
	this.instance_15.setTransform(80,0,0.5,0.5);

	this.instance_16 = new lib.C10();
	this.instance_16.setTransform(80,0,0.5,0.5);

	this.instance_17 = new lib.C11();
	this.instance_17.setTransform(80,0,0.5,0.5);

	this.instance_18 = new lib.C12();
	this.instance_18.setTransform(80,0,0.5,0.5);

	this.instance_19 = new lib.C13();
	this.instance_19.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},207).to({state:[{t:this.instance_8}]},191).to({state:[{t:this.instance_9}]},213).to({state:[{t:this.instance_10}]},174).to({state:[{t:this.instance_11}]},212).to({state:[{t:this.instance_12}]},267).to({state:[{t:this.instance_13}]},301).to({state:[{t:this.instance_14}]},286).to({state:[{t:this.instance_15}]},285).to({state:[{t:this.instance_16}]},172).to({state:[{t:this.instance_17}]},194).to({state:[{t:this.instance_18}]},281).to({state:[{t:this.instance_19}]},186).to({state:[]},390).wait(964));

	// voice_base01
	this.instance_20 = new lib.voice_1("synched",0);
	this.instance_20.setTransform(320,111.5,1,1,0,0,180,240,111.5);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(197).to({startPosition:0,_off:false},0).wait(201).to({skewY:0},0).wait(213).to({skewY:180},0).wait(174).to({skewY:0},0).wait(212).to({skewY:180},0).wait(267).to({skewY:0},0).wait(301).to({skewY:180},0).wait(286).to({skewY:0},0).wait(457).to({skewY:180},0).wait(194).to({skewY:0},0).wait(281).to({skewY:180},0).wait(186).to({skewY:0},0).to({_off:true},390).wait(964));

	// renko_sad.png
	this.instance_21 = new lib.renko_sad_1("single",1);
	this.instance_21.setTransform(178.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(398).to({startPosition:0},0).wait(213).to({startPosition:1},0).wait(174).to({startPosition:0},0).to({_off:true},3).wait(3535));

	// renko_calm.png
	this.instance_22 = new lib.renko_calm_1("single",0);
	this.instance_22.setTransform(178.5,374.4,1,1,0,0,0,178.5,250);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(788).to({startPosition:0,_off:false},0).wait(1).to({y:376.3},0).wait(1).to({y:377.8},0).wait(1).to({y:378.9},0).wait(1).to({y:379.8},0).wait(1).to({y:380.5},0).wait(1).to({y:381.1},0).wait(1).to({y:381.4},0).wait(1).to({y:381.7},0).wait(1).to({y:381.9},0).wait(1).to({y:382},0).wait(1).to({startPosition:0},0).wait(198).to({startPosition:1},0).wait(267).to({startPosition:0},0).wait(301).to({startPosition:1},0).wait(286).to({startPosition:0},0).wait(285).to({startPosition:0},0).wait(172).to({startPosition:1},0).wait(194).to({startPosition:0},0).wait(281).to({startPosition:1},0).wait(186).to({startPosition:0},0).to({_off:true},390).wait(964));

	// calm.png
	this.instance_23 = new lib.merry_calm_1("single",1);
	this.instance_23.setTransform(461.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(197).to({startPosition:0},0).wait(201).to({startPosition:1},0).wait(213).to({startPosition:0},0).wait(174).to({startPosition:1},0).to({_off:true},212).wait(1786).to({startPosition:0,_off:false},0).wait(186).to({startPosition:1},0).to({_off:true},390).wait(964));

	// merry_troubled
	this.instance_24 = new lib.merry_troubled_1("single",0);
	this.instance_24.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(997).to({startPosition:0,_off:false},0).wait(267).to({startPosition:1},0).to({_off:true},301).wait(2758));

	// merry_disppointed.png
	this.instance_25 = new lib.merry_disppointed_1("single",0);
	this.instance_25.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1565).to({startPosition:0,_off:false},0).wait(286).to({startPosition:1},0).to({_off:true},457).wait(2015));

	// merry_nomal
	this.instance_26 = new lib.merry_nomal_1("single",0);
	this.instance_26.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(2308).to({startPosition:0,_off:false},0).wait(194).to({startPosition:1},0).to({_off:true},281).wait(1540));

	// hakureiShrine
	this.instance_27 = new lib.bg_ED_C();
	this.instance_27.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27}]}).to({state:[]},3359).wait(964));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.9,0,660,642);


// symbols:
(lib.bg_ED_C = function() {
	this.initialize(img.bg_ED_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.C01 = function() {
	this.initialize(img.C01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C02 = function() {
	this.initialize(img.C02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C03 = function() {
	this.initialize(img.C03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C04 = function() {
	this.initialize(img.C04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C05 = function() {
	this.initialize(img.C05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C06 = function() {
	this.initialize(img.C06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C07 = function() {
	this.initialize(img.C07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C08 = function() {
	this.initialize(img.C08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C09 = function() {
	this.initialize(img.C09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C10 = function() {
	this.initialize(img.C10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C11 = function() {
	this.initialize(img.C11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C12 = function() {
	this.initialize(img.C12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C13 = function() {
	this.initialize(img.C13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C14 = function() {
	this.initialize(img.C14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1000,96);


(lib.end_C = function() {
	this.initialize(img.end_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.merry_calm = function() {
	this.initialize(img.merry_calm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_disppointed = function() {
	this.initialize(img.merry_disppointed);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_nomal = function() {
	this.initialize(img.merry_nomal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_troubled = function() {
	this.initialize(img.merry_troubled);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_calm = function() {
	this.initialize(img.renko_calm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_sad = function() {
	this.initialize(img.renko_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_troubled = function() {
	this.initialize(img.renko_troubled);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.voice1 = function() {
	this.initialize(img.voice1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.voice3 = function() {
	this.initialize(img.voice3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.wo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.voice_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.renko_sad_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_sad();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_calm_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_calm();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_troubled_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_troubled();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_nomal_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_nomal();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_disppointed_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_disppointed();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_calm_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_calm();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.end_C_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_C();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,150,30);


(lib.bo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],10:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.explosion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 22
	this.instance = new lib.ef_maru();
	this.instance.setTransform(480,480,1.982,1.982);
	this.instance.alpha = 0;
	this.instance.compositeOperation = "lighter";
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(97).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},10).to({scaleX:0.65,scaleY:0.65,alpha:0},3).to({_off:true},1).wait(182));

	// レイヤー 20
	this.instance_1 = new lib.ef_circle();
	this.instance_1.setTransform(480,480,2.645,2.645,0,0,0,256,256);
	this.instance_1.alpha = 0;
	this.instance_1.compositeOperation = "lighter";
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(90).to({_off:false},0).to({scaleX:0.7,scaleY:0.7,x:480.1,y:480.1,alpha:1},15).to({scaleX:0.19,scaleY:0.19,x:480,y:480,alpha:0},5).to({_off:true},1).wait(28).to({_off:false},0).to({scaleX:1.57,scaleY:1.57,alpha:1},7).to({scaleX:3.54,scaleY:3.54,alpha:0},45).to({_off:true},1).wait(101));

	// ex_s
	this.instance_2 = new lib.expl_s("synched",0,false);
	this.instance_2.setTransform(516.5,416.7,0.699,0.721,-135,0,0,31.9,32);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60).to({startPosition:0,_off:false},0).to({y:607.7,startPosition:39},39).to({_off:true},1).wait(193));

	// ex_s
	this.instance_3 = new lib.expl_s("synched",0,false);
	this.instance_3.setTransform(448.3,445,0.84,0.84,0,0,0,32,32);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48).to({startPosition:0,_off:false},0).to({y:667,startPosition:39},39).to({_off:true},1).wait(205));

	// ex_s
	this.instance_4 = new lib.expl_s("synched",0,false);
	this.instance_4.setTransform(558.1,441.2,0.999,0.999,60.2,0,0,31.9,32);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({startPosition:0,_off:false},0).to({y:691.2,startPosition:39},39).to({_off:true},1).wait(219));

	// ex_s
	this.instance_5 = new lib.expl_s("synched",0,false);
	this.instance_5.setTransform(430,472.1,0.949,0.949,60.1,0,0,32.1,31.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({startPosition:0,_off:false},0).to({y:671,startPosition:39},39).to({_off:true},1).wait(232));

	// ex_s
	this.instance_6 = new lib.expl_s("synched",0,false);
	this.instance_6.setTransform(499.3,447.5,0.999,0.999,-21.4,0,0,31.9,32.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(13).to({startPosition:0,_off:false},0).to({y:666.5,startPosition:39},39).to({_off:true},1).wait(240));

	// ex_s
	this.instance_7 = new lib.expl_s("synched",0,false);
	this.instance_7.setTransform(482.6,490.5,1.099,1.099,14.8,0,0,31.9,32);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regY:31.9,scaleX:1,scaleY:1,y:767.4,startPosition:39},39).to({_off:true},1).wait(253));

	// ex
	this.instance_8 = new lib.ef_smole();
	this.instance_8.setTransform(474.2,494.8,0.77,0.77,176,0,0,128,128);
	this.instance_8.compositeOperation = "lighter";
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(145).to({_off:false},0).to({scaleX:4.95,scaleY:4.95,rotation:227.3,x:554.9,y:502.9},6,cjs.Ease.get(1)).to({scaleX:12.37,scaleY:12.37,rotation:257.3,x:535.5,y:476.8,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_9 = new lib.ef_smole();
	this.instance_9.setTransform(463.7,518,0.577,0.577,23.2,0,0,128.1,128);
	this.instance_9.compositeOperation = "lighter";
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(145).to({_off:false},0).to({regX:128,scaleX:3.24,scaleY:3.24,rotation:74.4,x:382.3,y:569.6},6,cjs.Ease.get(1)).to({scaleX:9.28,scaleY:9.28,rotation:104.4,x:140.8,y:365.2,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_10 = new lib.ef_smole();
	this.instance_10.setTransform(466.1,466.7,0.577,0.577,175.9,0,0,128,128.1);
	this.instance_10.compositeOperation = "lighter";
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(145).to({_off:false},0).to({regY:128,scaleX:2.97,scaleY:2.97,rotation:182.3,x:372.3,y:404.4},6,cjs.Ease.get(1)).to({scaleX:9.28,scaleY:9.28,rotation:159.4,x:141.9,y:347.9,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_11 = new lib.ef_smole();
	this.instance_11.setTransform(497,494,0.481,0.481,-18.6,0,0,127.9,128.1);
	this.instance_11.compositeOperation = "lighter";
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(145).to({_off:false},0).to({regX:128,regY:128,scaleX:3.18,scaleY:3.18,rotation:-12.3,x:574.7,y:502.5},6,cjs.Ease.get(1)).to({scaleX:7.74,scaleY:7.74,rotation:-35,x:743.8,y:626.5,alpha:0},57).to({_off:true},1).wait(84));

	// レイヤー 18
	this.instance_12 = new lib.ef_smole_b();
	this.instance_12.setTransform(424.1,498.8,6.627,6.627,165,0,0,64,64);
	this.instance_12.alpha = 0.602;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(151).to({_off:false},0).to({scaleX:10.96,scaleY:10.96,x:368.1,y:484.3,alpha:0},139,cjs.Ease.get(1)).to({_off:true},1).wait(2));

	// レイヤー 17
	this.instance_13 = new lib.ef_smole_b();
	this.instance_13.setTransform(514.1,471.5,6.627,6.627,0,0,0,64,64);
	this.instance_13.alpha = 0.602;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(151).to({_off:false},0).to({scaleX:7.92,scaleY:7.92,rotation:30,x:586.7,y:506.7,alpha:0},139,cjs.Ease.get(1)).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(243.2,246.1,472.7,465.1);


// symbols:
(lib.circle = function() {
	this.initialize(img.ef_circle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.ef_smoke = function() {
	this.initialize(img.ef_smoke);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_b = function() {
	this.initialize(img.ef_smoke_b);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_s = function() {
	this.initialize(img.ef_smoke_s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.maru = function() {
	this.initialize(img.maru);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.ef_smole_b = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke_b();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.ef_smole = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_s_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke_s();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,64,64);


(lib.ef_maru = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.maru();
	this.instance.setTransform(-74.9,-74.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-74.9,-74.9,150,150);


(lib.ef_circle = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.circle();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.expl_s = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 3
	this.instance = new lib.ef_smoke_s_1();
	this.instance.setTransform(32,32,1,1,135,0,0,32,32);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:2.39,scaleY:2.39,rotation:113.1,x:32.3,y:31.9},5,cjs.Ease.get(-0.99)).to({regX:32.1,scaleX:2.96,scaleY:2.96,rotation:105,x:32.2,y:32.3,alpha:0},29,cjs.Ease.get(1)).to({_off:true},1).wait(5));

	// レイヤー 1
	this.instance_1 = new lib.ef_smoke_s_1();
	this.instance_1.setTransform(32,32,1,1,0,0,0,32,32);
	this.instance_1.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:2.03,scaleY:2.03,rotation:30,y:31.9},4,cjs.Ease.get(-0.99)).to({regX:31.9,scaleX:2.39,scaleY:2.39,rotation:45,x:31.9,alpha:0},29,cjs.Ease.get(1)).to({_off:true},1).wait(6));

	// レイヤー 4
	this.instance_2 = new lib.ef_smole_b();
	this.instance_2.setTransform(22.4,34.8,0.523,0.523,30,0,0,63.8,63.9);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:63.9,scaleX:1.26,scaleY:1.26,rotation:55.8,x:21.7,y:28.8,alpha:0.41},5,cjs.Ease.get(-0.99)).to({regX:63.8,regY:64,scaleX:1.65,scaleY:1.65,rotation:67,x:21.6,y:22,alpha:0},32,cjs.Ease.get(1)).to({_off:true},1).wait(2));

	// レイヤー 2
	this.instance_3 = new lib.ef_smole_b();
	this.instance_3.setTransform(43.3,26.8,0.523,0.523,-29.9,0,0,63.9,64);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:64,scaleX:1.26,scaleY:1.26,x:45.6,y:18.3,alpha:0.5},5,cjs.Ease.get(-0.99)).to({scaleX:1.5,scaleY:1.5,rotation:-44.8,x:42.8,y:15.4,alpha:0},34,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.2,-18.8,112.3,99.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],11:[function(require,module,exports){
'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.staffroll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7808));

	// BO
	this.instance = new lib.BO_1("synched",0);
	this.instance.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(102).to({startPosition:0},0).to({alpha:0},251).to({_off:true},1).wait(7140).to({startPosition:0,_off:false},0).to({alpha:1},104).wait(211));

	// renko_d
	this.instance_1 = new lib.renko_d_1("synched",0);
	this.instance_1.setTransform(60.6,-64.8,1,1,0,0,0,37.5,52.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7532).to({startPosition:0,_off:false},0).to({y:536.1},22).to({_off:true},1).wait(254));

	// e06.png
	this.instance_2 = new lib.e06_1("synched",0);
	this.instance_2.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_2.alpha = 0.5;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(6277).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(252).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(1200));

	// e05.png
	this.instance_3 = new lib.e05_1("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_3.alpha = 0.5;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5183).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(2295));

	// e04.png
	this.instance_4 = new lib.e04_1("synched",0);
	this.instance_4.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_4.alpha = 0.5;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4089).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(3389));

	// e03.png
	this.instance_5 = new lib.e03_1("synched",0);
	this.instance_5.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_5.alpha = 0.5;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2995).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(4483));

	// e02.png
	this.instance_6 = new lib.e02_1("synched",0);
	this.instance_6.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_6.alpha = 0.5;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2001).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(5477));

	// e01.png
	this.instance_7 = new lib.e01_1("synched",0);
	this.instance_7.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_7.alpha = 0.5;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1005).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(253).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(6471));

	// mask
	this.instance_8 = new lib.BO_1("synched",0);
	this.instance_8.setTransform(498,209,0.536,0.067,0,0,0,640,240);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(413).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(455).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(454).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(488));

	// mask
	this.instance_9 = new lib.BO_1("synched",0);
	this.instance_9.setTransform(498,244,0.536,0.067,0,0,0,640,240);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(413).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(455).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(454).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(488));

	// mask
	this.instance_10 = new lib.BO_1("synched",0);
	this.instance_10.setTransform(498,278.6,0.536,0.081,0,0,0,640,240);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3397).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(1583));

	// s07.png
	this.instance_11 = new lib.s07_1("synched",0);
	this.instance_11.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(6680).to({startPosition:0,_off:false},0).to({_off:true},641).wait(488));

	// s06.png
	this.instance_12 = new lib.s06_1("synched",0);
	this.instance_12.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(5585).to({startPosition:0,_off:false},0).to({_off:true},641).wait(1583));

	// s05.png
	this.instance_13 = new lib.s05_1("synched",0);
	this.instance_13.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(4491).to({startPosition:0,_off:false},0).to({_off:true},641).wait(2677));

	// s04.png
	this.instance_14 = new lib.s04_1("synched",0);
	this.instance_14.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(3397).to({startPosition:0,_off:false},0).to({_off:true},641).wait(3771));

	// s03.png
	this.instance_15 = new lib.s03_1("synched",0);
	this.instance_15.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2403).to({startPosition:0,_off:false},0).to({_off:true},541).wait(4865));

	// s01.png
	this.instance_16 = new lib.s01_1("synched",0);
	this.instance_16.setTransform(320,240,1,1,0,0,0,178,67);

	this.instance_17 = new lib.s02_1("synched",0);
	this.instance_17.setTransform(320,240,1,1,0,0,0,178,67);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},413).to({state:[]},541).to({state:[{t:this.instance_17}]},455).to({state:[]},541).wait(5859));

	// renko
	this.instance_18 = new lib.renko("synched",0);
	this.instance_18.setTransform(567.5,240,1,1,0,0,0,72.5,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1465).to({startPosition:0},0).wait(5807).to({startPosition:0},0).to({alpha:0},48).to({_off:true},1).wait(488));

	// bg
	this.instance_19 = new lib.bg();
	this.instance_19.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19}]}).wait(7809));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.e01 = function() {
	this.initialize(img.e01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e02 = function() {
	this.initialize(img.e02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e03 = function() {
	this.initialize(img.e03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e04 = function() {
	this.initialize(img.e04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e05 = function() {
	this.initialize(img.e05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e06 = function() {
	this.initialize(img.e06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.renko_d = function() {
	this.initialize(img.renko_d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,290,960);


(lib.renko_d_sil = function() {
	this.initialize(img.renko_d_sil);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,210);


(lib.s01 = function() {
	this.initialize(img.s01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s02 = function() {
	this.initialize(img.s02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s03 = function() {
	this.initialize(img.s03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s04 = function() {
	this.initialize(img.s04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s05 = function() {
	this.initialize(img.s05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s06 = function() {
	this.initialize(img.s06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s07 = function() {
	this.initialize(img.s07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.renko_d_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d_sil();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,75,105);


(lib.renko = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,145,480);


(lib.e06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.BO_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;

},{"../createjs":4,"../image_store":20}],12:[function(require,module,exports){
'use strict';
var Constant = require('../constant');
var i;

var BulletDictionaries = [];
BulletDictionaries[0] = [
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
];

BulletDictionaries[1] = [
	{
		'vector': { 'aimed': true, 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 3 } },
	},
];
BulletDictionaries[2] = [
	{ vector: { r: 3, theta: 45,  w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 135, w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 225, w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 315, w: 0, ra: 0, wa: 0, raa: 0 } },
];

BulletDictionaries[3] = [
	{
		'vector': { 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  90, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  135, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  180, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  225, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  270, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  315, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},

];

// 縦に広がる弾
BulletDictionaries[4] = [
	{ vector: { aimed: true, r: 3.0, theta: 0} },
	{ vector: { aimed: true, r: 3.5, theta: 0} },
	{ vector: { aimed: true, r: 4.0, theta: 0} },
	{ vector: { aimed: true, r: 4.5, theta: 0} },
];

// 横に広がる弾
BulletDictionaries[5] = [
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0.05, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0.10, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: -0.05, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: -0.10, ra: 0, wa: 0, raa: 0 } },
];

BulletDictionaries[6] = [];

for(i = 0; i < 8; i++) {
	BulletDictionaries[6].push(
		{
			'vector': { 'r': 5, 'theta':  22.5 + i * 45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		}
	);
}

BulletDictionaries[7] = [];


for(i = 0; i < 8; i++) {
	BulletDictionaries[7].push({ vector: { r: 3, theta: 30 + i * 45,  w: 0, ra: 0, wa: 0, raa: 0 } });
}


BulletDictionaries[8] = [

];

for(i = 0; i < 8; i++) {
	BulletDictionaries[8].push(
		{
			'vector': [
				{ count: 0, vector: { 'r': 3, 'theta':  22.5 + i * 45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } } },
				{ count: 50, vector: { 'r': 7, 'theta': 0, 'aimed': true } },
			]
		}
	);
}

module.exports = BulletDictionaries;

},{"../constant":3}],13:[function(require,module,exports){
'use strict';

var Constant = require('../constant');

var BulletTypes = [];
// 2: stage1 道中雑魚：青い円形弾
BulletTypes[Constant.BULLET_BALL_BLUE] = {
	'image':       'shot',
	'indexX':           2,
	'indexY':           0,
	'width':           20,
	'height':          20,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       false
};
// 11: 道中雑魚：緑円形弾
BulletTypes[Constant.BULLET_BALL_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           0,
	'width':           20,
	'height':          20,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       false
};
// 0;文：黄色い弾
BulletTypes[Constant.BULLET_TINY_YELLOW] = {
	'image':       'shot',
	'indexX':           3,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 1:文：赤い弾
BulletTypes[Constant.BULLET_TINY_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 3: 文：オレンジっぽい弾
BulletTypes[Constant.BULLET_TINY_ORANGE] = {
	'image':       'shot',
	'indexX':           7,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 8; 米びつ黄緑弾
BulletTypes[Constant.BULLET_TINY_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
// 9: 米びつ青弾
BulletTypes[Constant.BULLET_TINY_BLUE] = {
	'image':       'shot',
	'indexX':           2,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_TINY_AQUA] = {
	'image':       'shot',
	'indexX':           5,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_TINY_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_TINY_GRAY] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           1,
	'width':           14,
	'height':          20,
	'collisionWidth':  8,
	'collisionHeight': 8,
	'is_rotate':       true
};

// 4: 文：赤いにじゅうまる弾
BulletTypes[Constant.BULLET_DOUBLEBALL_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           4,
	'width':           22,
	'height':          23,
	'collisionWidth':  13,
	'collisionHeight': 13,
	'is_rotate':       false
};
BulletTypes[Constant.BULLET_DOUBLEBALL_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           4,
	'width':           22,
	'height':          23,
	'collisionWidth':  13,
	'collisionHeight': 13,
	'is_rotate':       false
};
// 5: 文：デカイオレンジ弾
BulletTypes[Constant.BULLET_BIG_ORANGE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           1,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};

BulletTypes[Constant.BULLET_BIG_PURPLE] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           1,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};
// 10: 緑大玉
BulletTypes[Constant.BULLET_BIG_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           6,
	'indexY':           0,
	'width':           64,
	'height':          64,
	'collisionWidth':  32,
	'collisionHeight': 32,
	'is_rotate':       false
};




// 6: 文：クナイみたいな赤い弾
BulletTypes[Constant.BULLET_KUNAI_RED] = {
	'image':       'shot',
	'indexX':           0,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};

// クナイみたいな紫弾
BulletTypes[Constant.BULLET_KUNAI_PURPLE] = {
	'image':       'shot',
	'indexX':           4,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};
BulletTypes[Constant.BULLET_KUNAI_LIMEGREEN] = {
	'image':       'shot',
	'indexX':           1,
	'indexY':           7,
	'width':           14,
	'height':          20,
	'collisionWidth':  10,
	'collisionHeight': 10,
	'is_rotate':       true
};

// 7: 文：黄色ビーム
BulletTypes[Constant.BULLET_BEAM_YELLOW] = {
	'image':       'beam',
	'indexX':           1,
	'indexY':           0,
	'width':           20,
	'height':          256,
	'collisionWidth':  0,
	'collisionHeight': 0,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_ORANGE] = {
	'image':       'shot',
	'indexX':           7,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_AQUA] = {
	'image':       'shot',
	'indexX':           9,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_PURPLE] = {
	'image':       'shot',
	'indexX':          10,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_YELLOW] = {
	'image':       'shot',
	'indexX':          11,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_BLUE] = {
	'image':       'shot',
	'indexX':          12,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_LIMEGREEN] = {
	'image':       'shot',
	'indexX':          13,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

BulletTypes[Constant.BULLET_BUTTERFLY_RED] = {
	'image':       'shot',
	'indexX':          14,
	'indexY':           4,
	'width':           34,
	'height':          32,
	'collisionWidth':  12,
	'collisionHeight': 12,
	'is_rotate':       true
};

module.exports = BulletTypes;

},{"../constant":3}],14:[function(require,module,exports){
'use strict';
var Constant = require('../constant');
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

},{"../constant":3}],15:[function(require,module,exports){
'use strict';
var Constant = require('../constant');
var mersenne = require('../logic/mersenne');
var EnemiesParams = [ ] ;
var __randomizer = 
	{
		random: function () { return mersenne.random(); }
	};

// 2分 = 7200 frame

var EnemiesParams = [ ] ;

// 弾を撒きながら前方に直進する
for( var i = 0; i < 100 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 100 + i * 5,
			'x': parseInt(__randomizer.random() * 480),
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 2, 'count': 10 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			]
		}
	);
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 700 + i * 15,
			'x': 170 - i * 20,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
				{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': 45 }, 'wrange': { 'min': -0.5 } } },
			]
		}
	);
}

for( var i = 0; i < 6 ; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 800 + i * 15,
			'x': 260 + i * 20,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
				{ 'count':  50,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 135 }, 'wrange': { 'max': 0.5 } } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1000 + i * 15,
			'x': 0,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1180 + i * 15,
			'x': 480,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1550 + i * 15,
			'x': 0,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1720 + i * 15,
			'x': 480,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1730 + i * 15,
			'x': 0,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 0, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

for( var i = 0; i < 12; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': 1730 + i * 15,
			'x': 480,
			'y': 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': 0, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2120 + i * ( 80 - i * 5 ),
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
		'appear_frame': 2170 + i * ( 80 - i * 5 ),
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


for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2700 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 50 : 80 ) + i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 10 + (i%10)*2 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  10,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': -45 }, 'wrange': { 'min': -1 } } },
			{ 'count': 150,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max':  45 }, 'wrange': { 'max':  1 } } },
		]
	});
}

for( var i = 0; i < 20 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': 2910 + parseInt( i/2 ) * 10,
		'x': ( i%2 === 0 ? 430 : 400 ) - i * 10,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'shot': [
			{ 'bullet': 1, 'count': 10 + (i%10)*2 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 3,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  10,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa': 0.02, 'trange': { 'max': 225 }, 'wrange': { 'max':  1 } } },
			{ 'count': 150,  'vector': { 'r': 3,               'w':    0, 'ra': 0, 'wa':-0.02, 'trange': { 'min': 135 }, 'wrange': { 'min': -1 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;

},{"../constant":3,"../logic/mersenne":25}],16:[function(require,module,exports){
'use strict';
var Constant = require('../constant');

var appear_frame = 0;
var EnemiesParams = [ ] ;

appear_frame += 50;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * ( 120 - i * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20, 'type': Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 25;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * ( 120 - i * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30+(i%2)*20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130+(i%2)*20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}
appear_frame += 1000;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * (120 - i * 5),
			'x': 0,
			'y': 10 + (i%4) * 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': i % 2 ? 1 : 3, 'count': 40+(i%2)*20, 'type': Constant.BULLET_DOUBLEBALL_RED },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 0 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 0, 'w': 1.5, 'trange': {max: 180} } },
			]
		}
	);
}

appear_frame += 30;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * (120 - i * 5),
			'x': 480,
			'y': 10 + (i%4) * 10,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': i % 2 ? 1 : 3, 'count': 40+(i%2)*20, 'type': Constant.BULLET_DOUBLEBALL_RED },
			],
			'vector': [
				{ 'count':   0,   'vector': { 'r': 3,  'theta': 180 } },
				{ 'count':   20,  'vector': { 'r': 3,  'theta': 180, 'w': -1.5, 'trange': {min: 0} } },
			]
		}
	);
}
appear_frame += 1000;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + parseInt(i/2) * ( 120 - parseInt(i/2) * 5 ),
		'x': 25 + (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 50;

for( var i = 0; i < 24 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + parseInt(i/2) * ( 120 - parseInt(i/2) * 5 ),
		'x': 455 - (i%4) * 50,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 3, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 1000;

for( var i = 0; i < 12 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': i * 20,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 4, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

for( var i = 0; i < 12 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': 480 - i * 20,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 4, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

appear_frame += 200;

for( var i = 0; i < 8 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': i * 25,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
}

appear_frame += 50;

for( var i = 0; i < 8; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame,
		'x': 480 - i * 25,
		'y': 0,
		'vital': 3,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'powerItem': i % 2 === 0 ? 1 : 0,
		'shot': [
			{ 'bullet': 0, 'count': 40+(i%2)*20, type: Constant.BULLET_DOUBLEBALL_RED },
		],
		'vector': [
			{ 'count':   0, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30 + (i%2) * 20, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 130 + (i%2) * 20, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}

// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;

},{"../constant":3}],17:[function(require,module,exports){
'use strict';
var Constant = require('../constant');

var appear_frame = 0;
var EnemiesParams = [ ] ;

var appear_frame = 10;
for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 0,
			'y': 180,
			'vital': 1,
			'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}
appear_frame += 720;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 480,
			'y': 180,
			'vital': 1,
			'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

appear_frame += 720;

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 0,
			'y': 180,
			'vital': 1,
			'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 0, 'w':    -0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

for( var i = 0; i < 24; i++ ) {
	EnemiesParams.push(
		{ 'appear_frame': appear_frame + i * 30,
			'x': 480,
			'y': 180,
			'vital': 1,
			'powerItem': i % 2 === 0 ? 1 : 0,
			'scoreItem': i % 2 === 1 ? 1 : 0,
			'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
			'shot': [
				{ 'bullet': (i%2) ? 7 : 2, 'count': 40+(i%2)*20 },
			],
			'vector': [
				{ 'count':   0,  'vector': { 'r': 3,  'theta': 180, 'w':    0.5, 'ra': 0, 'wa':     0 } },
			]
		}
	);
}

appear_frame += 720 + 60;

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 20,
		'x': 50 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 20,
		'x': 430 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}

appear_frame += 10;

for( var i = 0; i < 4 ; i++ ) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 10,
		'x': 25 + i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':    0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 10,
		'x': 455 - i * 50,
		'y': 0,
		'vital': 1,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_PURPLE_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 30 - i*10 },
			{ 'bullet': 1, 'count': 130 - i*10 },
			{ 'bullet': 1, 'count': 230 - i*10 },
			{ 'bullet': 1, 'count': 330 - i*10 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30,  'vector': { 'r': 2,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
}

appear_frame += 320;

for(var i = 0; i < 4; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + 260 * i,
		'x': 120,
		'y': 0,
		'vital': 30,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + 130 + 260 * i,
		'x': 360,
		'y': 0,
		'vital': 30,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});

}

appear_frame += 1100;

for(var i = 0; i < 4; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + 260 * i,
		'x': 120,
		'y': 0,
		'vital': 10,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':   0.1, 'trange': { 'max': 190 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + 260 * i,
		'x': 360,
		'y': 0,
		'vital': 10,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 3, 'count': 30 },
			{ 'bullet': 6, 'count': 50 },
			{ 'bullet': 3, 'count': 70 },
			{ 'bullet': 6, 'count': 90 },
			{ 'bullet': 3, 'count': 110 },
			{ 'bullet': 6, 'count': 130 },
		],
		'vector': [
			{ 'count':   0,      'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  30, 'vector': { 'r': 0,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count': 180, 'vector': { 'r': 2,  'theta': 90, 'w':    0, 'ra': 0, 'wa':  -0.1, 'trange': { 'min': -10 } } },
		]
	});
}
// 左右からホーミング自機狙い打ってくるやつ
for(var i = 0; i < 10; i++) {
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 105,
		'x': 10,
		'y': 0,
		'vital': 10,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 10 },
			{ 'bullet': 1, 'count': 20 },
			{ 'bullet': 1, 'count': 30 },
			{ 'bullet': 1, 'count': 40 },
			{ 'bullet': 1, 'count': 50 },
			{ 'bullet': 1, 'count': 60 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 4,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },
			{ 'count':  10,  'vector': { 'r': 4,               'w':    0, 'ra': 0, 'wa': 0.01, 'trange': { 'max': 210 }, 'wrange': { 'max': 1 } } },
		]
	});
	EnemiesParams.push({
		'appear_frame': appear_frame + i * 105 + 45,
		'x': 480 - 10,
		'y': 0,
		'vital': 10,
		'powerItem': i % 4 === 0 ? 1 : 0,
		'scoreItem': i % 4 === 2 ? 1 : 0,
		'type': Constant.ENEMY_GREEN_NEUTRAL_TYPE,
		'shot': [
			{ 'bullet': 1, 'count': 10 },
			{ 'bullet': 1, 'count': 20 },
			{ 'bullet': 1, 'count': 30 },
			{ 'bullet': 1, 'count': 40 },
			{ 'bullet': 1, 'count': 50 },
			{ 'bullet': 1, 'count': 60 },
		],
		'vector': [
			{ 'count':   0,  'vector': { 'r': 4,  'theta': 90, 'w':    0, 'ra': 0, 'wa':     0 } },

			{ 'count':  10,  'vector': { 'r': 4,               'w':    0, 'ra': 0, 'wa': -0.01, 'trange': { 'min': -30 }, 'wrange': { 'min': -1 } } },
		]
	});

}



// 出現順にソート
EnemiesParams.sort(function(a, b) {
	return a.appear_frame - b.appear_frame;
});

module.exports = EnemiesParams;

},{"../constant":3}],18:[function(require,module,exports){
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
			{ 'type': Constant.BULLET_KUNAI_LIMEGREEN, 'bullet': 8, 'count': 30 },
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
			{ 'type': Constant.BULLET_KUNAI_LIMEGREEN, 'bullet': 8, 'count': 30 },
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
			'vital': 10,
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
	'vital': 15,
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
	'vital': 15,
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
	'vital': 15,
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
	'vital': 15,
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

},{"../constant":3}],19:[function(require,module,exports){
'use strict';

// ゲームのFPSレート
var FPS = 60;

// FPS計算する間隔(frame)
var FPS_SPAN = 30;

var Config = require('./config');
var constant = require('./constant');

var LoadingScene   = require('./scene/loading');
var TitleScene     = require('./scene/title');
var ConfigScene     = require('./scene/config');
var Prologue2Scene = require('./scene/prologue2');
var StageScene    = require('./scene/stage');
var EpilogueAScene = require('./scene/epilogue_a');
var EpilogueBScene = require('./scene/epilogue_b');
var EpilogueCScene = require('./scene/epilogue_c');
var StaffRollScene   = require('./scene/staffroll');
var EndScene   = require('./scene/end');

// ユーザーの設定した項目
var UserConfig   = require('./logic/user_config');

var FrameLimit = 1000/FPS;

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
	// コンフィグ画面
	this.scenes[ constant.CONFIG_SCENE ] = new ConfigScene(this);
	// プロローグ画面2
	this.scenes[ constant.PROLOGUE2_SCENE ] = new Prologue2Scene(this);
	// ステージ
	this.scenes[ constant.STAGE_SCENE ] = new StageScene(this);
	// エピローグ画面
	this.scenes[ constant.EPILOGUE_A_SCENE ]  = new EpilogueAScene(this);
	this.scenes[ constant.EPILOGUE_B_SCENE ]  = new EpilogueBScene(this);
	this.scenes[ constant.EPILOGUE_C_SCENE ]  = new EpilogueCScene(this);
	// スタッフロール画面
	this.scenes[ constant.STAFFROLL_SCENE ]  = new StaffRollScene(this);
	// エンド
	this.scenes[ constant.END_SCENE ]  = new EndScene(this);

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

	// 前回にゲーム更新をした際の時刻(ミリ秒)
	this.before_update_time = 0;

	// requestAnimationFrame の ID
	this.request_id = null;

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;

	// ゲームパッドが接続されているかどうか
	this.is_connect_gamepad = 0;

	// 前回にFPSを計算した際の時刻(ミリ秒)
	this.before_time = 0;

	// 計測したFPS
	this.fps = 0;

	// ユーザーの設定した項目
	this.user_config = null;
};

Game.prototype = {
	// 初期化
	init: function () {
		// 経過フレーム数を初期化
		this.frame_count = 0;

		// requestAnimationFrame の ID
		this.request_id = null;

		// 前回にゲーム更新をした際の時刻(ミリ秒)
		this.before_update_time = 0;

		// キー押下フラグ
		this.keyflag = 0x0;

		// 一つ前のフレームで押下されたキー
		this.before_keyflag = 0x0;

		// ゲームパッドが接続されているかどうか
		this.is_connect_gamepad = 0;

		// 前回にFPSを計算した際の時刻(ミリ秒)
		this.before_time = 0;

		// 計測したFPS
		this.fps = 0;

		// ユーザーの設定した項目
		this.user_config = UserConfig.load();

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

		// DEBUG
		if(Config.DEBUG_MUSIC_OFF) return;

		// 現在のBGM再生をストップ
		self.stopBGM();

		self.audio_source = self._createSourceNode(key);
		self.audio_source.start(0);
	},
	stopBGM: function(bgm) {
		var self = this;
		if(self.audio_source) {
			self.audio_source.stop(0);
			self.audio_source = null;
		}
		return;
	},
	// BGM のフェードアウトを設定
	fadeOutBGM: function (fadeout_time) {
		var self = this;
		if(self.audio_gain && self.audio_context) {
			var gain = self.audio_gain.gain;
			var startTime = self.audio_context.currentTime;
			gain.setValueAtTime(gain.value, startTime); // ないと古い端末でフェードアウトしない
			var endTime = startTime + fadeout_time;
			gain.linearRampToValueAtTime(0, endTime);
		}

		return 1;
	},
	// BGM の AudioBufferSourceNode インスタンスを作成
	_createSourceNode: function(key) {
		var self = this;
		var arrayBuffer = self.bgms[key];
		var conf = Config.BGMS[key];

		self.audio_gain = this.audio_context.createGain(); // ないとフェードアウト後にBGM再生されない

		var source = self.audio_context.createBufferSource();
		source.buffer = arrayBuffer;

		if(conf.loopStart || conf.loopEnd) { source.loop = true; }
		if(conf.loopStart) { source.loopStart = conf.loopStart; }
		if(conf.loopEnd)   { source.loopEnd = conf.loopEnd; }
		self.audio_gain.gain.value = conf.volume || 1;

		source.connect(self.audio_gain);

		self.audio_gain.connect(self.audio_context.destination);
		source.start = source.start || source.noteOn;
		source.stop  = source.stop  || source.noteOff;

		return source;
	},
	// 再生するSEをセット
	playSound: function(key) {
		this.soundflag |= Config.SOUNDS[key].id;
	},

	// セットされたフラグにもとづいてSEを再生
	runPlaySound: function() {
		// DEBUG
		if(Config.DEBUG_MUSIC_OFF) return;

		for(var key in Config.SOUNDS) {
			// フラグが立ってたら
			if(this.soundflag & Config.SOUNDS[key].id) {
				// 再生
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0;
				this.sounds[key].play();

				// フラグを削除
				this.soundflag &= ~Config.SOUNDS[key].id;

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
	startRun: function(){
		if(this.isRunning()) return;

		this.run();
	},
	// ゲームストップ
	stopRun: function(){
		if(!this.isRunning()) return;

		cancelAnimationFrame(this.request_id);

		this.request_id = null;
	},
	// ゲームが起動中かどうか
	isRunning: function () {
		return this.request_id ? true : false;
	},
	// フレーム毎の実行
	run: function(){
		// ゲームパッド対応端末なら入力を取得
		this.handleGamePad();

		// シーン更新
		this.currentScene().run();
		this.currentScene().updateDisplay();

		if(Config.DEBUG) {
			this._renderFPS();
		}

		// SEを再生
		this.runPlaySound();

		// 押下されたキーを保存しておく
		this.before_keyflag = this.keyflag;

		// 経過フレーム数更新
		this.frame_count++;

		var now = Date.now();
		if (now - this.before_update_time >= FrameLimit) {
			this.before_update_time = now;
			this.request_id = requestAnimationFrame(this.run.bind(this));
		}
		else {
			// ゲーミングディスプレイなどリフレッシュレートが144Hzのディスプレイの場合、
			// requestAnimationFrame が 60FPS 以上で実行されることがある。
			//
			// 過剰にゲームの更新が行われないように 60FPS より早く更新されそうなときは待つ。
			var that = this;
			setTimeout(function() {
				if (!that.isRunning()) return;

				that.before_update_time = Date.now();
				that.request_id = requestAnimationFrame(that.run.bind(that));
			}, this.before_update_time + FrameLimit - now);
		}
	},
	_renderFPS: function() {
		// FPSをレンダリング
		var ctx = this.surface;
		ctx.save();
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("FPS: " + this.fps, this.width - 70, this.height - 10);
		ctx.restore();

		// FPS_SPAN 毎にFPSを計測する
		if((this.frame_count % FPS_SPAN) !== 0) return;

		// 現在時刻(ミリ秒)を取得
		var newTime = Date.now();

		if(this.before_time) {
			this.fps = parseInt(1000 * FPS_SPAN / (newTime - this.before_time));
		}

		this.before_time = newTime;
	},
	// ローディング画面が終わったら
	notifyLoadingDone: function() {
		// オープニング画面に切り替え
		this.changeScene(Config.DEBUG && Config.DEBUG_SCENE ? Config.DEBUG_SCENE : constant.TITLE_SCENE);
	},
	// タイトル画面が終わったら
	notifyTitleDoneToStart: function() {
		if(Config.DEBUG) {
			this.changeScene(document.getElementById("scene").value);
		}
		this.changeScene(constant.STAGE_SCENE);
	},
	notifyTitleDoneToPrologue: function() {
		// プロローグ画面に切り替え
		this.changeScene(constant.PROLOGUE2_SCENE);
	},
	notifyTitleDoneToConfig: function() {
		// コンフィグ画面に切り替え
		this.changeScene(constant.CONFIG_SCENE);
	},
	// コンフィグ画面から戻ったら
	notifyConfigDone: function() {
		// タイトル画面に切り替え
		this.changeScene(constant.TITLE_SCENE);
	},
	// プロローグ画面が終わったら
	notifyPrologue2Done: function() {
		// ステージ画面に切り替え
		this.changeScene(constant.STAGE_SCENE);
	},
	// ステージ画面が終わったら
	notifyStageDone: function() {
		// エンディング分岐
		if(this.currentScene().score > Config.THRESHOLD_EPILOGUE_A) {
			this.changeScene(constant.EPILOGUE_A_SCENE);
		}
		else if(this.currentScene().score > Config.THRESHOLD_EPILOGUE_B) {
			this.changeScene(constant.EPILOGUE_B_SCENE);
		}
		else {
			this.changeScene(constant.EPILOGUE_C_SCENE);
		}
	},
	// エピローグAが終わったら
	notifyEpilogueADone: function() {
		// エンディングに切り替え
		this.changeScene(constant.STAFFROLL_SCENE);
	},
	// エピローグBが終わったら
	notifyEpilogueBDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// エピローグCが終わったら
	notifyEpilogueCDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	notifyStaffRollDone: function() {
		this.changeScene(constant.END_SCENE);
	},
	notifyEndDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// 体験版終了
	notifyTrialDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// ステージをポーズから終了
	notifyStageQuit: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	handleGamePad: function() {
		if(!this.is_connect_gamepad) return;

		var pads = navigator.getGamepads();
		var pad = pads[0]; // 1Pコン

		if(!pad) return;

		// 初期化
		this.keyflag = 0x00;

		// ボタン入力
		for (var i = 0; i < pad.buttons.length; i++) {
			if(pad.buttons[i].pressed) { // 押下されてたら
				this.keyflag |= this.user_config.getKeyByButtonId(i); // button_id に割り当てられたキーを取得
			}
		}

		// 十字キー入力
		this.keyflag |= pad.axes[1] < -0.5 ? constant.BUTTON_UP:         0x00;// UP
		this.keyflag |= pad.axes[1] >  0.5 ? constant.BUTTON_DOWN:       0x00;// DOWN
		this.keyflag |= pad.axes[0] < -0.5 ? constant.BUTTON_LEFT:       0x00;// LEFT
		this.keyflag |= pad.axes[0] >  0.5 ? constant.BUTTON_RIGHT:      0x00;// RIGHT
	},
	enableGamePad: function() {
		this.is_connect_gamepad = 1;
	},
};

module.exports = Game;

},{"./config":2,"./constant":3,"./logic/user_config":27,"./scene/config":45,"./scene/end":46,"./scene/epilogue_a":47,"./scene/epilogue_b":48,"./scene/epilogue_c":49,"./scene/loading":50,"./scene/prologue2":51,"./scene/staffroll":52,"./scene/stage":53,"./scene/title":65}],20:[function(require,module,exports){
module.exports = {};

},{}],21:[function(require,module,exports){
'use strict';

var cjs = require("../createjs");

var CreateJS = function(cjs_obj, width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.width  = width;
	this.canvas.height = height;

	this.stage = new cjs.Stage(this.canvas);
	this.stage.addChild(cjs_obj);
};

CreateJS.prototype.update = function() {
	this.stage.update();
};


module.exports = CreateJS;

},{"../createjs":4}],22:[function(require,module,exports){
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
	while(!this.isEnd() &&
		this.appear_params[this.enemy_index].appear_frame === frame_count) {

		params.push(this.appear_params[this.enemy_index]);
		this.enemy_index++ ;
	}

	return params;
};

// 敵生成が全て終了したか
Logic.prototype.isEnd = function() {
	return this.appear_params[this.enemy_index] ? false : true;
};

// 最後に敵が出現した際のフレームを取得
Logic.prototype.getLastEnemyAppearCount = function() {
	return this.appear_params[this.appear_params.length-1].appear_frame;
};
module.exports = Logic;

},{}],23:[function(require,module,exports){
'use strict';

var Factory = function(Class, stage) {
	this.Class = Class;
	this.stage = stage;

	// 生成したオブジェクト
	this.pool = [];
};

// オブジェクトを生成
Factory.prototype.get = function() {
	var object = this.pool.pop();

	if(!object) {
		object = new this.Class(this.stage);
	}

	// 初期化
	object.init.apply(object, arguments);

	return object;
};

// オブジェクトを削除
Factory.prototype.free = function(obj) {
	this.pool.push(obj);
};


module.exports = Factory;

},{}],24:[function(require,module,exports){
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
	this.factory.free(this.objects[id]);

	delete this.objects[id];
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

// オブジェクトを全て消去する
Manager.prototype.removeAll = function() {
	for(var id in this.objects) {
		this.remove(id);
	}
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

// ボムの使用を通知
Manager.prototype.notifyUseBomb = function() {
	for(var id in this.objects) {
		this.objects[id].notifyUseBomb();
	}
};

// Object と Manager のグレイズ判定
Manager.prototype.checkGrazeWithObject = function(obj1) {
	// 衝突判定
	for(var id in this.objects) {
		var obj2 = this.objects[id];
		if(obj1.checkGraze(obj2)) {
			obj1.notifyGraze(obj2);
			obj2.notifyGraze(obj1);
			break;
		}
	}
};






module.exports = Manager;

},{"./factory":23}],25:[function(require,module,exports){
var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister(1000); //乱数初期化

module.exports = generator;

},{"mersenne-twister":1}],26:[function(require,module,exports){
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

	if(!this.is_end()) {
		this.next(); // start
	}
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

},{"../config":2}],27:[function(require,module,exports){
'use strict';
var Constant = require("../constant");

var KEY = "user_config";

var UserConfig = function(param) {
	if(!param) param = Constant.DEFAULT_KEYCONFIG;

	this.button_id_to_key_map = param;
};
UserConfig.prototype.getKeyByButtonId = function(button_id) {
	var keys = this.button_id_to_key_map[button_id];
	if(!keys) keys = 0x00;

	return keys;
};
UserConfig.prototype.setKeyByButtonId = function(button_id, key) {
	var defined_key = this.button_id_to_key_map[button_id];

	for (var target_button_id in this.button_id_to_key_map) {
		var target_key = this.button_id_to_key_map[target_button_id];
		// button_id に既に割り当てられているキーがあれば、置換
		if (target_key === key) {
			if (defined_key) {
				// 置換
				this.button_id_to_key_map[target_button_id] = defined_key;
			}
			else {
				// 削除
				delete this.button_id_to_key_map[target_button_id];
			}
		}
	}

	this.button_id_to_key_map[button_id] = key;
};

UserConfig.prototype.save = function() {

	var self = this;
	var ls = window.localStorage;
	return setTimeout(function(){ // 非同期で保存
		try {
			ls.setItem(KEY, JSON.stringify(self.button_id_to_key_map));
		}
		catch(e) {}
	}, 0);
};
UserConfig.load = function() {
	var ls = window.localStorage;
	var param;
	try {
		param = ls.getItem(KEY);
		if (param) {
			param = JSON.parse(param);
		}
	}
	catch(e) {}

	return new UserConfig(param);
};

UserConfig.prototype.getKeyToButtonIdMap = function() {
	var map = {};
	for (var button_id in this.button_id_to_key_map) {
		var key = this.button_id_to_key_map[button_id];
		map[key] = button_id;
	}

	return map;
};

UserConfig.prototype.dump = function() {
	var dump = {};

	for (var button_id in this.button_id_to_key_map) {
		var key = this.button_id_to_key_map[ button_id ];
		switch(key) {
			case Constant.BUTTON_LEFT:
				dump[button_id] = "LEFT";
				break;
			case Constant.BUTTON_UP:
				dump[button_id] = "UP";
				break;
			case Constant.BUTTON_RIGHT:
				dump[button_id] = "RIGHT";
				break;
			case Constant.BUTTON_DOWN:
				dump[button_id] = "DOWN";
				break;
			case Constant.BUTTON_Z:
				dump[button_id] = "Z";
				break;
			case Constant.BUTTON_X:
				dump[button_id] = "X";
				break;
			case Constant.BUTTON_SHIFT:
				dump[button_id] = "SHIFT";
				break;
			case Constant.BUTTON_SPACE:
				dump[button_id] = "SPACE";
				break;
			default:
				dump[button_id] = "UNKNOWN";
		}
	}

	console.log(dump);
};


module.exports = UserConfig;

},{"../constant":3}],28:[function(require,module,exports){
'use strict';
var Game = require('./game');

// WebAudio
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var game;

window.onload = function() {
	// Canvas
	var mainCanvas = document.getElementById('mainCanvas');
	// Game オブジェクト
	game = new Game(mainCanvas);
	// 初期化
	game.init();
	// キーバインド
	window.onkeydown = function(e) { game.handleKeyDown(e); };
	window.onkeyup   = function(e) { game.handleKeyUp(e); };

	// フォントの読み込みが完了
	// safari のみ doument.fonts はあるけれど、loadingdone が発火しないのでスルー
	if(document.fonts && !navigator.userAgent.toLowerCase().indexOf("safari")) {
		document.fonts.addEventListener('loadingdone', function() { game.fontLoadingDone(); });
	}
	else {
		// フォントロードに対応してなければ無視
		game.fontLoadingDone();
	}

	// ゲームパッド
	if(window.Gamepad && navigator.getGamepads) {
		game.enableGamePad();
	}

	// ゲーム起動
	game.startRun();
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

window.runGame = function () {
	game.startRun();
};
window.stopGame = function () {
	game.stopRun();
};

window.changeFullScreen = function () {
	var mainCanvas = document.getElementById('mainCanvas');
	if (mainCanvas.requestFullscreen) {
		mainCanvas.requestFullscreen();
	}
	else if (mainCanvas.msRequestuestFullscreen) {
		mainCanvas.msRequestuestFullscreen();
	}
	else if (mainCanvas.mozRequestFullScreen) {
		mainCanvas.mozRequestFullScreen();
	}
	else if (mainCanvas.webkitRequestFullscreen) {
		mainCanvas.webkitRequestFullscreen();
	}
};

// Electron のレンダラプロセスならば
if(window.require) {
	window.require('electron').webFrame.setVisualZoomLevelLimits(1,1); //zoomさせない
}

},{"./game":19}],29:[function(require,module,exports){
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

	// フレーム経過で消滅するフラグの消滅するフレーム管理
	this.auto_disable_times_map = {};

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

	// フレーム経過で消滅するフラグの消滅するフレーム管理
	this.auto_disable_times_map = {};
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

// グレイズ判定サイズ
ObjectBase.prototype.grazeHeight = function() {
	console.error('grazeHeight method must be overridden.');
};

// グレイズ判定サイズ
ObjectBase.prototype.grazeWidth = function() {
	console.error('grazeWidth method must be overridden.');
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

// サイズの拡縮
ObjectBase.prototype.scale = function() { return 1; };




// フレーム処理
ObjectBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;

	// フレーム経過で消滅するフラグの消滅判定
	this.checkAutoDisableFlags();
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

	var width  = this.spriteWidth()  * this.scale();
	var height = this.spriteHeight() * this.scale();

	ctx.drawImage(image,
		// スプライトの取得位置
		this.spriteWidth()  * this.spriteX(), this.spriteHeight() * this.spriteY(),
		// スプライトのサイズ
		this.spriteWidth(),                   this.spriteHeight(),
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-width/2,                             -height/2,
		// オブジェクトのゲーム上のサイズ
		width,                                height
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

// グレイズしたかどうか
ObjectBase.prototype.checkGraze = function(obj) {
	if(Math.abs(this.x - obj.x) < this.grazeWidth()/2 + obj.grazeWidth()/2 &&
		Math.abs(this.y - obj.y) < this.grazeHeight()/2 + obj.grazeHeight()/2) {
		return true;
	}

	return false;
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

// フレーム経過で消滅するフラグを立てる
// TODO: false -> true もできるように。変数の初期化は this.is_XXX = false しないといけないのもダサい
ObjectBase.prototype.setAutoDisableFlag = function(flag_name, count) {
	var self = this;

	self[flag_name] = true;

	self.auto_disable_times_map[flag_name] = self.frame_count + count; // 消滅フレーム

};
// フレーム経過で消滅するフラグの消滅判定
ObjectBase.prototype.checkAutoDisableFlags = function() {
	var self = this;
	for (var flag_name in self.auto_disable_times_map) {
		// 消滅するフレーム数が経過したかどうか
		if(this.auto_disable_times_map[flag_name] < self.frame_count) {
			self[flag_name] = false;
			delete self.auto_disable_times_map[flag_name];
		}
	}
};




// ボムの使用を通知
ObjectBase.prototype.notifyUseBomb = function() {
};

// グレイズしたことを通知
ObjectBase.prototype.notifyGraze = function() {
};

module.exports = ObjectBase;

},{"../config":2}],30:[function(require,module,exports){
'use strict';

/* ステージ1ボス 射命丸文 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage1/spell1');
var Spell2 = require('../../spell/stage1/spell2');
var Spell3 = require('../../spell/stage1/spell3');
var Spell4 = require('../../spell/stage1/spell4');

// constructor
var Aya = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
		new Spell4(this),
	]);
};

// 基底クラスを継承
Util.inherit(Aya, BaseObject);


// スプライトの開始位置
Aya.prototype.spriteX = function() { return this.indexX; };
Aya.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Aya.prototype.spriteImage = function() { return 'boss_aya'; };

// スプライトのサイズ
Aya.prototype.spriteWidth  = function() { return 128; };
Aya.prototype.spriteHeight = function() { return 128; };

// BGM
Aya.prototype.bgm = function() { return 'stage1'; };

Aya.prototype.MAX_VITAL = function() { return 60 * 45; };


module.exports = Aya;

},{"../../spell/stage1/spell1":81,"../../spell/stage1/spell2":82,"../../spell/stage1/spell3":83,"../../spell/stage1/spell4":84,"../../util":97,"./base":31}],31:[function(require,module,exports){
'use strict';

/* ボス基底クラス */

// 基底クラス
var BaseObject = require('../base');
var Util = require('../../util');
var Config = require('../../config');
var Constant = require('../../constant');

var Shot = require('../../object/shot');

var boss_appearance = require("../../createjs/boss_appearance");
var explosion = require("../../createjs/explosion");
var CreateJS = require("../../logic/createjs");


// Nフレーム毎にボスをアニメーション
var FRONT_ANIMATION_SPAN = 6;
var LR_ANIMATION_SPAN = 4;

// ボスの移動速度
var DEFAULT_SPEED = 2;

// constructor
var BossBase = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// ボスのスプライトの位置
	this.indexX = 0; this.indexY = 0;

	// 発動中スペル
	this.spell_index = 0;

	// スペルカード一覧
	this.spells = [
		null, // 何も発動していない
	];

	// 移動関連
	this.is_moving = false;// 移動中か否か
	this.to_x      = null; // 移動先 x座標
	this.to_y      = null; // 移動先 y座標
	this.to_radian = null; // 移動方向
	this.to_speed  = null; // 移動速度

	// ボスを描画するかどうか
	this.is_show = true;

	// 生存中
	this.is_live = true;

	// 撃破エフェクト発動中
	this.is_occured_destroyed_effect = false;

};

// 基底クラスを継承
Util.inherit(BossBase, BaseObject);

// 初期化
BossBase.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 移動を初期化
	this.clearMoveTo();

	// ボスを初期位置に置く
	this.setInitPosition();

	// 初期HP
	this.vital = this.MAX_VITAL();

	// 発動スペル TODO:
	this.spell_index = Config.DEBUG && Config.DEBUG_SPELL ? Config.DEBUG_SPELL : 0;

	// スペルカード発動！
	this.executeSpell();

	// ボス出現エフェクト
	this.boss_appearance = new CreateJS(new boss_appearance.boss_appearance(), 960, 960);

	// ボス撃破エフェクト
	this.explosion = new CreateJS(new explosion.explosion(), 960, 960);

	// ボスを描画するかどうか
	this.is_show = true;

	// 生存中
	this.is_live = true;

	// 撃破エフェクト発動中
	this.is_occured_destroyed_effect = false;
};

// スペルカード設定
BossBase.prototype.setSpells = function(spells) {
	this.spells = [null].concat(spells); // spells 先頭は null でなくてはならない
};

// ボスを初期位置に置く
BossBase.prototype.setInitPosition = function() {
	// ボスの初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 400);
};

// 現在のスペルカード
BossBase.prototype.currentSpell = function(){
	return this.spells[this.spell_index];
};

// スペルを切り替え
BossBase.prototype.executeSpell = function(){
	// 切り替え
	this.spell_index++;
	// 切り替え後の状態を初期化
	this.currentSpell().init();
};
// 次に発動するスペルがあるかどうか
BossBase.prototype.hasNextSpell = function(){
	return this.spells[this.spell_index + 1] ? true : false;
};


// HPを初期化
BossBase.prototype.resetVital = function(){
	this.vital = this.MAX_VITAL();
};

// ボスが死んだかどうか
BossBase.prototype.isHpEmpty = function(){
	return this.vital <= 0;
};
// ボスのスペカが全て終了して撃破エフェクトも終わったか
BossBase.prototype.isDeadCompletely = function(){
	return !this.is_live && !this.is_occured_destroyed_effect;
};

// フレーム処理
BossBase.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	if (this.is_live) { // ボス生存中
		// スペルカード処理
		this.currentSpell().run();

		// 移動が設定されてるなら移動
		this._moveTo();

		// スペルカード実行中ならば
		if(this.currentSpell().isSpellExecute()) {
			// 時間経過でスペルカード発動時間は減っていく
			this.vital--;
			this.stage.score+=10;
		}

		// ボスHPが0になったら
		if(this.isHpEmpty()) {
			// スペル終了時のフックを実行
			this.currentSpell().onend();

			// スペル終了に変更
			this.currentSpell().changeState(Constant.SPELLCARD_END_STATE);

			// 敵の弾を vanish する
			this.stage.bullet_manager.notifyUseBomb();

			// アイテムを自機に吸引させる
			this.stage.item_manager.notifyUseBomb();

			// 次のスペルがある場合、次のスペルに移行
			if(this.hasNextSpell()) {
				// HPを初期化
				this.resetVital();

				// 次のスペルカード発動！
				this.executeSpell();
			}
			else { // スペルカードが全て終了したら撃破エフェクト開始
				this.is_live = false;

				// 撃破エフェクト開始
				this.setAutoDisableFlag("is_occured_destroyed_effect", 280);
			}
		}
	}
	else { // ボス死亡エフェクト処理
		this.explosion.update();
	}


	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;

	// Nフレーム毎にボスをアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}

	// ボス出現エフェクト
	this.boss_appearance.update();
};

// 移動
BossBase.prototype.moveLeft = function(){
	this.x -= DEFAULT_SPEED;
};
BossBase.prototype.moveRight = function(){
	this.x += DEFAULT_SPEED;
};
BossBase.prototype.moveUp = function(){
	this.y -= DEFAULT_SPEED;
};
BossBase.prototype.moveDown = function(){
	this.y += DEFAULT_SPEED;
};

// 移動アニメーション
BossBase.prototype.animateLeft = function(){
		this.indexY = 1;
};
BossBase.prototype.animateRight = function(){
		this.indexY = 2;
};
BossBase.prototype.animateNeutral = function(){
		this.indexY = 0;
};


// 移動中かどうか
BossBase.prototype.isMoving = function(){
	return this.is_moving;
};
// 指定のx,y座標に移動を設定
BossBase.prototype.setMoveTo = function(x, y, frame_count){
	this.is_moving = true;
	this.to_x = x;
	this.to_y = y;

	var ax = x - this.x;
	var ay = y - this.y;

	this.to_radian = Math.atan2(ay, ax);
	if(frame_count) {
		this.to_speed = Math.sqrt(Math.pow(ay, 2) + Math.pow(ax, 2)) / frame_count;
	}
	else {
		this.to_speed = DEFAULT_SPEED;
	}

	// 既に指定のx,y座標に居たら、移動設定を解除
	if(this.isArrivedAtPoint()) {
		this.clearMoveTo();
	}
};
// 指定の座標に移動しているのを解除
BossBase.prototype.clearMoveTo = function(){
	this.is_moving = false;
	this.to_x = null;
	this.to_y = null;
	this.to_radian = null;
	this.to_speed = null;
};


// 指定のx,y座標に移動
BossBase.prototype._moveTo = function(){
	if(!this.is_moving) return;

	var cos = Math.cos(this.to_radian);
	var sin = Math.sin(this.to_radian);

	this.x += this.to_speed * cos;
	this.y += this.to_speed * sin;

	if(cos > 0) {
		this.animateRight();
	}
	else {
		this.animateLeft();
	}

	// 目的地に到達したかどうか
	if(this.isArrivedAtPoint()) {
		this.clearMoveTo();
		this.animateNeutral();
	}
};

// 目的地に到達したかどうか
BossBase.prototype.isArrivedAtPoint = function(){
	if( this.to_x + 1 > this.x && this.x > this.to_x - 1 &&
		this.to_y + 1 > this.y && this.y > this.to_y - 1) {
		return true;
	}

	return false;
};

// ボスを描画
BossBase.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	if (this.is_live) { // ボス生存中
		if(this.is_show) {
			// ボス出現エフェクト
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.drawImage(this.boss_appearance.canvas, (-this.boss_appearance.canvas.width/2), (-this.boss_appearance.canvas.height/2));
			ctx.restore();

			// ボス描画
			BaseObject.prototype.updateDisplay.apply(this, arguments);
		}

		// スペルカード描画
		this.currentSpell().updateDisplay();
	}
	else { // ボス死亡エフェクト
		// ボス出現エフェクト
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.explosion.canvas, (-this.explosion.canvas.width/2), (-this.explosion.canvas.height/2));
		ctx.restore();
	}
};

// 衝突した時
BossBase.prototype.notifyCollision = function(obj) {
	// 自機弾が当たればボスのHPを減らす
	if(obj instanceof Shot && this.currentSpell().isSpellExecute() && obj.isEnableDamage(this)) {
		this.vital-=3;
		this.stage.score+=10;
	}
};

// BGM
BossBase.prototype.bgm = function() {
	console.error('bgm method must be overridden.');
};

// 残HP パーセント
BossBase.prototype.vitalPercentage = function() {
	return this.vital / this.MAX_VITAL();
};

// 現在のスペカ名
BossBase.prototype.currentSpellName = function() {
	return this.currentSpell().name();
};


BossBase.prototype.scale = function() { return 0.75; };

// 当たり判定サイズ
BossBase.prototype.collisionWidth  = function() { return 48; };
BossBase.prototype.collisionHeight = function() { return 48; };

// 最大HP
BossBase.prototype.MAX_VITAL = function() {
	return 1;
};





module.exports = BossBase;

},{"../../config":2,"../../constant":3,"../../createjs/boss_appearance":5,"../../createjs/explosion":10,"../../logic/createjs":21,"../../object/shot":42,"../../util":97,"../base":29}],32:[function(require,module,exports){
'use strict';

/* ステージ5ボス マエリベリー・ハーン */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage5/spell1');
var Spell2 = require('../../spell/stage5/spell2');
var Spell3 = require('../../spell/stage5/spell3');

// constructor
var Merry = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Merry, BaseObject);


// スプライトの開始位置
Merry.prototype.spriteX = function() { return this.indexX; };
Merry.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Merry.prototype.spriteImage = function() { return 'boss_merry'; };

// スプライトのサイズ
Merry.prototype.spriteWidth  = function() { return 128; };
Merry.prototype.spriteHeight = function() { return 128; };

// BGM
Merry.prototype.bgm = function() { return 'stage5'; };

Merry.prototype.MAX_VITAL = function() { return 60 * 1.5 * 60; };
module.exports = Merry;


},{"../../spell/stage5/spell1":94,"../../spell/stage5/spell2":95,"../../spell/stage5/spell3":96,"../../util":97,"./base":31}],33:[function(require,module,exports){
'use strict';

/* ステージ2ボス 東風谷早苗 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage2/spell1');
var Spell2 = require('../../spell/stage2/spell2');
var Spell3 = require('../../spell/stage2/spell3');

// constructor
var Sanae = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Sanae, BaseObject);


// スプライトの開始位置
Sanae.prototype.spriteX = function() { return this.indexX; };
Sanae.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Sanae.prototype.spriteImage = function() { return 'boss_sanae'; };

// スプライトのサイズ
Sanae.prototype.spriteWidth  = function() { return 128; };
Sanae.prototype.spriteHeight = function() { return 128; };

// BGM
Sanae.prototype.bgm = function() { return 'stage2'; };

Sanae.prototype.MAX_VITAL = function() { return 60 * 60; };


module.exports = Sanae;

},{"../../spell/stage2/spell1":85,"../../spell/stage2/spell2":86,"../../spell/stage2/spell3":87,"../../util":97,"./base":31}],34:[function(require,module,exports){
'use strict';

/* ステージ4ボス 八雲紫 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage4/spell1');
var Spell2 = require('../../spell/stage4/spell2');
var Spell3 = require('../../spell/stage4/spell3');

// constructor
var Yukari = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Yukari, BaseObject);


// スプライトの開始位置
Yukari.prototype.spriteX = function() { return this.indexX; };
Yukari.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Yukari.prototype.spriteImage = function() { return 'boss_yukari'; };

// スプライトのサイズ
Yukari.prototype.spriteWidth  = function() { return 128; };
Yukari.prototype.spriteHeight = function() { return 128; };

// BGM
Yukari.prototype.bgm = function() { return 'stage4'; };

Yukari.prototype.MAX_VITAL = function() { return 60 * 75; };
module.exports = Yukari;

},{"../../spell/stage4/spell1":91,"../../spell/stage4/spell2":92,"../../spell/stage4/spell3":93,"../../util":97,"./base":31}],35:[function(require,module,exports){
'use strict';

/* ステージ3ボス 風見幽香 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../../util');

var Spell1 = require('../../spell/stage3/spell1');
var Spell2 = require('../../spell/stage3/spell2');
var Spell3 = require('../../spell/stage3/spell3');

// constructor
var Yuuka = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	this.setSpells([
		new Spell1(this),
		new Spell2(this),
		new Spell3(this),
	]);
};

// 基底クラスを継承
Util.inherit(Yuuka, BaseObject);


// スプライトの開始位置
Yuuka.prototype.spriteX = function() { return this.indexX; };
Yuuka.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Yuuka.prototype.spriteImage = function() { return 'boss_yuuka'; };

// スプライトのサイズ
Yuuka.prototype.spriteWidth  = function() { return 128; };
Yuuka.prototype.spriteHeight = function() { return 128; };

// BGM
Yuuka.prototype.bgm = function() { return 'stage3'; };

Yuuka.prototype.MAX_VITAL = function() { return 60 * 75; };

module.exports = Yuuka;

},{"../../spell/stage3/spell1":88,"../../spell/stage3/spell2":89,"../../spell/stage3/spell3":90,"../../util":97,"./base":31}],36:[function(require,module,exports){
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

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
		for(var i=0, len=vector.length; i<len; i++) {
			vector[i].is_rotate = type.is_rotate;
		}
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);

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

	// 自機とグレイズ済かどうか
	this.is_graze = false;
}
;
// 衝突した時
Bullet.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);
};

// グレイズした時
Bullet.prototype.notifyGraze = function(obj) {
	// この弾は既にグレイズ済
	this.is_graze = true;
};

// ボムの使用を通知
Bullet.prototype.notifyUseBomb = function() {
	// 自分を消す
	this.stage.bullet_manager.remove(this.id);

	// スコアの加算
	this.stage.score += 100;

	// ポイントアイテムの生成
	this.stage.item_manager.create(Constant.ITEM_SCORE_TYPE, this.x, this.y);
};

// 当たり判定サイズ
Bullet.prototype.collisionWidth  = function() { return this.collision_width; };
Bullet.prototype.collisionHeight = function() { return this.collision_height; };

// グレイズ判定サイズ
Bullet.prototype.grazeHeight  = function() { return this.width; };
Bullet.prototype.grazeWidth = function() { return this.height; };

// スプライトの開始位置
Bullet.prototype.spriteX = function() { return this.indexX; };
Bullet.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Bullet.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Bullet.prototype.spriteWidth  = function() { return this.width; };
Bullet.prototype.spriteHeight = function() { return this.height; };

module.exports = Bullet;

},{"../constant":3,"../enemy/bullet_types":13,"../util":97,"./vector_base":43}],37:[function(require,module,exports){
'use strict';

/* 自機 */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

var BossBase = require('./boss/base');
var Enemy = require('./enemy');
var Bullet = require('./bullet');
var Option = require('./option');
var Spell = require('../spell/renko/spell1');
var Manager = require('../logic/manager');


// 自機の移動速度(通常時)
var FAST_SPEED = 6;
// 自機の移動速度(Z押下時)
var SLOW_SPEED = 2;
// Nフレーム毎に自機をアニメーション
var FRONT_ANIMATION_SPAN = 6; // 正面
var LR_ANIMATION_SPAN = 4; // 左右移動
// Nフレーム毎に自機をショット
var SHOT_SPAN = 5;
// 死亡時の無敵時間(フレーム)
var UNHITTABLE_COUNT = 200;
// 死亡時に初期位置からしばらく動けない時間(フレーム)
var UNABLE_MOVE_COUNT = 50;
// ボム発動時間(フレーム)
var BOMB_COUNT = 600;
// 初期ライフ
var INIT_LIFE = 5;
// 初期ボム数
var INIT_BOMB = 5;

// 自機弾のベクトル(初期)
var SHOT_VECTOR_0 = { 'r': 8, 'theta': 270 };
// 自機弾のベクトル(1強化後)
var SHOT_VECTOR_1_1 = { 'r': 8, 'theta': 265 };
var SHOT_VECTOR_1_2 = { 'r': 8, 'theta': 270 };
var SHOT_VECTOR_1_3 = { 'r': 8, 'theta': 275 };





// constructor
var Character = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);

	// 自機のスプライトの位置
	this.indexX = 0; this.indexY = 0;

	this.spell = new Spell(this);

	this.option_manager = new Manager(Option, stage);
};

// 基底クラスを継承
Util.inherit(Character, BaseObject);



// 自機を初期位置に置く
Character.prototype.setInitPosition = function() {
	// 自機の初期位置
	this.x = (this.stage.width / 2);
	this.y = (this.stage.height - 100);

	this.animateNeutral();
};

// 初期化
Character.prototype.init = function() {
	BaseObject.prototype.init.apply(this, arguments);

	// 自機を初期位置に置く
	this.setInitPosition();

	// 初期ライフ3
	this.life = INIT_LIFE;

	// 初期ボム数
	this.bombs = INIT_BOMB;

	// ボム使用中かどうか
	this.is_using_bomb = false;

	// 移動不可能かどうか(死亡後の拘束時間に使用)
	this.is_unable_move = false;

	// ステージ開始直後は無敵状態にする
	this.setAutoDisableFlag("is_unhittable", UNHITTABLE_COUNT);

	// 低速移動かどうか
	this.is_slow = false;

	this.power = 0; // パワーアップアイテムで獲得したパワー
	this.level = 0; // 自機のレベル

	this.option_manager.init();
};

// 撃つ
Character.prototype.shot = function(){
	// Nフレーム置きにショットを生成
	if(this.frame_count % SHOT_SPAN === 0) {

		// レベルアップ後
		if (this.level >= 1) {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_1);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_2);
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_1_3);
		}
		// レベルアップ前
		else {
			this.stage.shot_manager.create(Constant.SHOT_NORMAL_TYPE, this.x, this.y, SHOT_VECTOR_0);
		}
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

// 低速移動かどうかを設定
Character.prototype.setSlow = function(bool){
	this.is_slow = bool;
};
// 自機移動
Character.prototype.moveLeft = function(){
	if(this.is_unable_move) return;
	this.x -= this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveRight = function(){
	if(this.is_unable_move) return;
	this.x += this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveUp = function(){
	if(this.is_unable_move) return;
	this.y -= this.is_slow ? SLOW_SPEED : FAST_SPEED;
};
Character.prototype.moveDown = function(){
	if(this.is_unable_move) return;
	this.y += this.is_slow ? SLOW_SPEED : FAST_SPEED;
};

// 移動アニメーション
Character.prototype.animateLeft = function(){
	if(this.is_unable_move) return;
	this.indexY = 1;
};
Character.prototype.animateRight = function(){
	if(this.is_unable_move) return;
	this.indexY = 2;
};
Character.prototype.animateNeutral = function(){
	if(this.is_unable_move) return;
	this.indexY = 0;
};


// フレーム処理
Character.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	var span = this.indexY === 0 ? FRONT_ANIMATION_SPAN : LR_ANIMATION_SPAN;
	// Nフレーム毎に自機をアニメーション
	if(this.frame_count % span === 0) {
		// 次のスプライトに
		this.indexX++;

		// スプライトを全て表示しきったら最初のスプライトに戻る
		if(this.indexX > 2) { this.indexX = 0; }
	}

	// ボム使用中ならボムの発動
	if(this.is_using_bomb) {
		this.spell.run();
	}

	// レベルアップ判定
	this._checkLevelUp();

	// オプション
	this.option_manager.run();
};

// レベルアップ判定
Character.prototype._checkLevelUp = function () {
	var before_level = this.level;
	var after_level = this._calcLevelUp();

	if(after_level > before_level) {
		this.level = after_level;
		this._actionLevelUp();
	}
};

// 現在のレベルをpower から計算
Character.prototype._calcLevelUp = function () {
	var power = this.power;
	if(8 > power) {
		return 0;
	}
	else if(32 > power) {
		return 1;
	}
	else if(64 > power) {
		return 2;
	}
	else if(96 > power) {
		return 3;
	}
	else {
		return 4;
	}
};

// レベルアップした時の処理
Character.prototype._actionLevelUp = function () {
	this.game.playSound('powerup');

	switch (this.level) {

		case 1:
			// 3way 弾になる
			break;
		case 2:
			// オプションが2つに
			this.option_manager.create(this, 20, 0);
			this.option_manager.create(this, -20, 0);
			break;
		case 3:
			// オプションが4つに
			this.option_manager.removeAll();
			this.option_manager.create(this, 20, -10);
			this.option_manager.create(this, -20, -10);
			this.option_manager.create(this, 30, 0);
			this.option_manager.create(this, -30, 0);
			break;
		case 4:
			// オプションの弾を撃つ感覚が速くなる
			break;
	}
};

// パワーを加算
Character.prototype.addPower = function(power){
	this.power += power;
};
// 自機を描画
Character.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	ctx.save();
	// 無敵 or ボム使用中状態ならばキャラを半透明に
	if (this.is_unhittable || this.is_using_bomb) {
		this.game.surface.globalAlpha = 0.4;
	}

	// 描画
	BaseObject.prototype.updateDisplay.apply(this, arguments);

	// 低速移動中はアタリ判定表示
	if (this.is_slow) {
		this._showHitArea();
	}
	ctx.restore();

	// ボム使用中ならスペカカットインを表示
	if(this.is_using_bomb) {
		this.spell.updateDisplay();
	}

	// オプションの描画
	this.option_manager.updateDisplay();

};

// アタリ判定表示
Character.prototype._showHitArea = function(){
	var SCALE = 0.5;
	var sprite_width  = 20;
	var sprite_height = 20;
	var width  = sprite_width  * SCALE;
	var height = sprite_height * SCALE;
	var sprite_x = 0;
	var sprite_y = 0;

	var ctx = this.game.surface;

	var image = this.game.getImage('shot');

	// オブジェクトの位置を指定
	ctx.translate(this.x, this.y);

	ctx.drawImage(image,
		// スプライトの取得位置
		sprite_width  * sprite_x, sprite_height * sprite_y,
		// スプライトのサイズ
		sprite_width, sprite_height,
		// x, yがオブジェクトの真ん中を指定しているので、左上をx, yの始点に変更
		-width/2 + 1, -height/2, // 何故か 1px ズレるので、右に1px補正
		// オブジェクトのゲーム上のサイズ
		width, height
	);
};


// 衝突判定
Character.prototype.checkCollision = function(obj) {
	// 無敵中 or ボム使用中なら敵or 敵弾 or ボスに衝突しても無視
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof BossBase) {
		if(this.is_unhittable || this.is_using_bomb) return false;
	}

	return BaseObject.prototype.checkCollision.apply(this, arguments);
};

// 自機を死亡
Character.prototype.die = function() {
	// 自機の初期位置に戻す
	this.setInitPosition();

	// 自機を減らす
	this.life--;

	// 初期ボム数を初期値に
	if(this.bombs < INIT_BOMB) {
		this.bombs = INIT_BOMB;
	}

	// 無敵状態にする
	this.setAutoDisableFlag("is_unhittable", UNHITTABLE_COUNT);

	// 死亡後、しばらくは初期位置から移動できない
	this.setAutoDisableFlag("is_unable_move", UNABLE_MOVE_COUNT);

	// 画面上の弾を全部消す
	this.stage.bullet_manager.removeAll();
};

// 衝突した時
Character.prototype.notifyCollision = function(obj) {
	// 敵もしくは敵弾もしくはボスにぶつかったら
	if(obj instanceof Bullet || obj instanceof Enemy || obj instanceof BossBase) {
		// 死亡音再生
		this.game.playSound('dead');

		// 自機死亡エフェクト生成
		var size = 108;
		this.stage.effect_manager.create(this.x, this.y, size);

		// 自機を死亡
		this.die();

		// 残機がなくなればゲームオーバー画面表示
		if(this.life === 0) {
			this.stage.notifyCharacterDead();
		}
	}
};

// ボムの使用
Character.prototype.useBomb = function() {
	if(this.bombs <= 0) {
		return;
	}

	if(this.is_using_bomb) {
		return;
	}

	// ボム所持数を減らす
	this.bombs--;

	// ボム使用中フラグを立てる
	this.setAutoDisableFlag("is_using_bomb", BOMB_COUNT);

	// ザコ敵を vanish する
	this.stage.enemy_manager.notifyUseBomb();

	// 敵の弾を vanish する
	this.stage.bullet_manager.notifyUseBomb();

	// アイテムを自機に吸引させる
	this.stage.item_manager.notifyUseBomb();


	// ボムを生成
	this.spell.init();
};

// グレイズしたことを通知
Character.prototype.notifyGraze = function(obj) {
	if(!(obj instanceof Bullet)) return; // 弾のみグレイズするとスコア加算する

	if(obj.is_graze) return; // 既にグレイズ済の弾は判定しない

	this.game.playSound('graze');

	this.stage.score += 100;
};





// 当たり判定サイズ
Character.prototype.collisionWidth  = function() { return 1; };
Character.prototype.collisionHeight = function() { return 3; };

// グレイズ判定サイズ
Character.prototype.grazeHeight  = function() { return 48; };
Character.prototype.grazeWidth = function() { return 48; };

// スプライトの開始位置
Character.prototype.spriteX = function() { return this.indexX; };
Character.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Character.prototype.spriteImage = function() { return 'character_renko'; };

// スプライトのサイズ
Character.prototype.spriteWidth  = function() { return 48; };
Character.prototype.spriteHeight = function() { return 48; };




module.exports = Character;

},{"../constant":3,"../logic/manager":24,"../spell/renko/spell1":80,"../util":97,"./base":29,"./boss/base":31,"./bullet":36,"./enemy":39,"./option":41}],38:[function(require,module,exports){
'use strict';

/* エフェクトオブジェクト */

// 何フレームで消滅するか
var VANISH_FRAME = 16;

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
Effect.prototype.init = function(x, y, diam) {
	BaseObject.prototype.init.apply(this, arguments);
	this.x = x;
	this.y = y;
	this.diam = diam; // 直径
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
	var r = Math.round(this.diam * this.frame_count * 0.1);

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

},{"../constant":3,"../util":97,"./base":29}],39:[function(require,module,exports){
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

		var type_id = this.shots[this.shot_index].type;

		type_id = (type_id === void 0 ? Constant.BULLET_BALL_BLUE : type_id);

		// 敵弾生成
		for( var i = 0, len = bullet_params.length; i < len; i++) {
			var param = bullet_params[i];

			this.stage.bullet_manager.create(type_id, this.x, this.y, param.vector);
		}

		// sound
		this.game.playSound('boss_shot_small');

		this.shot_index++;
	}
};

// 自機弾と衝突
Enemy.prototype.notifyCollision = function(obj) {
	if(!(obj instanceof Shot)) { return; }

	// HPを減らす
	this.vital--;

	// 死
	if(this.vital <= 0) {
		this.die();
	}
};

// ボムの使用を通知
Enemy.prototype.notifyUseBomb = function() {
	this.die();
};

// 敵死亡
Enemy.prototype.die = function() {
	// 自分を消す
	this.stage.enemy_manager.remove(this.id);

	// SEの再生
	this.game.playSound('enemy_vanish');

	// スコアの加算
	this.stage.score += 100;

	// 死亡エフェクト生成
	var size = 32;
	this.stage.effect_manager.create(this.x, this.y, size);


	// ポイントアイテムの生成
	if(this.powerItem) {
		this.stage.item_manager.create(Constant.ITEM_POWER_TYPE, this.x, this.y);
	}
	else if(this.scoreItem) {
		this.stage.item_manager.create(Constant.ITEM_SCORE_TYPE, this.x, this.y);
	}
};

// 当たり判定サイズ
Enemy.prototype.collisionWidth  = function() { return 14;  };
Enemy.prototype.collisionHeight = function() { return 24; };

// スプライトの開始位置
Enemy.prototype.spriteX = function() { return this.indexX; };
Enemy.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Enemy.prototype.spriteImage = function() { return 'enemy'; };

// スプライトのサイズ
Enemy.prototype.spriteWidth  = function() { return 32; };
Enemy.prototype.spriteHeight = function() { return 32; };


module.exports = Enemy;

},{"../constant":3,"../enemy/bullet_dictionaries":12,"../object/shot":42,"../util":97,"./vector_base":43}],40:[function(require,module,exports){
'use strict';

/* アイテムオブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

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
				'vector': { 'r': 4, 'theta': 270, 'ra': -0.1, rrange: {min: -3}, },
				is_rotate: false,
			}
		]
	]);

	this.type_id = type_id;

	if(this.isPower()) {
		// 弾のスプライト上の位置
		this.indexX = 0; this.indexY = 0;
	}
	else if(this.isScore()) {
		// 弾のスプライト上の位置
		this.indexX = 4; this.indexY = 0;
	}

	// 自機に吸引されるかどうか
	this.is_vacuum = false;
};

Item.prototype.run = function() {
	if(this.is_vacuum) {
		this.setVector([
			{
				count: 0,
				'vector': { 'r': 10, aimed: true },
			}
		]);
	}

	VectorBaseObject.prototype.run.apply(this, arguments);
};

// 衝突した時
Item.prototype.notifyCollision = function(obj) {
	// 獲得したアイテムを消す
	this.stage.item_manager.remove(this.id);

	// グレイズSEの再生
	this.game.playSound('graze');

	if(this.isPower()) {
		this.stage.score += 100;

		this.stage.character.addPower(1);
	}
	else if(this.isScore()) {
		this.stage.score += 500;
	}

};

Item.prototype.isScore = function() {
	return(this.type_id === Constant.ITEM_SCORE_TYPE ? true : false);
};

Item.prototype.isPower = function() {
	return(this.type_id === Constant.ITEM_POWER_TYPE ? true : false);
};

// グレイズした時
Item.prototype.notifyGraze = function(obj) {
	// グレイズ範囲に入ったら、自機に向かって吸引させる
	this.is_vacuum = true;
};

// ボムの使用を通知
Item.prototype.notifyUseBomb = function() {
	// ボムを使ったら、自機に向かって吸引させる
	this.is_vacuum = true;
};

// 当たり判定サイズ
Item.prototype.collisionWidth  = function() { return 60; };
Item.prototype.collisionHeight = function() { return 60; };

// グレイズ判定サイズ
Item.prototype.grazeHeight = function() { return 100; };
Item.prototype.grazeWidth  = function() { return 100; };

// スプライトの開始位置
Item.prototype.spriteX = function() { return this.indexX; };
Item.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Item.prototype.spriteImage = function() { return 'item'; };

// スプライトのサイズ
Item.prototype.spriteWidth  = function() { return 17; };
Item.prototype.spriteHeight = function() { return 16; };




module.exports = Item;

},{"../constant":3,"../util":97,"./vector_base":43}],41:[function(require,module,exports){
'use strict';

/* 自機オプションオブジェクト */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// 自機弾のベクトル
var SHOT_VECTOR = { 'r': 8, 'theta': 270 };
// Nフレーム毎に弾を撃つ
var SHOT_SPAN_1 = 50;
var SHOT_SPAN_2 = 5;



var Option = function(id, scene) {
	BaseObject.apply(this, arguments);
};
// 基底クラスを継承
Util.inherit(Option, BaseObject);

// 自機のポジションに移動
Option.prototype.setCharacterPosition = function() {
	this.y = this.character.y + this.local_y;
	this.x = this.character.x + this.local_x;
};

Option.prototype.init = function(character, x, y) {
	BaseObject.prototype.init.apply(this, arguments);
	this.character = character;
	this.local_x = x;
	this.local_y = y;
	this.setCharacterPosition();

};

Option.prototype.run = function() {
	BaseObject.prototype.run.apply(this, arguments);
	// 自機の周辺に移動
	this.setCharacterPosition();

	// レベルアップすると弾を撃つ感覚が速くなる
	var span = this.character.level < 4 ? SHOT_SPAN_1 : SHOT_SPAN_2;

	// 弾を撃つ
	if(this.frame_count % span === 0) {
		this.stage.shot_manager.create(Constant.SHOT_OPTION_TYPE, this.x, this.y, SHOT_VECTOR);
	}
};

// スプライトの開始位置
Option.prototype.spriteX = function() { return 7; };
Option.prototype.spriteY = function() { return 20; };

// スプライト画像
Option.prototype.spriteImage = function() { return 'shot2'; };

// スプライトのサイズ
Option.prototype.spriteWidth  = function() { return 20; };
Option.prototype.spriteHeight = function() { return 16; };

module.exports = Option;

},{"../constant":3,"../util":97,"./base":29}],42:[function(require,module,exports){
'use strict';

/* 自機弾オブジェクト */

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

// 弾の種類
var shot_types = require("../shot_types");

// 自機弾の移動速度
var SPEED = 8;

// constructor
var Shot = function(stage) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(Shot, VectorBaseObject);

Shot.prototype.init = function(type_id, x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	var type = shot_types[type_id];

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
		for(var i=0, len=vector.length; i<len; i++) {
			vector[i].is_rotate = type.is_rotate;
		}
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
				is_rotate: type.is_rotate,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);

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

	// 敵と接触しても消滅しないかどうか
	this.is_penetration = type.is_penetration;

	// 最後に衝突したオブジェクトのID
	this.is_last_damage_obj_id = null;
};
Shot.prototype.run = function() {
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);
};

Shot.prototype.updateDisplay = function(){
	// 自機弾は透過して表示する
	this.game.surface.globalAlpha = 0.7;
	VectorBaseObject.prototype.updateDisplay.apply(this, arguments);
	this.game.surface.globalAlpha = 1.0;
};


// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return this.collision_width; };
Shot.prototype.collisionHeight = function() { return this.collision_height; };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return this.indexX; };
Shot.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Shot.prototype.spriteImage = function() { return this.image; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return this.width; };
Shot.prototype.spriteHeight = function() { return this.height; };

// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 最後に衝突したオブジェクトのIDを保存
	this.is_last_damage_obj_id = obj.id;

	// 貫通する弾なら消えない
	if(this.is_penetration) return;

	// 自分を消す
	this.stage.shot_manager.remove(this.id);
};
// obj に対してダメージが与えられるかどうか
Shot.prototype.isEnableDamage = function(obj) {
	// 最後にダメージを与えた敵には重複してダメージを与えない
	// 貫通する弾だとフレーム毎にダメージを与えてしまうため
	if(this.is_last_damage_obj_id === obj.id) return false;

	return true;
};


module.exports = Shot;

},{"../constant":3,"../shot_types":77,"../util":97,"./vector_base":43}],43:[function(require,module,exports){
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

	// 動きを設定
	this.setVector(vectors);
};

// 動きを設定
VectorBase.prototype.setVector = function(vectors) {
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
			// 角度の加速度
			w: vec.vector.w || 0,
			// 速度の加速度
			ra: vec.vector.ra || 0,
			// 角度の加速度の加速度
			wa: vec.vector.wa || 0,
			// 速度の加速度の加速度
			raa: vec.vector.raa || 0,
			// 角度の加速度の加速度の加速度
			waa: vec.vector.waa || 0,

			// 角度の最大値
			trange: vec.vector.trange || null,
			// 速度の最大値
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

	// 自機狙い設定のベクトルについて、自機にむける
	this._calculateAimedVector();
};

// 自機狙いにする
VectorBase.prototype._calculateAimedVector = function() {
	var i = this.vector_index;

	// 自機狙い設定がされているか確認
	if( ! this.vectors[i].aimed) return;

	// 自機
	var character = this.stage.character;

	var ax = character.x - this.x;
	var ay = character.y - this.y;

	this.vectors[i].theta = this._radian_to_theta(Math.atan2(ay, ax));
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

		// 自機狙い設定のベクトルについて、自機にむける
		this._calculateAimedVector();

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

},{"../constant":3,"../util":97,"./base":29}],44:[function(require,module,exports){
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

},{}],45:[function(require,module,exports){
'use strict';

/* コンフィグ画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

// キーコンフィグメニュー一覧
var MENU = [
	{name: 'SHOT (Zキー)', key: Constant.BUTTON_Z },
	{name: 'BOMB (Xキー)', key: Constant.BUTTON_X },
	{name: 'SLOW', key: Constant.BUTTON_SHIFT },
	{name: 'PAUSE', key: Constant.BUTTON_SPACE },
	{name: '戻る', key: null }, // 戻るだけキーコンフィグではない
];

var ConfigScene = function(game) {
	BaseScene.apply(this, arguments);

	// 今どれにカーソルがあるか
	this.index = 0;
};

// 基底クラスを継承
Util.inherit(ConfigScene, BaseScene);

// フレーム処理
ConfigScene.prototype.init = function(){
	BaseScene.prototype.init.apply(this, arguments);
	// 今どれにカーソルがあるか
	this.index = 0;
};

// フレーム処理
ConfigScene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// カーソルを上移動
	if(this.game.isKeyPush(Constant.BUTTON_DOWN)) {
		this.index++;

		if(this.index >= MENU.length) {
			this.index = MENU.length - 1;
		}
	}
	// カーソルを下移動
	if(this.game.isKeyPush(Constant.BUTTON_UP)) {
		this.index--;

		if(this.index < 0) {
			this.index = 0;
		}
	}

	// 戻る
	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		// TODO: menu.length -1 を const化
		if(this.index === MENU.length - 1) { // MENU の最後の項目 = 戻る
			this.game.user_config.save();
			this.game.notifyConfigDone();
		}
	}

	// 押下したボタンを取得
	var button_id = this.getAnyButtonId();
	if (button_id !== undefined && this.index !== MENU.length - 1) { // ボタンが押下されてて、戻るボタンにカーソルを合わせてないなら
		if(this.frame_count >= 60) { // キーコンフィグ遷移後すぐの入力は、キーコンフィグ遷移ボタンがまだ入力されている可能性があるので無視
			this.game.user_config.setKeyByButtonId(button_id, MENU[this.index].key);
		}
	}
};

// 画面更新
ConfigScene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;

	ctx.save();

	// セリフテキストの x, y 座標初期位置
	var cursor_x    = 206;
	var text_x      = 236;
	var button_id_x = 386;
	var y = 220;

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

	ctx.restore();

	// コンフィグメニュー一覧
	ctx.save();

	// 文字背景 表示
	ctx.fillStyle = 'rgb( 57, 93, 220 )' ;
	//ctx.globalAlpha = 0.3; // 半透明
	ctx.fillRect(cursor_x - 10, y - 30, button_id_x - cursor_x + 50, MENU.length * 33);

	// 文字表示
	ctx.globalAlpha = 1.0; // 半透明戻す
	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 255, 255 )';

	var map = this.game.user_config.getKeyToButtonIdMap();
	for(var i = 0, len = MENU.length; i < len; i++) {
		if(this.index === i) {
			// cursor 表示
			ctx.fillText("▶", cursor_x, y);
		}
		// 文字表示
		ctx.fillText(MENU[i].name, text_x, y); // 1行表示

		// button_id 表示
		if(MENU[i].key) {
			ctx.fillText(Number(map[ MENU[i].key ]) + 1, button_id_x, y); // 配列の index なので -1 されているので、+1する
		}

		y+= 30;
	}

	ctx.restore();

};

// 押下されている GamePad のbutton_id を取得
ConfigScene.prototype.getAnyButtonId = function(){
	if(!this.game.is_connect_gamepad) return;

	var pads = navigator.getGamepads();
	var pad = pads[0]; // 1Pコン

	if(!pad) return;

	// ボタン入力
	for (var i = 0; i < pad.buttons.length; i++) {
		if(pad.buttons[i].pressed) { // 押下されてたら
			return i;
		}
	}
};




module.exports = ConfigScene;

},{"../config":2,"../constant":3,"../util":97,"./base":44}],46:[function(require,module,exports){
'use strict';

/* エンド */

var end = require("../createjs/end");
var CreateJS = require("../logic/createjs");

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

	this.end = new CreateJS(new end.epilog(), 640, 480);
	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.end.update();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.frame_count === 180) {
		this.game.playBGM('ending');
	}
	else if(this.frame_count === 9002) {
		this.game.fadeOutBGM(19.8);
	}

	if(this.frame_count === 10600) {
		this.game.notifyEndDone();
	}
	else {
		this.end.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.end.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 0, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};

module.exports = Scene;

},{"../config":2,"../constant":3,"../createjs/end":6,"../logic/createjs":21,"../util":97,"./base":44}],47:[function(require,module,exports){
'use strict';

/* エピローグ画面A */

var epilogue = require("../createjs/epilogue_a");
var CreateJS = require("../logic/createjs");

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

	this.epilogue = new CreateJS(new epilogue.ED_A(), 640, 480);

	this.game.playBGM('epilogue');
	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.epilogue.update();

};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// エピローグ終了
	if(this.frame_count === 9800 + 120) {
		this.game.fadeOutBGM(5);
	}
	else if(this.frame_count > 10300 + 120) {
		this.game.notifyEpilogueADone();
	}
	else {
		if(this.frame_count === 8030) {
			// もう一度再生
			this.game.playBGM('epilogue');
		}

		this.epilogue.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.epilogue.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 0, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};




module.exports = Scene;

},{"../config":2,"../constant":3,"../createjs/epilogue_a":7,"../logic/createjs":21,"../util":97,"./base":44}],48:[function(require,module,exports){
'use strict';

/* エピローグ画面B */

var epilogue = require("../createjs/epilogue_b");
var CreateJS = require("../logic/createjs");

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

	this.epilogue = new CreateJS(new epilogue.ED_B(), 640, 480);
	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.epilogue.update();

};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// エピローグ終了
	if(this.frame_count > 4040) {
		this.game.notifyEpilogueBDone();
	}
	else {
		this.epilogue.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.epilogue.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 255, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};




module.exports = Scene;

},{"../config":2,"../constant":3,"../createjs/epilogue_b":8,"../logic/createjs":21,"../util":97,"./base":44}],49:[function(require,module,exports){
'use strict';

/* エピローグ画面C */

var epilogue = require("../createjs/epilogue_c");
var CreateJS = require("../logic/createjs");

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

	this.epilogue = new CreateJS(new epilogue.ED_C(), 640, 480);
	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.epilogue.update();

};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	// エピローグ終了
	if(this.frame_count > 4400) {
		this.game.notifyEpilogueCDone();
	}
	else {
		this.epilogue.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.epilogue.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 255, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};




module.exports = Scene;

},{"../config":2,"../constant":3,"../createjs/epilogue_c":9,"../logic/createjs":21,"../util":97,"./base":44}],50:[function(require,module,exports){
'use strict';
var cjs = require("../createjs");
var images = require("../image_store");


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
	// 読み込んだcreatejs用画像の数
	this.loadedCjsImageNum = 0;

	// フォントの読み込みが完了したか
	this.fontLoadingDone = false;

	// ogg ファイルのBGMが再生可能かどうか
	this.canPlayOgg = Util.canPlayOgg();
};

// 基底クラスを継承
Util.inherit(LoadingScene, BaseScene);

// 初期化
LoadingScene.prototype.init = function() {
	// ゲームで使う画像の読み込み
	this._loadImages();
	// createjsで使う画像の読み込み
	this._loadCjsImages();
	// SE の読み込み
	this._loadSounds();
	// BGM の読み込み
	this._loadBGMs();
};

// 読み込んだ素材数
LoadingScene.prototype.loaded_material_num = function() {
	return this.loadedImageNum + this.loadedSoundNum + this.loadedBGMNum + this.loadedCjsImageNum;
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
	ctx.fillStyle = 'rgb(255,255,255)' ;
	ctx.fillRect(0, 0, this.game.width, this.game.height);

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

LoadingScene.prototype._loadCjsImages = function() {
	var self = this;

	var loader = new cjs.PreloadJS(false);
	loader.onFileLoad = function(o) {
		if (o.type === "image") {
			images[o.id] = o.result;
			self.loadedCjsImageNum++;
		}
	};
	//loader.onComplete = handleComplete;
	loader.loadManifest(Config.CJS_IMAGES);
};


LoadingScene.prototype._loadSounds = function() {
	var self = this;
	var ext = self.canPlayOgg ? ".ogg" : ".m4a";

	// SEが読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedBGMNum++;
	};

	var conf, audio;
	for(var key in Config.SOUNDS) {
		conf = Config.SOUNDS[key];
		audio = new Audio(conf.path + ext);
		audio.volume = conf.volume;
		audio.addEventListener('canplay', onload_function);
		audio.load();
		this.game.sounds[key] = audio;
	}

};

LoadingScene.prototype._loadBGMs = function() {
	var self = this;

	var ext = self.canPlayOgg ? ".ogg" : ".m4a";

	for(var key in Config.BGMS) {
		/*jshint loopfunc: true */
		(function(key) {
			var conf = Config.BGMS[key];

			self._loadBGM(conf.path + ext, function(audioBuffer) {
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

},{"../config":2,"../createjs":4,"../image_store":20,"../util":97,"./base":44}],51:[function(require,module,exports){
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
		// TODO: delete
		// 喋ってない方のキャラは薄くなる
		//ctx.globalAlpha = 0.5;
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
		// TODO: delete
		//ctx.globalAlpha = 0.5;
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
	//ctx.textBaseline = 'middle';
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

},{"../config":2,"../constant":3,"../logic/serif":26,"../serif/prologue2":66,"../util":97,"./base":44}],52:[function(require,module,exports){
'use strict';

/* スタッフロール */

var staffroll = require("../createjs/staffroll");
var CreateJS = require("../logic/createjs");

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

	this.staffroll = new CreateJS(new staffroll.staffroll(), 640, 480);

	this.game.playBGM('staffroll');

	// 前のシーンの run -> このシーンの updatedisplay と走るので、
	// init の段階で update しておく
	// しないと updatedisplay の clearcanvas で画面が真っ白になる
	this.staffroll.update();
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.frame_count > 7800) {
		this.game.notifyStaffRollDone();
	}
	else {
		this.staffroll.update();
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var ctx = this.game.surface;
	ctx.save();
	ctx.drawImage(this.staffroll.canvas, 0, 0);
	ctx.restore();

	if(Config.DEBUG) {
		this._showFrameCount();
	}
};

// デバッグメッセージ
Scene.prototype._showFrameCount = function() {
	var ctx = this.game.surface;
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	//ctx.textBaseline = 'middle';
	ctx.fillStyle = 'rgb( 255, 0, 255 )';

	// フレーム数
	ctx.fillText("フレーム数：" + this.frame_count.toString(), 20, 20);

	ctx.restore();
};

module.exports = Scene;

},{"../config":2,"../constant":3,"../createjs/staffroll":11,"../logic/createjs":21,"../util":97,"./base":44}],53:[function(require,module,exports){
'use strict';

/* ステージ画面 */

// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 3;

// 体験版終了のステージ
var LAST_TRIAL_STAGE = 1;

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Config = require('../config');
var Constant = require('../constant');

var Manager = require('../logic/manager');

// オブジェクト
var Character = require('../object/character');
var Shot = require('../object/shot');
var Enemy = require('../object/enemy');
var Bullet = require('../object/bullet');
var Effect = require('../object/effect');
var Item = require('../object/item');

// ステージの状態
var StartState = require('./stage/state/start');
var WayState = require('./stage/state/way');
var TalkStateBefore = require('./stage/state/talk_before');
var TalkStateAfter = require('./stage/state/talk_after');
var BossState = require('./stage/state/boss');
var ClearState = require('./stage/state/result_clear');
var GameoverState = require('./stage/state/result_gameover');
var PauseState = require('./stage/state/pause');

// ボス
var Stage1Boss = require('../object/boss/aya');
var Stage2Boss = require('../object/boss/sanae');
var Stage3Boss = require('../object/boss/yuuka');
var Stage4Boss = require('../object/boss/yukari');
var Stage5Boss = require('../object/boss/merry');

// セリフ
var stage1_serif_before = require('../serif/stage1/before');
var stage1_serif_after  = require('../serif/stage1/after');
var stage2_serif_before = require('../serif/stage2/before');
var stage2_serif_after  = require('../serif/stage2/after');
var stage3_serif_before = require('../serif/stage3/before');
var stage3_serif_after  = require('../serif/stage3/after');
var stage4_serif_before = require('../serif/stage4/before');
var stage4_serif_after  = require('../serif/stage4/after');
var stage5_serif_before = require('../serif/stage5/before');
var stage5_serif_after  = require('../serif/stage5/after');

// 敵の出現情報
var stage1_enemy_info = require('../enemy/stage1');
var stage2_enemy_info = require('../enemy/stage2');
var stage3_enemy_info = require('../enemy/stage3');
var stage4_enemy_info = require('../enemy/stage4');
var stage5_enemy_info = require('../enemy/stage5');

var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.bullet_manager = new Manager(Bullet, this);
	this.item_manager   = new Manager(Item, this);
	this.shot_manager   = new Manager(Shot, this);
	this.character      = new Character(this);
	this.enemy_manager  = new Manager(Enemy, this);
	this.effect_manager = new Manager(Effect, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.item_manager,
		this.shot_manager,
		this.character,
		this.bullet_manager,
		this.enemy_manager,
		this.effect_manager,
	];

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.START_STATE ]      = new StartState(this);
	this.states[ Constant.WAY_STATE ]      = new WayState(this);
	this.states[ Constant.TALK1_STATE ]    = new TalkStateBefore(this);
	this.states[ Constant.BOSS_STATE ]     = new BossState(this);
	this.states[ Constant.TALK2_STATE ]    = new TalkStateAfter(this);
	this.states[ Constant.CLEAR_STATE ]   = new ClearState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);
	this.states[ Constant.PAUSE_STATE ]   = new PauseState(this);

	// ボス一覧
	this.bosses = [
		new Stage1Boss(this),
		new Stage2Boss(this),
		new Stage3Boss(this),
		new Stage4Boss(this),
		new Stage5Boss(this),
	];

	// 敵の出現情報
	this.enemy_info_list = [
		stage1_enemy_info,
		stage2_enemy_info,
		stage3_enemy_info,
		stage4_enemy_info,
		stage5_enemy_info,
	];

	// ボス前のセリフ情報
	this.serif_before_list = [
		stage1_serif_before,
		stage2_serif_before,
		stage3_serif_before,
		stage4_serif_before,
		stage5_serif_before,
	];

	// ボス後のセリフ情報
	this.serif_after_list = [
		stage1_serif_after,
		stage2_serif_after,
		stage3_serif_after,
		stage4_serif_after,
		stage5_serif_after,
	];

	// ステージ背景
	this.bg_images = [
		'stage1_bg',
		'stage2_bg',
		'stage3_bg',
		'stage4_bg',
		'stage5_bg',
	];

	// ステージ説明書き
	this.descriptions = [
		'幻想の地の名も無き道',
		'寄る辺無き巫女',
		'無限で夢幻の花の国',
		'虚無と実存の境界',
		'?????????',
	];


	this.score = 0; // スコア
	this.state = null; // ステージの現在の状態
	this.stage = 0; // 現在のステージ
	this.state_before_pause = this.state; // ポーズ前のstateが何だったか
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.score = 0; // スコア
	this.state = null; // ステージの現在の状態
	this.stage = Config.DEBUG && Config.DEBUG_STAGE ? Config.DEBUG_STAGE : 0; // 現在のステージ
	this.state_before_pause = this.state; // ポーズ前のstateが何だったか

	this.initObjects();

	// TODO: DEBUG
	// 道中開始
	this.changeState(Config.DEBUG && Config.DEBUG_STATE ? Config.DEBUG_STATE : Constant.START_STATE);
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

// 現在のステージの敵の出現情報
Scene.prototype.currentStageEnemyInfo = function() {
	return this.enemy_info_list[this.stage];
};

// 現在のステージのボス前のセリフ
Scene.prototype.currentStageSerifBefore = function() {
	return this.serif_before_list[this.stage];
};

// 現在のステージのボス後のセリフ
Scene.prototype.currentStageSerifAfter = function() {
	return this.serif_after_list[this.stage];
};

// 現在のボス インスタンス
Scene.prototype.currentStageBoss = function() {
	return this.bosses[this.stage];
};

// 現在のステージ背景画像
Scene.prototype.currentStageBackGround = function() {
	return this.bg_images[this.stage];
};

// 現在のステージ背景画像
Scene.prototype.currentStageDescription = function() {
	return this.descriptions[this.stage];
};

// 次のステージへ
Scene.prototype.goNextStage = function(){
	// ステージ切り替え
	this.stage++;

	// 次のステージの道中開始
	this.changeState(Constant.START_STATE);

	// 自機を初期位置に
	this.character.setInitPosition();
};

// 次のステージがあるかどうか
Scene.prototype.hasNextStage = function(){
	return this.enemy_info_list[this.stage + 1] ? true : false;
};

// 体験版の最後のステージか
Scene.prototype.isLastTrialStage = function(){
	return this.stage + 1 >= LAST_TRIAL_STAGE ? true : false;
};

// 現在のステージ番号
Scene.prototype.currentStageNo = function(){
	return this.stage + 1;
};

Scene.prototype.initObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}
};

Scene.prototype.initObjectsWithoutCharacter = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		if (this.objects[i] instanceof Character) continue;
		this.objects[i].init();
	}
};

Scene.prototype.runObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].run();
	}
};

Scene.prototype.updateDisplayObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	this.currentState().run();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

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
	var star = this.game.getImage('star');
	var star_width = star.width * Config.CHARA_SIZE_RATIO;
	var star_height = star.height * Config.CHARA_SIZE_RATIO;

	var player_string = this.game.getImage('player');
	var power_string = this.game.getImage('power');
	var score_string = this.game.getImage('score');
	var spell_string = this.game.getImage('spell');

	var x1 = this.game.width - SIDE_WIDTH + 10;
	var x2 = this.game.width - SIDE_WIDTH + 35;


	var i;

	var ctx = this.game.surface;
	ctx.save();

	// Score String
	ctx.drawImage(score_string,
		x1,
		50,
		score_string.width * Config.CHARA_SIZE_RATIO,
		score_string.height * Config.CHARA_SIZE_RATIO
	);

	this._showNumString(this.score, x2, 75);

	// Player String
	ctx.drawImage(player_string,
		x1,
		100,
		player_string.width * Config.CHARA_SIZE_RATIO,
		player_string.height * Config.CHARA_SIZE_RATIO
	);

	// Player Life
	for (i = 0; i < this.character.life; i++) {
		ctx.drawImage(star,
			x2 + i * star_width,
			125,
			star_width,
			star_height
		);
	}

	// Spell String
	ctx.drawImage(spell_string,
		x1,
		150,
		spell_string.width * Config.CHARA_SIZE_RATIO,
		spell_string.height * Config.CHARA_SIZE_RATIO
	);


	// Player Bombs
	for (i = 0; i < this.character.bombs; i++) {
		ctx.drawImage(star,
			x2 + i * star_width,
			175,
			star_width,
			star_height
		);
	}

	// Player Power
	ctx.drawImage(power_string,
		x1,
		200,
		score_string.width * Config.CHARA_SIZE_RATIO,
		score_string.height * Config.CHARA_SIZE_RATIO
	);

	/* text
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("Power", x1, 200 + 16);
	*/

	this._showNumString(this.character.power, x2, 225);




	/*
	if(Config.DEBUG) {
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("Frame: " + this.frame_count, x1, this.game.height - 30);
	}
	*/
	ctx.restore();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;

	var stage_bg = this.game.getImage(this.currentStageBackGround());

	var height = stage_bg.height * Config.CHARA_SIZE_RATIO;
	var width  = stage_bg.width  * Config.CHARA_SIZE_RATIO;

	var x = 0;
	var y = (this.frame_count * BACKGROUND_SCROLL_SPEED) % height; // 背景画像をスクロールさせる

	ctx.save();

	// 2枚つなげてスクロールさせる
	this.game.surface.drawImage(stage_bg,
		0,
		0,
		stage_bg.width,
		stage_bg.height,
		x,
		y,
		width,
		height
	);

	this.game.surface.drawImage(stage_bg,
		0,
		0,
		stage_bg.width,
		stage_bg.height,
		x,
		y - height,
		width,
		height
	);
	this.game.surface.restore();

	// ボスの際は背景を暗くする
	if(this.state === Constant.BOSS_STATE) {
		ctx.save();
		var shadow = this.game.getImage('shadow');
		//this.game.surface.globalAlpha = 1.0;
		this.game.surface.drawImage(shadow,
			0,
			0,
			shadow.width,
			shadow.height
		);

		this.game.surface.restore();
	}

};

Scene.prototype._showNumString = function(num, x, y){
	var ctx = this.game.surface;
	var num_string = this.game.getImage('num');
	var score_string_list = num.toString().split("");

	var num_width = 30; // 数字の横サイズ

	for (var i = 0; i < score_string_list.length; i++) {
		// 0 だけ一番最後にある
		var pos = score_string_list[i] === "0" ? 9 : score_string_list[i] - 1;

		ctx.drawImage(num_string,
			// スプライトの取得位置
			num_width * pos, 0,
			// スプライトのサイズ
			num_width, num_string.height,
			// 位置
			x + i * num_width * Config.CHARA_SIZE_RATIO, y,
			// オブジェクトのゲーム上のサイズ
			num_width * Config.CHARA_SIZE_RATIO, num_string.height * Config.CHARA_SIZE_RATIO
		);
	}
};





// 自機が死亡
Scene.prototype.notifyCharacterDead = function() {
	this.changeState(Constant.GAMEOVER_STATE);
};

// ゲームオーバーのリザルト終了後
Scene.prototype.notifyRetry = function() {
	// コンティニューしたらスコアを半分にする
	this.score = Math.floor(this.score / 2);

	// キャラを初期化
	this.character.init();

	this.changeState(Constant.START_STATE);
};

// ポーズ開始
Scene.prototype.notifyPauseStart = function() {
	// ポーズ前のstateが何だったかを保存
	this.state_before_pause = this.state;

	this.changeState(Constant.PAUSE_STATE);
};
// ポーズ終了
Scene.prototype.notifyPauseEnd = function() {
	// ポーズ前のstateに戻る
	this.state = this.state_before_pause;

	this.state_before_pause = null; // 前のstate情報をクリア
};
// ゲーム終了
Scene.prototype.notifyStageQuit = function() {
	this.game.notifyStageQuit();
};

// スタート時のタイトル表示の終了
Scene.prototype.notifyStartEnd = function() {
	// 道中シーンへ
	this.changeState(Constant.WAY_STATE);
};
// 道中の終了
Scene.prototype.notifyWayEnd = function() {
	// ボスとの会話シーンへ
	this.changeState(Constant.TALK1_STATE);
};
// ボス前セリフが終了した
Scene.prototype.notifyBeforeTalkEnd = function () {
	this.changeState(Constant.BOSS_STATE);
};

// ボス戦の終了
Scene.prototype.notifyBossEnd = function() {
	// ボスとの会話シーンへ
	this.changeState(Constant.TALK2_STATE);
};
// ボス後セリフが終了した
Scene.prototype.notifyAfterTalkEnd = function () {
	this.changeState(Constant.CLEAR_STATE);
};
// リザルト画面の終了
Scene.prototype.notifyClearEnd = function() {
	if(Config.TRIAL && this.isLastTrialStage()) {
		// 体験版終了
		this.game.notifyTrialDone();
	}
	else if(this.hasNextStage()) {
		// 次のステージへ
		this.goNextStage();
	}
	else {
		// ステージ全クリアした
		this.game.notifyStageDone();
	}
};





module.exports = Scene;

},{"../config":2,"../constant":3,"../enemy/stage1":14,"../enemy/stage2":15,"../enemy/stage3":16,"../enemy/stage4":17,"../enemy/stage5":18,"../logic/manager":24,"../object/boss/aya":30,"../object/boss/merry":32,"../object/boss/sanae":33,"../object/boss/yukari":34,"../object/boss/yuuka":35,"../object/bullet":36,"../object/character":37,"../object/effect":38,"../object/enemy":39,"../object/item":40,"../object/shot":42,"../serif/stage1/after":67,"../serif/stage1/before":68,"../serif/stage2/after":69,"../serif/stage2/before":70,"../serif/stage3/after":71,"../serif/stage3/before":72,"../serif/stage4/after":73,"../serif/stage4/before":74,"../serif/stage5/after":75,"../serif/stage5/before":76,"../util":97,"./base":44,"./stage/state/boss":55,"./stage/state/pause":56,"./stage/state/result_clear":58,"./stage/state/result_gameover":59,"./stage/state/start":60,"./stage/state/talk_after":61,"./stage/state/talk_before":63,"./stage/state/way":64}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

	this.stage.currentStageBoss().init();

	// 道中の敵弾だけリセット
	this.stage.bullet_manager.init();

	// 道中曲を止める
	this.game.stopBGM();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM(this.stage.currentStageBoss().bgm());
	}

	// ボス戦の終了
	if(this.stage.currentStageBoss().isDeadCompletely()) {
		//ボスのスペルカードが全て無くなった
		this.stage.notifyBossEnd();
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		character.useBomb();
	}

	// SPACE でポーズ
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.stage.notifyPauseStart();
	}

	// Z押しっぱで低速移動
	character.setSlow(this.game.isKeyDown(Constant.BUTTON_SHIFT));

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft();
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight();
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown();
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp();
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

	if(!Config.DEBUG || Number(document.getElementById("invincible").value) === 0) { // TODO: DEBUG
		// 敵弾と自機の衝突判定
		this.stage.bullet_manager.checkCollisionWithObject(character);

		// ボスが表示されているなら当たり判定をする
		if(this.stage.currentStageBoss().is_show && this.stage.currentStageBoss().is_live) {
			// ボスと自機の衝突判定
			this.stage.currentStageBoss().checkCollisionWithObject(character);
		}
	}

	// TODO: コリジョンチェック側でis_showを見たいね・・
	// ボスが表示されているなら当たり判定をする
	if(this.stage.currentStageBoss().is_show && this.stage.currentStageBoss().is_live) {
		// ボスと自機弾の衝突判定
		this.stage.shot_manager.checkCollisionWithObject(this.stage.currentStageBoss());
	}
	// 敵弾と自機のグレイズ判定
	this.stage.bullet_manager.checkGrazeWithObject(character);


	this.stage.currentStageBoss().run();
	this.stage.runObjects();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.currentStageBoss().updateDisplay();
	this.stage.updateDisplayObjects();

	// スペルカード残り時間
	this._showVital();

	// スペカ名
	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "14px 'Migu'" ;
	ctx.fillText(this.stage.currentStageBoss().currentSpellName(), VITAL_OUTLINE_MARGIN, 25);
	ctx.restore();

};
// スペルカード残り時間
State.prototype._showVital = function(){
	var ctx = this.game.surface;
	ctx.save();

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.fillRect(
		VITAL_OUTLINE_MARGIN,
		VITAL_OUTLINE_MARGIN,
		this.stage.currentStageBoss().vitalPercentage() * (this.stage.width - VITAL_OUTLINE_MARGIN * 2),
		VITAL_OUTLINE_MARGIN
	);

	ctx.restore();
};



module.exports = State;

},{"../../../config":2,"../../../constant":3,"../../../util":97,"./base":54}],56:[function(require,module,exports){
'use strict';

// ポーズ

var BaseState = require('./base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var PauseState = function(stage) {
	BaseState.apply(this, arguments);

	this.selectIndex = 0;
};
Util.inherit(PauseState, BaseState);

// フレーム処理
PauseState.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_UP)) {
		this.game.playSound('select');
		this.selectIndex = 0;
	}
	else if(this.game.isKeyPush(Constant.BUTTON_DOWN)) {
		this.game.playSound('select');
		this.selectIndex = 1;
	}
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.game.playSound('select');

		// Continue
		this.stage.notifyPauseEnd();
	}
	else if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		this.game.playSound('select');
		if(this.selectIndex === 0) {
			// Continue
			this.stage.notifyPauseEnd();
		}
		else if(this.selectIndex === 1) {
			// Quit
			this.stage.notifyStageQuit();
		}
	}
};

// 画面更新
PauseState.prototype.updateDisplay = function(){
	var ctx = this.game.surface;

	ctx.save();

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = 0.7; // 半透明
	ctx.fillRect(0, 0, this.stage.width, this.stage.height);

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'center';
	ctx.font = "18px 'Migu'" ;

	//ctx.textBaseline = 'middle';

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 1.0;
	}
	else {
		ctx.globalAlpha = 0.2;
	}

	ctx.fillText( 'Continue', 240, 200 ) ;

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 0.2;
	}
	else {
		ctx.globalAlpha = 1.0;
	}

	ctx.fillText( 'Quit',     240, 240 ) ;
	ctx.restore();
};

module.exports = PauseState;

},{"../../../constant":3,"../../../util":97,"./base":54}],57:[function(require,module,exports){
'use strict';

/* 結果画面基底クラス */
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

	this.transitionStartFrame = 0;
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// キャラだけ表示する
	this.stage.character.run();

	if(this.isTransitionEnd()) {
		this.game.stopBGM();
		this.notifyResultEnd();
	}
	else {
		if(this.game.isKeyPush(Constant.BUTTON_Z) && !this.isInTransition()) {
				this.game.playSound('select');

				this.setTransition();
		}
	}
};

State.prototype.isInTransition = function(){
	return this.transitionStartFrame ? true : false;
};
State.prototype.isTransitionEnd = function(){
	return this.isInTransition() && (this.transitionStartFrame + RESULT_TRANSITION_COUNT < this.frame_count);
};
State.prototype.setTransition = function(){
	this.transitionStartFrame = this.frame_count;
};


// 画面更新
State.prototype.updateDisplay = function(){
	// キャラだけ表示する
	this.stage.character.updateDisplay();

	var ctx = this.game.surface;

	this._showScoreWindow();

	if(this.isInTransition()) {
		ctx.save();
		var alpha = 1.0 ;
		if(this.transitionStartFrame + RESULT_TRANSITION_COUNT >= this.frame_count) {
			alpha = (this.frame_count - this.transitionStartFrame) / RESULT_TRANSITION_COUNT;
		}
		else {
			alpha = 1.0;
		}
		ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
		ctx.globalAlpha = alpha;
		ctx.fillRect(0, 0, this.stage.width, this.stage.height);

		ctx.restore();
	}

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
	ctx.fillRect(0, 140, this.stage.width, 140);

	ctx.globalAlpha = alpha; // 文字を表示するので戻す

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'center';
	ctx.font = "18px 'Migu'" ;
	ctx.fillText(this.resultName(), this.stage.width/2, 180);


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
		ctx.textAlign = 'center';
		ctx.fillText('Press Z to Next', this.stage.width/2, 255);
	}

	ctx.restore();
};

// リザルト画面終了
State.prototype.notifyResultEnd = function(){
	console.error("notifyResultEnd method must be overridden");
};

// リザルト画面のタイトル名
State.prototype.resultName = function(){
	return "";
};



module.exports = State;

},{"../../../config":2,"../../../constant":3,"../../../util":97,"./base":54}],58:[function(require,module,exports){
'use strict';

// クリア リザルト

var BaseState = require('./result_base');
var Util = require('../../../util');

var ResultState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(ResultState, BaseState);

// リザルト画面が終了した
ResultState.prototype.notifyResultEnd = function () {
	this.stage.notifyClearEnd();
};

ResultState.prototype.resultName = function(){
	return "STAGE CLEAR !";
};


module.exports = ResultState;

},{"../../../util":97,"./result_base":57}],59:[function(require,module,exports){
'use strict';

// ゲームオーバー リザルト

var BaseState = require('./result_base');
var Util = require('../../../util');
var Constant = require('../../../constant');

var ResultState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(ResultState, BaseState);

ResultState.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.selectIndex = 0;
};

ResultState.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);
	if(!this.isInTransition()) {
		if(this.game.isKeyPush(Constant.BUTTON_UP)) {
			this.game.playSound('select');
			this.selectIndex = 0;
		}
		else if(this.game.isKeyPush(Constant.BUTTON_DOWN)) {
			this.game.playSound('select');
			this.selectIndex = 1;
		}
	}
};

var RESULT_TRANSITION_COUNT = 100;
// スコア結果画面のオーバーライド
ResultState.prototype._showScoreWindow = function(){
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
	ctx.fillRect(0, 140, this.stage.width, 180);

	ctx.globalAlpha = alpha; // 文字を表示するので戻す

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'center';
	ctx.font = "18px 'Migu'" ;
	ctx.fillText(this.resultName(), this.stage.width/2, 180);


	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Result', 100, 210);
	ctx.textAlign = 'right' ;
	ctx.fillText('Score: ' + this.stage.score, 380, 210);
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect(100, 225, 280, 1);

	ctx.textAlign = 'center';

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 1.0 * alpha;
	}
	else {
		ctx.globalAlpha = 0.2 * alpha;
	}

	ctx.fillText('Continue', this.stage.width/2, 265);

	if(this.selectIndex === 0) {
		ctx.globalAlpha = 0.2 * alpha;
	}
	else {
		ctx.globalAlpha = 1.0 * alpha;
	}

	ctx.fillText('Quit', this.stage.width/2, 295);

	ctx.restore();
};




// リザルト画面が終了した
ResultState.prototype.notifyResultEnd = function () {
	if(this.selectIndex === 0) {
		// Continue
		this.stage.notifyRetry();
	}
	else if(this.selectIndex === 1) {
		// Quit
		this.stage.notifyStageQuit();
	}
};

ResultState.prototype.resultName = function(){
	return "GAME OVER...";
};



module.exports = ResultState;

},{"../../../constant":3,"../../../util":97,"./result_base":57}],60:[function(require,module,exports){
'use strict';

/* 道中 最初のタイトル表示 */

var BaseState = require('./base');
var Util = require('../../../util');
var Constant = require('../../../constant');

// タイトルの表示期間
var SHOW_TITLE_COUNT = 300;

// BGMの開始タイミング
var PLAY_BGM_COUNT = 60;

var State = function(stage) {
	BaseState.apply(this, arguments);

};
Util.inherit(State, BaseState);
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.stage.initObjectsWithoutCharacter();
};
// フレーム更新
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === PLAY_BGM_COUNT) {
		this.game.playBGM('douchu');
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		character.useBomb();
	}

	// SPACE でポーズ
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.stage.notifyPauseStart();
	}

	// Z押しっぱで低速移動
	character.setSlow(this.game.isKeyDown(Constant.BUTTON_SHIFT));

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft();
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight();
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown();
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp();
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

	// タイトル表示時間を過ぎたら
	if(this.frame_count > SHOW_TITLE_COUNT) {
		this.stage.notifyStartEnd();
	}

	this.stage.runObjects();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.updateDisplayObjects();

	var ctx = this.game.surface;

	ctx.save();

	var alpha = 1.0 ;
	if( this.frame_count < (SHOW_TITLE_COUNT / 3)) {
		// 最初の1/3はフェードイン
		alpha = (this.frame_count * 3) / SHOW_TITLE_COUNT;
	}
	else if(SHOW_TITLE_COUNT / 3 < this.frame_count && this.frame_count < SHOW_TITLE_COUNT * 2 / 3) {
		// 真ん中の1/3は表示
		alpha = 1.0;
	}
	else if(SHOW_TITLE_COUNT * 2 / 3 < this.frame_count) {
		// 最後の1/3はフェードアウト
		alpha = (SHOW_TITLE_COUNT - this.frame_count) * 3 / SHOW_TITLE_COUNT;
	}

	ctx.fillStyle = 'rgb( 0, 0, 0 )' ;
	ctx.globalAlpha = alpha * 0.5; // タイトル背景黒は半透明
	ctx.fillRect( 0, 170, 480, 100 ) ;

	ctx.globalAlpha = alpha ;
	ctx.fillStyle = 'rgb( 255, 255, 255 )' ;
	ctx.textAlign = 'left' ;
	ctx.font = "16px 'Migu'" ;
	ctx.fillText( 'Stage ' + this.stage.currentStageNo(), 100, 210 ) ;
	ctx.textAlign = 'right' ;
	ctx.font = "14px 'Migu'" ;
	ctx.fillText(this.stage.currentStageDescription(), 380, 250 ) ;
	// ステージ名とタイトルの間の白い棒線
	ctx.fillRect( 100, 225, 280, 1 ) ;
	ctx.restore();

};
module.exports = State;

},{"../../../constant":3,"../../../util":97,"./base":54}],61:[function(require,module,exports){
'use strict';

// ボス戦後のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Config = require('../../../config');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ
TalkState.prototype.serifInfo = function(){
	if(Config.DEBUG) {
		var serif = document.getElementById("stage1_after").value;
		if(serif.length > 1) {
			return JSON.parse(serif);
		}
	}

	return this.stage.currentStageSerifAfter();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyAfterTalkEnd();
};


module.exports = TalkState;

},{"../../../config":2,"../../../util":97,"./talk_base":62}],62:[function(require,module,exports){
'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');


var Serif = require('../../../logic/serif');

var State = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.serif = new Serif(this.serifInfo());
	this.serif.init();

	// 何もセリフが設定されてなければそのままシーン終了
	if(this.serif.is_end()) {
		this.notifyTalkEnd();
	}
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// キャラだけ表示する
	this.stage.character.run();

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.notifyTalkEnd();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
	// キャラだけ表示する
	this.stage.character.updateDisplay();

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
		// TODO: delete
		// 喋ってない方のキャラは薄くなる
		//ctx.globalAlpha = 0.5;
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
		// TODO: delete
		//ctx.globalAlpha = 0.5;
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
	//ctx.textBaseline = 'middle';
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

// セリフ情報
State.prototype.serifInfo = function(){
	console.error("serifInfo method must be overridden");
};

// セリフパートが終了した
State.prototype.notifyTalkEnd = function () {
	console.error("notifyTalkEnd method must be overridden");
};

module.exports = State;

},{"../../../config":2,"../../../constant":3,"../../../logic/serif":26,"../../../util":97,"./base":54}],63:[function(require,module,exports){
'use strict';

// ボス戦前のセリフ

var BaseState = require('./talk_base');
var Util = require('../../../util');
var Config = require('../../../config');

var TalkState = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(TalkState, BaseState);

// セリフ情報
TalkState.prototype.serifInfo = function(){
	// TODO: DEBUG
	if(Config.DEBUG) {
		var serif = document.getElementById("stage1_before").value;
		if(serif.length > 1) {
			return JSON.parse(serif);
		}
	}

	return this.stage.currentStageSerifBefore();
};

// セリフパートが終了した
TalkState.prototype.notifyTalkEnd = function () {
	this.stage.notifyBeforeTalkEnd();
};

module.exports = TalkState;

},{"../../../config":2,"../../../util":97,"./talk_base":62}],64:[function(require,module,exports){
'use strict';

// 敵生成終了から次のシーンまでの間隔
var END_MARGIN_COUNT = 500;

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

var EnemyAppear = require('../../../logic/enemy_appear');

var State = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	// 雑魚敵の出現
	this.enemy_appear = new EnemyAppear(this.stage.currentStageEnemyInfo());
	this.enemy_appear.init();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// 道中の終了
	if(this.enemy_appear.isEnd() &&
		this.enemy_appear.getLastEnemyAppearCount() + END_MARGIN_COUNT < this.frame_count) {
		this.stage.notifyWayEnd();
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		character.useBomb();
	}

	// SPACE でポーズ
	if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
		this.stage.notifyPauseStart();
	}

	// Z押しっぱで低速移動
	character.setSlow(this.game.isKeyDown(Constant.BUTTON_SHIFT));

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft();
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight();
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown();
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp();
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
	if(!Config.DEBUG || Number(document.getElementById("invincible").value) === 0) { // TODO: DEBUG
		// 敵と自機の衝突判定
		this.stage.enemy_manager.checkCollisionWithObject(character);
		// 敵弾と自機の衝突判定
		this.stage.bullet_manager.checkCollisionWithObject(character);
	}
	// 敵と自機弾の衝突判定
	this.stage.enemy_manager.checkCollisionWithManager(this.stage.shot_manager);
	// 敵弾と自機のグレイズ判定
	this.stage.bullet_manager.checkGrazeWithObject(character);
	// アイテムと自機のグレイズ判定
	this.stage.item_manager.checkGrazeWithObject(character);

	// 今フレームで出現する雑魚一覧を取得
	var params = this.enemy_appear.get(this.frame_count);

	for(var i = 0, len = params.length; i< len; i++) {
		this.stage.enemy_manager.create(params[i]);
	}

	this.stage.runObjects();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.updateDisplayObjects();
};

module.exports = State;

},{"../../../config":2,"../../../constant":3,"../../../logic/enemy_appear":22,"../../../util":97,"./base":54}],65:[function(require,module,exports){
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
			this.game.notifyTitleDoneToStart();
	}
	else if(this.game.isKeyPush(Constant.BUTTON_X)) {
			this.game.playSound('select');
			this.game.notifyTitleDoneToPrologue();
	}
	else if(this.game.isKeyPush(Constant.BUTTON_SPACE)) {
			this.game.playSound('select');
			this.game.notifyTitleDoneToConfig();
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
	var press_x = this.game.getImage('press_x');

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

	// press Z
	ctx.drawImage(press_z,
		226, //x座標
		220, //y座標
		press_z.width * Config.CHARA_SIZE_RATIO,
		press_z.height * Config.CHARA_SIZE_RATIO
	);

	// press X
	ctx.drawImage(press_x,
		226, //x座標
		290, //y座標
		press_x.width * Config.CHARA_SIZE_RATIO,
		press_x.height * Config.CHARA_SIZE_RATIO
	);

	ctx.restore();

};

module.exports = OpeningScene;

},{"../config":2,"../constant":3,"../util":97,"./base":44}],66:[function(require,module,exports){
'use strict';

// セリフ
var Serif = 
[{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":null},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"早朝の散歩も良いものね。"},{"pos":"right","exp":null,"chara":null,"fukidashi":"normal","serif":"…約束を守りなさい。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"ん…誰？\n誰かいるの？"},{"pos":"right","exp":"normal","chara":"hatena","fukidashi":null,"serif":"　"},{"pos":"right","exp":"owata","chara":"hatena","fukidashi":"orange","serif":"わたしです"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"なんだ私か。"},{"pos":"right","exp":"normal","chara":"hatena","fukidashi":"normal","serif":"え…。\nちょっとは驚きなさいよ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"驚いたわよ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"で、貴方誰なの？\n見たところ、私に\nそっくりだけど。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"orange","serif":"…ひょっとして、\nドッペルゲンガーってやつ？"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"そのようなものね。\nそんなことより、\n貴方に大事な話があるの。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"なにかしら。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"約束を守りなさい。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"約束？\n何か約束してたっけ。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"ほら、博麗神社に…。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"あぁ、そういえば前に\nメリーと約束してたわ。"},{"pos":"right","exp":null,"chara":null,"fukidashi":null,"serif":null},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"博麗神社の入り口を\n調べようって。\nそのことかしら？"},{"pos":"right","exp":"calm","chara":"merry","fukidashi":"orange","serif":"蓮子？\nこんなところで何してるの？"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"あ、噂をすれば。\nメリー、見て！\n私のドッペルゲンガーが…"},{"pos":"right","exp":"normal","chara":null,"fukidashi":"normal","serif":null},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あれ？いない…。"},{"pos":"right","exp":"normal","chara":"merry","fukidashi":"normal","serif":"どうしたの？"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"それが、\nかくかくしかじかで。"},{"pos":"right","exp":"calm","chara":"merry","fukidashi":"normal","serif":"ふーん。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"覚えてる？前に博霊神社の\n入り口を調べようって\n約束してたこと。"},{"pos":"right","exp":"calm","chara":"merry","fukidashi":"normal","serif":"そうだっけ？"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"ねえ、今から行ってみない？"},{"pos":"right","exp":"troubled","chara":"merry","fukidashi":"normal","serif":"今から？面倒だわ…。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"なんだか気になるのよ。"},{"pos":"right","exp":"disappointed","chara":"merry","fukidashi":"normal","serif":"うっ…急にめまいと頭痛が。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"絶対嘘でしょ、それ。"},{"pos":"right","exp":"disappointed","chara":"merry","fukidashi":"normal","serif":"全身の骨が折れてるかも。"},{"pos":"left","exp":"surprised","chara":"renko","fukidashi":"purple","serif":"さっきまで\n元気だったじゃない！"},{"pos":"right","exp":"troubled","chara":"merry","fukidashi":"normal","serif":"うーん、気が進まないわ。"},{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"はぁ…。そんなに嫌なら\n仕方ないわね。\n私一人で行ってくるわ。"}];
module.exports = Serif;

},{}],67:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":null},{"pos":"right","exp":"dissatisfied","chara":"aya","fukidashi":"normal","serif":"なんだ、ただの迷子ですか。\n記事にもなりませんね。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"道を聞いてもいいかしら。\n博麗神社に行きたいのよ。"},{"pos":"right","exp":"normal","chara":"aya","fukidashi":"normal","serif":"神社？"},{"pos":"right","exp":"smile","chara":"aya","fukidashi":"orange","serif":"この道をダーって行って\nキュって曲がってギャーン\nって行けばすぐですよ。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"この道をダーって行って\nキュって曲がってギャーンね。\nありがとう！"}];

module.exports = Serif;

},{}],68:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"見覚えのない場所に\n来てしまったわ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"41の推論から最も\n可能性の高い結論へ\n導くならば。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"目的地の座標と私の進路の\n間に、時間的、空間的な齟齬が\n生じていると考えるべき。"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"…つまり、道に迷ったと\n言いたいのだけれど。"},{"pos":"right","exp":"normal","chara":"aya","fukidashi":"orange","serif":"あやややや。\n言動の不審な人間を\n発見しました！"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"ああ、誰だか知らないけど、\nいいところに。\n博麗神社へはどう行けば…"},{"pos":"right","exp":"smile","chara":"aya","fukidashi":"normal","serif":"早速、取材してみようと\n思います！"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"もしもーし？"}];

module.exports = Serif;

},{}],69:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":null},{"pos":"right","exp":"dissatisfied","chara":"sanae","fukidashi":"normal","serif":"なんだ、人間だったの。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"生憎とね。"},{"pos":"right","exp":"smile","chara":"sanae","fukidashi":"orange","serif":"守矢の神社にようこそ。\n参拝ならそちらですよ。"},{"pos":"right","exp":null,"chara":null,"fukidashi":null,"serif":null},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"守矢？"},{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"…ここは博霊神社では\nないのね。葉団扇の子が\n間違えたのかしら。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あの。博霊神社へは\nどう行けば…"},{"pos":"left","exp":"surprised","chara":"renko","fukidashi":"purple","serif":"あれ！？\nもういない！？"}];

module.exports = Serif;

},{}],70:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"さて、神社に来ては\nみたけれど…。\nこれからどうしたものかしら。"},{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"やっぱりメリーを説得して\n連れてくればよかったわね。"},{"pos":"right","exp":"normal","chara":"sanae","fukidashi":"orange","serif":"もし。そこの妖怪変化。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"…ひょっとして私の事？"},{"pos":"right","exp":"normal","chara":"sanae","fukidashi":"normal","serif":"あ、応答した。"},{"pos":"right","exp":"normal","chara":"sanae","fukidashi":"normal","serif":"ってことは。つまり、\n貴方は妖怪ってことですね。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"観測者不在の状況であれば\nその可能性もあり得なくは\nないけれども。"},{"pos":"right","exp":"normal","chara":"sanae","fukidashi":"normal","serif":"妖怪ということは\n退治しちゃっていいって\nことですよね。"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"…どういう論法なのかしら。"},{"pos":"right","exp":"normal","chara":"sanae","fukidashi":"purple","serif":"それでは参ります！"}];

module.exports = Serif;

},{}],71:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":null},{"pos":"right","exp":"normal","chara":"yuuka","fukidashi":"normal","serif":"そろそろ飽きたわ。\n私は帰るけど…。"},{"pos":"right","exp":"grin","chara":"yuuka","fukidashi":"orange","serif":"貴方は『飽きた』なんて\n言わないでね。\nまた遊びましょ。"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"なんて勝手なのかしら。"},{"pos":"right","exp":null,"chara":null,"fukidashi":null,"serif":null},{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"ああ、もう陽があんなに\n傾いてる。博霊神社は\nどっちなのよ。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"なに道草食ってるの。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"orange","serif":"あ！私のドッペルゲンガー！"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"略してレンガ。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"妙な名前をつけないで。\n約束は思い出したの？"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"そう。確かに約束した\nはずなのよね。博霊神社の\n入り口を調べようって。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"…まあ、いいわ。\nとりあえずそんなところで。"},{"pos":"right","exp":"normal","chara":"ganger","fukidashi":"normal","serif":"この道をまっすぐ行けば\n博霊神社よ。私はそこで\n待ってるから。"},{"pos":"right","exp":null,"chara":null,"fukidashi":null,"serif":null},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あっ、ちょっと待って！"}];

module.exports = Serif;

},{}],72:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"disappointed","chara":"renko","fukidashi":"normal","serif":"闇雲に進んできたけれど、\n神社の姿は影も見えず。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あれは誰かしら？"},{"pos":"right","exp":"normal","chara":"yuuka","fukidashi":"orange","serif":"天には星。\n地には花。\n人には悲鳴。"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"最後はどうかと思うわ。"},{"pos":"right","exp":"grin","chara":"yuuka","fukidashi":"normal","serif":"虐めると、人は\nいい声で鳴くのよ。"},{"pos":"right","exp":"normal","chara":"yuuka","fukidashi":"normal","serif":"ところで貴方は\n人間かしら？"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"今だけは\n人外でありたいわね。"},{"pos":"right","exp":"normal","chara":"yuuka","fukidashi":"normal","serif":"まあ、結局は何でも\nいいのよ。等しく、私が\n虐めてあげる。"}];
module.exports = Serif;

},{}],73:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":null},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"私、博霊神社に\n行きたいの。"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"orange","serif":"どうぞ、お通りなさい。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"あら、あっさりね。"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"流石の私も疲れたわ。\nお願いした人数を\n忘れるほどに。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"人を追い返すのが仕事？\n変わってるのね。"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"まあね。貴方は\n楽しめたのかしら？"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"ちょっぴり楽しくなって\nきた…かな？"},{"pos":"right","exp":"anger","chara":"yukari","fukidashi":"normal","serif":"以前の貴方はもっと\n楽しく遊んでいたはずよ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"…？\nどこかで前に会ったことが？"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"そうね。\nきっと、何度も。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"覚えてないなあ。"},{"pos":"right","exp":"disappointed","chara":"yukari","fukidashi":"normal","serif":"みんな疲れてるのね。\nああ…眠くなってきた…。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"さっき起きたところじゃ\nないの？"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"もう行きなさい。\nまた会えるといいわね。"}];
module.exports = Serif;

},{}],74:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":null},{"pos":"right","exp":"disappointed","chara":"yukari","fukidashi":"orange","serif":"私としたことが。つい、\n早起きしてしまったわ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"もう夕方みたいだけど…"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"まだ、夕方なのよ。"},{"pos":"left","exp":"troubled","chara":"renko","fukidashi":"normal","serif":"ああ…。また変な人に\n絡まれるのね、私。"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"まあ、人ではないけれど。\nひとつ、貴方に\nお願いがあるの。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"normal","serif":"叶えられるかは分からない\nけど、聞くだけ聞いて\nあげるわ。"},{"pos":"right","exp":"anger","chara":"yukari","fukidashi":"normal","serif":"簡単なことよ。今来た道を\n戻って欲しいだけ。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"聞けそうにないなあ。"},{"pos":"right","exp":"normal","chara":"yukari","fukidashi":"normal","serif":"なら仕方ないわね。少し\n遊んでいってもらうわよ。"}];
module.exports = Serif;

},{}],75:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [];

module.exports = Serif;

},{}],76:[function(require,module,exports){
'use strict';

// セリフ
var Serif= [{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"この石段の先が\n博霊神社ね。"},{"pos":"right","exp":"anger","chara":"merry","fukidashi":"normal","serif":"蓮子…。"},{"pos":"left","exp":"normal","chara":"renko","fukidashi":"orange","serif":"あれ？メリーじゃない。\nどうしてここに？"},{"pos":"right","exp":"anger","chara":"merry","fukidashi":"normal","serif":"もう一度言うわ。\nこの石段を登らないで。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"もう一度…？\nメリー、何を言ってるの？"},{"pos":"right","exp":"anger","chara":"merry","fukidashi":"normal","serif":"石段を登らないで。\n来た道を帰って頂戴。"},{"pos":"left","exp":"calm","chara":"renko","fukidashi":"normal","serif":"何かおかしいわ…。\n貴方、誰…？"},{"pos":"right","exp":"grin","chara":"merry","fukidashi":"normal","serif":"変なことを言うのね。私は\nメリーよ？貴方の知ってる、\nマエリベリー・ハーン。"},{"pos":"left","exp":"anger","chara":"renko","fukidashi":"normal","serif":"違う…。おかしい…。"},{"pos":"right","exp":"grin","chara":"merry","fukidashi":"normal","serif":"さ、もう夜も遅いわ。\n帰りましょ、蓮子。"},{"pos":"left","exp":"anger","chara":"renko","fukidashi":"normal","serif":"この先に何かあるのね。\n通してよ。"},{"pos":"right","exp":"furious","chara":"merry","fukidashi":"purple","serif":"絶対に行かせないわ！\n貴方は何度でも\n来た道を戻るのよ！"}];
module.exports = Serif;

},{}],77:[function(require,module,exports){
'use strict';

var ShotTypes = [
	{
		'image':           'shot',
		'indexX':          6,
		'indexY':          2,
		'width':           20,
		'height':          20,
		'collisionWidth':  15,
		'collisionHeight': 15,
		'is_rotate':       false,
		'is_penetration':  false,
	},
	{
		'image':           'shot',
		'indexX':          4,
		'indexY':          1,
		'width':           64,
		'height':          64,
		'collisionWidth':  64,
		'collisionHeight': 64,
		'is_rotate':       false,
		'is_penetration':  true,
	},
	{
		'image':           'shot2',
		'indexX':          6,
		'indexY':          16,
		'width':           20,
		'height':          20,
		'collisionWidth':  20,
		'collisionHeight': 20,
		'is_rotate':       false,
		'is_penetration':  false,
	},
];

module.exports = ShotTypes;

},{}],78:[function(require,module,exports){
'use strict';

/* スペルカードの基底クラス */
var Config = require("../config");
var Constant = require("../constant");
var Util = require("../util");

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
var CUTIN_DISAPPEAR_WAIT_COUNT = 100;
// カットイン消失時間
var CUTIN_DISAPPEAR_COUNT = 20;


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

	// スペカの実行開始時間
	this.frame_count_exec_start = null;
};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;

	// スペルカードエフェクトの x, y
	this.x = 0;
	this.y = CUTIN_Y;

	// スペカの実行開始時間
	this.frame_count_exec_start = 0;

	// スペルカード発動開始
	this.changeState(Constant.SPELLCARD_START_STATE);
};

// スペカ実行開始からのフレーム数
SpellBase.prototype.frameCountStartedBySpellExec = function(){
	return this.frame_count - this.frame_count_exec_start;
};

// スペルカード開始中
SpellBase.prototype.isSpellStarting = function(){
	return this.state === Constant.SPELLCARD_START_STATE ? true : false;
};
// スペルカード発動中
SpellBase.prototype.isSpellExecute = function(){
	return this.state === Constant.SPELLCARD_EXEC_STATE ? true : false;
};
// ボス移動中
SpellBase.prototype.isBossMoving = function(){
	return this.state === Constant.SPELLCARD_BOSSMOVE_STATE ? true : false;
};
// スペルカード終了中
SpellBase.prototype.isSpellEnd = function(){
	return this.state === Constant.SPELLCARD_END_STATE ? true : false;
};

// 状態変更
SpellBase.prototype.changeState = function(state){
	this.state = state;
};

// フレーム処理
SpellBase.prototype.run = function(){
	this.frame_count++;

	if(this.isSpellStarting()) {
		// スペカ発動演出
		this.runInSpellStarting();
	}
	else if(this.isBossMoving()) {
		// ボス移動中
		this.runInBossMoving();
	}
	else if (this.isSpellExecute()){
		// スペカ実行
		this.runInSpellExecute();
	}
	else {
		// スペカ終了
		this.runInSpellEnd();
	}
};

// スペル発動演出
SpellBase.prototype.runInSpellStarting = function(){
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
		if(this.initX() !== void 0 && this.initY() !== void 0) { // 初期位置がセットされていれば
			// ボスを初期位置へ移動
			this.boss.setMoveTo(this.initX(), this.initY());

			this.changeState(Constant.SPELLCARD_BOSSMOVE_STATE);
		}
		else {
			// スペカ実行開始時のフレームを保存
			this.frame_count_exec_start = this.frame_count;

			// スペカ実行
			this.changeState(Constant.SPELLCARD_EXEC_STATE);
		}
	}
};

// ボス移動中
SpellBase.prototype.runInBossMoving = function(){
	// 移動が終了したらスペカ実行モードへ
	if(!this.boss.isMoving()) {
		// スペカ実行開始時のフレームを保存
		this.frame_count_exec_start = this.frame_count;

		this.changeState(Constant.SPELLCARD_EXEC_STATE);
	}
};

// スペカ終了中に実行
SpellBase.prototype.runInSpellEnd = function(){

};
// 描画
SpellBase.prototype.updateDisplay = function(){
	if(this.isSpellStarting()) {
		// スペカ発動演出
		this.updateDisplayInSpellStarting();
	}
	else if(this.isBossMoving()) {
		// ボス移動中
		this.updateDisplayInBossMoving();
	}
	else if (this.isSpellExecute()){
		// スペカ実行
		this.updateDisplayInSpellExecute();
	}
	else {
		// スペカ終了
		this.updateDisplayInSpellEnd();
	}
};

// スペルカード発動中のカットイン
SpellBase.prototype.updateDisplayInSpellStarting = function () {
	// カットイン発動待ち
	if(this.frame_count <= CUTIN_SLIDEING_WAIT_COUNT) return;

	var ctx = this.game.surface;
	var image = this.game.getImage(this.charaImage());

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

// ボス移動中の描画
SpellBase.prototype.updateDisplayInBossMoving = function () {
};

// スペカ実行の描画
SpellBase.prototype.updateDisplayInSpellExecute = function () {
};
// スペカ終了の描画
SpellBase.prototype.updateDisplayInSpellEnd = function () {
};


// 撃つ
SpellBase.prototype.shot = function(type_id, x, y, vector) {
	return this.stage.bullet_manager.create(type_id, x, y, vector);
};

// 自機狙いのtheta を返す
SpellBase.prototype.calcThetaAimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	return Util.radianToTheta(Math.atan2(ay, ax));
};

// スペルカード名
SpellBase.prototype.name = function() {
	console.error("Spell's name method must be implemented");
};

// カットインキャラ画像
SpellBase.prototype.charaImage = function() {
	console.error("Spell's charaImage method must be implemented");
};

// スペカ実行
SpellBase.prototype.runInSpellExecute = function(){
	console.error("Spell's runInSpellExecute method must be implemented");
};

// 初期 x, y 座標
SpellBase.prototype.initX = function( ) {
};
SpellBase.prototype.initY = function( ) {
};

// スペル終了時の処理
SpellBase.prototype.onend = function( ) {
};

module.exports = SpellBase;

},{"../config":2,"../constant":3,"../util":97}],79:[function(require,module,exports){
'use strict';

/* パラメータ指定で作るスペルカード基底クラス */
var BaseSpell = require('./base');
var Util = require('../util');

var BaseParamSpell = function(boss) {
	BaseSpell.apply(this, arguments);

	// 弾を撃つ時間や種類のパラメータ
	this.shots = this._createShotParamByBulletDictionary(this._createShotParamSplitedByCount(this.shotParam()));
};
Util.inherit(BaseParamSpell, BaseSpell);

// 初期化
BaseParamSpell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 現在適用している move
	this.move_index = 0;
	// 現在適用している shot
	this.shot_index = 0;
};

// スペルカード実行中に実行される処理
BaseParamSpell.prototype.runInSpellExecute = function() {
	// move
	this._setMoveByParam();
	// shot
	this._shotByParam();
};

// shot
BaseParamSpell.prototype._shotByParam = function( ) {
	while(this.shots[this.shot_index]) {
		var shot = this.shots[this.shot_index];
		var count = this.frameCountStartedBySpellExec();

		// baseCount 経過でループする
		if(this.baseCount()){
			count = count % this.baseCount();
		}

		// 今撃つ弾でなければ撃たない
		if(shot.count !== count) break;

		// shot
		this.stage.bullet_manager.create(shot.type, this.boss.x + shot.x, this.boss.y + shot.y, shot.vector);
		this.game.playSound('boss_shot_small');

		this.shot_index++;
	}

	// 設定されている弾を撃ちきったら最初に戻る
	if(this.shot_index >= this.shots.length) {
		this.shot_index = 0;
	}
};

// パラメータから移動を設定
BaseParamSpell.prototype._setMoveByParam = function( ) {
	var count = this.frameCountStartedBySpellExec();

	var move_param = this.moveParam();

	while(move_param[this.move_index]) {
		var move = move_param[ this.move_index ];

		// baseCount 経過でループする
		if(this.baseCount()) {
			count = count % this.baseCount();
		}

		if(count !== move.startCount) break;

		// move
		this.boss.setMoveTo(move.x, move.y, move.moveCount);

		this.move_index++;

	}

	if(this.move_index >= move_param.length) {
		this.move_index = 0;
	}
};

// shotParam のcount 配列をスカラーに分解する
BaseParamSpell.prototype._createShotParamSplitedByCount = function(shotParam) {
	var newShotParam = [];
	for( var i = 0, len=shotParam.length; i < len; i++ ) {
		var param = shotParam[i];
		if(param.count instanceof Array) {
			for( var j = 0, c_len=param.count.length; j < c_len; j++ ) {
				newShotParam.push({
					bullet:    param.bullet,
					type:      param.type,
					count:     param.count[j],
				});
			}
		}
		else {
			newShotParam.push(param);
		}
	}
	// count 昇順にソート
	newShotParam.sort(function(a, b) {
		return a.count - b.count;
	});

	return newShotParam;
};

// shotParam と bullet_dictionaries からプログラムが扱いやすい弾幕パターンを生成
BaseParamSpell.prototype._createShotParamByBulletDictionary = function(shotParam) {
	var newShotParam = [];

	var bullet_dictionaries = this.bulletDictionary();

	for (var i = 0, len=shotParam.length; i < len; i++) {
		var param = shotParam[i];
		var bullet = bullet_dictionaries[param.bullet];

		for (var j = 0, b_len=bullet.length; j < b_len; j++) {
			var bullet_param = bullet[j];
			newShotParam.push({
				x:         bullet_param.x,
				y:         bullet_param.y,
				vector:    bullet_param.vector,
				type:      param.type,
				count:     param.count + bullet_param.count,
			});
		}
	}

	// count 昇順にソート
	newShotParam.sort(function(a, b) {
		return a.count - b.count;
	});

	return newShotParam;
};

// shot param
BaseParamSpell.prototype.shotParam = function() {
	console.error("Spell's shotParam method must be implemented");
};
// move param
BaseParamSpell.prototype.moveParam = function( ) {
	console.error("Spell's moveParam method must be implemented");
};
// baseCount 毎に動きや弾を撃つフレーム数が初期化される
BaseParamSpell.prototype.baseCount = function( ) {
	console.error("Spell's baseCount method must be implemented");
};
// 弾幕パターン
BaseParamSpell.prototype.bulletDictionary = function( ) {
	console.error("Spell's bulletDictionary method must be implemented");
};

module.exports = BaseParamSpell;

},{"../util":97,"./base":78}],80:[function(require,module,exports){
'use strict';

/* 自機スペルカード */

// 何回ボムをばらまくか
var SHOT_NUM = 8;

// 1発につき何個ボムをばらまくか
var BOMB_NUM = 12;

// 何フレーム毎にボムをばらまくか
var BOMB_PER_COUNT = 45;

var BaseSpell = require('../base');
var Constant = require('../../constant');
var Util = require('../../util');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.shot_num = 0;
};

Spell.prototype.runInSpellExecute = function() {
	// SHOT_NUM 回数しかボムを発射しない
	if(this.shot_num >= SHOT_NUM) return;

	// ボムの初期位置が蓮子からどれだけ離れているか
	var r = 30;

	// ボム生成
	if(this.frame_count % BOMB_PER_COUNT === 0) {
		for(var i = 0; i < BOMB_NUM; i++) {
			var theta = ((360 / BOMB_NUM) | 0) * i;
			var ax = r * Math.cos(Util.thetaToRadian(theta));
			var ay = r * Math.sin(Util.thetaToRadian(theta));

			this.stage.shot_manager.create(
				Constant.SHOT_BOMB_TYPE,
				this.stage.character.x + ax,
				this.stage.character.y + ay,
				{ 'r': 0, 'theta': theta, 'ra': 0.05, 'raa': 0.01 }
			);
		}

		this.game.playSound('boss_shot_big');

		this.shot_num++;
	}
};


Spell.prototype.name = function() { return "蓮子スペルカード1"; };
Spell.prototype.charaImage = function() { return "renko_normal"; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],81:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
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


Spell.prototype.runInSpellExecute = function() {
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

	this.shot(Constant.BULLET_TINY_ORANGE, x, y, {r: r, theta: theta});
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = Util.radianToTheta(Math.atan2(ay, ax));
};

Spell.prototype.name = function() { return "風符「落葉広葉樹」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],82:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var mersenne = require('../../logic/mersenne');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 乱数初期化
	mersenne.init_seed(1000);
};

Spell.prototype.runInSpellExecute = function() {
	var r =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector = {r: r, theta: theta};

	var r2 =  this._getRandomValue({ 'min': 3, 'max': 4 }) ;
	var theta2 = this._getRandomValue({ 'min': 0, 'max': 360 });

	var vector2 = {r: r2, theta: theta2};

	if(this.frame_count % 3 !== 0) {
		this.shot(Constant.BULLET_TINY_YELLOW, this.boss.x, this.boss.y, vector);
		this.shot(this.frame_count % 2 === 0 ? Constant.BULLET_TINY_RED : Constant.BULLET_TINY_GRAY,    this.boss.x, this.boss.y, vector2);
	}
	if(this.frame_count % 9 === 0) {
		this.game.playSound('boss_shot_small');
	}
};

Spell.prototype.name = function() { return "風符「五月雨の紅葉」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

Spell.prototype.initX = function() { return this.stage.width/2; };
Spell.prototype.initY = function() { return this.stage.height/3; };

Spell.prototype._getRandomValue = function( range ) {
	var differ = range.max - range.min ;
	return ((mersenne.random() * differ) | 0) + range.min;
};

// 初期 x, y 座標

module.exports = Spell;

},{"../../constant":3,"../../logic/mersenne":25,"../../util":97,"../base":78}],83:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 移動先
	this.boss.setMoveTo(this.stage.width / 2, this.stage.height /3);
};


Spell.prototype.runInSpellExecute = function() {
	var kankaku = 5;
	var vec = {r: 2, theta: 135};

	if(this.frame_count % 40 === 0) {
		this.game.playSound('boss_shot_small');
		for(var i = 0; i <= kankaku; i++) {
			this.shot(Constant.BULLET_TINY_YELLOW, (this.stage.width/kankaku * i), 0, vec);
			this.shot(Constant.BULLET_TINY_YELLOW, this.stage.width, (this.stage.height/kankaku * i), vec);
		}
	}

	if(this.frame_count % (24*5) === 0) {
		this.game.playSound('boss_shot_big');
		var theta = this.calcThetaAimedToChara();
		for (var j = 0; j < 10; j++) {
			this.shot(Constant.BULLET_BIG_ORANGE, this.boss.x, this.boss.y, {r: 1, theta: theta + j * 360 / 10, ra: 0.05, rrange: {max: 10}});
		}
	}
};

Spell.prototype.name = function() { return "風符「落葉時雨」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],84:[function(require,module,exports){
'use strict';

/* TODO:
ビームにアタリ判定をいつか・・・

*/

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');
var mersenne = require('../../logic/mersenne');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
	// 乱数初期化
	mersenne.init_seed(1000);
};


Spell.prototype.runInSpellExecute = function() {
	var vector = {r: 10, theta: 5.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	var vector2 = {r: 10, theta: -10.5 * 360 / 10, ra: 1, rrange: {max: 20}};
	if(this.boss.vital >= 10 && this.boss.is_show) {
		this.boss.is_show = false;
		this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.boss.x, this.boss.y, vector);
	}
	else {
		if(this.frame_count % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, this.stage.width, this.stage.height/3, vector);
			this.game.playSound('boss_shot_small');
		}
		if((this.frame_count+25) % 50 === 0) {
			this.me = this.shot(Constant.BULLET_BEAM_YELLOW, 0, this.stage.height/3, vector2);
			this.game.playSound('boss_shot_small');
		}
	}


	if (this.frame_count % 3 !== 0) {
		var r =  this._getRandomValue({ 'min': 2, 'max': 3 }) ;
		var theta = this._getRandomValue({ 'min': 0, 'max': 360 });

		this.shot(Constant.BULLET_TINY_YELLOW, this.me.x, this.me.y, [
			{
				count: 0,
				vector: {r: r, theta: theta}
			}
		]);
	}
};
Spell.prototype.onend = function() {
	this.boss.is_show = true;
};


Spell.prototype.name = function() { return "「幻想風靡」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 150; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;

},{"../../constant":3,"../../logic/mersenne":25,"../../util":97,"../base":78}],85:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../param_base');
var Util = require('../../util');
var Constant = require('../../constant');


var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};


Spell.prototype.runInSpellExecute = function() {
	BaseSpell.prototype.runInSpellExecute.apply(this, arguments);
};

Spell.prototype.name = function() { return "秘術「半神の戯曲」"; };
Spell.prototype.charaImage = function() { return "sanae_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 80; };

Spell.prototype.baseCount = function( ) { return 600; };

Spell.prototype.shotParam = function( ) {
	return [
		{ 'bullet': 0, 'type': Constant.BULLET_TINY_LIMEGREEN, 'count': [  10,  20,  30,  40 ]},
		{ 'bullet': 1, 'type': Constant.BULLET_TINY_BLUE,      'count': [ 210, 220, 230, 240 ]},
		{ 'bullet': 0, 'type': Constant.BULLET_TINY_LIMEGREEN, 'count': [ 410, 420, 430, 440 ]},
	];
};
Spell.prototype.moveParam = function( ) {
	return [
		{ x: 140, y: 200, startCount: 100, moveCount: 100},
		{ x: 340, y: 200, startCount: 300, moveCount: 100},
		{ x: 240, y: 100, startCount: 500, moveCount: 100},
	];
};

Spell.prototype.bulletDictionary = function( ) {
	var createAyaSpell4_1 = function( ) {
		var array = [ ] ;
		var r = 30 ;
		for( var i = 0; i < 36; i++ ) {
			var count = i * 1;
			var theta = ( ( i * 10 ) + 90 ) % 360 ;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( theta ) ),
				'y': r * Math.sin( Util.thetaToRadian( theta ) ),
				'count': count,
				'vector': { 'r': 2 + ( i / 50 ), 'theta': theta }
			};
			array.push( v ) ;
		}
		return array ;
	} ;
	var createAyaSpell4_2 = function( ) {
		var array = [ ] ;
		var r = 30 ;
		for( var i = 0; i < 36; i++ ) {
			var count = i * 1 ;
			var t = ( ( i * -10 ) + 450 ) % 360 ;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( t ) ),
				'y': r * Math.sin( Util.thetaToRadian( t ) ),
				'count': count,
				'vector': { 'r': 2 + ( i / 50 ), 'theta': t }
			} ;
			array.push( v ) ;
		}
		return array ;
	};

	var BulletDictionaries = [];
	BulletDictionaries[0] = createAyaSpell4_1();
	BulletDictionaries[1] = createAyaSpell4_2();
	return BulletDictionaries;
};

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../param_base":79}],86:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};

Spell.prototype.runInSpellExecute = function() {
	var count = this.frameCountStartedBySpellExec();

	var x = 240;
	var y = 100;

	if(count % 75 === 0) {
		this.shotCommonSense(count*2 % this.stage.width, -100);
		this.game.playSound('boss_shot_big');
	}
};

Spell.prototype.shotCommonSense = function(x, y) {
	var vec = {r: 4, theta: 90, ra: 0.1};
	var i;
	var mayuge_x = 44;
	for (i = 0; i < 5; i++) {
		// 左眉毛
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - mayuge_x - 16 * i, y + 16 * (4-i), vec);

		// 右眉毛
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + mayuge_x + 16 * i, y + 16 * (4-i), vec);
	}

	var eye_x = 76;
	var eye_y = 120;
	// 目
	this.shot(Constant.BULLET_BIG_LIMEGREEN, x - eye_x, y + eye_y, vec); // type_id: 1
	this.shot(Constant.BULLET_BIG_LIMEGREEN, x + eye_x, y + eye_y, vec); // type_id: 1

	var hoho_y = 180;
	var hoho_x = 116;

	for (i = 0; i < 4; i++) {
		// 右ほほ
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + hoho_x + (3-i)*8, y + hoho_y - 8 * (i%2 ? 0 : 1), vec);
		// 左ほほ
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - hoho_x - (3-i)*8, y + hoho_y - 8 * (i%2 ? 1 : 0), vec);
	}

	var mouse_y = 190;
	var offset = 12;

	// 口(斜め線)
	for (i = 0; i< 4; i++) {
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - offset/2 - offset*i, y + mouse_y+offset*(4-i), vec);
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + offset/2 + offset*i, y + mouse_y+offset*(4-i), vec);
	}

	// 口(上の線
	var offset2 = 16;
	this.shot(Constant.BULLET_BALL_LIMEGREEN, x, y + mouse_y, vec);
	for (i = 0; i< 3; i++) {
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x-(16*(i+1)), y + mouse_y, vec);
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x+(16*(i+1)), y + mouse_y, vec);
	}
};

Spell.prototype.name = function() { return "「この幻想郷では常識に囚われてはいけないのですね」"; };
Spell.prototype.charaImage = function() { return "sanae_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 100; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],87:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../param_base');
var Util = require('../../util');
var Constant = require('../../constant');


var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};


Spell.prototype.runInSpellExecute = function() {
	BaseSpell.prototype.runInSpellExecute.apply(this, arguments);
};

Spell.prototype.name = function() { return "奇跡「客星の誕生」"; };
Spell.prototype.charaImage = function() { return "sanae_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 150; };

Spell.prototype.baseCount = function( ) { return 100; };

Spell.prototype.shotParam = function( ) {
	return [
		{ 'bullet':0, 'type': Constant.BULLET_BALL_BLUE, 'count': [ 20 ]},
	];
};

Spell.prototype.moveParam = function( ) {
	return [];
};

Spell.prototype.bulletDictionary = function( ) {
var spell5_1 = function( ) {
  var array = [ ] ;
  var r = 50 ;
  var r2 = 100 ;
  var points = [ ] ;
  var span = 10 ;
  for( var i = 0; i < 5; i++ ) {
    points[ i ] = ( 126 + 144 * i ) % 360 ;
  }
  for( var i = 0; i < 5; i++ ) {
    var t1 = points[ i ] ;
    var t2 = points[ ( i + 1 ) % 5 ] ;
    var x1 = r * Math.cos( Util.thetaToRadian( t1 ) ) ;
    var y1 = r * Math.sin( Util.thetaToRadian( t1 ) ) ;
    var x2 = r * Math.cos( Util.thetaToRadian( t2 ) ) ;
    var y2 = r * Math.sin( Util.thetaToRadian( t2 ) ) ;
    for( var j = 0; j < span; j++ ) {
      var count = ( j + i * span ) ;
      var x = x1 + ( x2 - x1 ) / span * j ;
      var y = y1 + ( y2 - y1 ) / span * j ;
      var t = Util.radianToTheta( Math.atan2( y, x ) ) ;
      for( var k = 0; k < 5; k++ ) {
        var at = points[ k ] ;
        var ax = x + r2 * Math.cos( Util.thetaToRadian( at ) ) ;
        var ay = y + r2 * Math.sin( Util.thetaToRadian( at ) ) ;
        var v = { 'x': ax,
                  'y': ay,
                  'count': count,
                  'vector': [
                    { 'count': 0,            'vector': { 'r': 0, 'theta': t, } },
                    { 'count': span*6-count, 'vector': { 'r': 2, 'w': 0 } }
                  ]
                } ;
        array.push( v ) ;
      }
    }
  }
  return array ;
} ;

	var BulletDictionaries = [];
	BulletDictionaries[0] = spell5_1();
	return BulletDictionaries;
};

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../param_base":79}],88:[function(require,module,exports){
'use strict';


/* 幽香 蝶を生成するオブジェクト */

// 基底クラス
var VectorBaseObject = require('../../object/vector_base');
var Util = require('../../util');
var Constant = require('../../constant');
var mersenne = require('../../logic/mersenne');

// 蝶の種類
var TYPE_IDS = [
	Constant.BULLET_BUTTERFLY_ORANGE,
	Constant.BULLET_BUTTERFLY_AQUA,
	Constant.BULLET_BUTTERFLY_PURPLE,
	Constant.BULLET_BUTTERFLY_YELLOW,
	Constant.BULLET_BUTTERFLY_BLUE,
	Constant.BULLET_BUTTERFLY_LIMEGREEN,
	Constant.BULLET_BUTTERFLY_RED,
];




var ButterFlyGenerator = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(ButterFlyGenerator, VectorBaseObject);

ButterFlyGenerator.prototype.init = function(x, y, vector) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);
};

ButterFlyGenerator.prototype.run = function() {
	VectorBaseObject.prototype.run.apply(this, arguments);

	if(this.frame_count % 60 === 0) {
		for (var i = 0; i < 10; i++) {
			var type_id = TYPE_IDS[this._getRandomValue({max: TYPE_IDS.length, min: 0})];
			var theta = i * 36;

			var r = 20;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

			this.stage.bullet_manager.create(type_id, this.x + offset_x, this.y + offset_y, {r: 2, theta: theta});
			this.game.playSound('kirakira');
		}
	}
};
ButterFlyGenerator.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;

ButterFlyGenerator.prototype.updateDisplay = function() {}; // オブジェクトは透明

// 当たり判定サイズ
ButterFlyGenerator.prototype.collisionWidth  = function() { return 0; };
ButterFlyGenerator.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
ButterFlyGenerator.prototype.grazeHeight  = function() { return 0; };
ButterFlyGenerator.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
ButterFlyGenerator.prototype.spriteX = function() { return 4; };
ButterFlyGenerator.prototype.spriteY = function() { return 1; };

// スプライト画像
ButterFlyGenerator.prototype.spriteImage = function() { return "shot"; };

// スプライトのサイズ
ButterFlyGenerator.prototype.spriteWidth  = function() { return 64; };
ButterFlyGenerator.prototype.spriteHeight = function() { return 64; };







/* スペルカード */
var BaseSpell = require('../base');
var Manager = require('../../logic/manager');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	this.generator_manager = new Manager(ButterFlyGenerator, this.stage);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.generator_manager.init();

	// 乱数初期化
	mersenne.init_seed(1000);

	this.is_init = false;
};


Spell.prototype.runInSpellExecute = function() {
	if(!this.is_init) {
		this.is_init = true;


		for (var i = 1; i <= 5; i++) {
			this.generator_manager.create(this.boss.x, this.boss.y, [
				{ count: 0, vector: {r: 5, theta: 90 + 72 * i, ra: -0.1} },
				{ count: 30, vector: {r: 0, theta: 0, ra: 0} },
			]);
		}
	}

	this.generator_manager.run();

	if(this.boss.vital < 10) {
		this.generator_manager.removeAll();
	}
};


Spell.prototype.updateDisplayInSpellExecute = function () {

	this.generator_manager.updateDisplay();
};

Spell.prototype.name = function() { return "花符「日回りの蝶」"; };
Spell.prototype.charaImage = function() { return "yuuka_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 100; };

module.exports = Spell;

},{"../../constant":3,"../../logic/manager":24,"../../logic/mersenne":25,"../../object/vector_base":43,"../../util":97,"../base":78}],89:[function(require,module,exports){
'use strict';

/* 幽香 ビーム */

var BaseObject = require('../../object/base');
var Util = require('../../util');
var Constant = require('../../constant');
var mersenne = require('../../logic/mersenne');

// 花の色の種類
var TYPE_IDS = [
	Constant.BULLET_TINY_RED,
	Constant.BULLET_TINY_LIMEGREEN,
	Constant.BULLET_TINY_YELLOW,
	Constant.BULLET_TINY_AQUA,
	Constant.BULLET_TINY_ORANGE,
];

var Beam = function(scene) {
	BaseObject.apply(this, arguments);
};

Util.inherit(Beam, BaseObject);

Beam.prototype.init = function(x, y) {
	BaseObject.prototype.init.apply(this, arguments);
	this.boss_x = x;
	this.boss_y = y;

	this.theta = 0;
	this.is_show = true;

	this.bullet_waiting_time = 0;
};

Beam.prototype.run = function() {
	BaseObject.prototype.run.apply(this, arguments);

	/* move beam */
	if(this.theta > 360) {
		this.is_show = false;
		return;
	}

	this.theta+=5;

	var r = 120;
	var offset_x = r * Math.cos( Util.thetaToRadian( this.theta ) );
	var offset_y = r * Math.sin( Util.thetaToRadian( this.theta ) );

	this.x = this.boss_x + offset_x;
	this.y = this.boss_y + offset_y;

	this.rotate = Util.thetaToRadian(this.theta + 90);

	/* create bullet */
	if(this.frame_count % 3 === 0) {
		this.bullet_waiting_time += 2;
		var count = 200 - this.bullet_waiting_time;

		for (var i = 0; i < 2; i++) {
			var i2 = i*2;
			if(this.frame_count % 6 === 0) i2-=1;

			//this._createBullet(this.x - (offset_x/4)*i2, this.y - (offset_y/4)*i2, count);
			this._createBullet(this.x + (offset_x/4)*i2, this.y + (offset_y/4)*i2, count);
		}
	}
};
Beam.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;

Beam.prototype._createBullet = function(x, y, count) {
	var type_id = TYPE_IDS[this._getRandomValue({max: TYPE_IDS.length, min: 0})];
	for (var i = 0; i < 5; i++) {
		var theta = i * 72;

		var r = 10;
		var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
		var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

		var toward = this._getRandomValue({max: 360, min: 0});
		this.stage.bullet_manager.create(type_id, x + offset_x, y + offset_y, [
			{ count: 0 , vector: {r: 0, theta: theta} },
			{ count: count, vector: {r: 2, theta: toward} },
		]);
	}
};


// 当たり判定サイズ
Beam.prototype.collisionWidth  = function() { return 0; };
Beam.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
Beam.prototype.grazeHeight  = function() { return 0; };
Beam.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
Beam.prototype.spriteX = function() { return 0; };
Beam.prototype.spriteY = function() { return 0; };

// スプライト画像
Beam.prototype.spriteImage = function() { return "beam"; };

// スプライトのサイズ
Beam.prototype.spriteWidth  = function() { return 20; };
Beam.prototype.spriteHeight = function() { return 256; };














/* スペルカード */
var BaseSpell = require('../base');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.moveIndex = 1;
	this.moveTo = [{x: 100, y: 100}, {x: 380, y: 100}];

	this.beam = null;
	mersenne.init_seed(1000);
};


Spell.prototype.runInSpellExecute = function() {
	if (this.frameCountStartedBySpellExec() % 280 === 0) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y, 100);

		this.moveIndex++;

		if(this.moveIndex > 1) {
			this.moveIndex = 0;
		}
	}

	if(this.boss.isMoving()) { this.beam = null; return; }

	if(!this.beam) {
		this.beam = new Beam(this.stage);
		this.beam.init(this.boss.x, this.boss.y);
		this.game.playSound('kirakira');

	}
	else {
		this.beam.run();
	}


};

Spell.prototype.updateDisplayInSpellExecute = function () {
	if(this.beam && this.beam.is_show) {
		this.beam.updateDisplay();
	}
};




Spell.prototype.name = function() { return "花符「幻想開花」"; };
Spell.prototype.charaImage = function() { return "yuuka_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((mersenne.random() * differ) | 0) + range.min ;
} ;


module.exports = Spell;

},{"../../constant":3,"../../logic/mersenne":25,"../../object/base":29,"../../util":97,"../base":78}],90:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.moveIndex = 0;
	this.moveTo = [
		{x: 200, y: 100},
		{x: 300, y: 100},
		{x: 400, y: 100},
		{x: 300, y: 100},
		{x: 200, y: 100},
		{x: 100, y: 100},
	];

	this.shotCount = 0;
};


Spell.prototype.runInSpellExecute = function() {
	if (!this.boss.isMoving() && this.shotCount >= 3) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y);

		this.moveIndex++;

		if(this.moveIndex > 5) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	if(!this.boss.isMoving()) {
		if(this.frame_count % 50 === 0){
			this.shotCount++;

			this.game.playSound('boss_shot_small');
			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();

			/* 円形 */
			for (var i = 0; i < 36; i++) {
				var theta = i * 10 + aimed_theta;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				var type_id = Constant.BULLET_TINY_YELLOW;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0, theta: theta} },
						{ count: 25 , vector: {r: 3.5 + 0.4*j, theta: theta} },
					]);
				}
			}

			var r = 20;
			/* 交差 */
			for (var i = 0; i < 20; i++) {
				var theta = i * 18;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				theta += (i%2===0 ? -90 : 90);

				var type_id = Constant.BULLET_TINY_RED;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0.5*j, theta: theta, ra: 0.05} },
					]);
				}
			}
		}
	}


};

Spell.prototype.name = function() { return "花符「サンフラワーゲーム」"; };
Spell.prototype.charaImage = function() { return "yuuka_normal"; };

Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],91:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.moveIndex = 0;
	this.moveTo = [
		{x: 100, y: 100},
		{x: 400, y: 100},
		{x: 100, y: 400},
		{x: 400, y: 400},
	];

	this.shotCount = 0;

};


Spell.prototype.runInSpellExecute = function() {
	if(this.boss.isMoving()) {
		this.boss.is_show = false;
	}
	else {
		this.boss.is_show = true;
	}

	if (!this.boss.isMoving() && this.shotCount >= 3) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y, 100);

		this.moveIndex++;

		if(this.moveIndex >= this.moveTo.length) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	if(!this.boss.isMoving()) {
		if(this.frame_count % 50 === 0){
			this.shotCount++;

			this.game.playSound('boss_shot_small');
			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();

			/* 円形 */
			for (var i = 0; i < 40; i++) {
				var theta = i * 9 + aimed_theta;
				var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
				var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

				var type_id = Constant.BULLET_KUNAI_PURPLE;
				for (var j = 0; j < 10; j++) {
					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0, theta: theta} },
						{ count: 25 , vector: {r: 3 + 0.4*j, theta: theta} },
					]);
				}
			}
		}
	}
};

Spell.prototype.onend = function() {
	this.boss.is_show = true;
};

Spell.prototype.name = function() { return "境符「十二次元と十三次元の境界」"; };
Spell.prototype.charaImage = function() { return "yukari_normal"; };

// 初期 x, y 座標
//Spell.prototype.initX = function() { return 240; };
//Spell.prototype.initY = function() { return 100; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],92:[function(require,module,exports){
'use strict';

/* 幽香 蝶を生成するオブジェクト */

// 基底クラス
var VectorBaseObject = require('../../object/vector_base');
var Util = require('../../util');
var Constant = require('../../constant');

var MagicCircle = function(scene) {
	VectorBaseObject.apply(this, arguments);
};

Util.inherit(MagicCircle, VectorBaseObject);

MagicCircle.prototype.init = function(x, y, vector, is_inverse) {
	// VectorBaseObject.init より先に設定しないと aim が効かない
	this.x = x;
	this.y = y;

	// vector はスカラー or 配列を受け取ることができる
	if(vector instanceof Array) {
	}
	else {
		// 配列でなければ配列化してあげる
		vector = [
			{
				count: 0,
				vector: vector,
			}
		];
	}

	VectorBaseObject.prototype.init.apply(this, [vector]);
};

MagicCircle.prototype.run = function() {
	VectorBaseObject.prototype.run.apply(this, arguments);

	// 魔法陣を回転する
	this.rotate++;

	if(this.rotate >= 360 || this.rotate <= 0) {
		this.rorate = 0;
	}

	if(this.frame_count > 100 && this.frame_count % 100 === 0) {
		this.game.playSound('boss_shot_small');
		for (var i = 1; i <= 6; i++) {
			var theta = 60 * i + Util.radianToTheta(this.rotate);
			this.stage.bullet_manager.create(Constant.BULLET_DOUBLEBALL_PURPLE, this.x, this.y, {r: 3, theta: theta});
		}
	}
};

MagicCircle.prototype.updateDisplay = function() {
	// 魔法陣を透過
	var ctx = this.game.surface;
	ctx.globalAlpha = 0.5;
	VectorBaseObject.prototype.updateDisplay.apply(this, arguments);
	ctx.globalAlpha = 1.0;
};




// 当たり判定サイズ
MagicCircle.prototype.collisionWidth  = function() { return 0; };
MagicCircle.prototype.collisionHeight = function() { return 0; };

// グレイズ判定サイズ
MagicCircle.prototype.grazeHeight  = function() { return 0; };
MagicCircle.prototype.grazeWidth = function() { return 0; };

// スプライトの開始位置
MagicCircle.prototype.spriteX = function() { return 0; };
MagicCircle.prototype.spriteY = function() { return 0; };

// スプライト画像
MagicCircle.prototype.spriteImage = function() { return "magic_circle"; };

// スプライトのサイズ
MagicCircle.prototype.spriteWidth  = function() { return 300; };
MagicCircle.prototype.spriteHeight = function() { return 300; };


MagicCircle.prototype.scale = function() { return 0.25; };

/* スペルカード */
var BaseSpell = require('../base');
var Manager = require('../../logic/manager');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	this.magic_circle_manager = new Manager(MagicCircle, this.stage);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
	this.is_init = false;
	this.magic_circle_manager.init();
};


Spell.prototype.runInSpellExecute = function() {
	if(!this.is_init) {
		this.is_init = true;


		for (var i = 1; i <= 5; i++) {
			this.magic_circle_manager.create(this.boss.x, this.boss.y, [
				{ count: 0, vector: {r: 5, theta: 72 * i, w: 1, ra: -0.05, rrange: {min: 0}} },
			]);
		}
		this.game.playSound('boss_powerup');
	}

	if(this.frame_count % 100 === 0) {
		var r = 10;
		var aimed_theta = this.calcThetaAimedToChara();
		for (var j = 0; j < 8; j++) {
			var theta = aimed_theta + j * 45;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );


			this.shot(Constant.BULLET_BIG_PURPLE, this.boss.x + offset_x, this.boss.y + offset_y, {r: 4, theta: theta});
		}
	}

	this.magic_circle_manager.run();

};

Spell.prototype.updateDisplayInSpellExecute = function () {

	this.magic_circle_manager.updateDisplay();
};




Spell.prototype.name = function() { return "境符「スキマツアーへご招待」"; };
Spell.prototype.charaImage = function() { return "yukari_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 240; };

module.exports = Spell;

},{"../../constant":3,"../../logic/manager":24,"../../object/vector_base":43,"../../util":97,"../base":78}],93:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.shotCount = 0;

	this.moveIndex = 0;
	this.moveTo = [
		{x: 300, y: 60},
		{x: 360, y: 100},
		{x: 300, y: 140},

		{x: 240, y: 100},

		{x: 180, y: 60},
		{x: 120, y: 100},
		{x: 180, y: 140},

		{x: 240, y: 100},
	];

};


Spell.prototype.runInSpellExecute = function() {
	// move
	if (!this.boss.isMoving() && this.shotCount >= 10) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y);

		this.moveIndex++;

		if(this.moveIndex >= this.moveTo.length) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	// shot
	if(this.frame_count % 15 === 0) {
		this.shotCount++;

		var type_id = Constant.BULLET_KUNAI_PURPLE;
		var r = 20;
		var aimed_theta = this.calcThetaAimedToChara();
		this.game.playSound('boss_shot_small');

		/* 円形 */
		for (var i = 0; i < 40; i++) {
			var theta = i * 9 + aimed_theta;
			var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
			var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );

			this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
				{ count: 0, vector: {r: 3, theta: theta} },
			]);
		}
	}
};

Spell.prototype.name = function() { return "罔両「無限呪縛」"; };
Spell.prototype.charaImage = function() { return "yukari_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function() { return 240; };
Spell.prototype.initY = function() { return 100; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],94:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../param_base');
var Util = require('../../util');
var Constant = require('../../constant');


var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};


Spell.prototype.runInSpellExecute = function() {
	BaseSpell.prototype.runInSpellExecute.apply(this, arguments);
};

Spell.prototype.name = function() { return "?????????"; };
Spell.prototype.charaImage = function() { return "merry_furious"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return this.stage.width/2; };
Spell.prototype.initY = function( ) { return this.stage.height/2; };

Spell.prototype.baseCount = function( ) { return 465; };

Spell.prototype.shotParam = function( ) {
	var r_num        = 20; // 弾幕の円の半径(大きいほど外側への弾の数が増えていく)
	var shotParam = [];

	for(var i = 0; i<r_num; i++) {
		var type = i%2 ? Constant.BULLET_TINY_PURPLE : Constant.BULLET_TINY_GRAY;

		shotParam.push({
			'bullet':i, 'type': type, 'count': [ 1 ]
		});
	}

	return shotParam;
};

Spell.prototype.moveParam = function( ) {
	return [];
};

Spell.prototype.bulletDictionary = function( ) {
	var r_space      = 17; // 弾幕の円の半径(小さいほど外側に行く方の弾の間隔が短くなっていく)
	var r_num        = 20; // 弾幕の円の半径(大きいほど外側への弾の数が増えていく)
	var density      = 48; // 弾と隣の弾の間隔
	var spread_speed = 6;  // 弾を撒く速さ

	var BulletDictionaries = [];

	for (var j = 1; j <= r_num; j++) {
		var array = [];
		var r = r_space * j;
		for( var k = 0; k < density; k++ ) {
			var count = k;
			var theta = ( ( k * 360/density ) + 450 ) % 360;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( theta ) ),
				'y': r * Math.sin( Util.thetaToRadian( theta ) ),
				'count': count + j * density/spread_speed,
				'vector': [
					{ 'count': 0, 'vector': { 'r': 0, 'theta': theta, } },
					{ 'count': (density/spread_speed-k)+(r_num-j)*density/spread_speed + 100, 'vector': { 'r':2.5, theta: theta + 180} },
				],
			} ;
			array.push( v ) ;
		}


		BulletDictionaries.push(array);
	}

	return BulletDictionaries;
};

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../param_base":79}],95:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	this.moveIndex = 0;
	this.moveTo = [
		{x: 200, y: 100},
		{x: 300, y: 100},
		{x: 400, y: 100},
		{x: 300, y: 100},
		{x: 200, y: 100},
		{x: 100, y: 100},
	];

	this.shotCount = 0;
};


Spell.prototype.runInSpellExecute = function() {

	if (!this.boss.isMoving() && this.shotCount >= 3) {
		var move = this.moveTo[this.moveIndex];
		this.boss.setMoveTo(move.x, move.y);

		this.moveIndex++;

		if(this.moveIndex > 5) {
			this.moveIndex = 0;
		}

		this.shotCount = 0;
	}

	if(!this.boss.isMoving()) {
		if(this.frame_count % 50 === 0){
			this.shotCount++;

			var r = 50;
			var aimed_theta = this.calcThetaAimedToChara();
			this.game.playSound('boss_shot_small');

			/* 交差 */
			for (var i = 0; i < 18; i++) {
				var theta = i * 20 + aimed_theta;

				var type_id = Constant.BULLET_TINY_PURPLE;
				for (var j = 0; j < 6; j++) {
					var r = 30 * 0.5*j;
					var offset_x = r * Math.cos( Util.thetaToRadian( theta ) );
					var offset_y = r * Math.sin( Util.thetaToRadian( theta ) );
					theta += (i%2===0 ? -90 : 90);

					this.shot(type_id, this.boss.x + offset_x, this.boss.y + offset_y, [
						{ count: 0 , vector: {r: 0.5*j, theta: theta, ra: 0.05} },
					]);
				}
			}
		}
	}
};

Spell.prototype.name = function() { return "?????????"; };
Spell.prototype.charaImage = function() { return "merry_furious"; };

Spell.prototype.initX = function() { return 100; };
Spell.prototype.initY = function() { return 100; };

Spell.prototype._getRandomValue = function( range ) {
  var differ = range.max - range.min ;
  return ((Math.random() * differ) | 0) + range.min ;
} ;

// 初期 x, y 座標

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],96:[function(require,module,exports){
'use strict';

/* スペルカード */
var BaseSpell = require('../base');
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
	this.boss.setMoveTo(this.stage.width / 2, this.stage.height / 2);
};

Spell.prototype.runInSpellExecute = function() {
	if(this.boss.isMoving()) return;

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

};

Spell.prototype.uzumaki_shot1 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas1.length; i++ ) {
		var theta = this.shot_thetas1[i];

		this.shot(Constant.BULLET_TINY_GRAY, x, y, {r: r, theta: theta});
		this.shot_thetas1[i] += this.add_shot_theta;
	}
};
Spell.prototype.uzumaki_shot2 = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var r = this.r;

	for(var i = 0; i < this.shot_thetas2.length; i++ ) {
		var theta = this.shot_thetas2[i];

		this.shot(Constant.BULLET_TINY_GRAY, x, y, {r: r, theta: theta});
		this.shot_thetas2[i] -= this.add_shot_theta;
	}
};
Spell.prototype.maru_shot = function() {
	var x = this.boss.x;
	var y = this.boss.y;
	var theta = this.maru_shot_theta;
	var r = this.r;

	this.shot(Constant.BULLET_DOUBLEBALL_PURPLE, x, y, {r: r, theta: theta});
};

// 自機狙いにする
Spell.prototype.aimedToChara = function() {
	// 自機
	var character = this.stage.character;

	var ax = character.x - this.boss.x;
	var ay = character.y - this.boss.y;

	this.maru_shot_theta = Util.radianToTheta(Math.atan2(ay, ax));
};

Spell.prototype.name = function() { return "?????????"; };

Spell.prototype.charaImage = function() { return "merry_furious"; };

module.exports = Spell;

},{"../../constant":3,"../../util":97,"../base":78}],97:[function(require,module,exports){
'use strict';
var Util = {
	// 継承
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
	// ラジアン -> θ に変換
	radianToTheta: function(radian) {
		return (radian * 180 / Math.PI) | 0;
	},
	thetaToRadian: function(theta) {
		return theta * Math.PI / 180;
	},

	canPlayOgg: function () {
		var audio = document.createElement('audio');
		if (audio.canPlayType) {
			return audio.canPlayType('audio/ogg');
		}

		return false;
	},
};

module.exports = Util;

},{}],98:[function(require,module,exports){
(function (global){(function (){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};(function(){var c=function(){throw"UID cannot be instantiated";};c._nextID=0;c.get=function(){return c._nextID++};createjs.UID=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Ticker cannot be instantiated.";};c.useRAF=null;c._listeners=null;c._pauseable=null;c._paused=false;c._inited=false;c._startTime=0;c._pausedTime=0;c._ticks=0;c._pausedTicks=0;c._interval=50;c._lastTime=0;c._times=null;c._tickTimes=null;c._rafActive=false;c._timeoutID=null;c.addListener=function(a,l){a!=null&&(c._inited||c.init(),c.removeListener(a),c._pauseable[c._listeners.length]=l==null?true:l,c._listeners.push(a))};c.init=function(){c._inited=true;c._times=[];
c._tickTimes=[];c._pauseable=[];c._listeners=[];c._times.push(c._lastTime=c._startTime=c._getTime());c.setInterval(c._interval)};c.removeListener=function(a){var l=c._listeners;l&&(a=l.indexOf(a),a!=-1&&(l.splice(a,1),c._pauseable.splice(a,1)))};c.removeAllListeners=function(){c._listeners=[];c._pauseable=[]};c.setInterval=function(a){c._interval=a;c._inited&&c._setupTick()};c.getInterval=function(){return c._interval};c.setFPS=function(a){c.setInterval(1E3/a)};c.getFPS=function(){return 1E3/c._interval};
c.getMeasuredFPS=function(a){if(c._times.length<2)return-1;a==null&&(a=c.getFPS()|0);a=Math.min(c._times.length-1,a);return 1E3/((c._times[0]-c._times[a])/a)};c.setPaused=function(a){c._paused=a};c.getPaused=function(){return c._paused};c.getTime=function(a){return c._getTime()-c._startTime-(a?c._pausedTime:0)};c.getTicks=function(a){return c._ticks-(a?c._pausedTicks:0)};c._handleAF=function(){c._rafActive=false;c._setupTick();c._getTime()-c._lastTime>=(c._interval-1)*0.97&&c._tick()};c._handleTimeout=
function(){c.timeoutID=null;c._setupTick();c._tick()};c._setupTick=function(){if(!(c._rafActive||c.timeoutID!=null)){if(c.useRAF){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(a){a(c._handleAF);c._rafActive=true;return}}c.timeoutID=setTimeout(c._handleTimeout,c._interval)}};c._tick=function(){var a=c._getTime();c._ticks++;var l=a-c._lastTime,b=c._paused;b&&(c._pausedTicks++,
c._pausedTime+=l);c._lastTime=a;for(var d=c._pauseable,e=c._listeners.slice(),f=e?e.length:0,g=0;g<f;g++){var i=e[g];i==null||b&&d[g]||(i.tick?i.tick(l,b):i instanceof Function&&i(l,b))}for(c._tickTimes.unshift(c._getTime()-a);c._tickTimes.length>100;)c._tickTimes.pop();for(c._times.unshift(a);c._times.length>100;)c._times.pop()};var b=window.performance&&(performance.now||performance.mozNow||performance.msNow||performance.oNow||performance.webkitNow);c._getTime=function(){return b&&b.call(performance)||
(new Date).getTime()};createjs.Ticker=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,l,b,d,e,c,g,i,j){this.initialize(a,l,b,d,e,c,g,i,j)},b=c.prototype;b.stageX=0;b.stageY=0;b.rawX=0;b.rawY=0;b.type=null;b.nativeEvent=null;b.onMouseMove=null;b.onMouseUp=null;b.target=null;b.pointerID=0;b.primary=false;b.initialize=function(a,l,b,d,e,c,g,i,j){this.type=a;this.stageX=l;this.stageY=b;this.target=d;this.nativeEvent=e;this.pointerID=c;this.primary=g;this.rawX=i==null?l:i;this.rawY=j==null?b:j};b.clone=function(){return new c(this.type,this.stageX,this.stageY,
this.target,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)};b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"};createjs.MouseEvent=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,l,b,d,e,c){this.initialize(a,l,b,d,e,c)},b=c.prototype;c.identity=null;c.DEG_TO_RAD=Math.PI/180;b.a=1;b.b=0;b.c=0;b.d=1;b.tx=0;b.ty=0;b.alpha=1;b.shadow=null;b.compositeOperation=null;b.initialize=function(a,l,b,d,e,c){if(a!=null)this.a=a;this.b=l||0;this.c=b||0;if(d!=null)this.d=d;this.tx=e||0;this.ty=c||0;return this};b.prepend=function(a,l,b,d,e,c){var g=this.tx;if(a!=1||l!=0||b!=0||d!=1){var i=this.a,j=this.c;this.a=i*a+this.b*b;this.b=i*l+this.b*d;this.c=j*a+this.d*
b;this.d=j*l+this.d*d}this.tx=g*a+this.ty*b+e;this.ty=g*l+this.ty*d+c;return this};b.append=function(a,l,b,d,e,c){var g=this.a,i=this.b,j=this.c,k=this.d;this.a=a*g+l*j;this.b=a*i+l*k;this.c=b*g+d*j;this.d=b*i+d*k;this.tx=e*g+c*j+this.tx;this.ty=e*i+c*k+this.ty;return this};b.prependMatrix=function(a){this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty);this.prependProperties(a.alpha,a.shadow,a.compositeOperation);return this};b.appendMatrix=function(a){this.append(a.a,a.b,a.c,a.d,a.tx,a.ty);this.appendProperties(a.alpha,
a.shadow,a.compositeOperation);return this};b.prependTransform=function(a,l,b,d,e,f,g,i,j){if(e%360)var k=e*c.DEG_TO_RAD,e=Math.cos(k),k=Math.sin(k);else e=1,k=0;if(i||j)this.tx-=i,this.ty-=j;f||g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.prepend(e*b,k*b,-k*d,e*d,0,0),this.prepend(Math.cos(g),Math.sin(g),-Math.sin(f),Math.cos(f),a,l)):this.prepend(e*b,k*b,-k*d,e*d,a,l);return this};b.appendTransform=function(a,l,b,d,e,f,g,i,j){if(e%360)var k=e*c.DEG_TO_RAD,e=Math.cos(k),k=Math.sin(k);else e=1,k=0;f||
g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.append(Math.cos(g),Math.sin(g),-Math.sin(f),Math.cos(f),a,l),this.append(e*b,k*b,-k*d,e*d,0,0)):this.append(e*b,k*b,-k*d,e*d,a,l);if(i||j)this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d;return this};b.rotate=function(a){var l=Math.cos(a),a=Math.sin(a),b=this.a,d=this.c,c=this.tx;this.a=b*l-this.b*a;this.b=b*a+this.b*l;this.c=d*l-this.d*a;this.d=d*a+this.d*l;this.tx=c*l-this.ty*a;this.ty=c*a+this.ty*l;return this};b.skew=function(a,l){a*=c.DEG_TO_RAD;l*=
c.DEG_TO_RAD;this.append(Math.cos(l),Math.sin(l),-Math.sin(a),Math.cos(a),0,0);return this};b.scale=function(a,l){this.a*=a;this.d*=l;this.tx*=a;this.ty*=l;return this};b.translate=function(a,l){this.tx+=a;this.ty+=l;return this};b.identity=function(){this.alpha=this.a=this.d=1;this.b=this.c=this.tx=this.ty=0;this.shadow=this.compositeOperation=null;return this};b.invert=function(){var a=this.a,l=this.b,b=this.c,d=this.d,c=this.tx,f=a*d-l*b;this.a=d/f;this.b=-l/f;this.c=-b/f;this.d=a/f;this.tx=(b*
this.ty-d*c)/f;this.ty=-(a*this.ty-l*c)/f;return this};b.isIdentity=function(){return this.tx==0&&this.ty==0&&this.a==1&&this.b==0&&this.c==0&&this.d==1};b.decompose=function(a){a==null&&(a={});a.x=this.tx;a.y=this.ty;a.scaleX=Math.sqrt(this.a*this.a+this.b*this.b);a.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var b=Math.atan2(-this.c,this.d),h=Math.atan2(this.b,this.a);b==h?(a.rotation=h/c.DEG_TO_RAD,this.a<0&&this.d>=0&&(a.rotation+=a.rotation<=0?180:-180),a.skewX=a.skewY=0):(a.skewX=b/c.DEG_TO_RAD,
a.skewY=h/c.DEG_TO_RAD);return a};b.reinitialize=function(a,b,h,d,c,f,g,i,j){this.initialize(a,b,h,d,c,f);this.alpha=g||1;this.shadow=i;this.compositeOperation=j;return this};b.appendProperties=function(a,b,h){this.alpha*=a;this.shadow=b||this.shadow;this.compositeOperation=h||this.compositeOperation;return this};b.prependProperties=function(a,b,h){this.alpha*=a;this.shadow=this.shadow||b;this.compositeOperation=this.compositeOperation||h;return this};b.clone=function(){var a=new c(this.a,this.b,
this.c,this.d,this.tx,this.ty);a.shadow=this.shadow;a.alpha=this.alpha;a.compositeOperation=this.compositeOperation;return a};b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"};c.identity=new c(1,0,0,1,0,0);createjs.Matrix2D=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b){this.initialize(a,b)},b=c.prototype;b.x=0;b.y=0;b.initialize=function(a,b){this.x=a==null?0:a;this.y=b==null?0:b};b.clone=function(){return new c(this.x,this.y)};b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"};createjs.Point=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,h,d){this.initialize(a,b,h,d)},b=c.prototype;b.x=0;b.y=0;b.width=0;b.height=0;b.initialize=function(a,b,h,d){this.x=a==null?0:a;this.y=b==null?0:b;this.width=h==null?0:h;this.height=d==null?0:d};b.clone=function(){return new c(this.x,this.y,this.width,this.height)};b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"};createjs.Rectangle=c})();this.createjs=this.createjs||{};(function(){var c=function(a,b,h,d){this.initialize(a,b,h,d)},b=c.prototype;c.identity=null;b.color=null;b.offsetX=0;b.offsetY=0;b.blur=0;b.initialize=function(a,b,h,d){this.color=a;this.offsetX=b;this.offsetY=h;this.blur=d};b.toString=function(){return"[Shadow]"};b.clone=function(){return new c(this.color,this.offsetX,this.offsetY,this.blur)};c.identity=new c("transparent",0,0,0);createjs.Shadow=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype;b.complete=true;b.onComplete=null;b._animations=null;b._frames=null;b._images=null;b._data=null;b._loadCount=0;b._frameHeight=0;b._frameWidth=0;b._numFrames=0;b._regX=0;b._regY=0;b.initialize=function(a){var b,h,d;if(a!=null){if(a.images&&(h=a.images.length)>0){d=this._images=[];for(b=0;b<h;b++){var c=a.images[b];if(typeof c=="string"){var f=c,c=new Image;c.src=f}d.push(c);if(!c.getContext&&!c.complete)this._loadCount++,this.complete=
false,function(a){c.onload=function(){a._handleImageLoad()}}(this)}}if(a.frames!=null)if(a.frames instanceof Array){this._frames=[];d=a.frames;for(b=0,h=d.length;b<h;b++)f=d[b],this._frames.push({image:this._images[f[4]?f[4]:0],rect:new createjs.Rectangle(f[0],f[1],f[2],f[3]),regX:f[5]||0,regY:f[6]||0})}else h=a.frames,this._frameWidth=h.width,this._frameHeight=h.height,this._regX=h.regX||0,this._regY=h.regY||0,this._numFrames=h.count,this._loadCount==0&&this._calculateFrames();if((h=a.animations)!=
null){this._animations=[];this._data={};for(var g in h){a={name:g};f=h[g];if(isNaN(f))if(f instanceof Array){a.frequency=f[3];a.next=f[2];d=a.frames=[];for(b=f[0];b<=f[1];b++)d.push(b)}else a.frequency=f.frequency,a.next=f.next,b=f.frames,d=a.frames=!isNaN(b)?[b]:b.slice(0);else d=a.frames=[f];a.next=d.length<2||a.next==false?null:a.next==null||a.next==true?g:a.next;if(!a.frequency)a.frequency=1;this._animations.push(g);this._data[g]=a}}}};b.getNumFrames=function(a){return a==null?this._frames?this._frames.length:
this._numFrames:(a=this._data[a],a==null?0:a.frames.length)};b.getAnimations=function(){return this._animations.slice(0)};b.getAnimation=function(a){return this._data[a]};b.getFrame=function(a){return this.complete&&this._frames&&(frame=this._frames[a])?frame:null};b.toString=function(){return"[SpriteSheet]"};b.clone=function(){var a=new c;a.complete=this.complete;a._animations=this._animations;a._frames=this._frames;a._images=this._images;a._data=this._data;a._frameHeight=this._frameHeight;a._frameWidth=
this._frameWidth;a._numFrames=this._numFrames;a._loadCount=this._loadCount;return a};b._handleImageLoad=function(){if(--this._loadCount==0)this._calculateFrames(),this.complete=true,this.onComplete&&this.onComplete()};b._calculateFrames=function(){if(!(this._frames||this._frameWidth==0)){this._frames=[];for(var a=0,b=this._frameWidth,h=this._frameHeight,d=0,c=this._images;d<c.length;d++){for(var f=c[d],g=(f.width+1)/b|0,i=(f.height+1)/h|0,i=this._numFrames>0?Math.min(this._numFrames-a,g*i):g*i,j=
0;j<i;j++)this._frames.push({image:f,rect:new createjs.Rectangle(j%g*b,(j/g|0)*h,b,h),regX:this._regX,regY:this._regY});a+=i}this._numFrames=a}};createjs.SpriteSheet=c})();this.createjs=this.createjs||{};
(function(){function c(a,b,d){this.f=a;this.params=b;this.path=d==null?true:d}c.prototype.exec=function(a){this.f.apply(a,this.params)};var b=function(){this.initialize()},a=b.prototype;b.getRGB=function(a,b,d,c){a!=null&&d==null&&(c=b,d=a&255,b=a>>8&255,a=a>>16&255);return c==null?"rgb("+a+","+b+","+d+")":"rgba("+a+","+b+","+d+","+c+")"};b.getHSL=function(a,b,c,e){return e==null?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+e+")"};b.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,
K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};b.STROKE_CAPS_MAP=["butt","round","square"];b.STROKE_JOINTS_MAP=["miter","round","bevel"];b._ctx=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.beginCmd=new c(b._ctx.beginPath,
[],false);b.fillCmd=new c(b._ctx.fill,[],false);b.strokeCmd=new c(b._ctx.stroke,[],false);a._strokeInstructions=null;a._strokeStyleInstructions=null;a._fillInstructions=null;a._instructions=null;a._oldInstructions=null;a._activeInstructions=null;a._active=false;a._dirty=false;a.initialize=function(){this.clear();this._ctx=b._ctx};a.draw=function(a){this._dirty&&this._updateInstructions();for(var b=this._instructions,c=0,e=b.length;c<e;c++)b[c].exec(a)};a.drawAsPath=function(a){this._dirty&&this._updateInstructions();
for(var b,c=this._instructions,e=0,f=c.length;e<f;e++)((b=c[e]).path||e==0)&&b.exec(a)};a.moveTo=function(a,b){this._activeInstructions.push(new c(this._ctx.moveTo,[a,b]));return this};a.lineTo=function(a,b){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.lineTo,[a,b]));return this};a.arcTo=function(a,b,d,e,f){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.arcTo,[a,b,d,e,f]));return this};a.arc=function(a,b,d,e,f,g){this._dirty=this._active=
true;g==null&&(g=false);this._activeInstructions.push(new c(this._ctx.arc,[a,b,d,e,f,g]));return this};a.quadraticCurveTo=function(a,b,d,e){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.quadraticCurveTo,[a,b,d,e]));return this};a.bezierCurveTo=function(a,b,d,e,f,g){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.bezierCurveTo,[a,b,d,e,f,g]));return this};a.rect=function(a,b,d,e){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.rect,
[a,b,d,e]));return this};a.closePath=function(){if(this._active)this._dirty=true,this._activeInstructions.push(new c(this._ctx.closePath,[]));return this};a.clear=function(){this._instructions=[];this._oldInstructions=[];this._activeInstructions=[];this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=null;this._active=this._dirty=false;return this};a.beginFill=function(a){this._active&&this._newPath();this._fillInstructions=a?[new c(this._setProp,["fillStyle",a],false)]:null;
return this};a.beginLinearGradientFill=function(a,b,d,e,f,g){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,g);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",d],false)];return this};a.beginRadialGradientFill=function(a,b,d,e,f,g,i,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,g,i,j);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._fillInstructions=[new c(this._setProp,["fillStyle",
d],false)];return this};a.beginBitmapFill=function(a,b){this._active&&this._newPath();var d=this._ctx.createPattern(a,b||"");this._fillInstructions=[new c(this._setProp,["fillStyle",d],false)];return this};a.endFill=function(){return this.beginFill()};a.setStrokeStyle=function(a,h,d,e){this._active&&this._newPath();this._strokeStyleInstructions=[new c(this._setProp,["lineWidth",a==null?"1":a],false),new c(this._setProp,["lineCap",h==null?"butt":isNaN(h)?h:b.STROKE_CAPS_MAP[h]],false),new c(this._setProp,
["lineJoin",d==null?"miter":isNaN(d)?d:b.STROKE_JOINTS_MAP[d]],false),new c(this._setProp,["miterLimit",e==null?"10":e],false)];return this};a.beginStroke=function(a){this._active&&this._newPath();this._strokeInstructions=a?[new c(this._setProp,["strokeStyle",a],false)]:null;return this};a.beginLinearGradientStroke=function(a,b,d,e,f,g){this._active&&this._newPath();d=this._ctx.createLinearGradient(d,e,f,g);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=[new c(this._setProp,
["strokeStyle",d],false)];return this};a.beginRadialGradientStroke=function(a,b,d,e,f,g,i,j){this._active&&this._newPath();d=this._ctx.createRadialGradient(d,e,f,g,i,j);e=0;for(f=a.length;e<f;e++)d.addColorStop(b[e],a[e]);this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],false)];return this};a.beginBitmapStroke=function(a,b){this._active&&this._newPath();var d=this._ctx.createPattern(a,b||"");this._strokeInstructions=[new c(this._setProp,["strokeStyle",d],false)];return this};a.endStroke=
function(){this.beginStroke();return this};a.curveTo=a.quadraticCurveTo;a.drawRect=a.rect;a.drawRoundRect=function(a,b,c,e,f){this.drawRoundRectComplex(a,b,c,e,f,f,f,f);return this};a.drawRoundRectComplex=function(a,b,d,e,f,g,i,j){var k=(d<e?d:e)/2,m=0,o=0,n=0,q=0;f<0&&(f*=m=-1);f>k&&(f=k);g<0&&(g*=o=-1);g>k&&(g=k);i<0&&(i*=n=-1);i>k&&(i=k);j<0&&(j*=q=-1);j>k&&(j=k);this._dirty=this._active=true;var k=this._ctx.arcTo,p=this._ctx.lineTo;this._activeInstructions.push(new c(this._ctx.moveTo,[a+d-g,b]),
new c(k,[a+d+g*o,b-g*o,a+d,b+g,g]),new c(p,[a+d,b+e-i]),new c(k,[a+d+i*n,b+e+i*n,a+d-i,b+e,i]),new c(p,[a+j,b+e]),new c(k,[a-j*q,b+e+j*q,a,b+e-j,j]),new c(p,[a,b+f]),new c(k,[a-f*m,b-f*m,a+f,b,f]),new c(this._ctx.closePath));return this};a.drawCircle=function(a,b,c){this.arc(a,b,c,0,Math.PI*2);return this};a.drawEllipse=function(a,b,d,e){this._dirty=this._active=true;var f=d/2*0.5522848,g=e/2*0.5522848,i=a+d,j=b+e,d=a+d/2,e=b+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[a,e]),new c(this._ctx.bezierCurveTo,
[a,e-g,d-f,b,d,b]),new c(this._ctx.bezierCurveTo,[d+f,b,i,e-g,i,e]),new c(this._ctx.bezierCurveTo,[i,e+g,d+f,j,d,j]),new c(this._ctx.bezierCurveTo,[d-f,j,a,e+g,a,e]));return this};a.drawPolyStar=function(a,b,d,e,f,g){this._dirty=this._active=true;f==null&&(f=0);f=1-f;g==null?g=0:g/=180/Math.PI;var i=Math.PI/e;this._activeInstructions.push(new c(this._ctx.moveTo,[a+Math.cos(g)*d,b+Math.sin(g)*d]));for(var j=0;j<e;j++)g+=i,f!=1&&this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(g)*d*
f,b+Math.sin(g)*d*f])),g+=i,this._activeInstructions.push(new c(this._ctx.lineTo,[a+Math.cos(g)*d,b+Math.sin(g)*d]));return this};a.decodePath=function(a){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo],d=[2,2,4,6],e=0,f=a.length,g=[],i=0,j=0,k=b.BASE_64;e<f;){var m=a.charAt(e),o=k[m],n=o>>3,q=c[n];if(!q||o&3)throw"bad path data (@"+e+"): "+m;m=d[n];n||(i=j=0);g.length=0;e++;o=(o>>2&1)+2;for(n=0;n<m;n++){var p=k[a.charAt(e)],s=p>>5?-1:1,p=(p&31)<<6|k[a.charAt(e+1)];o==
3&&(p=p<<6|k[a.charAt(e+2)]);p=s*p/10;n%2?i=p+=i:j=p+=j;g[n]=p;e+=o}q.apply(this,g)}return this};a.clone=function(){var a=new b;a._instructions=this._instructions.slice();a._activeInstructions=this._activeInstructions.slice();a._oldInstructions=this._oldInstructions.slice();if(this._fillInstructions)a._fillInstructions=this._fillInstructions.slice();if(this._strokeInstructions)a._strokeInstructions=this._strokeInstructions.slice();if(this._strokeStyleInstructions)a._strokeStyleInstructions=this._strokeStyleInstructions.slice();
a._active=this._active;a._dirty=this._dirty;a.drawAsPath=this.drawAsPath;return a};a.toString=function(){return"[Graphics]"};a.mt=a.moveTo;a.lt=a.lineTo;a.at=a.arcTo;a.bt=a.bezierCurveTo;a.qt=a.quadraticCurveTo;a.a=a.arc;a.r=a.rect;a.cp=a.closePath;a.c=a.clear;a.f=a.beginFill;a.lf=a.beginLinearGradientFill;a.rf=a.beginRadialGradientFill;a.bf=a.beginBitmapFill;a.ef=a.endFill;a.ss=a.setStrokeStyle;a.s=a.beginStroke;a.ls=a.beginLinearGradientStroke;a.rs=a.beginRadialGradientStroke;a.bs=a.beginBitmapStroke;
a.es=a.endStroke;a.dr=a.drawRect;a.rr=a.drawRoundRect;a.rc=a.drawRoundRectComplex;a.dc=a.drawCircle;a.de=a.drawEllipse;a.dp=a.drawPolyStar;a.p=a.decodePath;a._updateInstructions=function(){this._instructions=this._oldInstructions.slice();this._instructions.push(b.beginCmd);this._fillInstructions&&this._instructions.push.apply(this._instructions,this._fillInstructions);this._strokeInstructions&&(this._instructions.push.apply(this._instructions,this._strokeInstructions),this._strokeStyleInstructions&&
this._instructions.push.apply(this._instructions,this._strokeStyleInstructions));this._instructions.push.apply(this._instructions,this._activeInstructions);this._fillInstructions&&this._instructions.push(b.fillCmd);this._strokeInstructions&&this._instructions.push(b.strokeCmd)};a._getEllipseArc=function(a,b,d,e){var f=d/2*0.5522848,g=e/2*0.5522848,i=a+d,j=b+e,d=a+d/2,e=b+e/2;this._activeInstructions.push(new c(this._ctx.moveTo,[a,e]),new c(this._ctx.bezierCurveTo,[a,e-g,d-f,b,d,b]),new c(this._ctx.bezierCurveTo,
[d+f,b,i,e-g,i,e]),new c(this._ctx.bezierCurveTo,[i,e+g,d+f,j,d,j]),new c(this._ctx.bezierCurveTo,[d-f,j,a,e+g,a,e]));return this};a._newPath=function(){this._dirty&&this._updateInstructions();this._oldInstructions=this._instructions;this._activeInstructions=[];this._active=this._dirty=false};a._setProp=function(a,b){this[a]=b};createjs.Graphics=b})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.suppressCrossDomainErrors=false;c._hitTestCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._hitTestCanvas.width=c._hitTestCanvas.height=1;c._hitTestContext=c._hitTestCanvas.getContext("2d");c._nextCacheID=1;b.alpha=1;b.cacheCanvas=null;b.id=-1;b.mouseEnabled=true;b.name=null;b.parent=null;b.regX=0;b.regY=0;b.rotation=0;b.scaleX=1;b.scaleY=1;b.skewX=0;b.skewY=0;b.shadow=null;b.visible=true;b.x=0;
b.y=0;b.compositeOperation=null;b.snapToPixel=false;b.onPress=null;b.onClick=null;b.onDoubleClick=null;b.onMouseOver=null;b.onMouseOut=null;b.onTick=null;b.filters=null;b.cacheID=0;b.mask=null;b.hitArea=null;b._cacheOffsetX=0;b._cacheOffsetY=0;b._cacheScale=1;b._cacheDataURLID=0;b._cacheDataURL=null;b._matrix=null;b.initialize=function(){this.id=createjs.UID.get();this._matrix=new createjs.Matrix2D};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0};b.draw=function(a,
b){var c=this.cacheCanvas;if(b||!c)return false;var d=this._cacheScale;a.drawImage(c,this._cacheOffsetX,this._cacheOffsetY,c.width/d,c.height/d);return true};b.updateContext=function(a){var b,c=this.mask;c&&c.graphics&&(b=c.getMatrix(c._matrix),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty),c.graphics.drawAsPath(a),a.clip(),b.invert(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty));b=this._matrix.identity().appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY);
createjs.Stage._snapToPixelEnabled&&this.snapToPixel?a.transform(b.a,b.b,b.c,b.d,b.tx+0.5|0,b.ty+0.5|0):a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty);a.globalAlpha*=this.alpha;if(this.compositeOperation)a.globalCompositeOperation=this.compositeOperation;this.shadow&&this._applyShadow(a,this.shadow)};b.cache=function(a,b,c,d,e){e=e||1;if(!this.cacheCanvas)this.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");this.cacheCanvas.width=Math.ceil(c*e);this.cacheCanvas.height=
Math.ceil(d*e);this._cacheOffsetX=a;this._cacheOffsetY=b;this._cacheScale=e||1;this.updateCache()};b.updateCache=function(a){var b=this.cacheCanvas,h=this._cacheOffsetX,d=this._cacheOffsetY,e=this._cacheScale;if(!b)throw"cache() must be called before updateCache()";var f=b.getContext("2d");f.save();a||f.clearRect(0,0,b.width,b.height);f.globalCompositeOperation=a;f.setTransform(e,0,0,e,-h,-d);this.draw(f,true);this._applyFilters();f.restore();this.cacheID=c._nextCacheID++};b.uncache=function(){this._cacheDataURL=
this.cacheCanvas=null;this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0;this._cacheScale=1};b.getCacheDataURL=function(){if(!this.cacheCanvas)return null;if(this.cacheID!=this._cacheDataURLID)this._cacheDataURL=this.cacheCanvas.toDataURL();return this._cacheDataURL};b.getStage=function(){for(var a=this;a.parent;)a=a.parent;return a instanceof createjs.Stage?a:null};b.localToGlobal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,
c.ty)};b.globalToLocal=function(a,b){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.invert();c.append(1,0,0,1,a,b);return new createjs.Point(c.tx,c.ty)};b.localToLocal=function(a,b,c){a=this.localToGlobal(a,b);return c.globalToLocal(a.x,a.y)};b.setTransform=function(a,b,c,d,e,f,g,i,j){this.x=a||0;this.y=b||0;this.scaleX=c==null?1:c;this.scaleY=d==null?1:d;this.rotation=e||0;this.skewX=f||0;this.skewY=g||0;this.regX=i||0;this.regY=j||0;return this};b.getMatrix=function(a){return(a?
a.identity():new createjs.Matrix2D).appendTransform(this.x,this.y,this.scaleX,this.scaleY,this.rotation,this.skewX,this.skewY,this.regX,this.regY).appendProperties(this.alpha,this.shadow,this.compositeOperation)};b.getConcatenatedMatrix=function(a){a?a.identity():a=new createjs.Matrix2D;for(var b=this;b!=null;)a.prependTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY).prependProperties(b.alpha,b.shadow,b.compositeOperation),b=b.parent;return a};b.hitTest=function(a,b){var h=
c._hitTestContext,d=c._hitTestCanvas;h.setTransform(1,0,0,1,-a,-b);this.draw(h);h=this._testHit(h);d.width=0;d.width=1;return h};b.clone=function(){var a=new c;this.cloneProps(a);return a};b.toString=function(){return"[DisplayObject (name="+this.name+")]"};b.cloneProps=function(a){a.alpha=this.alpha;a.name=this.name;a.regX=this.regX;a.regY=this.regY;a.rotation=this.rotation;a.scaleX=this.scaleX;a.scaleY=this.scaleY;a.shadow=this.shadow;a.skewX=this.skewX;a.skewY=this.skewY;a.visible=this.visible;
a.x=this.x;a.y=this.y;a.mouseEnabled=this.mouseEnabled;a.compositeOperation=this.compositeOperation;if(this.cacheCanvas)a.cacheCanvas=this.cacheCanvas.cloneNode(true),a.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0,0,this.cacheCanvas.width,this.cacheCanvas.height),0,0)};b._applyShadow=function(a,b){b=b||Shadow.identity;a.shadowColor=b.color;a.shadowOffsetX=b.offsetX;a.shadowOffsetY=b.offsetY;a.shadowBlur=b.blur};b._tick=function(a){if(this.onTick)if(a)this.onTick.apply(this,
a);else this.onTick()};b._testHit=function(a){try{var b=a.getImageData(0,0,1,1).data[3]>1}catch(h){if(!c.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";}return b};b._applyFilters=function(){if(this.filters&&this.filters.length!=0&&this.cacheCanvas)for(var a=this.filters.length,b=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,d=this.cacheCanvas.height,e=0;e<a;e++)this.filters[e].applyFilter(b,
0,0,c,d)};createjs.DisplayObject=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype=new createjs.DisplayObject;b.children=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(){this.DisplayObject_initialize();this.children=[]};b.isVisible=function(){return this.visible&&this.alpha>0&&this.children.length&&this.scaleX!=0&&this.scaleY!=0};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;for(var c=this.children.slice(0),d=0,e=c.length;d<e;d++){var f=c[d];f.isVisible()&&
(a.save(),f.updateContext(a),f.draw(a),a.restore())}return true};b.addChild=function(a){if(a==null)return a;var b=arguments.length;if(b>1){for(var c=0;c<b;c++)this.addChild(arguments[c]);return arguments[b-1]}a.parent&&a.parent.removeChild(a);a.parent=this;this.children.push(a);return a};b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(d<0||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;e<c-1;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}a.parent&&
a.parent.removeChild(a);a.parent=this;this.children.splice(b,0,a);return a};b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=true,d=0;d<b;d++)c=c&&this.removeChild(arguments[d]);return c}return this.removeChildAt(this.children.indexOf(a))};b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;d<b;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=true,d=0;d<b;d++)e=e&&this.removeChildAt(c[d]);return e}if(a<0||a>this.children.length-1)return false;
if(b=this.children[a])b.parent=null;this.children.splice(a,1);return true};b.removeAllChildren=function(){for(var a=this.children;a.length;)a.pop().parent=null};b.getChildAt=function(a){return this.children[a]};b.sortChildren=function(a){this.children.sort(a)};b.getChildIndex=function(a){return this.children.indexOf(a)};b.getNumChildren=function(){return this.children.length};b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)};b.swapChildren=function(a,b){for(var c=
this.children,d,e,f=0,g=c.length;f<g;f++)if(c[f]==a&&(d=f),c[f]==b&&(e=f),d!=null&&e!=null)break;f!=g&&(c[d]=b,c[e]=a)};b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||b<0||b>=d)){for(var e=0;e<d;e++)if(c[e]==a)break;e==d||e==b||(c.splice(e,1),b<e&&b--,c.splice(b,0,a))}};b.contains=function(a){for(;a;){if(a==this)return true;a=a.parent}return false};b.hitTest=function(a,b){return this.getObjectUnderPoint(a,b)!=null};b.getObjectsUnderPoint=function(a,b){var c=[],d=
this.localToGlobal(a,b);this._getObjectsUnderPoint(d.x,d.y,c);return c};b.getObjectUnderPoint=function(a,b){var c=this.localToGlobal(a,b);return this._getObjectsUnderPoint(c.x,c.y)};b.clone=function(a){var b=new c;this.cloneProps(b);if(a)for(var h=b.children=[],d=0,e=this.children.length;d<e;d++){var f=this.children[d].clone(a);f.parent=b;h.push(f)}return b};b.toString=function(){return"[Container (name="+this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){for(var b=this.children.length-
1;b>=0;b--){var c=this.children[b];c._tick&&c._tick(a)}this.DisplayObject__tick(a)};b._getObjectsUnderPoint=function(a,b,h,d){var e=createjs.DisplayObject._hitTestContext,f=createjs.DisplayObject._hitTestCanvas,g=this._matrix,i=d&1&&(this.onPress||this.onClick||this.onDoubleClick)||d&2&&(this.onMouseOver||this.onMouseOut);if(this.cacheCanvas&&i&&(this.getConcatenatedMatrix(g),e.setTransform(g.a,g.b,g.c,g.d,g.tx-a,g.ty-b),e.globalAlpha=g.alpha,this.draw(e),this._testHit(e)))return f.width=0,f.width=
1,this;for(var j=this.children.length-1;j>=0;j--){var k=this.children[j];if(k.isVisible()&&k.mouseEnabled)if(k instanceof c)if(i){if(k=k._getObjectsUnderPoint(a,b))return this}else{if(k=k._getObjectsUnderPoint(a,b,h,d),!h&&k)return k}else if(!d||i||d&1&&(k.onPress||k.onClick||k.onDoubleClick)||d&2&&(k.onMouseOver||k.onMouseOut)){var m=k.hitArea;k.getConcatenatedMatrix(g);m&&(g.appendTransform(m.x+k.regX,m.y+k.regY,m.scaleX,m.scaleY,m.rotation,m.skewX,m.skewY,m.regX,m.regY),g.alpha*=m.alpha/k.alpha);
e.globalAlpha=g.alpha;e.setTransform(g.a,g.b,g.c,g.d,g.tx-a,g.ty-b);(m||k).draw(e);if(this._testHit(e))if(f.width=0,f.width=1,i)return this;else if(h)h.push(k);else return k}}return null};createjs.Container=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.Container;c._snapToPixelEnabled=false;b.autoClear=true;b.canvas=null;b.mouseX=0;b.mouseY=0;b.onMouseMove=null;b.onMouseUp=null;b.onMouseDown=null;b.snapToPixelEnabled=false;b.mouseInBounds=false;b.tickOnUpdate=true;b.mouseMoveOutside=false;b._pointerData=null;b._pointerCount=0;b._primaryPointerID=null;b._mouseOverIntervalID=null;b.Container_initialize=b.initialize;b.initialize=function(a){this.Container_initialize();this.canvas=
a instanceof HTMLCanvasElement?a:document.getElementById(a);this._pointerData={};this._enableMouseEvents(true)};b.update=function(){if(this.canvas){this.autoClear&&this.clear();c._snapToPixelEnabled=this.snapToPixelEnabled;this.tickOnUpdate&&this._tick(arguments.length?arguments:null);var a=this.canvas.getContext("2d");a.save();this.updateContext(a);this.draw(a,false);a.restore()}};b.tick=b.update;b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0);a.clearRect(0,
0,this.canvas.width,this.canvas.height)}};b.toDataURL=function(a,b){b||(b="image/png");var c=this.canvas.getContext("2d"),d=this.canvas.width,e=this.canvas.height,f;if(a){f=c.getImageData(0,0,d,e);var g=c.globalCompositeOperation;c.globalCompositeOperation="destination-over";c.fillStyle=a;c.fillRect(0,0,d,e)}var i=this.canvas.toDataURL(b);if(a)c.clearRect(0,0,d,e),c.putImageData(f,0,0),c.globalCompositeOperation=g;return i};b.enableMouseOver=function(a){if(this._mouseOverIntervalID)clearInterval(this._mouseOverIntervalID),
this._mouseOverIntervalID=null;if(a==null)a=20;else if(a<=0)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1E3/Math.min(50,a))};b.clone=function(){var a=new c(null);this.cloneProps(a);return a};b.toString=function(){return"[Stage (name="+this.name+")]"};b._enableMouseEvents=function(){var a=this,b=window.addEventListener?window:document;b.addEventListener("mouseup",function(b){a._handleMouseUp(b)},false);b.addEventListener("mousemove",function(b){a._handleMouseMove(b)},
false);b.addEventListener("dblclick",function(b){a._handleDoubleClick(b)},false);this.canvas&&this.canvas.addEventListener("mousedown",function(b){a._handleMouseDown(b)},false)};b._getPointerData=function(a){var b=this._pointerData[a];if(!b&&(b=this._pointerData[a]={x:0,y:0},this._primaryPointerID==null))this._primaryPointerID=a;return b};b._handleMouseMove=function(a){if(!a)a=window.event;this._handlePointerMove(-1,a,a.pageX,a.pageY)};b._handlePointerMove=function(a,b,c,d){if(this.canvas){var e=
this._getPointerData(a),f=e.inBounds;this._updatePointerPosition(a,c,d);if(f||e.inBounds||this.mouseMoveOutside){a=new createjs.MouseEvent("onMouseMove",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY);if(this.onMouseMove)this.onMouseMove(a);if(e.event&&e.event.onMouseMove)a=a.clone(),a.target=e.event.target,e.event.onMouseMove(a)}}};b._updatePointerPosition=function(a,b,c){var d=this._getElementRect(this.canvas);b-=d.left;c-=d.top;var e=this.canvas.width,f=this.canvas.height;b/=(d.right-
d.left)/e;c/=(d.bottom-d.top)/f;d=this._getPointerData(a);if(d.inBounds=b>=0&&c>=0&&b<=e-1&&c<=f-1)d.x=b,d.y=c;else if(this.mouseMoveOutside)d.x=b<0?0:b>e-1?e-1:b,d.y=c<0?0:c>f-1?f-1:c;d.rawX=b;d.rawY=c;if(a==this._primaryPointerID)this.mouseX=d.x,this.mouseY=d.y,this.mouseInBounds=d.inBounds};b._getElementRect=function(a){var b=a.getBoundingClientRect(),c=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),d=(window.pageYOffset||document.scrollTop||0)-
(document.clientTop||document.body.clientTop||0),e=window.getComputedStyle?getComputedStyle(a):a.currentStyle,a=parseInt(e.paddingLeft)+parseInt(e.borderLeftWidth),f=parseInt(e.paddingTop)+parseInt(e.borderTopWidth),g=parseInt(e.paddingRight)+parseInt(e.borderRightWidth),e=parseInt(e.paddingBottom)+parseInt(e.borderBottomWidth);return{left:b.left+c+a,right:b.right+c-g,top:b.top+d+f,bottom:b.bottom+d-e}};b._handleMouseUp=function(a){this._handlePointerUp(-1,a,false)};b._handlePointerUp=function(a,
b,c){var d=this._getPointerData(a),e=new createjs.MouseEvent("onMouseUp",d.x,d.y,this,b,a,a==this._primaryPointerID,d.rawX,d.rawY);if(this.onMouseUp)this.onMouseUp(e);if(d.event&&d.event.onMouseUp)e=e.clone(),e.target=d.event.target,d.event.onMouseUp(e);if(d.target&&d.target.onClick&&this._getObjectsUnderPoint(d.x,d.y,null,true,this._mouseOverIntervalID?3:1)==d.target)d.target.onClick(new createjs.MouseEvent("onClick",d.x,d.y,d.target,b,a,a==this._primaryPointerID,d.rawX,d.rawY));if(c){if(a==this._primaryPointerID)this._primaryPointerID=
null;delete this._pointerData[a]}else d.event=d.target=null};b._handleMouseDown=function(a){this._handlePointerDown(-1,a,false)};b._handlePointerDown=function(a,b,c,d){var e=this._getPointerData(a);d!=null&&this._updatePointerPosition(a,c,d);if(this.onMouseDown)this.onMouseDown(new createjs.MouseEvent("onMouseDown",e.x,e.y,this,b,a,a==this._primaryPointerID,e.rawX,e.rawY));if(c=this._getObjectsUnderPoint(e.x,e.y,null,this._mouseOverIntervalID?3:1)){if(c.onPress&&(a=new createjs.MouseEvent("onPress",
e.x,e.y,c,b,a,a==this._primaryPointerID,e.rawX,e.rawY),c.onPress(a),a.onMouseMove||a.onMouseUp))e.event=a;e.target=c}};b._testMouseOver=function(){if(this._primaryPointerID==-1&&!(this.mouseX==this._mouseOverX&&this.mouseY==this._mouseOverY&&this.mouseInBounds)){var a=null;if(this.mouseInBounds)a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,3),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY;if(this._mouseOverTarget!=a){if(this._mouseOverTarget&&this._mouseOverTarget.onMouseOut)this._mouseOverTarget.onMouseOut(new createjs.MouseEvent("onMouseOut",
this.mouseX,this.mouseY,this._mouseOverTarget));if(a&&a.onMouseOver)a.onMouseOver(new createjs.MouseEvent("onMouseOver",this.mouseX,this.mouseY,a));this._mouseOverTarget=a}}};b._handleDoubleClick=function(a){if(this.onDoubleClick)this.onDoubleClick(new createjs.MouseEvent("onDoubleClick",this.mouseX,this.mouseY,this,a,-1,true));var b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,this._mouseOverIntervalID?3:1);if(b&&b.onDoubleClick)b.onDoubleClick(new createjs.MouseEvent("onDoubleClick",
this.mouseX,this.mouseY,b,a,-1,true))};createjs.Stage=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.image=null;b.snapToPixel=true;b.sourceRect=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();typeof a=="string"?(this.image=new Image,this.image.src=a):this.image=a};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2)};b.DisplayObject_draw=
b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;var c=this.sourceRect;c?a.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):a.drawImage(this.image,0,0);return true};b.clone=function(){var a=new c(this.image);this.cloneProps(a);return a};b.toString=function(){return"[Bitmap (name="+this.name+")]"};createjs.Bitmap=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.onAnimationEnd=null;b.currentFrame=-1;b.currentAnimation=null;b.paused=true;b.spriteSheet=null;b.snapToPixel=true;b.offset=0;b.currentAnimationFrame=0;b._advanceCount=0;b._animation=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();this.spriteSheet=a};b.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.spriteSheet.complete&&
this.currentFrame>=0};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this._normalizeFrame();var c=this.spriteSheet.getFrame(this.currentFrame);if(c!=null){var d=c.rect;a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height);return true}};b.play=function(){this.paused=false};b.stop=function(){this.paused=true};b.gotoAndPlay=function(a){this.paused=false;this._goto(a)};b.gotoAndStop=function(a){this.paused=true;this._goto(a)};b.advance=
function(){this._animation?this.currentAnimationFrame++:this.currentFrame++;this._normalizeFrame()};b.clone=function(){var a=new c(this.spriteSheet);this.cloneProps(a);return a};b.toString=function(){return"[BitmapAnimation (name="+this.name+")]"};b.DisplayObject__tick=b._tick;b._tick=function(a){var b=this._animation?this._animation.frequency:1;!this.paused&&(++this._advanceCount+this.offset)%b==0&&this.advance();this.DisplayObject__tick(a)};b._normalizeFrame=function(){var a=this._animation;if(a)if(this.currentAnimationFrame>=
a.frames.length){if(a.next?this._goto(a.next):(this.paused=true,this.currentAnimationFrame=a.frames.length-1,this.currentFrame=a.frames[this.currentAnimationFrame]),this.onAnimationEnd)this.onAnimationEnd(this,a.name)}else this.currentFrame=a.frames[this.currentAnimationFrame];else if(this.currentFrame>=this.spriteSheet.getNumFrames()&&(this.currentFrame=0,this.onAnimationEnd))this.onAnimationEnd(this,null)};b.DisplayObject_cloneProps=b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);
a.onAnimationEnd=this.onAnimationEnd;a.currentFrame=this.currentFrame;a.currentAnimation=this.currentAnimation;a.paused=this.paused;a.offset=this.offset;a._animation=this._animation;a.currentAnimationFrame=this.currentAnimationFrame};b._goto=function(a){if(isNaN(a)){var b=this.spriteSheet.getAnimation(a);if(b)this.currentAnimationFrame=0,this._animation=b,this.currentAnimation=a,this._normalizeFrame()}else this.currentAnimation=this._animation=null,this.currentFrame=a};createjs.BitmapAnimation=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.graphics=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){this.DisplayObject_initialize();this.graphics=a?a:new createjs.Graphics};b.isVisible=function(){return Boolean(this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.graphics)};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this.graphics.draw(a);return true};b.clone=function(a){a=
new c(a&&this.graphics?this.graphics.clone():this.graphics);this.cloneProps(a);return a};b.toString=function(){return"[Shape (name="+this.name+")]"};createjs.Shape=c})();this.createjs=this.createjs||{};
(function(){var c=function(a,b,c){this.initialize(a,b,c)},b=c.prototype=new createjs.DisplayObject;c._workingContext=(createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")).getContext("2d");b.text="";b.font=null;b.color="#000";b.textAlign="left";b.textBaseline="top";b.maxWidth=null;b.outline=false;b.lineHeight=0;b.lineWidth=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a,b,c){this.DisplayObject_initialize();this.text=a;this.font=b;this.color=c?c:"#000"};
b.isVisible=function(){return Boolean(this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.text!=null&&this.text!=="")};b.DisplayObject_draw=b.draw;b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return true;this.outline?a.strokeStyle=this.color:a.fillStyle=this.color;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";this._drawText(a);return true};b.getMeasuredWidth=function(){return this._getWorkingContext().measureText(this.text).width};
b.getMeasuredLineHeight=function(){return this._getWorkingContext().measureText("M").width*1.2};b.getMeasuredHeight=function(){return this._drawText()*(this.lineHeight||this.getMeasuredLineHeight())};b.clone=function(){var a=new c(this.text,this.font,this.color);this.cloneProps(a);return a};b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"};b.DisplayObject_cloneProps=b.cloneProps;b.cloneProps=function(a){this.DisplayObject_cloneProps(a);a.textAlign=
this.textAlign;a.textBaseline=this.textBaseline;a.maxWidth=this.maxWidth;a.outline=this.outline;a.lineHeight=this.lineHeight;a.lineWidth=this.lineWidth};b._getWorkingContext=function(){var a=c._workingContext;a.font=this.font;a.textAlign=this.textAlign||"start";a.textBaseline=this.textBaseline||"alphabetic";return a};b._drawText=function(a){var b=!!a;b||(a=this._getWorkingContext());for(var c=String(this.text).split(/(?:\r\n|\r|\n)/),d=this.lineHeight||this.getMeasuredLineHeight(),e=0,f=0,g=c.length;f<
g;f++){var i=a.measureText(c[f]).width;if(this.lineWidth==null||i<this.lineWidth)b&&this._drawTextLine(a,c[f],e*d);else{for(var i=c[f].split(/(\s)/),j=i[0],k=1,m=i.length;k<m;k+=2)a.measureText(j+i[k]+i[k+1]).width>this.lineWidth?(b&&this._drawTextLine(a,j,e*d),e++,j=i[k+1]):j+=i[k]+i[k+1];b&&this._drawTextLine(a,j,e*d)}e++}return e};b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)};createjs.Text=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"SpriteSheetUtils cannot be instantiated";};c._workingCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c._workingContext=c._workingCanvas.getContext("2d");c.addFlippedFrames=function(b,a,l,h){if(a||l||h){var d=0;a&&c._flip(b,++d,true,false);l&&c._flip(b,++d,false,true);h&&c._flip(b,++d,true,true)}};c.extractFrame=function(b,a){isNaN(a)&&(a=b.getAnimation(a).frames[0]);var l=b.getFrame(a);if(!l)return null;var h=l.rect,d=c._workingCanvas;
d.width=h.width;d.height=h.height;c._workingContext.drawImage(l.image,h.x,h.y,h.width,h.height,0,0,h.width,h.height);l=new Image;l.src=d.toDataURL("image/png");return l};c.mergeAlpha=function(b,a,c){c||(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"));c.width=Math.max(a.width,b.width);c.height=Math.max(a.height,b.height);var h=c.getContext("2d");h.save();h.drawImage(b,0,0);h.globalCompositeOperation="destination-in";h.drawImage(a,0,0);h.restore();return c};c._flip=
function(b,a,l,h){for(var d=b._images,e=c._workingCanvas,f=c._workingContext,g=d.length/a,i=0;i<g;i++){var j=d[i];j.__tmp=i;e.width=0;e.width=j.width;e.height=j.height;f.setTransform(l?-1:1,0,0,h?-1:1,l?j.width:0,h?j.height:0);f.drawImage(j,0,0);var k=new Image;k.src=e.toDataURL("image/png");k.width=j.width;k.height=j.height;d.push(k)}f=b._frames;e=f.length/a;for(i=0;i<e;i++){var j=f[i],m=j.rect.clone(),k=d[j.image.__tmp+g*a],o={image:k,rect:m,regX:j.regX,regY:j.regY};if(l)m.x=k.width-m.x-m.width,
o.regX=m.width-j.regX;if(h)m.y=k.height-m.y-m.height,o.regY=m.height-j.regY;f.push(o)}l="_"+(l?"h":"")+(h?"v":"");h=b._animations;b=b._data;d=h.length/a;for(i=0;i<d;i++){f=h[i];j=b[f];g={name:f+l,frequency:j.frequency,next:j.next,frames:[]};j.next&&(g.next+=l);f=j.frames;j=0;for(k=f.length;j<k;j++)g.frames.push(f[j]+e*a);b[g.name]=g;h.push(g.name)}};createjs.SpriteSheetUtils=c})();this.createjs=this.createjs||{};
(function(){var c=function(){this.initialize()},b=c.prototype;c.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions";c.ERR_RUNNING="a build is already running";b.maxWidth=2048;b.maxHeight=2048;b.spriteSheet=null;b.scale=1;b.padding=1;b._frames=null;b._animations=null;b._data=null;b._nextFrameIndex=0;b._index=0;b._callback=null;b._timeSlice=null;b._timerID=null;b._scale=1;b.initialize=function(){this._frames=[];this._animations={}};b.addFrame=function(a,b,h,d,e,f){if(this._data)throw c.ERR_RUNNING;
b=b||a.bounds||a.nominalBounds;!b&&a.getBounds&&(b=a.getBounds());if(!b)return null;h=h||1;return this._frames.push({source:a,sourceRect:b,scale:h,funct:d,params:e,scope:f,index:this._frames.length,height:b.height*h})-1};b.addAnimation=function(a,b,h,d){if(this._data)throw c.ERR_RUNNING;this._animations[a]={frames:b,next:h,frequency:d}};b.addMovieClip=function(a,b,h){if(this._data)throw c.ERR_RUNNING;var d=a.frameBounds,e=b||a.bounds||a.nominalBounds;!e&&a.getBounds&&(e=a.getBounds());if(!e&&!d)return null;
for(var b=a.timeline.duration,f=0;f<b;f++)this.addFrame(a,d&&d[f]?d[f]:e,h,function(a){var b=this.actionsEnabled;this.actionsEnabled=false;this.gotoAndStop(a);this.actionsEnabled=b},[f],a);var f=a.timeline._labels,a=[],g;for(g in f)a.push({index:f[g],label:g});if(a.length){a.sort(function(a,b){return a.index-b.index});f=0;for(g=a.length;f<g;f++){for(var h=a[f].label,d=f==g-1?b:a[f+1].index,e=[],i=a[f].index;i<d;i++)e.push(i);this.addAnimation(h,e,true)}}};b.build=function(){if(this._data)throw c.ERR_RUNNING;
this._callback=null;for(this._startBuild();this._drawNext(););this._endBuild();return this.spriteSheet};b.buildAsync=function(a,b){if(this._data)throw c.ERR_RUNNING;this._callback=a;this._startBuild();this._timeSlice=Math.max(0.01,Math.min(0.99,b||0.3))*50;var h=this;this._timerID=setTimeout(function(){h._run()},50-this._timeSlice)};b.stopAsync=function(){clearTimeout(this._timerID);this._data=null};b.clone=function(){throw"SpriteSheetBuilder cannot be cloned.";};b.toString=function(){return"[SpriteSheetBuilder]"};
b._startBuild=function(){var a=this.padding||0;this.spriteSheet=null;this._index=0;this._scale=this.scale;var b=[];this._data={images:[],frames:b,animations:this._animations};var h=this._frames.slice();h.sort(function(a,b){return a.height<=b.height?-1:1});if(h[h.length-1].height+a*2>this.maxHeight)throw c.ERR_DIMENSIONS;for(var d=0,e=0,f=0;h.length;){var g=this._fillRow(h,d,f,b,a);if(g.w>e)e=g.w;d+=g.h;if(!g.h||!h.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");
i.width=this._getSize(e,this.maxWidth);i.height=this._getSize(d,this.maxHeight);this._data.images[f]=i;g.h||(e=d=0,f++)}}};b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))};b._fillRow=function(a,b,h,d,e){var f=this.maxWidth,g=this.maxHeight-b,i=e;b+=e;for(var j=0,k=a.length-1;k>=0;k--){var m=a[k],o=this._scale*m.scale,n=m.sourceRect,q=m.source,p=Math.floor(o*n.x-e),s=Math.floor(o*n.y-e),r=Math.ceil(o*n.height+e*2),n=Math.ceil(o*n.width+e*2);if(n>f)throw c.ERR_DIMENSIONS;
if(!(r>g||i+n>f))m.img=h,m.rect=new createjs.Rectangle(i,b,n,r),j=j||r,a.splice(k,1),d[m.index]=[i,b,n,r,h,Math.round(-p+o*q.regX-e),Math.round(-s+o*q.regY-e)],i+=n}return{w:i,h:j}};b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data);this._data=null;this._callback&&this._callback(this)};b._run=function(){for(var a=(new Date).getTime()+this._timeSlice,b=false;a>(new Date).getTime();)if(!this._drawNext()){b=true;break}if(b)this._endBuild();else{var c=this;this._timerID=setTimeout(function(){c._run()},
50-this._timeSlice)}};b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img].getContext("2d");a.funct&&a.funct.apply(a.scope,a.params);e.save();e.beginPath();e.rect(c.x,c.y,c.width,c.height);e.clip();e.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b));e.scale(b,b);a.source.draw(e);e.restore();return++this._index<this._frames.length};createjs.SpriteSheetBuilder=c})();this.createjs=this.createjs||{};
(function(){var c=function(a){this.initialize(a)},b=c.prototype=new createjs.DisplayObject;b.htmlElement=null;b._style=null;b.DisplayObject_initialize=b.initialize;b.initialize=function(a){typeof a=="string"&&(a=document.getElementById(a));this.DisplayObject_initialize();this.mouseEnabled=false;if(this.htmlElement=a)this._style=a.style,this._style.position="absolute",this._style.transformOrigin=this._style.WebkitTransformOrigin=this._style.msTransformOrigin=this._style.MozTransformOrigin=this._style.OTransformOrigin=
"0% 0%"};b.isVisible=function(){return this.htmlElement!=null};b.draw=function(){if(this.htmlElement!=null){var a=this.getConcatenatedMatrix(this._matrix),b=this.htmlElement;b.style.opacity=""+a.alpha;b.style.visibility=this.visible?"visible":"hidden";b.style.transform=b.style.WebkitTransform=b.style.OTransform=b.style.msTransform=["matrix("+a.a,a.b,a.c,a.d,a.tx+0.5|0,(a.ty+0.5|0)+")"].join(",");b.style.MozTransform=["matrix("+a.a,a.b,a.c,a.d,(a.tx+0.5|0)+"px",(a.ty+0.5|0)+"px)"].join(",");return true}};
b.cache=function(){};b.uncache=function(){};b.updateCache=function(){};b.hitTest=function(){};b.localToGlobal=function(){};b.globalToLocal=function(){};b.localToLocal=function(){};b.clone=function(){var a=new c;this.cloneProps(a);return a};b.toString=function(){return"[DOMElement (name="+this.name+")]"};b._tick=function(a){if(this.htmlElement!=null&&(this.htmlElement.style.visibility="hidden",this.onTick))this.onTick(a)};createjs.DOMElement=c})();this.createjs=this.createjs||{};(function(){var c=function(){this.initialize()},b=c.prototype;b.initialize=function(){};b.getBounds=function(){return new createjs.Rectangle(0,0,0,0)};b.applyFilter=function(){};b.toString=function(){return"[Filter]"};b.clone=function(){return new c};createjs.Filter=c})();this.createjs=this.createjs||{};
(function(){var c=function(){throw"Touch cannot be instantiated";};c.isSupported=function(){return"ontouchstart"in window||window.navigator.msPointerEnabled};c.enable=function(b,a,l){if(!b||!b.canvas||!c.isSupported())return false;b.__touch={pointers:{},multitouch:!a,preventDefault:!l,count:0};"ontouchstart"in window?c._IOS_enable(b):window.navigator.msPointerEnabled&&c._IE_enable(b);return true};c.disable=function(b){b&&("ontouchstart"in window?c._IOS_disable(b):window.navigator.msPointerEnabled&&c._IE_disable(b))};
c._IOS_enable=function(b){var a=b.canvas,l=b.__touch.f=function(a){c._IOS_handleEvent(b,a)};a.addEventListener("touchstart",l,false);a.addEventListener("touchmove",l,false);a.addEventListener("touchend",l,false);a.addEventListener("touchcancel",l,false)};c._IOS_disable=function(b){var a=b.canvas;if(a)b=b.__touch.f,a.removeEventListener("touchstart",b,false),a.removeEventListener("touchmove",b,false),a.removeEventListener("touchend",b,false),a.removeEventListener("touchcancel",b,false)};c._IOS_handleEvent=
function(b,a){if(b){b.__touch.preventDefault&&a.preventDefault&&a.preventDefault();for(var c=a.changedTouches,h=a.type,d=0,e=c.length;d<e;d++){var f=c[d],g=f.identifier;f.target==b.canvas&&(h=="touchstart"?this._handleStart(b,g,a,f.pageX,f.pageY):h=="touchmove"?this._handleMove(b,g,a,f.pageX,f.pageY):(h=="touchend"||h=="touchcancel")&&this._handleEnd(b,g,a))}}};c._IE_enable=function(b){var a=b.canvas,l=b.__touch.f=function(a){c._IE_handleEvent(b,a)};a.addEventListener("MSPointerDown",l,false);window.addEventListener("MSPointerMove",
l,false);window.addEventListener("MSPointerUp",l,false);window.addEventListener("MSPointerCancel",l,false);if(b.__touch.preventDefault)a.style.msTouchAction="none";b.__touch.activeIDs={}};c._IE_disable=function(b){var a=b.__touch.f;window.removeEventListener("MSPointerMove",a,false);window.removeEventListener("MSPointerUp",a,false);window.removeEventListener("MSPointerCancel",a,false);b.canvas&&b.canvas.removeEventListener("MSPointerDown",a,false)};c._IE_handleEvent=function(b,a){if(b){b.__touch.preventDefault&&
a.preventDefault&&a.preventDefault();var c=a.type,h=a.pointerId,d=b.__touch.activeIDs;if(c=="MSPointerDown")a.srcElement==b.canvas&&(d[h]=true,this._handleStart(b,h,a,a.pageX,a.pageY));else if(d[h])if(c=="MSPointerMove")this._handleMove(b,h,a,a.pageX,a.pageY);else if(c=="MSPointerUp"||c=="MSPointerCancel")delete d[h],this._handleEnd(b,h,a)}};c._handleStart=function(b,a,c,h,d){var e=b.__touch;if(e.multitouch||!e.count){var f=e.pointers;f[a]||(f[a]=true,e.count++,b._handlePointerDown(a,c,h,d))}};c._handleMove=
function(b,a,c,h,d){b.__touch.pointers[a]&&b._handlePointerMove(a,c,h,d)};c._handleEnd=function(b,a,c){var h=b.__touch,d=h.pointers;d[a]&&(h.count--,b._handlePointerUp(a,c,true),delete d[a])};createjs.Touch=c})();

; browserify_shim__define__module__export__(typeof createjs != "undefined" ? createjs : window.createjs);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],99:[function(require,module,exports){
(function (global){(function (){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};
(function(){var d=function(b,a,c,f){this.initialize(b,a,c,f)},a=d.prototype=new createjs.Container;d.INDEPENDENT="independent";d.SINGLE_FRAME="single";d.SYNCHED="synched";a.startPosition=0;a.loop=true;a.timeline=null;a.paused=false;a.actionsEnabled=true;a._synchOffset=0;a._prevPos=-1;a._prevPosition=0;a.Container_initialize=a.initialize;a.initialize=function(b,a,c,f){this.mode=b||d.INDEPENDENT;this.startPosition=a||0;this.loop=c;props={paused:true,position:a,useTicks:true};this.Container_initialize();
this.timeline=new createjs.Timeline(null,f,props);this._managed={}};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0};a.Container_draw=a.draw;a.draw=function(b,a,c){if(this.DisplayObject_draw(b,a))return true;this._updateTimeline();this.Container_draw(b,a,c)};a.play=function(){this.paused=false};a.stop=function(){this.paused=true};a.gotoAndPlay=function(b){this.paused=false;this._goto(b)};a.gotoAndStop=function(b){this.paused=true;this._goto(b)};a.clone=function(){throw"MovieClip cannot be cloned.";
};a.toString=function(){return"[MovieClip (name="+this.name+")]"};a.Container__tick=a._tick;a._tick=function(b){if(!this.paused&&this.mode==d.INDEPENDENT)this._prevPosition=this._prevPos<0?0:this._prevPosition+1;this.Container__tick(b)};a._goto=function(b){b=this.timeline.resolve(b);if(b!=null)this._prevPosition=b,this._updateTimeline()};a._reset=function(){this._prevPos=-1};a._updateTimeline=function(){var b=this.timeline,a=b._tweens,c=this.children,f=this.mode!=d.INDEPENDENT;b.loop=this.loop==null?
true:this.loop;f?b.setPosition(this.startPosition+(this.mode==d.SINGLE_FRAME?0:this._synchOffset),createjs.Tween.NONE):b.setPosition(this._prevPosition,this.actionsEnabled?null:createjs.Tween.NONE);this._prevPosition=b._prevPosition;if(this._prevPos!=b._prevPos){this._prevPos=b._prevPos;for(var e in this._managed)this._managed[e]=1;for(b=a.length-1;b>=0;b--)if(e=a[b],f=e._target,f!=this)e=e._stepPosition,f instanceof createjs.DisplayObject?this._addManagedChild(f,e):this._setState(f.state,e);for(b=
c.length-1;b>=0;b--)a=c[b].id,this._managed[a]==1&&(this.removeChildAt(b),delete this._managed[a])}};a._setState=function(b,a){if(b)for(var c=0,f=b.length;c<f;c++){var e=b[c],d=e.t,e=e.p,g;for(g in e)d[g]=e[g];this._addManagedChild(d,a)}};a._addManagedChild=function(b,a){if(!b._off){this.addChild(b);if(b instanceof d)b._synchOffset=a,b.mode==d.INDEPENDENT&&(!this._managed[b.id]||this._prevPos==0)&&b._reset();this._managed[b.id]=2}};createjs.MovieClip=d;var g=function(){throw"MovieClipPlugin cannot be instantiated.";
};g.priority=100;g.install=function(){createjs.Tween.installPlugin(g,["startPosition"])};g.init=function(b,a,c){if(a=="startPosition"||!(b._target instanceof createjs.MovieClip))return c};g.tween=function(b,a,c,d,e,g){return!(b._target instanceof createjs.MovieClip)?c:g==1?e[a]:d[a]};g.install()})();

; browserify_shim__define__module__export__(typeof createjs != "undefined" ? createjs : window.createjs);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],100:[function(require,module,exports){
(function (global){(function (){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
* PreloadJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
**/this.createjs=this.createjs||{};
(function(){var d=function(){this.init()};d.prototype={};var a=d.prototype;a.loaded=false;a.canceled=false;a.progress=0;a._item=null;a.onProgress=null;a.onLoadStart=null;a.onFileLoad=null;a.onFileProgress=null;a.onComplete=null;a.onError=null;a.getItem=function(){return this._item};a.init=function(){};a.load=function(){};a.cancel=function(){};a._sendLoadStart=function(){if(!this._isCanceled()&&this.onLoadStart)this.onLoadStart({target:this})};a._sendProgress=function(a){if(!this._isCanceled()){var b;if(a instanceof
Number)this.progress=a,b={loaded:this.progress,total:1};else if(b=a,this.progress=a.loaded/a.total,isNaN(this.progress)||this.progress==Infinity)this.progress=0;b.target=this;if(this.onProgress)this.onProgress(b)}};a._sendFileProgress=function(a){if(this._isCanceled())this._cleanUp();else if(this.onFileProgress)a.target=this,this.onFileProgress(a)};a._sendComplete=function(){if(!this._isCanceled()&&this.onComplete)this.onComplete({target:this})};a._sendFileComplete=function(a){if(!this._isCanceled()&&
this.onFileLoad)a.target=this,this.onFileLoad(a)};a._sendError=function(a){if(!this._isCanceled()&&this.onError)a==null&&(a={}),a.target=this,this.onError(a)};a._isCanceled=function(){return window.createjs==null||this.canceled?true:false};a.toString=function(){return"[PreloadJS AbstractLoader]"};createjs.AbstractLoader=d})();this.createjs=this.createjs||{};
(function(){var d=function(b){this.initialize(b)},a=d.prototype=new createjs.AbstractLoader;d.IMAGE="image";d.SVG="svg";d.SOUND="sound";d.JSON="json";d.JAVASCRIPT="javascript";d.CSS="css";d.XML="xml";d.TEXT="text";d.TIMEOUT_TIME=8E3;a.useXHR=true;a.stopOnError=false;a.maintainScriptOrder=true;a.next=null;a.typeHandlers=null;a.extensionHandlers=null;a._loadStartWasDispatched=false;a._maxConnections=1;a._currentLoads=null;a._loadQueue=null;a._loadedItemsById=null;a._loadedItemsBySrc=null;a._targetProgress=
0;a._numItems=0;a._numItemsLoaded=null;a._scriptOrder=null;a._loadedScripts=null;a.TAG_LOAD_OGGS=true;a.initialize=function(b){this._targetProgress=this._numItemsLoaded=this._numItems=0;this._paused=false;this._currentLoads=[];this._loadQueue=[];this._scriptOrder=[];this._loadedScripts=[];this._loadedItemsById={};this._loadedItemsBySrc={};this.typeHandlers={};this.extensionHandlers={};this._loadStartWasDispatched=false;this.useXHR=b!=false&&window.XMLHttpRequest!=null;this.determineCapabilities()};
a.determineCapabilities=function(){var b=createjs.PreloadJS.BrowserDetect;if(b!=null)createjs.PreloadJS.TAG_LOAD_OGGS=b.isFirefox||b.isOpera};d.isBinary=function(b){switch(b){case createjs.PreloadJS.IMAGE:case createjs.PreloadJS.SOUND:return true;default:return false}};a.installPlugin=function(b){if(!(b==null||b.getPreloadHandlers==null)){b=b.getPreloadHandlers();if(b.types!=null)for(var a=0,c=b.types.length;a<c;a++)this.typeHandlers[b.types[a]]=b.callback;if(b.extensions!=null)for(a=0,c=b.extensions.length;a<
c;a++)this.extensionHandlers[b.extensions[a]]=b.callback}};a.setMaxConnections=function(b){this._maxConnections=b;this._paused||this._loadNext()};a.loadFile=function(b,a){b==null?this._sendError({text:"File is null."}):(this._addItem(b),a!==false&&this.setPaused(false))};a.loadManifest=function(b,a){var c;if(b instanceof Array){if(b.length==0){this._sendError({text:"Manifest is empty."});return}c=b}else{if(b==null){this._sendError({text:"Manifest is null."});return}c=[b]}for(var d=0,f=c.length;d<
f;d++)this._addItem(c[d],false);a!==false&&this._loadNext()};a.load=function(){this.setPaused(false)};a.getResult=function(b){return this._loadedItemsById[b]||this._loadedItemsBySrc[b]};a.setPaused=function(b){(this._paused=b)||this._loadNext()};a.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0;this._loadedScripts.length=0};a._addItem=function(b){b=this._createLoadItem(b);b!=null&&(this._loadQueue.push(b),this._numItems++,this._updateProgress(),
b.getItem().type==createjs.PreloadJS.JAVASCRIPT&&(this._scriptOrder.push(b.getItem()),this._loadedScripts.push(null)))};a._loadNext=function(){if(!this._paused){if(!this._loadStartWasDispatched)this._sendLoadStart(),this._loadStartWasDispatched=true;if(this._numItems==this._numItemsLoaded)this.loaded=true,this._sendComplete(),this.next&&this.next.load&&this.next.load.apply(this.next);for(;this._loadQueue.length&&this._currentLoads.length<this._maxConnections;)this._loadItem(this._loadQueue.shift())}};
a._loadItem=function(b){b.onProgress=createjs.PreloadJS.proxy(this._handleProgress,this);b.onComplete=createjs.PreloadJS.proxy(this._handleFileComplete,this);b.onError=createjs.PreloadJS.proxy(this._handleFileError,this);this._currentLoads.push(b);b.load()};a._handleFileError=function(b){var b=b.target,a=this._createResultData(b.getItem());this._numItemsLoaded++;this._updateProgress();this._sendError(a);this.stopOnError||(this._removeLoadItem(b),this._loadNext())};a._createResultData=function(b){var a=
{id:b.id,result:null,data:b.data,type:b.type,src:b.src};this._loadedItemsById[b.id]=a;return this._loadedItemsBySrc[b.src]=a};a._handleFileComplete=function(b){var b=b.target,a=b.getItem(),c=this._createResultData(a);this._removeLoadItem(b);c.result=b instanceof createjs.XHRLoader?this._createResult(a,b.getResult()):a.tag;switch(a.type){case createjs.PreloadJS.IMAGE:if(b instanceof createjs.XHRLoader){var d=this;c.result.onload=function(){d._handleFileTagComplete(a,c)};return}break;case createjs.PreloadJS.JAVASCRIPT:if(this.maintainScriptOrder){this._loadedScripts[this._scriptOrder.indexOf(a)]=
a;this._checkScriptLoadOrder(b);return}}this._handleFileTagComplete(a,c)};a._checkScriptLoadOrder=function(){for(var b=this._loadedScripts.length,a=0;a<b;a++){var c=this._loadedScripts[a];if(c===null)break;if(c!==true){var d=this.getResult(c.src),c=this.getResult(c.id);c.result=d.result;this._handleFileTagComplete(d,c);this._loadedScripts[a]=true;a--;b--}}};a._handleFileTagComplete=function(b,a){this._numItemsLoaded++;b.completeHandler&&b.completeHandler(a);this._updateProgress();this._sendFileComplete(a);
this._loadNext()};a._removeLoadItem=function(b){for(var a=this._currentLoads.length,c=0;c<a;c++)if(this._currentLoads[c]==b){this._currentLoads.splice(c,1);break}};a._createResult=function(b,a){var c=null,d;switch(b.type){case createjs.PreloadJS.IMAGE:c=this._createImage();break;case createjs.PreloadJS.SOUND:c=b.tag||this._createAudio();break;case createjs.PreloadJS.CSS:c=this._createLink();break;case createjs.PreloadJS.JAVASCRIPT:c=this._createScript();break;case createjs.PreloadJS.SVG:var c=this._createSVG(),
f=this._createXML(a,"image/svg+xml");c.appendChild(f);break;case createjs.PreloadJS.XML:d=this._createXML(a,"text/xml");break;case createjs.PreloadJS.JSON:case createjs.PreloadJS.TEXT:d=a}if(c){if(b.type==createjs.PreloadJS.CSS)c.href=b.src;else if(b.type!=createjs.PreloadJS.SVG)c.src=b.src;return c}else return d};a._createXML=function(b,a){var c;window.DOMParser?(c=new DOMParser,c=c.parseFromString(b,a)):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async=false,c.loadXML(b));return c};a._handleProgress=
function(b){var b=b.target,a=this._createResultData(b.getItem());a.progress=b.progress;this._sendFileProgress(a);this._updateProgress()};a._updateProgress=function(){var b=this._numItemsLoaded/this._numItems,a=this._numItems-this._numItemsLoaded;if(a>0){for(var c=0,d=0,f=this._currentLoads.length;d<f;d++)c+=this._currentLoads[d].progress;b+=c/a*(a/this._numItems)}this._sendProgress({loaded:b,total:1})};a._createLoadItem=function(a){var c={};switch(typeof a){case "string":c.src=a;break;case "object":a instanceof
HTMLAudioElement?(c.tag=a,c.src=c.tag.src,c.type=createjs.PreloadJS.SOUND):c=a}c.ext=this._getNameAfter(c.src,".");if(!c.type)c.type=this.getType(c.ext);if(c.id==null||c.id=="")c.id=c.src;if(a=this.typeHandlers[c.type]||this.extensionHandlers[c.ext]){a=a(c.src,c.type,c.id,c.data);if(a===false)return null;else if(a!==true){if(a.src!=null)c.src=a.src;if(a.id!=null)c.id=a.id;if(a.tag!=null&&a.tag.load instanceof Function)c.tag=a.tag}c.ext=this._getNameAfter(c.src,".")}a=this.useXHR;switch(c.type){case createjs.PreloadJS.JSON:case createjs.PreloadJS.XML:case createjs.PreloadJS.TEXT:a=
true;break;case createjs.PreloadJS.SOUND:c.ext=="ogg"&&createjs.PreloadJS.TAG_LOAD_OGGS&&(a=false)}return this.useXHR==true&&(c.type==createjs.PreloadJS.IMAGE||c.type==createjs.PreloadJS.SVG)?(c=this._createTagItem(c),c.useXHR=true,c):a?new createjs.XHRLoader(c):c.tag?new createjs.TagLoader(c):this._createTagItem(c)};a._createTagItem=function(a){var c,d="src",e=false;switch(a.type){case createjs.PreloadJS.IMAGE:c=this._createImage();break;case createjs.PreloadJS.SOUND:c=this._createAudio();break;
case createjs.PreloadJS.CSS:d="href";e=true;c=this._createLink();break;case createjs.PreloadJS.JAVASCRIPT:e=true;c=this._createScript();break;case createjs.PreloadJS.SVG:d="data",c=this._createSVG()}a.tag=c;return new createjs.TagLoader(a,d,e)};a.getType=function(a){switch(a){case "jpeg":case "jpg":case "gif":case "png":return createjs.PreloadJS.IMAGE;case "ogg":case "mp3":case "wav":return createjs.PreloadJS.SOUND;case "json":return createjs.PreloadJS.JSON;case "xml":return createjs.PreloadJS.XML;
case "css":return createjs.PreloadJS.CSS;case "js":return createjs.PreloadJS.JAVASCRIPT;case "svg":return createjs.PreloadJS.SVG;default:return createjs.PreloadJS.TEXT}};a._getNameAfter=function(a,c){var d=a.lastIndexOf(c),d=a.substr(d+1),e=d.lastIndexOf(/[\b|\?|\#|\s]/);return e==-1?d:d.substr(0,e)};a._createImage=function(){return document.createElement("img")};a._createSVG=function(){var a=document.createElement("object");a.type="image/svg+xml";return a};a._createAudio=function(){var a=document.createElement("audio");
a.autoplay=false;a.type="audio/ogg";return a};a._createScript=function(){var a=document.createElement("script");a.type="text/javascript";return a};a._createLink=function(){var a=document.createElement("link");a.type="text/css";a.rel="stylesheet";return a};a.toString=function(){return"[PreloadJS]"};d.proxy=function(a,c){return function(d){return a.apply(c,arguments)}};createjs.PreloadJS=d;var c=function(){};c.init=function(){var a=navigator.userAgent;c.isFirefox=a.indexOf("Firefox")>-1;c.isOpera=window.opera!=
null;c.isIOS=a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1};c.init();createjs.PreloadJS.BrowserDetect=c})();this.createjs=this.createjs||{};
(function(){var d=function(a,b,d){this.init(a,b,d)},a=d.prototype=new createjs.AbstractLoader;a._srcAttr=null;a._loadTimeOutTimeout=null;a.tagCompleteProxy=null;a.init=function(a,b,d){this._item=a;this._srcAttr=b||"src";this.useXHR=d==true;this.isAudio=a.tag instanceof HTMLAudioElement;this.tagCompleteProxy=createjs.PreloadJS.proxy(this._handleTagLoad,this)};a.cancel=function(){this.canceled=true;this._clean();var a=this.getItem();if(a!=null)a.src=null};a.load=function(){this.useXHR?this.loadXHR():
this.loadTag()};a.loadXHR=function(){var a=this.getItem(),a=new createjs.XHRLoader(a);a.onProgress=createjs.PreloadJS.proxy(this._handleProgress,this);a.onFileLoad=createjs.PreloadJS.proxy(this._handleXHRComplete,this);a.onComplete=createjs.PreloadJS.proxy(this._handleXHRComplete,this);a.onError=createjs.PreloadJS.proxy(this._handleLoadError,this);a.load()};a._handleXHRComplete=function(a){if(!this._isCanceled()){this._clean();a.target.onFileLoad=null;a.target.onComplete=null;var b=a.target.getItem();
a.target.getResult();b.type==createjs.PreloadJS.IMAGE?(b.tag.onload=createjs.PreloadJS.proxy(this._sendComplete,this),b.tag.src=b.src):(b.tag[this._srcAttr]=b.src,this._sendComplete())}};a._handleLoadError=function(a){a.error&&a.error.code==101?this.loadTag():(this._clean(),this._sendError(a))};a.loadTag=function(){var a=this.getItem(),b=a.tag;clearTimeout(this._loadTimeOutTimeout);this._loadTimeOutTimeout=setTimeout(createjs.PreloadJS.proxy(this._handleLoadTimeOut,this),createjs.PreloadJS.TIMEOUT_TIME);
if(this.isAudio)b.src=null,b.preload="auto",b.setAttribute("data-temp","true");b.onerror=createjs.PreloadJS.proxy(this._handleLoadError,this);b.onprogress=createjs.PreloadJS.proxy(this._handleProgress,this);this.isAudio?(b.onstalled=createjs.PreloadJS.proxy(this._handleStalled,this),b.addEventListener("canplaythrough",this.tagCompleteProxy,false)):b.onload=createjs.PreloadJS.proxy(this._handleTagLoad,this);b[this._srcAttr]=a.src;a.type==createjs.PreloadJS.SVG&&document.getElementsByTagName("body")[0].appendChild(b);
a=a.type==createjs.PreloadJS.SOUND&&a.ext=="ogg"&&createjs.PreloadJS.BrowserDetect.isFirefox;b.load!=null&&!a&&b.load()};a._handleLoadTimeOut=function(){this._clean();this._sendError()};a._handleStalled=function(){};a._handleLoadError=function(){this._clean();this._sendError()};a._handleTagLoad=function(){if(!this._isCanceled()){var a=this.getItem().tag;clearTimeout(this._loadTimeOutTimeout);if(!(this.loaded||this.isAudio&&a.readyState!==4))this.getItem().type==createjs.PreloadJS.SVG&&document.getElementsByTagName("body")[0].removeChild(a),
this.loaded=true,this._clean(),this._sendComplete()}};a._clean=function(){clearTimeout(this._loadTimeOutTimeout);var a=this.getItem().tag;a.onload=null;a.removeEventListener&&a.removeEventListener("canplaythrough",this.tagCompleteProxy,false);a.onstalled=null;a.onprogress=null;a.onerror=null};a._handleProgress=function(a){clearTimeout(this._loadTimeOutTimeout);if(this.isAudio){a=this.getItem();if(a.buffered==null)return;a={loaded:a.buffered.length>0?a.buffered.end(0):0,total:a.duration}}this._sendProgress(a)};
a.toString=function(){return"[PreloadJS TagLoader]"};createjs.TagLoader=d})();this.createjs=this.createjs||{};
(function(){var d=function(a){this.init(a)},a=d.prototype=new createjs.AbstractLoader;a._wasLoaded=false;a._request=null;a._loadTimeOutTimeout=null;a._xhrLevel=null;a.init=function(a){this._item=a;this._createXHR(a)};a.getResult=function(){try{return this._request.responseText}catch(a){}return this._request.response};a.cancel=function(){this.canceled=true;this._clean();this._request.abort()};a.load=function(){if(this._request==null)this.handleError();else{if(this._xhrLevel==1)this._loadTimeOutTimeout=
setTimeout(createjs.PreloadJS.proxy(this.handleTimeout,this),createjs.PreloadJS.TIMEOUT_TIME);this._request.onloadstart=createjs.PreloadJS.proxy(this.handleLoadStart,this);this._request.onprogress=createjs.PreloadJS.proxy(this.handleProgress,this);this._request.onabort=createjs.PreloadJS.proxy(this.handleAbort,this);this._request.onerror=createjs.PreloadJS.proxy(this.handleError,this);this._request.ontimeout=createjs.PreloadJS.proxy(this.handleTimeout,this);this._request.onload=createjs.PreloadJS.proxy(this.handleLoad,
this);this._request.onreadystatechange=createjs.PreloadJS.proxy(this.handleReadyStateChange,this);try{this._request.send()}catch(a){this._sendError({source:a})}}};a.handleProgress=function(a){a.loaded>0&&a.total==0||this._sendProgress({loaded:a.loaded,total:a.total})};a.handleLoadStart=function(){clearTimeout(this._loadTimeOutTimeout);this._sendLoadStart()};a.handleAbort=function(){this._clean();this._sendError()};a.handleError=function(){this._clean();this._sendError()};a.handleReadyStateChange=
function(){this._request.readyState==4&&this.handleLoad()};a._checkError=function(){switch(parseInt(this._request.status)){case 404:case 0:return false}return this._hasResponse()||this._hasTextResponse()||this._hasXMLResponse()};a._hasResponse=function(){return this._request.response!=null};a._hasTextResponse=function(){try{return this._request.responseText!=null}catch(a){return false}};a._hasXMLResponse=function(){try{return this._request.responseXML!=null}catch(a){return false}};a.handleLoad=function(){if(!this.loaded)this.loaded=
true,this._checkError()?(this._clean(),this._sendComplete()):this.handleError()};a.handleTimeout=function(){this._clean();this._sendError()};a._createXHR=function(a){this._xhrLevel=1;if(window.ArrayBuffer)this._xhrLevel=2;if(window.XMLHttpRequest)this._request=new XMLHttpRequest;else try{this._request=new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(b){return null}a.type==createjs.PreloadJS.TEXT&&this._request.overrideMimeType&&this._request.overrideMimeType("text/plain; charset=x-user-defined");this._request.open("GET",
a.src,true);if(createjs.PreloadJS.isBinary(a.type))this._request.responseType="arraybuffer";return true};a._clean=function(){clearTimeout(this._loadTimeOutTimeout);var a=this._request;a.onloadstart=null;a.onprogress=null;a.onabort=null;a.onerror=null;a.onload=null;a.ontimeout=null;a.onloadend=null;a.onreadystatechange=null;clearInterval(this._checkLoadInterval)};a.toString=function(){return"[PreloadJS XHRLoader]"};createjs.XHRLoader=d})();

; browserify_shim__define__module__export__(typeof createjs != "undefined" ? createjs : window.createjs);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],101:[function(require,module,exports){
(function (global){(function (){
; var __browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/*
* TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{};
(function(){var b=function(g,a){this.initialize(g,a)},a=b.prototype;b.NONE=0;b.LOOP=1;b.REVERSE=2;b.IGNORE={};b._tweens=[];b._plugins={};b.get=function(g,a,c){return new b(g,a,c)};b.tick=function(g,a){for(var c=b._tweens.slice(),e=c.length-1;e>=0;e--){var d=c[e];a&&!d.ignoreGlobalPause||d._paused||d.tick(d._useTicks?1:g)}};createjs.Ticker&&createjs.Ticker.addListener(b,false);b.removeTweens=function(g){if(g.tweenjs_count){for(var a=b._tweens,c=a.length-1;c>=0;c--)if(a[c]._target==g)a[c]._paused=true,
a.splice(c,1);g.tweenjs_count=0}};b.hasActiveTweens=function(g){return g?g.tweenjs_count:b._tweens&&b._tweens.length};b.installPlugin=function(g,a){var c=g.priority;if(c==null)g.priority=c=0;for(var e=0,d=a.length,f=b._plugins;e<d;e++){var i=a[e];if(f[i]){for(var k=f[i],j=0,l=k.length;j<l;j++)if(c<k[j].priority)break;f[i].splice(j,0,g)}else f[i]=[g]}};b._register=function(g,a){var c=g._target;if(a){if(c)c.tweenjs_count=c.tweenjs_count?c.tweenjs_count+1:1;b._tweens.push(g)}else c&&c.tweenjs_count--,
c=b._tweens.indexOf(g),c!=-1&&b._tweens.splice(c,1)};a.ignoreGlobalPause=false;a.loop=false;a.duration=0;a.pluginData=null;a.onChange=null;a.target=null;a.position=null;a._paused=false;a._curQueueProps=null;a._initQueueProps=null;a._steps=null;a._actions=null;a._prevPosition=0;a._stepPosition=0;a._prevPos=-1;a._target=null;a._useTicks=false;a.initialize=function(g,a,c){this.target=this._target=g;if(a)this._useTicks=a.useTicks,this.ignoreGlobalPause=a.ignoreGlobalPause,this.loop=a.loop,this.onChange=
a.onChange,a.override&&b.removeTweens(g);this.pluginData=c||{};this._curQueueProps={};this._initQueueProps={};this._steps=[];this._actions=[];a&&a.paused?this._paused=true:b._register(this,true);a&&a.position!=null&&this.setPosition(a.position,b.NONE)};a.wait=function(a){if(a==null||a<=0)return this;var b=this._cloneProps(this._curQueueProps);return this._addStep({d:a,p0:b,e:this._linearEase,p1:b})};a.to=function(a,b,c){if(isNaN(b)||b<0)b=0;return this._addStep({d:b||0,p0:this._cloneProps(this._curQueueProps),
e:c,p1:this._cloneProps(this._appendQueueProps(a))})};a.call=function(a,b,c){return this._addAction({f:a,p:b?b:[this],o:c?c:this._target})};a.set=function(a,b){return this._addAction({f:this._set,o:this,p:[a,b?b:this._target]})};a.play=function(a){return this.call(a.setPaused,[false],a)};a.pause=function(a){a||(a=this);return this.call(a.setPaused,[true],a)};a.setPosition=function(a,b){a<0&&(a=0);b==null&&(b=1);var c=a,e=false;if(c>=this.duration)this.loop?c%=this.duration:(c=this.duration,e=true);
if(c==this._prevPos)return e;if(this._target)if(e)this._updateTargetProps(null,1);else if(this._steps.length>0){for(var d=0,f=this._steps.length;d<f;d++)if(this._steps[d].t>c)break;d=this._steps[d-1];this._updateTargetProps(d,(this._stepPosition=c-d.t)/d.d,c)}d=this._prevPos;this.position=this._prevPos=c;this._prevPosition=a;b!=0&&this._actions.length>0&&(this._useTicks?this._runActions(c,c):b==1&&c<d?(d!=this.duration&&this._runActions(d,this.duration),this._runActions(0,c,true)):this._runActions(d,
c));e&&this.setPaused(true);this.onChange&&this.onChange(this);return e};a.tick=function(a){this._paused||this.setPosition(this._prevPosition+a)};a.setPaused=function(a){this._paused=!!a;b._register(this,!a);return this};a.w=a.wait;a.t=a.to;a.c=a.call;a.s=a.set;a.toString=function(){return"[Tween]"};a.clone=function(){throw"Tween can not be cloned.";};a._updateTargetProps=function(a,h,c){var e,d,f,i;!a&&h==1?e=d=this._curQueueProps:(a.e&&(h=a.e(h,0,1,1)),e=a.p0,d=a.p1);for(n in this._initQueueProps){if((f=
e[n])==null)e[n]=f=this._initQueueProps[n];if((i=d[n])==null)d[n]=i=f;f=f==i||h==0||h==1||typeof f!="number"?h==1?i:f:f+(i-f)*h;var k=false;if(i=b._plugins[n])for(var j=0,l=i.length;j<l;j++){var m=i[j].tween(this,n,f,e,d,h,c,!a);m==b.IGNORE?k=true:f=m}k||(this._target[n]=f)}};a._runActions=function(a,b,c){var e=a,d=b,f=-1,i=this._actions.length,k=1;a>b&&(e=b,d=a,f=i,i=k=-1);for(;(f+=k)!=i;){var b=this._actions[f],j=b.t;(j==d||j>e&&j<d||c&&j==a)&&b.f.apply(b.o,b.p)}};a._appendQueueProps=function(a){var h,
c,e,d;for(d in a){if(this._initQueueProps[d]==null){c=this._target[d];if(h=b._plugins[d])for(var f=0,i=h.length;f<i;f++)e=h[f].init(this,d,c),e!=b.IGNORE&&(c=e);this._initQueueProps[d]=c}this._curQueueProps[d]=a[d]}return this._curQueueProps};a._cloneProps=function(a){var b={},c;for(c in a)b[c]=a[c];return b};a._addStep=function(a){if(a.d>0)this._steps.push(a),a.t=this.duration,this.duration+=a.d;return this};a._addAction=function(a){a.t=this.duration;this._actions.push(a);return this};a._set=function(a,
b){for(var c in a)b[c]=a[c]};createjs.Tween=b})();this.createjs=this.createjs||{};
(function(){var b=function(a,b,c){this.initialize(a,b,c)},a=b.prototype;a.ignoreGlobalPause=false;a.duration=0;a.loop=false;a.onChange=null;a.position=null;a._paused=false;a._tweens=null;a._labels=null;a._prevPosition=0;a._prevPos=-1;a._useTicks=false;a.initialize=function(a,b,c){this._tweens=[];if(c)this._useTicks=c.useTicks,this.loop=c.loop,this.ignoreGlobalPause=c.ignoreGlobalPause,this.onChange=c.onChange;a&&this.addTween.apply(this,a);this.setLabels(b);c&&c.paused?this._paused=true:createjs.Tween._register(this,
true);c&&c.position!=null&&this.setPosition(c.position,createjs.Tween.NONE)};a.addTween=function(a){var b=arguments.length;if(b>1){for(var c=0;c<b;c++)this.addTween(arguments[c]);return arguments[0]}else if(b==0)return null;this.removeTween(a);this._tweens.push(a);a.setPaused(true);a._paused=false;a._useTicks=this._useTicks;if(a.duration>this.duration)this.duration=a.duration;this._prevPos>=0&&a.setPosition(this._prevPos,createjs.Tween.NONE);return a};a.removeTween=function(a){var b=arguments.length;
if(b>1){for(var c=true,e=0;e<b;e++)c=c&&this.removeTween(arguments[e]);return c}else if(b==0)return false;b=this._tweens.indexOf(a);return b!=-1?(this._tweens.splice(b,1),a.duration>=this.duration&&this.updateDuration(),true):false};a.addLabel=function(a,b){this._labels[a]=b};a.setLabels=function(a){this._labels=a?a:{}};a.gotoAndPlay=function(a){this.setPaused(false);this._goto(a)};a.gotoAndStop=function(a){this.setPaused(true);this._goto(a)};a.setPosition=function(a,b){a<0&&(a=0);var c=this.loop?
a%this.duration:a,e=!this.loop&&a>=this.duration;if(c==this._prevPos)return e;this._prevPosition=a;this.position=this._prevPos=c;for(var d=0,f=this._tweens.length;d<f;d++)if(this._tweens[d].setPosition(c,b),c!=this._prevPos)return false;e&&this.setPaused(true);this.onChange&&this.onChange(this);return e};a.setPaused=function(a){this._paused=!!a;createjs.Tween._register(this,!a)};a.updateDuration=function(){for(var a=this.duration=0,b=this._tweens.length;a<b;a++)if(tween=this._tweens[a],tween.duration>
this.duration)this.duration=tween.duration};a.tick=function(a){this.setPosition(this._prevPosition+a)};a.resolve=function(a){var b=parseFloat(a);isNaN(b)&&(b=this._labels[a]);return b};a.toString=function(){return"[Timeline]"};a.clone=function(){throw"Timeline can not be cloned.";};a._goto=function(a){a=this.resolve(a);a!=null&&this.setPosition(a)};createjs.Timeline=b})();this.createjs=this.createjs||{};
(function(){var b=function(){throw"Ease cannot be instantiated.";};b.linear=function(a){return a};b.none=b.linear;b.get=function(a){a<-1&&(a=-1);a>1&&(a=1);return function(b){return a==0?b:a<0?b*(b*-a+1+a):b*((2-b)*a+(1-a))}};b.getPowIn=function(a){return function(b){return Math.pow(b,a)}};b.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}};b.getPowInOut=function(a){return function(b){return(b*=2)<1?0.5*Math.pow(b,a):1-0.5*Math.abs(Math.pow(2-b,a))}};b.quadIn=b.getPowIn(2);b.quadOut=
b.getPowOut(2);b.quadInOut=b.getPowInOut(2);b.cubicIn=b.getPowIn(3);b.cubicOut=b.getPowOut(3);b.cubicInOut=b.getPowInOut(3);b.quartIn=b.getPowIn(4);b.quartOut=b.getPowOut(4);b.quartInOut=b.getPowInOut(4);b.quintIn=b.getPowIn(5);b.quintOut=b.getPowOut(5);b.quintInOut=b.getPowInOut(5);b.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)};b.sineOut=function(a){return Math.sin(a*Math.PI/2)};b.sineInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};b.getBackIn=function(a){return function(b){return b*
b*((a+1)*b-a)}};b.backIn=b.getBackIn(1.7);b.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}};b.backOut=b.getBackOut(1.7);b.getBackInOut=function(a){a*=1.525;return function(b){return(b*=2)<1?0.5*b*b*((a+1)*b-a):0.5*((b-=2)*b*((a+1)*b+a)+2)}};b.backInOut=b.getBackInOut(1.7);b.circIn=function(a){return-(Math.sqrt(1-a*a)-1)};b.circOut=function(a){return Math.sqrt(1- --a*a)};b.circInOut=function(a){return(a*=2)<1?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)};b.bounceIn=
function(a){return 1-b.bounceOut(1-a)};b.bounceOut=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};b.bounceInOut=function(a){return a<0.5?b.bounceIn(a*2)*0.5:b.bounceOut(a*2-1)*0.5+0.5};b.getElasticIn=function(a,b){var h=Math.PI*2;return function(c){if(c==0||c==1)return c;var e=b/h*Math.asin(1/a);return-(a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b))}};b.elasticIn=b.getElasticIn(1,0.3);b.getElasticOut=
function(a,b){var h=Math.PI*2;return function(c){if(c==0||c==1)return c;var e=b/h*Math.asin(1/a);return a*Math.pow(2,-10*c)*Math.sin((c-e)*h/b)+1}};b.elasticOut=b.getElasticOut(1,0.3);b.getElasticInOut=function(a,b){var h=Math.PI*2;return function(c){var e=b/h*Math.asin(1/a);return(c*=2)<1?-0.5*a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b):a*Math.pow(2,-10*(c-=1))*Math.sin((c-e)*h/b)*0.5+1}};b.elasticInOut=b.getElasticInOut(1,0.3*1.5);createjs.Ease=b})();

; browserify_shim__define__module__export__(typeof createjs != "undefined" ? createjs : window.createjs);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[28]);
