'use strict';

/* ステージ画面 */

// サイドバーの横の長さ
var SIDE_WIDTH = 160;
// 背景画像のスクロールスピード
var BACKGROUND_SCROLL_SPEED = 3;

// 体験版終了のステージ
var LAST_TRIAL_STAGE = 1;

// 基底クラス
var BaseScene = require('./base');

var Util = require('../util');
var Config = require('../config');
var Constant = require('../constant');

var Manager = require('../logic/manager');

// オブジェクト
var Character = require('../object/character');
var Shot = require('../object/shot');
var Enemy = require('../object/enemy');
var Bullet = require('../object/bullet');
var Effect = require('../object/effect');
var Item = require('../object/item');

// ステージの状態
var StartState = require('./stage/state/start');
var WayState = require('./stage/state/way');
var TalkStateBefore = require('./stage/state/talk_before');
var TalkStateAfter = require('./stage/state/talk_after');
var BossState = require('./stage/state/boss');
var ClearState = require('./stage/state/result_clear');
var GameoverState = require('./stage/state/result_gameover');
var PauseState = require('./stage/state/pause');

// ボス
var Stage1Boss = require('../object/boss/aya');
var Stage2Boss = require('../object/boss/sanae');
var Stage3Boss = require('../object/boss/yuuka');
var Stage4Boss = require('../object/boss/yukari');
var Stage5Boss = require('../object/boss/merry');

// セリフ
var stage1_serif_before = require('../serif/stage1/before');
var stage1_serif_after  = require('../serif/stage1/after');
var stage2_serif_before = require('../serif/stage2/before');
var stage2_serif_after  = require('../serif/stage2/after');
var stage3_serif_before = require('../serif/stage3/before');
var stage3_serif_after  = require('../serif/stage3/after');
var stage4_serif_before = require('../serif/stage4/before');
var stage4_serif_after  = require('../serif/stage4/after');
var stage5_serif_before = require('../serif/stage5/before');
var stage5_serif_after  = require('../serif/stage5/after');

// 敵の出現情報
var stage1_enemy_info = require('../enemy/stage1');
var stage2_enemy_info = require('../enemy/stage2');
var stage3_enemy_info = require('../enemy/stage3');
var stage4_enemy_info = require('../enemy/stage4');
var stage5_enemy_info = require('../enemy/stage5');

var Scene = function(game) {
	BaseScene.apply(this, arguments);

	// サイドバーを除いたステージの大きさ
	this.width = this.game.width - SIDE_WIDTH;
	this.height= this.game.height;

	this.bullet_manager = new Manager(Bullet, this);
	this.item_manager   = new Manager(Item, this);
	this.shot_manager   = new Manager(Shot, this);
	this.character      = new Character(this);
	this.enemy_manager  = new Manager(Enemy, this);
	this.effect_manager = new Manager(Effect, this);

	// シーンが管理するオブジェクト一覧
	this.objects = [
		this.item_manager,
		this.shot_manager,
		this.character,
		this.bullet_manager,
		this.enemy_manager,
		this.effect_manager,
	];

	// ステージの状態一覧
	this.states = [];
	this.states[ Constant.START_STATE ]      = new StartState(this);
	this.states[ Constant.WAY_STATE ]      = new WayState(this);
	this.states[ Constant.TALK1_STATE ]    = new TalkStateBefore(this);
	this.states[ Constant.BOSS_STATE ]     = new BossState(this);
	this.states[ Constant.TALK2_STATE ]    = new TalkStateAfter(this);
	this.states[ Constant.CLEAR_STATE ]   = new ClearState(this);
	this.states[ Constant.GAMEOVER_STATE ] = new GameoverState(this);
	this.states[ Constant.PAUSE_STATE ]   = new PauseState(this);

	// ボス一覧
	this.bosses = [
		new Stage1Boss(this),
		new Stage2Boss(this),
		new Stage3Boss(this),
		new Stage4Boss(this),
		new Stage5Boss(this),
	];

	// 敵の出現情報
	this.enemy_info_list = [
		stage1_enemy_info,
		stage2_enemy_info,
		stage3_enemy_info,
		stage4_enemy_info,
		stage5_enemy_info,
	];

	// ボス前のセリフ情報
	this.serif_before_list = [
		stage1_serif_before,
		stage2_serif_before,
		stage3_serif_before,
		stage4_serif_before,
		stage5_serif_before,
	];

	// ボス後のセリフ情報
	this.serif_after_list = [
		stage1_serif_after,
		stage2_serif_after,
		stage3_serif_after,
		stage4_serif_after,
		stage5_serif_after,
	];

	// ステージ背景
	this.bg_images = [
		'stage1_bg',
		'stage2_bg',
		'stage3_bg',
		'stage4_bg',
		'stage5_bg',
	];

	// ステージ説明書き
	this.descriptions = [
		'幻想の地の名も無き道',
		'寄る辺無き巫女',
		'無限で夢幻の花の国',
		'虚無と実存の境界',
		'?????????',
	];


	this.score = 0; // スコア
	this.state = null; // ステージの現在の状態
	this.stage = 0; // 現在のステージ
	this.state_before_pause = this.state; // ポーズ前のstateが何だったか
};

// 基底クラスを継承
Util.inherit(Scene, BaseScene);

// 初期化
Scene.prototype.init = function() {
	BaseScene.prototype.init.apply(this, arguments);

	this.score = 0; // スコア
	this.state = null; // ステージの現在の状態
	this.stage = Config.DEBUG && Config.DEBUG_STAGE ? Config.DEBUG_STAGE : 0; // 現在のステージ
	this.state_before_pause = this.state; // ポーズ前のstateが何だったか

	this.initObjects();

	// TODO: DEBUG
	// 道中開始
	this.changeState(Config.DEBUG && Config.DEBUG_STATE ? Config.DEBUG_STATE : Constant.START_STATE);
};

// 現在のシーン
Scene.prototype.currentState = function(){
	return this.states[this.state];
};

// シーンを切り替え
Scene.prototype.changeState = function(state){
	// 切り替え
	this.state = state;
	// 切り替え後の状態を初期化
	this.currentState().init();
};

// 現在のステージの敵の出現情報
Scene.prototype.currentStageEnemyInfo = function() {
	return this.enemy_info_list[this.stage];
};

// 現在のステージのボス前のセリフ
Scene.prototype.currentStageSerifBefore = function() {
	return this.serif_before_list[this.stage];
};

// 現在のステージのボス後のセリフ
Scene.prototype.currentStageSerifAfter = function() {
	return this.serif_after_list[this.stage];
};

// 現在のボス インスタンス
Scene.prototype.currentStageBoss = function() {
	return this.bosses[this.stage];
};

// 現在のステージ背景画像
Scene.prototype.currentStageBackGround = function() {
	return this.bg_images[this.stage];
};

// 現在のステージ背景画像
Scene.prototype.currentStageDescription = function() {
	return this.descriptions[this.stage];
};

// 次のステージへ
Scene.prototype.goNextStage = function(){
	// ステージ切り替え
	this.stage++;

	// 次のステージの道中開始
	this.changeState(Constant.START_STATE);

	// 自機を初期位置に
	this.character.setInitPosition();
};

// 次のステージがあるかどうか
Scene.prototype.hasNextStage = function(){
	return this.enemy_info_list[this.stage + 1] ? true : false;
};

// 体験版の最後のステージか
Scene.prototype.isLastTrialStage = function(){
	return this.stage + 1 >= LAST_TRIAL_STAGE ? true : false;
};

// 現在のステージ番号
Scene.prototype.currentStageNo = function(){
	return this.stage + 1;
};

Scene.prototype.initObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].init();
	}
};

Scene.prototype.initObjectsWithoutCharacter = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		if (this.objects[i] instanceof Character) continue;
		this.objects[i].init();
	}
};

Scene.prototype.runObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].run();
	}
};

Scene.prototype.updateDisplayObjects = function(){
	for(var i = 0, len = this.objects.length; i < len; i++) {
		this.objects[i].updateDisplay();
	}
};

// フレーム処理
Scene.prototype.run = function(){
	BaseScene.prototype.run.apply(this, arguments);

	this.currentState().run();
};

// 画面更新
Scene.prototype.updateDisplay = function(){
	this.game.clearCanvas();

	// 背景画像表示
	this._showBG();

	this.currentState().updateDisplay();

	// サイドバー表示
	this._showSidebar();
};

// サイドバー表示
Scene.prototype._showSidebar = function(){
	var ctx = this.game.surface;
	var x = this.game.width - SIDE_WIDTH;
	var y = 0;

	ctx.save();
	var side_bar = this.game.getImage('side_bar');
	this.game.surface.drawImage(side_bar,
		0,
		0,
		side_bar.width,
		side_bar.height,
		x,
		y,
		SIDE_WIDTH,
		this.game.height
	);
	ctx.restore();
	this._showText();
};

Scene.prototype._showText = function(){
	var star = this.game.getImage('star');
	var star_width = star.width * Config.CHARA_SIZE_RATIO;
	var star_height = star.height * Config.CHARA_SIZE_RATIO;

	var player_string = this.game.getImage('player');
	var power_string = this.game.getImage('power');
	var score_string = this.game.getImage('score');
	var spell_string = this.game.getImage('spell');

	var x1 = this.game.width - SIDE_WIDTH + 10;
	var x2 = this.game.width - SIDE_WIDTH + 35;


	var i;

	var ctx = this.game.surface;
	ctx.save();

	// Score String
	ctx.drawImage(score_string,
		x1,
		50,
		score_string.width * Config.CHARA_SIZE_RATIO,
		score_string.height * Config.CHARA_SIZE_RATIO
	);

	this._showNumString(this.score, x2, 75);

	// Player String
	ctx.drawImage(player_string,
		x1,
		100,
		player_string.width * Config.CHARA_SIZE_RATIO,
		player_string.height * Config.CHARA_SIZE_RATIO
	);

	// Player Life
	for (i = 0; i < this.character.life; i++) {
		ctx.drawImage(star,
			x2 + i * star_width,
			125,
			star_width,
			star_height
		);
	}

	// Spell String
	ctx.drawImage(spell_string,
		x1,
		150,
		spell_string.width * Config.CHARA_SIZE_RATIO,
		spell_string.height * Config.CHARA_SIZE_RATIO
	);


	// Player Bombs
	for (i = 0; i < this.character.bombs; i++) {
		ctx.drawImage(star,
			x2 + i * star_width,
			175,
			star_width,
			star_height
		);
	}

	// Player Power
	ctx.drawImage(power_string,
		x1,
		200,
		score_string.width * Config.CHARA_SIZE_RATIO,
		score_string.height * Config.CHARA_SIZE_RATIO
	);

	/* text
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("Power", x1, 200 + 16);
	*/

	this._showNumString(this.character.power, x2, 225);




	/*
	if(Config.DEBUG) {
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("Frame: " + this.frame_count, x1, this.game.height - 30);
	}
	*/
	ctx.restore();
};

// 背景画像表示
Scene.prototype._showBG = function() {
	var ctx = this.game.surface;

	var stage_bg = this.game.getImage(this.currentStageBackGround());

	var height = stage_bg.height * Config.CHARA_SIZE_RATIO;
	var width  = stage_bg.width  * Config.CHARA_SIZE_RATIO;

	var x = 0;
	var y = (this.frame_count * BACKGROUND_SCROLL_SPEED) % height; // 背景画像をスクロールさせる

	ctx.save();

	// 2枚つなげてスクロールさせる
	this.game.surface.drawImage(stage_bg,
		0,
		0,
		stage_bg.width,
		stage_bg.height,
		x,
		y,
		width,
		height
	);

	this.game.surface.drawImage(stage_bg,
		0,
		0,
		stage_bg.width,
		stage_bg.height,
		x,
		y - height,
		width,
		height
	);
	this.game.surface.restore();

	// ボスの際は背景を暗くする
	if(this.state === Constant.BOSS_STATE) {
		ctx.save();
		var shadow = this.game.getImage('shadow');
		//this.game.surface.globalAlpha = 1.0;
		this.game.surface.drawImage(shadow,
			0,
			0,
			shadow.width,
			shadow.height
		);

		this.game.surface.restore();
	}

};

Scene.prototype._showNumString = function(num, x, y){
	var ctx = this.game.surface;
	var num_string = this.game.getImage('num');
	var score_string_list = num.toString().split("");

	var num_width = 30; // 数字の横サイズ

	for (var i = 0; i < score_string_list.length; i++) {
		// 0 だけ一番最後にある
		var pos = score_string_list[i] === "0" ? 9 : score_string_list[i] - 1;

		ctx.drawImage(num_string,
			// スプライトの取得位置
			num_width * pos, 0,
			// スプライトのサイズ
			num_width, num_string.height,
			// 位置
			x + i * num_width * Config.CHARA_SIZE_RATIO, y,
			// オブジェクトのゲーム上のサイズ
			num_width * Config.CHARA_SIZE_RATIO, num_string.height * Config.CHARA_SIZE_RATIO
		);
	}
};





// 自機が死亡
Scene.prototype.notifyCharacterDead = function() {
	this.changeState(Constant.GAMEOVER_STATE);
};

// ゲームオーバーのリザルト終了後
Scene.prototype.notifyRetry = function() {
	// コンティニューしたらスコアを半分にする
	this.score = Math.floor(this.score / 2);

	// キャラを初期化
	this.character.init();

	this.changeState(Constant.START_STATE);
};

// ポーズ開始
Scene.prototype.notifyPauseStart = function() {
	// ポーズ前のstateが何だったかを保存
	this.state_before_pause = this.state;

	this.changeState(Constant.PAUSE_STATE);
};
// ポーズ終了
Scene.prototype.notifyPauseEnd = function() {
	// ポーズ前のstateに戻る
	this.state = this.state_before_pause;

	this.state_before_pause = null; // 前のstate情報をクリア
};
// ゲーム終了
Scene.prototype.notifyStageQuit = function() {
	this.game.notifyStageQuit();
};

// スタート時のタイトル表示の終了
Scene.prototype.notifyStartEnd = function() {
	// 道中シーンへ
	this.changeState(Constant.WAY_STATE);
};
// 道中の終了
Scene.prototype.notifyWayEnd = function() {
	// ボスとの会話シーンへ
	this.changeState(Constant.TALK1_STATE);
};
// ボス前セリフが終了した
Scene.prototype.notifyBeforeTalkEnd = function () {
	this.changeState(Constant.BOSS_STATE);
};

// ボス戦の終了
Scene.prototype.notifyBossEnd = function() {
	// ボスとの会話シーンへ
	this.changeState(Constant.TALK2_STATE);
};
// ボス後セリフが終了した
Scene.prototype.notifyAfterTalkEnd = function () {
	this.changeState(Constant.CLEAR_STATE);
};
// リザルト画面の終了
Scene.prototype.notifyClearEnd = function() {
	if(Config.TRIAL && this.isLastTrialStage()) {
		// 体験版終了
		this.game.notifyTrialDone();
	}
	else if(this.hasNextStage()) {
		// 次のステージへ
		this.goNextStage();
	}
	else {
		// ステージ全クリアした
		this.game.notifyStageDone();
	}
};





module.exports = Scene;
