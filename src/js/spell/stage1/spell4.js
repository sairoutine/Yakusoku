'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var bullet_dictionaries = require('../bullet_dictionaries');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// 現在適用している move
	this.move_index = 0;

	this.shots = this.createShotParamSplitedByCount(this.shotParam());

	this.reserved = [];
};


Spell.prototype.runInSpellExecute = function() {
	// パラメータから移動を設定
	this._setMoveByParam();


	this._shot();

	this._shotReserved();


	// reserved shot の各 count 追加
	for(var i = 0; i < this.reserved.length; i++) {
		this.reserved[ i ].count++;
	}
};

// パラメータから移動を設定
Spell.prototype._setMoveByParam = function( ) {
	var count = this.frameCountStartedBySpellExec();

	var move_param = this.moveParam();

	var move = move_param[ this.move_index ];

	// baseCount 経過でループする
	if(move.baseCount) {
		count = count % move.baseCount;
	}

	if(count === move.startCount) {
		this.boss.setMoveTo(move.x, move.y, move.moveCount);

		this.move_index++;

		if(this.move_index >= move_param.length) {
			this.move_index = 0;
		}
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
					baseCount: param.baseCount,
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
		{ x: 140, y: 200, startCount: 100, moveCount: 100, baseCount: 600 },
		{ x: 340, y: 200, startCount: 300, moveCount: 100, baseCount: 600 },
		{ x: 240, y: 100, startCount: 500, moveCount: 100, baseCount: 600 },
	];
};

Spell.prototype._shot = function( ) {
	var count = this.frameCountStartedBySpellExec();

	for( var i = 0, len=this.shots.length; i < len; i++ ) {

		// baseCount 経過でループする
		if(this.shots[ i ].baseCount) {
			count = count % this.shots[ i ].baseCount;
		}

		if( count === this.shots[ i ].count) {
			this.__shot(this.shots[i].bullet, this.shots[i].type);
		}
	}
};


Spell.prototype.__shot = function(bullet, type) {
	var bullet_params = bullet_dictionaries[bullet];

	var r = {};
	//r.enemy = enemy ;
	r.index = 0 ;
	r.count = 0 ;
	r.type  = type;
	r.array = bullet_params;
	this.reserved.push(r);
};

Spell.prototype._shotReserved = function( ) {
	for( var i = 0; i < this.reserved.length; i++ ) {
		while( this.reserved[ i ].index < this.reserved[ i ].array.length &&
			this.reserved[ i ].count >= this.reserved[ i ].array[ this.reserved[ i ].index ].count ) {

			var param = this.reserved[ i ].array[ this.reserved[ i ].index ];
			this.stage.bullet_manager.create(this.reserved[i].type, this.boss.x + param.x, this.boss.y + param.y, param.vector); //type_id: 2
			this.game.playSound('boss_shot_small');
			this.reserved[ i ].index++ ;
		}
	}
} ;

module.exports = Spell;
