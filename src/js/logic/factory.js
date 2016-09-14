'use strict';

var Factory = function(Class, stage) {
	this.Class = Class;
	this.stage = stage;

	// 生成したオブジェクト
	this.pool = [];
};

// オブジェクトを生成
Factory.prototype.get = function() {
	var object = new this.Class(this.stage);
	// 初期化
	object.init.apply(object, arguments);

	return object;
};

// オブジェクトを削除
Factory.prototype.free = function(id) {

};


module.exports = Factory;
