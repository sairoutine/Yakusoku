'use strict';

var BaseState = require('./base');
var Util = require('../../../util');
var Config = require('../../../config');
var Constant = require('../../../constant');

// スペルカード残り時間のスペース
var VITAL_OUTLINE_MARGIN = 5;

var State = function(stage) {
	BaseState.apply(this, arguments);
};
Util.inherit(State, BaseState);

// 初期化
State.prototype.init = function(){
	BaseState.prototype.init.apply(this, arguments);

	this.stage.currentStageBoss().init();
	this.stage.bullet_manager.init();

	// 道中曲を止める
	this.game.stopBGM();
};

// フレーム処理
State.prototype.run = function(){
	BaseState.prototype.run.apply(this, arguments);

	// BGM start
	if (this.frame_count === 60) {
		this.game.playBGM(this.stage.currentStageBoss().bgm());
	}

	// ボス戦の終了
	if(this.stage.currentStageBoss().isDead() && !this.stage.currentStageBoss().hasNextSpell()) {
		//ボスのスペルカードが全て無くなった
		this.stage.notifyBossEnd();
	}

	var character = this.stage.character;

	// Zが押下されていればショット生成
	if(this.game.isKeyDown(Constant.BUTTON_Z)) {
		character.shot();
	}

	// Xが押下されていればボム生成
	if(this.game.isKeyPush(Constant.BUTTON_X)) {
		character.useBomb();
	}

	// Z押しっぱで低速移動
	var is_slow = this.game.isKeyDown(Constant.BUTTON_SHIFT);

	// 自機移動
	if(this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		character.moveLeft(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		character.moveRight(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_DOWN)) {
		character.moveDown(is_slow);
	}
	if(this.game.isKeyDown(Constant.BUTTON_UP)) {
		character.moveUp(is_slow);
	}

	// 画面外に出させない
	character.forbidOutOfStage();

	// 左右の移動に合わせて自機のアニメーションを変更
	if(this.game.isKeyDown(Constant.BUTTON_LEFT) && !this.game.isKeyDown(Constant.BUTTON_RIGHT)) {
		// 左移動中
		character.animateLeft();
	}
	else if(this.game.isKeyDown(Constant.BUTTON_RIGHT) && !this.game.isKeyDown(Constant.BUTTON_LEFT)) {
		// 右移動中
		character.animateRight();
	}
	else {
		// 左右には未移動
		character.animateNeutral();
	}

	// アイテムと自機の衝突判定
	this.stage.item_manager.checkCollisionWithObject(character);

	//if(Config.DEBUG && Number(document.getElementById("invincible").value) === 0) { // TODO: DEBUG
	if(1){
		// 敵弾と自機の衝突判定
		this.stage.bullet_manager.checkCollisionWithObject(character);

		// ボスが表示されているなら当たり判定をする
		if(this.stage.currentStageBoss().is_show) {
			// ボスと自機の衝突判定
			character.checkCollisionWithObject(this.stage.currentStageBoss());
		}
	}

	// TODO: コリジョンチェック側でis_showを見たいね・・
	// ボスが表示されているなら当たり判定をする
	if(this.stage.currentStageBoss().is_show) {
		// ボスと自機弾の衝突判定
		this.stage.shot_manager.checkCollisionWithObject(this.stage.currentStageBoss());
	}
	// 敵弾と自機のグレイズ判定
	this.stage.bullet_manager.checkGrazeWithObject(character);


	this.stage.currentStageBoss().run();
	this.stage.bullet_manager.run();
	this.stage.item_manager.run();
};

// 画面更新
State.prototype.updateDisplay = function(){
	this.stage.currentStageBoss().updateDisplay();
	this.stage.bullet_manager.updateDisplay();
	this.stage.item_manager.updateDisplay();

	// スペルカード残り時間
	this._showVital();

	// スペカ名
	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.textAlign = 'left';
	ctx.font = "14px 'Migu'" ;
	ctx.fillText(this.stage.currentStageBoss().currentSpellName(), VITAL_OUTLINE_MARGIN, 25);
	ctx.restore();

};
// スペルカード残り時間
State.prototype._showVital = function(){
	var ctx = this.game.surface;
	ctx.save();

	ctx.fillStyle = 'rgb( 255, 255, 255 )';
	ctx.fillRect(
		VITAL_OUTLINE_MARGIN,
		VITAL_OUTLINE_MARGIN,
		this.stage.currentStageBoss().vitalPercentage() * (this.stage.width - VITAL_OUTLINE_MARGIN * 2),
		VITAL_OUTLINE_MARGIN
	);

	ctx.restore();
};



module.exports = State;
