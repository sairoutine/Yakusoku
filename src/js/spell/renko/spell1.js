'use strict';

/* 自機スペルカード */

var BaseSpell = require('../stage1/base');
var Util = require('../../util');

var Spell = function(boss) {
	BaseSpell.apply(this, arguments);
};
Util.inherit(Spell, BaseSpell);

Spell.prototype.name = function() { return "蓮子スペルカード1"; };

module.exports = Spell;
