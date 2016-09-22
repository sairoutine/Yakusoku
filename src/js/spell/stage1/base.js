'use strict';

/* スペルカードの基底クラス */
var Config = require("../../config");
var Constant = require("../../constant");

var SpellBase = function(boss) {
	this.frame_count = 0;
	this.spellstart_count = 0; // スペルカード発動経過時間

	// Boss インスタンス
	this.boss = boss;
	// StageScene インスタンス
	this.stage = boss.stage;
	// Game インスタンス
	this.game = boss.stage.game;

	this.state = null;
};

// 初期化
SpellBase.prototype.init = function() {
	// 経過フレーム数初期化
	this.frame_count = 0;
	this.spellstart_count = 0;

	this.rate_x = 1.0;
	this.rate_y = 1.0;



	this.state = Constant.SPELLCARD_START_STATE;

	// スペルカード発動音
	this.game.playSound("spellcard");
};

// スペルカード発動中
SpellBase.prototype.isSpellExecute = function(){
	return this.state === Constant.SPELLCARD_EXEC_STATE ? true : false;
};
// スペルカード開始中
SpellBase.prototype.isSpellStarting = function(){
	return this.state === Constant.SPELLCARD_START_STATE ? true : false;
};



// フレーム処理
SpellBase.prototype.run = function(){
	// 経過フレーム数更新
	if(this.state === Constant.SPELLCARD_START_STATE){
		this.spellstart_count++;
	}
	else {
		this.frame_count++;
	}
};

// 描画
SpellBase.prototype.updateDisplay = function(){
	var ctx = this.game.surface;
	ctx.save();
	var image = this.game.getImage("aya_normal");

	// 左から右へカットイン移動
	var x = this.spellstart_count * 50;

	var max_x = 730;
	// サイドバーの後ろまで移動しない
	if(x > max_x) {
		x = max_x;
	}


	var wait = 20;
	if(this.spellstart_count - wait > max_x/20 && this.rate_y > 0) {
		this.rate_x += 0.2;
		this.rate_y -= 0.2;
	}

	if(this.rate_y <= 0) {
		this.state = Constant.SPELLCARD_EXEC_STATE;
	}

	x -= image.width*Config.CHARA_SIZE_RATIO;


	if(this.rate_y > 0) {
		// オブジェクトの位置を指定
		ctx.translate(x, 232);

		ctx.globalAlpha = 0.7;
		ctx.drawImage(image,
						0,
						0,
						image.width,image.height,
						-(image.width * Config.CHARA_SIZE_RATIO * this.rate_x)/2,
						-(image.width * Config.CHARA_SIZE_RATIO * this.rate_y)/2,
						image.width * Config.CHARA_SIZE_RATIO * this.rate_x,
						image.height * Config.CHARA_SIZE_RATIO * this.rate_y
					 );
	}
	ctx.restore();



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
