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
