'use strict';

/* 敵オブジェクト */

// デフォの敵タイプ
var DEFAULT_ENEMY_TYPE = 3 * 2;

// 基底クラス
var VectorBaseObject = require('./vector_base');
var Util = require('../util');
var Constant = require('../constant');

var Shot = require('../object/shot');

var bullet_dictionaries = require("../enemy/bullet_dictionaries");

// Nフレーム毎に敵をアニメーション
var ANIMATION_SPAN = 5;


// constructor
var Enemy = function(scene) {
	// 継承元new呼び出し
	VectorBaseObject.apply(this, arguments);

	// 敵のスプライト上の位置
	this.indexX = 0; this.indexY = 0;
};

// 基底クラスを継承
Util.inherit(Enemy, VectorBaseObject);

// 初期化
Enemy.prototype.init = function(param) {
	// 敵の初期位置
	// VectorbaseObject より先に設定しないと aim が効かない
	this.x = param.x || 0;
	this.y = param.y || 0;

	// ベクトルを設定
	VectorBaseObject.prototype.init.apply(this, [param.vector]);

	// 敵の体力
	this.vital = param.vital;

	// 撃破された時にパワーアップアイテムを生成するかどうか
	this.powerItem = param.powerItem;

	// 撃破された時にスコア獲得アイテムを生成するかどうか
	this.scoreItem = param.scoreItem;

	// 敵の撃つ弾の設定
	this.shots = param.shot;

	// どの弾を撃つ設定を適用するか
	this.shot_index = 0;

	// 敵の画像種類
	this.indexY = param.type ? param.type * 2 : DEFAULT_ENEMY_TYPE;
};

// フレーム処理
Enemy.prototype.run = function(){
	// ベクトルに従って移動
	VectorBaseObject.prototype.run.apply(this, arguments);

	// 弾を撃つ
	this.shot();

	// Nフレーム毎に敵をアニメーション
	if(this.frame_count % ANIMATION_SPAN === 0) {
		this.indexX++;
		if(this.indexX > 2) {
			this.indexX = 0;
		}
	}

};

// 敵弾を撃つ
Enemy.prototype.shot = function(){
	if(!this.shots) { return; }


	while(this.shots[this.shot_index] && this.shots[this.shot_index].count <= this.frame_count) {
		var bullet_params = bullet_dictionaries[ this.shots[this.shot_index].bullet ];

		// 敵弾生成
		for( var i = 0, len = bullet_params.length; i < len; i++) {
			var param = bullet_params[i];

			this.stage.bullet_manager.create(2, this.x, this.y, param.vector); //type_id: 2
		}

		// sound
		this.game.playSound('boss_shot_small');

		this.shot_index++;
	}
};

// 自機弾と衝突
Enemy.prototype.notifyCollision = function(obj) {
	if(!(obj instanceof Shot)) { return; }

	// 自分を消す
	this.stage.enemy_manager.remove(this.id);

	// SEの再生
	this.game.playSound('enemy_vanish');

	// スコアの加算
	this.stage.score += 100;

	// 死亡エフェクト生成
	this.stage.effect_manager.create(this.x, this.y);


	// ポイントアイテムの生成
	if(this.powerItem || this.scoreItem) {
		this.stage.item_manager.create(0, this.x, this.y); // TODO: type_id
	}
};

// 当たり判定サイズ
Enemy.prototype.collisionWidth  = function() { return 20;  };
Enemy.prototype.collisionHeight = function() { return 28; };

// スプライトの開始位置
Enemy.prototype.spriteX = function() { return this.indexX; };
Enemy.prototype.spriteY = function() { return this.indexY; };

// スプライト画像
Enemy.prototype.spriteImage = function() { return 'enemy'; };

// スプライトのサイズ
Enemy.prototype.spriteWidth  = function() { return 32; };
Enemy.prototype.spriteHeight = function() { return 32; };


module.exports = Enemy;
