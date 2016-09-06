'use strict';

/* プロローグ画面 */

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Constant = require('../constant');
var Config = require('../config');

var serif = require('../serif/prologue');

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

	this.game.playBGM('prologue');
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.game.notifyPrologueDone();
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.surface.clearRect( 0, 0, this.game.width, this.game.height ) ;

	this.game.surface.save();

	var prologue_bg = this.game.getImage('prologue_bg');

	// 背景画像表示
	this.game.surface.drawImage(prologue_bg,
					0,
					0,
					prologue_bg.width,
					prologue_bg.height,
					0,
					0,
					this.game.width,
					this.game.height);
	this.game.surface.restore();

	if(this.serif.right_image()) {
		this.game.surface.save();

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_right_talking()) {
			this.game.surface.globalAlpha = 0.5;
		}
		var right_image = this.game.getImage(this.serif.right_image());

		this.game.surface.drawImage(right_image,
						Config.PROLOGUE_RIGHT_X,
						Config.PROLOGUE_RIGHT_Y,
						right_image.width * 0.25,
						right_image.height * 0.25);

		this.game.surface.restore();
	}

	if(this.serif.left_image()) {
		this.game.surface.save();

		// 喋ってない方のキャラは薄くなる
		if(!this.serif.is_left_talking()) {
			this.game.surface.globalAlpha = 0.5;
		}

		var left_image = this.game.getImage(this.serif.left_image());

		this.game.surface.drawImage(left_image,
						Config.PROLOGUE_LEFT_X,
						Config.PROLOGUE_LEFT_Y,
						left_image.width * 0.5,
						left_image.height * 0.5);

		this.game.surface.restore();
	}

	// メッセージウィンドウ表示
	this.game.surface.save();

	this.game.surface.globalAlpha = 0.5;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.fillRect(5, 345, 630, 125);

	this.game.surface.restore();

	// メッセージウィンドウ 名前欄表示
	this.game.surface.save();

	this.game.surface.globalAlpha = 0.5;
	this.game.surface.fillStyle = 'rgb( 0, 0, 0 )';
	this.game.surface.fillRect(5, 305, 100, 40);

	this.game.surface.restore();

	// テキスト表示
	this.game.surface.save();

	this.game.surface.font = "24px 'Comic Sans MS'";
	this.game.surface.textAlign = 'left';
	this.game.surface.textBaseAlign = 'middle';
	this.game.surface.fillStyle = 'rgb( 255, 255, 255 )';

	// 名前表示
	if (this.serif.text_name()) {
		this.game.surface.fillText(this.serif.text_name(), 15, 340);
	}

	// セリフ表示
	var lines = this.serif.lines();
	if (lines.length) {
		// セリフテキストの y 座標初期位置
		var y = 380;

		for(var i = 0, len = lines.length; i < len; i++) {
			this.game.surface.fillText(lines[i], 15, y); // 1行表示

			y+= 30;
		}
	}

	this.game.surface.restore();

};

module.exports = Scene;
