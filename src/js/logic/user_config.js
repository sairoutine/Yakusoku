'use strict';
var Constant = require("../constant");

var KEY = "user_config";

var UserConfig = function(param) {
	if(!param) param = Constant.DEFAULT_KEYCONFIG;

	this.button_id_to_key_map = param;
	console.log(this.button_id_to_key_map);

	// TODO: refactor
	this.key_to_button_id_map = {};
	for (var button_id in this.button_id_to_key_map) {
		this.key_to_button_id_map[ this.button_id_to_key_map[ button_id ] ] = button_id;
	}
};
UserConfig.prototype.getKeyByButtonId = function(button_id) {
	var key = this.button_id_to_key_map[button_id];
	if(!key) key = 0x00;

	return key;
};
UserConfig.prototype.deleteKeyByButtonId = function(button_id, key) {
	var before_key = this.button_id_to_key_map[button_id];
	var before_button_id = this.key_to_button_id_map[key];

	delete this.button_id_to_key_map[before_button_id];
	delete this.key_to_button_id_map[before_key];
};


UserConfig.prototype.setKeyByButtonId = function(button_id, key) {
	this.deleteKeyByButtonId(button_id, key);

	this.button_id_to_key_map[button_id] = key;

	this.key_to_button_id_map[key] = button_id;

	this.dump();
};

UserConfig.prototype.getButtonIdByKey = function(key) {
	return this.key_to_button_id_map[key];
};

UserConfig.prototype.save = function() {

	var self = this;
	var ls = window.localStorage;
	return setTimeout(function(){ // 非同期で保存
		ls.setItem(KEY, JSON.stringify(self.button_id_to_key_map));
	}, 0);
};
UserConfig.load = function() {
	var ls = window.localStorage;
	var param = JSON.parse(ls.getItem(KEY));

	return new UserConfig(param);
};

UserConfig.dump = function() {
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
