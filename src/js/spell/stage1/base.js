'use strict';

/* スペルカードの基底クラス */

var SpellBase = function(boss) {
	this.frame_count = 0;

	// Boss インスタンス
	this.boss = boss;
	// StageScene インスタンス
	this.stage = boss.stage;
	// Game インスタンス
	this.game = boss.stage.game;

};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
};

// フレーム処理
SpellBase.prototype.run = function(){
	// 経過フレーム数更新
	this.frame_count++;
};

// スペルカード名
SpellBase.prototype.name = function() {
	console.log("Spell's name method must be implemented");
};

// 撃つ
SpellBase.prototype.shot = function(x, y, r, theta, sprite_x, sprite_y) {
	this.stage.bullet_manager.create(x, y, r, theta, sprite_x, sprite_y);
};

module.exports = SpellBase;
