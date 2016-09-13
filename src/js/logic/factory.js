'use strict';

var Factory = function(Class) {
	this.Class = Class;

	// 生成したオブジェクト
	this.pool = [];
};

// オブジェクトを生成
Factory.prototype.get = function() {
	var object = new this.Class();
	// 初期化
	object.init();

	return object;
};

// オブジェクトを削除
Factory.prototype.free = function(id) {

};


module.exports = Factory;
