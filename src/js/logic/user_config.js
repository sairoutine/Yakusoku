'use strict';
var Constant = require("../constant");

var KEY = "user_config";

var UserConfig = function(param) {
	if(!param) param = Constant.DEFAULT_KEYCONFIG;

	this.button_id_to_key_map = param;
};
UserConfig.prototype.getKeyByButtonId = function(button_id) {
	var key = this.button_id_to_key_map[button_id];
	if(!key) key = 0x00;

	return key;
};

UserConfig.prototype.save = function() {
	var ls = window.localStorage;
	return setTimeout(function(){
		ls.setItem(KEY, JSON.stringify(this.button_id_to_key_map));
	}, 0);
};
UserConfig.load = function() {
	var ls = window.localStorage;
	return new UserConfig(JSON.parse(ls.getItem(KEY)));
};



module.exports = UserConfig;
