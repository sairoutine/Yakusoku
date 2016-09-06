'use strict';

/* セリフを扱うクラス */

var Config = require("../config");



var Logic = function (script) {
	// セリフテキスト
	this.script = script;

	// どこまでセリフが進んだか
	this.progress = null;

	this.timeoutID = null;

	this.talking_chara = null;
	this.left_chara = null;
	this.left_exp = null;
	this.right_chara = null;
	this.right_exp = null;
	this.is_left  = null;
	this.is_right = null;

	// 現在表示しているメッセージ
	this.printing_lines = [];
};

Logic.prototype.init = function () {
	this.progress = -1;
	this.timeoutID = null;
	this.talking_chara = null;
	this.left_chara = null;
	this.left_exp = null;
	this.right_chara = null;
	this.right_exp = null;
	this.is_left  = null;
	this.is_right = null;

	this.printing_lines = [];

	this.next(); // start
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
		this.talking_chara = script.chara;

		if(script.pos === "left") {

			this.is_left  = true;
			this.is_right = false;
			this.left_chara = script.chara;
			this.left_exp = script.exp;
		}
		else if(script.pos === "right") {
			this.is_left  = false;
			this.is_right = true;

			this.right_chara = script.chara;
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
			if(!self.printing_lines[self.line_num]) {
				self.printing_lines[self.line_num] = "";
			}
			self.printing_lines[self.line_num] = self.printing_lines[self.line_num] + ch;
		}

		self.timeoutID = setTimeout(output, speed);
	};
	output();
};

Logic.prototype.right_image = function () {
	return(this.right_chara ? this.right_chara + "_" + this.right_exp : null);
};
Logic.prototype.left_image = function () {
	return(this.left_chara ? this.left_chara + "_" + this.left_exp : null);
};
Logic.prototype.text_name = function () {
	return(this.talking_chara ? Config.CHARA[this.talking_chara].name : "");
};

Logic.prototype.lines = function () {
	return this.printing_lines;
};

module.exports = Logic;
