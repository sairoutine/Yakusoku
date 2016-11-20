'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

	this.param = this._makeBossParam();

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);

	// move 設定
	this.moves = this.param.move;

	// shot 設定
	var shots = this.param.shot;

	this.shots = shots;

	this.shotIndices = [];

	for( var i = 0; i < this.shots.length; i++ ) {
		this.shotIndices.push( 0 );
	}

	this.reserved = [];
};


Spell.prototype.runInSpellExecute = function() {
	this._move();
	this._shot();

	this._shotReserved();


	// reserved shot の各 count 追加
	for(var i = 0; i < this.reserved.length; i++) {
		this.reserved[ i ].count++;
	}
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




Spell.prototype._shot = function( ) {
	var count = this.frameCountStartedBySpellExec();

	for( var i = 0, len=this.shots.length; i < len; i++ ) {

		// baseCount 経過でループする
		if(this.shots[ i ].baseCount) {
			count = count % this.shots[ i ].baseCount;
		}

		// shotIndex 初期化
		if( count === 0 ) {
			this.shotIndices[ i ] = 0 ;
		}

		// TODO: ?
		if( this.shotIndices[ i ] >= this.shots[ i ].count.length ) {
			continue ;
		}

		if( count >= this.shots[ i ].count[ this.shotIndices[ i ] ] ) {
			this.__shot(this.shots[i].type);
			this.shotIndices[ i ]++ ;
		}
	}
};


Spell.prototype.__shot = function(type) {
	//var bullet_params = bullet_dictionaries[ this.shots[this.shot_index].bullet ];
	var bullet_params = this._makeBulletsParam();


	if(bullet_params[0].count !== void 0) {
		var r = {};
		//r.enemy = enemy ;
		r.index = 0 ;
		r.count = 0 ;
		r.type  = type;
		r.array = bullet_params;
		this.reserved.push(r);
	}
	else {
		// 敵弾生成
		for( var i = 0, len = bullet_params.length; i < len; i++) {
			var param = bullet_params[i];

			this.stage.bullet_manager.create(param.type, this.boss.x + param.x, this.boss.y + param.y, param.vector); //type_id: 2
		}

		// sound
		this.game.playSound('boss_shot_small');
	}
};

Spell.prototype._shotReserved = function( ) {
	for( var i = 0; i < this.reserved.length; i++ ) {
		while( this.reserved[ i ].index < this.reserved[ i ].array.length &&
			this.reserved[ i ].count >= this.reserved[ i ].array[ this.reserved[ i ].index ].count ) {

			var param = this.reserved[ i ].array[ this.reserved[ i ].index ];
			this.stage.bullet_manager.create(this.reserved[i].type, this.boss.x + param.x, this.boss.y + param.y, param.vector); //type_id: 2
			this.reserved[ i ].index++ ;
		}
	}
} ;

Spell.prototype._move = function( ) {
	var count = this.frameCountStartedBySpellExec();

	for( var i = 0, len=this.moves.length; i < len; i++ ) {

		// baseCount 経過でループする
		if(this.moves[ i ].baseCount) {
			count = count % this.moves[ i ].baseCount;
		}

		if( count === this.moves[ i ].startCount) {
			this.boss.setMoveTo(this.moves[ i ].x, this.moves[ i ].y, this.moves[ i ].moveCount);
		}
	}
};






Spell.prototype._makeBulletsParam = function( ) {
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


Spell.prototype._makeBossParam = function( ) {
	return {
		'shot': [
			{ 'bullet': 14, 'type': 0, 'count': [  10,  20,  30,  40 ], 'baseCount': 600 },
			{ 'bullet': 14, 'type': 1, 'count': [ 210, 220, 230, 240 ], 'baseCount': 600 },
			{ 'bullet': 14, 'type': 0, 'count': [ 410, 420, 430, 440 ], 'baseCount': 600 },
		],
		'move': [
			{ x: 140, y: 200, startCount: 100, moveCount: 100,  baseCount: 600 },
			{ x: 340, y: 200, startCount: 300, moveCount: 100, baseCount: 600 },
			{ x: 240, y: 100, startCount: 500, moveCount: 100, baseCount: 600 },
		]
	};
};

module.exports = Spell;
