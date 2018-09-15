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
