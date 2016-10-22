'use strict';

/* 自機弾オブジェクト */

// 基底クラス
var BaseObject = require('./base');
var Util = require('../util');
var Constant = require('../constant');

// 自機弾の移動速度
var SPEED = 8;

// constructor
var Shot = function(stage) {
	// 継承元new呼び出し
	BaseObject.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(Shot, BaseObject);

// 初期化
Shot.prototype.init = function(type_id, x, y) {
	BaseObject.prototype.init.apply(this, arguments);

	this.x = x;
	this.y = y;
};

// フレーム処理
Shot.prototype.run = function(){
	BaseObject.prototype.run.apply(this, arguments);

	// 弾を直進させる
	this.y -= SPEED;
};

// 衝突した時
Shot.prototype.notifyCollision = function(obj) {
	// 自分を消す
	this.stage.shot_manager.remove(this.id);
};

// 当たり判定サイズ
Shot.prototype.collisionWidth  = function() { return 15;  };
Shot.prototype.collisionHeight = function() { return 15; };

// スプライトの開始位置
Shot.prototype.spriteX = function() { return 0; };
Shot.prototype.spriteY = function() { return 2; };

// スプライト画像
Shot.prototype.spriteImage = function() { return 'shot'; };

// スプライトのサイズ
Shot.prototype.spriteWidth  = function() { return 20; };
Shot.prototype.spriteHeight = function() { return 20; };

module.exports = Shot;
