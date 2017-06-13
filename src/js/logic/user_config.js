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
