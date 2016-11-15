'use strict';

/* ステージ1画面 */

// 基底クラス
var BaseStage = require('./base');

var Util = require('../../util');
var Config = require('../../config');
var Constant = require('../../constant');

// ステージの状態
var WayState = require('./state/way');
var TalkState = require('./state/talk');
var BossState = require('./state/boss');
var ResultState = require('./state/result');
var GameoverState = require('./state/result');

// セリフ
var stage1_serif_before = require('../../serif/stage1/before');
var stage1_serif_after = require('../../serif/stage1/after');

// 敵の出現情報
var stage1_appear = require('../../enemy/stage1');

// 道中の終了
var WAY_END = 3500;


var SceneStage = function(game) {
	BaseStage.apply(this, arguments);
};

// 基底クラスを継承
Util.inherit(SceneStage, BaseStage);

// ステージの状態一覧を作成
SceneStage.prototype.createStateInstances = function() {
	this.states = [];
	this.states[ Constant.WAY_STATE ]      = new WayState(this, stage1_appear, WAY_END);
	this.states[ Constant.TALK1_STATE ]    = new TalkState(this, stage1_serif_before, Constant.BOSS_STATE);
	this.states[ Constant.BOSS_STATE ]     = new BossState(this, 'stage1');
	this.states[ Constant.TALK2_STATE ]    = new TalkState(this, stage1_serif_after, Constant.RESULT_STATE);
	this.states[ Constant.RESULT_STATE ]   = new ResultState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);
};

module.exports = SceneStage;
