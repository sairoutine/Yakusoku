'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');


var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	// 弾を撃つ時間や種類のパラメータ
	this.shots = this.createShotParamByBulletDictionary(this.createShotParamSplitedByCount(this.shotParam()));
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 現在適用している move
	this.move_index = 0;
	// 現在適用している shot
	this.shot_index = 0;
};


Spell.prototype.runInSpellExecute = function() {
	this._setMoveByParam();
	this._shotByParam();
};


Spell.prototype._shotByParam = function( ) {
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
Spell.prototype._setMoveByParam = function( ) {
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
Spell.prototype.createShotParamSplitedByCount = function(shotParam) {
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
Spell.prototype.createShotParamByBulletDictionary = function(shotParam) {
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




Spell.prototype.name = function() { return "風符「蝉しぐれ」"; };
Spell.prototype.charaImage = function() { return "aya_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) {
	return 240;
};
Spell.prototype.initY = function( ) {
	return 100;
};

Spell.prototype.shotParam = function( ) {
	return [
		{ 'bullet': 0, 'type': 0, 'count': [  10,  20,  30,  40 ], 'baseCount': 600 },
		{ 'bullet': 0, 'type': 1, 'count': [ 210, 220, 230, 240 ], 'baseCount': 600 },
		{ 'bullet': 0, 'type': 0, 'count': [ 410, 420, 430, 440 ], 'baseCount': 600 },
	];
};
Spell.prototype.moveParam = function( ) {
	return [
		{ x: 140, y: 200, startCount: 100, moveCount: 100},
		{ x: 340, y: 200, startCount: 300, moveCount: 100},
		{ x: 240, y: 100, startCount: 500, moveCount: 100},
	];
};

Spell.prototype.baseCount = function( ) {
	return 600;
};
Spell.prototype.bulletDictionary = function( ) {
	var createAyaSpell4 = function( ) {
		var array = [ ] ;
		var r = 30 ;
		for( var i = 0; i < 36; i++ ) {
			var count = i * 1;
			var theta = ( ( i * 10 ) + 90 ) % 360 ;
			var v = { 'x': r * Math.cos( Util.thetaToRadian( theta ) ),
				'y': r * Math.sin( Util.thetaToRadian( theta ) ),
				'count': count,
				'vector': { 'r': 2 + ( i / 50 ), 'theta': theta }
			};
			array.push( v ) ;
		}
		return array ;
	} ;

	var BulletDictionaries = [];
	BulletDictionaries[0] = createAyaSpell4();
	return BulletDictionaries;
};

module.exports = Spell;
