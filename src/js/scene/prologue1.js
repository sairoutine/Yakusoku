'use strict';

/* プロローグ画面1 */
var MESSAGE = (function () {/*
蝉の鳴き声が聞こえる。
蓮子は湖のほとりにきている。
メリーと湖で涼もうと約束していた。
蓮子は珍しく先に到着した。
携帯情報端末を見ると、
8月31日の午前9時50分を回ったところ。
夜なら星を見れば時間がわかるのだけど。
約束まで、あと10分。
メリーの事だから早めに来るだろう、
と考えていた時に、背後から物音が聞こえる。
メリーだと思い振り向くと、
自分にそっくりな容姿の女の子が立っていた。
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var SHOW_TITLE_COUNT = 300;

var Scene = function(game) {
	BaseScene.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	//TODO: this.game.playBGM('prologue1');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(SHOW_TITLE_COUNT + 60 < this.frame_count) {
		this.game.notifyPrologue1Done();
	}
	/*
	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologue1Done();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
	*/
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	var prologue2_bg = this.game.getImage('prologue1_1_bg');

	// 背景画像表示
	this.game.surface.drawImage(prologue2_bg,
					0,
					0,
					prologue2_bg.width,
					prologue2_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);

	this.game.surface.save();

	var alpha = 1.0;
	// 切り替え効果
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

	this.game.surface.globalAlpha = alpha;




	if(SHOW_TITLE_COUNT > this.frame_count) {
		this.game.surface.font = "24px 'Cosmic Sans MS'" ;
		this.game.surface.textBaseAlign = 'middle' ;
		this.game.surface.fillStyle = 'rgb( 255, 255, 255 )' ;

		// セリフ表示
		var lines = MESSAGE.split("\n");
		if (lines.length) {
			// セリフテキストの y 座標初期位置
			var y = 50;

			for(var i = 0, len = lines.length; i < len; i++) {
				this.game.surface.fillText(lines[i], 50, y); // 1行表示

				y+= 30;
			}
		}
	}

	this.game.surface.restore();
};

module.exports = Scene;
