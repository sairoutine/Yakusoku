'use strict';

var Factory = require("./factory");

var Manager = function(Class, stage) {
	// StageScene インスタンス
	this.stage = stage;

	// オブジェクト生成クラス
	this.factory = new Factory(Class, stage);

	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// 初期化
Manager.prototype.init = function() {
	// 画面上のオブジェクト一覧
	this.objects = {};

	// フレーム数
	this.frame_count = 0;
};

// オブジェクト生成
Manager.prototype.create = function() {
	var obj = this.factory.get.apply(this.factory, arguments);

	this.objects[obj.id] = obj;

	return obj;
};

// オブジェクト削除
Manager.prototype.remove = function(id) {
	delete this.objects[id];

	this.factory.free(id);
};

// フレーム処理
Manager.prototype.run = function(){
	this.frame_count++;

	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].run();
	}

	// 画面外に出たオブジェクトを削除
	this.removeOutOfStageObjects();
};

// 画面外に出たオブジェクトを消去する
Manager.prototype.removeOutOfStageObjects = function() {
	// オブジェクトが画面外に出たかどうか判定
	for(var id in this.objects) {
		if(this.objects[id].isOutOfStage()) {
			this.remove(id);
		}
	}
};

// 画面更新
Manager.prototype.updateDisplay = function(){
	// オブジェクト一覧
	for(var id in this.objects) {
		this.objects[id].updateDisplay();
	}

};

module.exports = Manager;
