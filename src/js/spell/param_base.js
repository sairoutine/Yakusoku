'use strict';

/* パラメータ指定で作るスペルカード基底クラス */
var BaseSpell = require('./base');
var Util = require('../util');

var BaseParamSpell = function(boss) {
	BaseSpell.apply(this, arguments);

	// 弾を撃つ時間や種類のパラメータ
	this.shots = this._createShotParamByBulletDictionary(this._createShotParamSplitedByCount(this.shotParam()));
};
Util.inherit(BaseParamSpell, BaseSpell);

// 初期化
BaseParamSpell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 現在適用している move
	this.move_index = 0;
	// 現在適用している shot
	this.shot_index = 0;
};

// スペルカード実行中に実行される処理
BaseParamSpell.prototype.runInSpellExecute = function() {
	// move
	this._setMoveByParam();
	// shot
	this._shotByParam();
};

// shot
BaseParamSpell.prototype._shotByParam = function( ) {
	while(this.shots[this.shot_index]) {
		var shot = this.shots[this.shot_index];
		var count = this.frameCountStartedBySpellExec();

		// baseCount 経過でループする
		if(this.baseCount()){
			count = count % this.baseCount();
		}

		// 今撃つ弾でなければ撃たない
		if(shot.count !== count) break;

		// shot
		this.stage.bullet_manager.create(shot.type, this.boss.x + shot.x, this.boss.y + shot.y, shot.vector); //type_id:
		this.game.playSound('boss_shot_small');

		this.shot_index++;
	}

	// 設定されている弾を撃ちきったら最初に戻る
	if(this.shot_index >= this.shots.length) {
		this.shot_index = 0;
	}
};

// パラメータから移動を設定
BaseParamSpell.prototype._setMoveByParam = function( ) {
	var count = this.frameCountStartedBySpellExec();

	var move_param = this.moveParam();

	while(move_param[this.move_index]) {
		var move = move_param[ this.move_index ];

		// baseCount 経過でループする
		if(this.baseCount()) {
			count = count % this.baseCount();
		}

		if(count !== move.startCount) break;

		// move
		this.boss.setMoveTo(move.x, move.y, move.moveCount);

		this.move_index++;

	}

	if(this.move_index >= move_param.length) {
		this.move_index = 0;
	}
};

// shotParam のcount 配列をスカラーに分解する
BaseParamSpell.prototype._createShotParamSplitedByCount = function(shotParam) {
	var newShotParam = [];
	for( var i = 0, len=shotParam.length; i < len; i++ ) {
		var param = shotParam[i];
		if(param.count instanceof Array) {
			for( var j = 0, c_len=param.count.length; j < c_len; j++ ) {
				newShotParam.push({
					bullet:    param.bullet,
					type:      param.type,
					count:     param.count[j],
				});
			}
		}
		else {
			newShotParam.push(param);
		}
	}
	// count 昇順にソート
	newShotParam.sort(function(a, b) {
		return a.count - b.count;
	});

	return newShotParam;
};

// shotParam と bullet_dictionaries からプログラムが扱いやすい弾幕パターンを生成
BaseParamSpell.prototype._createShotParamByBulletDictionary = function(shotParam) {
	var newShotParam = [];

	var bullet_dictionaries = this.bulletDictionary();

	for (var i = 0, len=shotParam.length; i < len; i++) {
		var param = shotParam[i];
		var bullet = bullet_dictionaries[param.bullet];

		for (var j = 0, b_len=bullet.length; j < b_len; j++) {
			var bullet_param = bullet[j];
			newShotParam.push({
				x:         bullet_param.x,
				y:         bullet_param.y,
				vector:    bullet_param.vector,
				type:      param.type,
				count:     param.count + bullet_param.count,
			});
		}
	}

	// count 昇順にソート
	newShotParam.sort(function(a, b) {
		return a.count - b.count;
	});

	return newShotParam;
};

// shot param
BaseParamSpell.prototype.shotParam = function() {
	console.error("Spell's shotParam method must be implemented");
};
// move param
BaseParamSpell.prototype.moveParam = function( ) {
	console.error("Spell's moveParam method must be implemented");
};
// baseCount 毎に動きや弾を撃つフレーム数が初期化される
BaseParamSpell.prototype.baseCount = function( ) {
	console.error("Spell's baseCount method must be implemented");
};
// 弾幕パターン
BaseParamSpell.prototype.bulletDictionary = function( ) {
	console.error("Spell's bulletDictionary method must be implemented");
};

module.exports = BaseParamSpell;
