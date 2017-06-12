'use strict';
var Constant = require("../constant");

var KEY = "user_config";

var UserConfig = function(param) {
	if(!param) param = Constant.DEFAULT_KEYCONFIG;

	this.button_id_to_keys_map = param;
};
UserConfig.prototype.getKeysByButtonId = function(button_id) {
	var keys = this.button_id_to_keys_map[button_id];
	if(!keys) keys = [0x00];

	return keys;
};
UserConfig.prototype.setKeyByButtonId = function(button_id, key) {
	this.deleteKey(key);
	if(this.button_id_to_keys_map[button_id]) {
		this.button_id_to_keys_map[button_id].push(key);
	}
	else {
		this.button_id_to_keys_map[button_id] = [key];
	}
};

UserConfig.prototype.deleteKey = function(delete_key) {
	for (var button_id in this.button_id_to_keys_map) {
		var keys = this.button_id_to_keys_map[button_id];
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];

			if (key === delete_key) {
				keys.splice(i, 1);
			}
		}
	}
};





UserConfig.prototype.save = function() {

	var self = this;
	var ls = window.localStorage;
	return setTimeout(function(){ // 非同期で保存
		ls.setItem(KEY, JSON.stringify(self.button_id_to_keys_map));
	}, 0);
};
UserConfig.load = function() {
	var ls = window.localStorage;
	var param = JSON.parse(ls.getItem(KEY));

	return new UserConfig(param);
};

UserConfig.prototype.getKeyToButtonIdMap = function() {
	var map = {};
	for (var button_id in this.button_id_to_keys_map) {
		var keys = this.button_id_to_keys_map[button_id];
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			map[key] = button_id;
		}
	}

	return map;
};
UserConfig.prototype.dump = function() {
	var dump = {};

	for (var button_id in this.button_id_to_keys_map) {
		var keys = this.button_id_to_keys_map[ button_id ];
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			if(!dump[button_id]) dump[button_id] = [];
			switch(key) {
				case Constant.BUTTON_LEFT:
					dump[button_id].push("LEFT");
					break;
				case Constant.BUTTON_UP:
					dump[button_id].push("UP");
					break;
				case Constant.BUTTON_RIGHT:
					dump[button_id].push("RIGHT");
					break;
				case Constant.BUTTON_DOWN:
					dump[button_id].push("DOWN");
					break;
				case Constant.BUTTON_Z:
					dump[button_id].push("Z");
					break;
				case Constant.BUTTON_X:
					dump[button_id].push("X");
					break;
				case Constant.BUTTON_SHIFT:
					dump[button_id].push("SHIFT");
					break;
				case Constant.BUTTON_SPACE:
					dump[button_id].push("SPACE");
					break;
				default:
					dump[button_id].push("UNKNOWN");
			}
		}
	}
	console.log(dump);
};


module.exports = UserConfig;
