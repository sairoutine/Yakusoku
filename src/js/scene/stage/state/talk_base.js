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

	// TODO: DEBUG
	if(Config.DEBUG) {
		//this.serif.script = JSON.parse(document.getElementById("stage1_before").value);
	}

	this.serif = new Serif(this.serifInfo());
	this.serif.init();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);
	if(this.game.isKeyPush(Constant.BUTTON_Z)) {
		if(this.serif.is_end()) {
			this.stage.changeState(this.nextState());
		}
		else {
			// セリフを送る
			this.serif.next();
		}
	}
};

// 画面更新
State.prototype.updateDisplay = function(){
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
	ctx.textBaseAlign = 'middle';
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

// このシーンの次に遷移するシーン
State.prototype.nextState = function () {
	console.error("nextState method must be overridden");
};

module.exports = State;
