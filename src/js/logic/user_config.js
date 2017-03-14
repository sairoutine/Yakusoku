'use strict';
var Constant = require("../constant");

var KEY = "user_config";

var UserConfig = function(param) {
	if(!param) param = Constant.DEFAULT_KEYCONFIG;

	this.button_id_to_key_map = param;

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
UserConfig.prototype.setKeyByButtonId = function(button_id, key) {
	this.button_id_to_key_map[button_id] = key;

	this.key_to_button_id_map[key] = button_id;
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



module.exports = UserConfig;
