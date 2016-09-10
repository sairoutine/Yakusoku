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

	//TODO: this.game.playBGM('prologue2');
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

	ctx.save();

	// 背景画像表示
	var prologue2_bg = this.game.getImage('prologue2_bg');
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

	var x, y;

	if(this.serif.right_image()) {
		ctx.save();

		x = Config.PROLOGUE2_RIGHT_X;
		y = Config.PROLOGUE2_RIGHT_Y;

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

		// メッセージウィンドウ 名前欄表示
		ctx.save();

		ctx.globalAlpha = 0.5;
		ctx.fillStyle = 'rgb( 0, 0, 0 )';
		ctx.fillRect(440, 420, 100, 40);

		ctx.restore();

		// 名前表示
		ctx.save();

		ctx.font = "24px 'Migu'";
		ctx.textAlign = 'middle';
		ctx.textBaseAlign = 'middle';
		ctx.fillStyle = 'rgb( 255, 255, 255 )';

		if (this.serif.right_name()) {
			ctx.fillText(this.serif.right_name(), 450, 450);
		}

		ctx.restore();


	}

	if(this.serif.left_image()) {
		ctx.save();

		x = Config.PROLOGUE2_LEFT_X;
		y = Config.PROLOGUE2_LEFT_Y;

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_left_talking()) {
			ctx.globalAlpha = 0.5;
		}
		else {
			// 喋ってる方のキャラは真ん中に寄る
			x -= TALKER_MOVE_PX;
			y -= TALKER_MOVE_PX;
		}

		var left_image = this.game.getImage(this.serif.left_image());
		ctx.transform(-1, 0, 0, 1, left_image.width * CHARA_SIZE_RATIO, 0); // 左右反転
		ctx.drawImage(left_image,
						x,
						y,
						left_image.width * CHARA_SIZE_RATIO,
						left_image.height * CHARA_SIZE_RATIO);

		ctx.restore();

		// メッセージウィンドウ 名前欄表示
		ctx.save();

		ctx.globalAlpha = 0.5;
		ctx.fillStyle = 'rgb( 0, 0, 0 )';
		ctx.fillRect(100, 420, 100, 40);

		ctx.restore();

		// 名前表示
		ctx.save();

		ctx.font = "24px 'Migu'";
		ctx.textAlign = 'middle';
		ctx.textBaseAlign = 'middle';
		ctx.fillStyle = 'rgb( 255, 255, 255 )';

		if (this.serif.left_name()) {
			ctx.fillText(this.serif.left_name(), 120, 450);
		}

		ctx.restore();
	}

	// セリフウィンドウ表示
	if(this.serif.serif_window()) {
		ctx.save();

		x = Config.PROLOGUE2_SERIF_WINDOW_X;
		y = Config.PROLOGUE2_SERIF_WINDOW_Y;

		var fukidashi = this.game.getImage(this.serif.serif_window());
		if(this.serif.is_right_talking()) {
			x = -x;//fukidashi.width * CHARA_SIZE_RATIO;
			ctx.transform(-1, 0, 0, 1, fukidashi.width * CHARA_SIZE_RATIO, 0); // 左右反転
		}
		ctx.drawImage(fukidashi,
						x,
						y,
						fukidashi.width * CHARA_SIZE_RATIO,
						fukidashi.height * CHARA_SIZE_RATIO
		);
		ctx.restore();
	}

	// テキスト表示
	ctx.save();

	ctx.font = "18px 'Migu'";
	ctx.textAlign = 'left';
	ctx.textBaseAlign = 'middle';
	ctx.fillStyle = 'rgb( 0, 0, 0 )';

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
