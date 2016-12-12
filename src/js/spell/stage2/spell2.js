'use strict';

/* スペルカード */
var BaseSpell = require('../base');
var Util = require('../../util');
var Constant = require('../../constant');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);

};
Util.inherit(Spell, BaseSpell);

// 初期化
Spell.prototype.init = function() {
	BaseSpell.prototype.init.apply(this, arguments);
};

Spell.prototype.runInSpellExecute = function() {
	var count = this.frameCountStartedBySpellExec();

	var x = 240;
	var y = 100;

	if(count % 75 === 0) {
		this.shotCommonSense(count*2 % this.stage.width, -100);
	}
};

Spell.prototype.shotCommonSense = function(x, y) {
	var vec = {r: 4, theta: 90, ra: 0.1};
	var i;
	var mayuge_x = 44;
	for (i = 0; i < 5; i++) {
		// 左眉毛
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - mayuge_x - 16 * i, y + 16 * (4-i), vec);

		// 右眉毛
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + mayuge_x + 16 * i, y + 16 * (4-i), vec);
	}

	var eye_x = 76;
	var eye_y = 120;
	// 目
	this.shot(Constant.BULLET_BIG_LIMEGREEN, x - eye_x, y + eye_y, vec); // type_id: 1
	this.shot(Constant.BULLET_BIG_LIMEGREEN, x + eye_x, y + eye_y, vec); // type_id: 1

	var hoho_y = 180;
	var hoho_x = 116;

	for (i = 0; i < 4; i++) {
		// 右ほほ
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + hoho_x + (3-i)*8, y + hoho_y - 8 * (i%2 ? 0 : 1), vec);
		// 左ほほ
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - hoho_x - (3-i)*8, y + hoho_y - 8 * (i%2 ? 1 : 0), vec);
	}

	var mouse_y = 190;
	var offset = 12;

	// 口(斜め線)
	for (i = 0; i< 4; i++) {
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x - offset/2 - offset*i, y + mouse_y+offset*(4-i), vec);
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x + offset/2 + offset*i, y + mouse_y+offset*(4-i), vec);
	}

	// 口(上の線
	var offset2 = 16;
	this.shot(Constant.BULLET_BALL_LIMEGREEN, x, y + mouse_y, vec);
	for (i = 0; i< 3; i++) {
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x-(16*(i+1)), y + mouse_y, vec);
		this.shot(Constant.BULLET_BALL_LIMEGREEN, x+(16*(i+1)), y + mouse_y, vec);
	}
};

Spell.prototype.name = function() { return "風符「天狗風」"; };
Spell.prototype.charaImage = function() { return "merry_normal"; };

// 初期 x, y 座標
Spell.prototype.initX = function( ) { return 240; };
Spell.prototype.initY = function( ) { return 100; };

module.exports = Spell;
