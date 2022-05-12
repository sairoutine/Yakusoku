'use strict';

// ゲームのFPSレート
var FPS = 60;

// FPS計算する間隔(frame)
var FPS_SPAN = 30;

var Config = require('./config');
var constant = require('./constant');

var LoadingScene   = require('./scene/loading');
var TitleScene     = require('./scene/title');
var ConfigScene     = require('./scene/config');
var Prologue2Scene = require('./scene/prologue2');
var StageScene    = require('./scene/stage');
var EpilogueAScene = require('./scene/epilogue_a');
var EpilogueBScene = require('./scene/epilogue_b');
var EpilogueCScene = require('./scene/epilogue_c');
var StaffRollScene   = require('./scene/staffroll');
var EndScene   = require('./scene/end');

// ユーザーの設定した項目
var UserConfig   = require('./logic/user_config');

var FrameLimit = 1000/FPS;

var Game = function(mainCanvas) {
	// メインCanvas
	this.surface = mainCanvas.getContext('2d');

	this.width = Number(mainCanvas.getAttribute('width'));
	this.height = Number(mainCanvas.getAttribute('height'));

	// WebAudio再生用
	this.audio_context = new window.AudioContext();
	// for legacy browser
	this.audio_context.createGain = this.audio_context.createGain || this.audio_context.createGainNode;
	// 音量調整
	this.audio_gain = this.audio_context.createGain();
	// 再生中の AudioBufferSourceNode
	this.audio_source = null;

	// ゲームの現在のシーン
	this.state = null;

	// シーン一覧
	this.scenes = [];
	// ローディング画面
	this.scenes[ constant.LOADING_SCENE ] = new LoadingScene(this);
	// タイトル画面
	this.scenes[ constant.TITLE_SCENE ] = new TitleScene(this);
	// コンフィグ画面
	this.scenes[ constant.CONFIG_SCENE ] = new ConfigScene(this);
	// プロローグ画面2
	this.scenes[ constant.PROLOGUE2_SCENE ] = new Prologue2Scene(this);
	// ステージ
	this.scenes[ constant.STAGE_SCENE ] = new StageScene(this);
	// エピローグ画面
	this.scenes[ constant.EPILOGUE_A_SCENE ]  = new EpilogueAScene(this);
	this.scenes[ constant.EPILOGUE_B_SCENE ]  = new EpilogueBScene(this);
	this.scenes[ constant.EPILOGUE_C_SCENE ]  = new EpilogueCScene(this);
	// スタッフロール画面
	this.scenes[ constant.STAFFROLL_SCENE ]  = new StaffRollScene(this);
	// エンド
	this.scenes[ constant.END_SCENE ]  = new EndScene(this);

	// 画像一覧
	this.images = {};

	// SE一覧
	this.sounds = {};

	// BGM一覧
	this.bgms = {};

	// どのSEを再生するかのフラグ
	this.soundflag = 0x00;

	// 経過フレーム数
	this.frame_count = 0;

	// 前回にゲーム更新をした際の時刻(ミリ秒)
	this.before_update_time = 0;

	// requestAnimationFrame の ID
	this.request_id = null;

	// キー押下フラグ
	this.keyflag = 0x0;

	// 一つ前のフレームで押下されたキー
	this.before_keyflag = 0x0;

	// ゲームパッドが接続されているかどうか
	this.is_connect_gamepad = 0;

	// 前回にFPSを計算した際の時刻(ミリ秒)
	this.before_time = 0;

	// 計測したFPS
	this.fps = 0;

	// ユーザーの設定した項目
	this.user_config = null;
};

Game.prototype = {
	// 初期化
	init: function () {
		// 経過フレーム数を初期化
		this.frame_count = 0;

		// requestAnimationFrame の ID
		this.request_id = null;

		// 前回にゲーム更新をした際の時刻(ミリ秒)
		this.before_update_time = 0;

		// キー押下フラグ
		this.keyflag = 0x0;

		// 一つ前のフレームで押下されたキー
		this.before_keyflag = 0x0;

		// ゲームパッドが接続されているかどうか
		this.is_connect_gamepad = 0;

		// 前回にFPSを計算した際の時刻(ミリ秒)
		this.before_time = 0;

		// 計測したFPS
		this.fps = 0;

		// ユーザーの設定した項目
		this.user_config = UserConfig.load();

		// シーンをローディング画面にする
		this.changeScene(constant.LOADING_SCENE);
	},
	// フォントのロードが完了
	fontLoadingDone: function(){
		if(this.state === constant.LOADING_SCENE) {
			this.currentScene().notifyFontLoadingDone();
		}
	},
	// キー押下
	handleKeyDown: function(e){
		this.keyflag |= this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// キー押下解除
	handleKeyUp: function(e){
		this.keyflag &= ~this._keyCodeToBitCode(e.keyCode);
		e.preventDefault();
	},
	// 指定のキーが押下状態か確認する
	isKeyDown: function(flag) {
		return this.keyflag & flag;
	},
	// 指定のキーが押下されたか確認する
	isKeyPush: function(flag) {
		// 1フレーム前に押下されておらず、現フレームで押下されてるなら true
		return !(this.before_keyflag & flag) && this.keyflag & flag;
	},
	// キーコードをBitに変換
	_keyCodeToBitCode: function(keyCode) {
		var flag;
		switch(keyCode) {
			case 16: // shift
				flag = constant.BUTTON_SHIFT;
				break;
			case 32: // space
				flag = constant.BUTTON_SPACE;
				break;
			case 37: // left
				flag = constant.BUTTON_LEFT;
				break;
			case 38: // up
				flag = constant.BUTTON_UP;
				break;
			case 39: // right
				flag = constant.BUTTON_RIGHT;
				break;
			case 40: // down
				flag = constant.BUTTON_DOWN;
				break;
			case 88: // x
				flag = constant.BUTTON_X;
				break;
			case 90: // z
				flag = constant.BUTTON_Z;
				break;
		}
		return flag;
	},
	// シーンを切り替え
	changeScene: function(scene) {
		// シーンから離れる際の処理
		if(this.state !== null) {
			this.currentScene().onunload();
		}

		// シーン切り替え
		this.state = scene;
		// 切り替え後のシーンを初期化
		this.currentScene().init();
	},
	// BGMを再生
	playBGM: function(key) {
		var self = this;

		// DEBUG
		if(Config.DEBUG_MUSIC_OFF) return;

		// 現在のBGM再生をストップ
		self.stopBGM();

		self.audio_source = self._createSourceNode(key);
		self.audio_source.start(0);
	},
	stopBGM: function(bgm) {
		var self = this;
		if(self.audio_source) {
			self.audio_source.stop(0);
			self.audio_source = null;
		}
		return;
	},
	// BGM のフェードアウトを設定
	fadeOutBGM: function (fadeout_time) {
		var self = this;
		if(self.audio_gain && self.audio_context) {
			var gain = self.audio_gain.gain;
			var startTime = self.audio_context.currentTime;
			gain.setValueAtTime(gain.value, startTime); // ないと古い端末でフェードアウトしない
			var endTime = startTime + fadeout_time;
			gain.linearRampToValueAtTime(0, endTime);
		}

		return 1;
	},
	// BGM の AudioBufferSourceNode インスタンスを作成
	_createSourceNode: function(key) {
		var self = this;
		var arrayBuffer = self.bgms[key];
		var conf = Config.BGMS[key];

		self.audio_gain = this.audio_context.createGain(); // ないとフェードアウト後にBGM再生されない

		var source = self.audio_context.createBufferSource();
		source.buffer = arrayBuffer;

		if(conf.loopStart || conf.loopEnd) { source.loop = true; }
		if(conf.loopStart) { source.loopStart = conf.loopStart; }
		if(conf.loopEnd)   { source.loopEnd = conf.loopEnd; }
		self.audio_gain.gain.value = conf.volume || 1;

		source.connect(self.audio_gain);

		self.audio_gain.connect(self.audio_context.destination);
		source.start = source.start || source.noteOn;
		source.stop  = source.stop  || source.noteOff;

		return source;
	},
	// 再生するSEをセット
	playSound: function(key) {
		this.soundflag |= Config.SOUNDS[key].id;
	},

	// セットされたフラグにもとづいてSEを再生
	runPlaySound: function() {
		// DEBUG
		if(Config.DEBUG_MUSIC_OFF) return;

		for(var key in Config.SOUNDS) {
			// フラグが立ってたら
			if(this.soundflag & Config.SOUNDS[key].id) {
				// 再生
				this.sounds[key].pause();
				this.sounds[key].currentTime = 0;
				this.sounds[key].play();

				// フラグを削除
				this.soundflag &= ~Config.SOUNDS[key].id;

				// 1フレームに1つしか再生しない
				break;
			}
		}
	},
	// 画像を取得
	getImage: function(key) {
		return this.images[key];
	},
	currentScene: function() {
		return this.scenes[this.state];
	},
	clearCanvas: function() {
		this.surface.clearRect(0, 0, this.width, this.height);
	},
	// ゲーム起動
	startRun: function(){
		if(this.isRunning()) return;

		this.run();
	},
	// ゲームストップ
	stopRun: function(){
		if(!this.isRunning()) return;

		cancelAnimationFrame(this.request_id);

		this.request_id = null;
	},
	// ゲームが起動中かどうか
	isRunning: function () {
		return this.request_id ? true : false;
	},
	// フレーム毎の実行
	run: function(){
		// ゲームパッド対応端末なら入力を取得
		this.handleGamePad();

		// シーン更新
		this.currentScene().run();
		this.currentScene().updateDisplay();

		if(Config.DEBUG) {
			this._renderFPS();
		}

		// SEを再生
		this.runPlaySound();

		// 押下されたキーを保存しておく
		this.before_keyflag = this.keyflag;

		// 経過フレーム数更新
		this.frame_count++;

		var now = Date.now();
		if (now - this.before_update_time >= FrameLimit) {
			this.before_update_time = now;
			this.request_id = requestAnimationFrame(this.run.bind(this));
		}
		else {
			// ゲーミングディスプレイなどリフレッシュレートが144Hzのディスプレイの場合、
			// requestAnimationFrame が 60FPS 以上で実行されることがある。
			//
			// 過剰にゲームの更新が行われないように 60FPS より早く更新されそうなときは待つ。
			var that = this;
			setTimeout(function() {
				if (!that.isRunning()) return;

				that.before_update_time = Date.now();
				that.request_id = requestAnimationFrame(that.run.bind(that));
			}, this.before_update_time + FrameLimit - now);
		}
	},
	_renderFPS: function() {
		// FPSをレンダリング
		var ctx = this.surface;
		ctx.save();
		ctx.fillStyle = 'rgb( 6, 40, 255 )';
		ctx.textAlign = 'left';
		ctx.font = "16px 'Migu'";
		ctx.fillText("FPS: " + this.fps, this.width - 70, this.height - 10);
		ctx.restore();

		// FPS_SPAN 毎にFPSを計測する
		if((this.frame_count % FPS_SPAN) !== 0) return;

		// 現在時刻(ミリ秒)を取得
		var newTime = Date.now();

		if(this.before_time) {
			this.fps = parseInt(1000 * FPS_SPAN / (newTime - this.before_time));
		}

		this.before_time = newTime;
	},
	// ローディング画面が終わったら
	notifyLoadingDone: function() {
		// オープニング画面に切り替え
		this.changeScene(Config.DEBUG && Config.DEBUG_SCENE ? Config.DEBUG_SCENE : constant.TITLE_SCENE);
	},
	// タイトル画面が終わったら
	notifyTitleDoneToStart: function() {
		if(Config.DEBUG) {
			this.changeScene(document.getElementById("scene").value);
		}
		this.changeScene(constant.STAGE_SCENE);
	},
	notifyTitleDoneToPrologue: function() {
		// プロローグ画面に切り替え
		this.changeScene(constant.PROLOGUE2_SCENE);
	},
	notifyTitleDoneToConfig: function() {
		// コンフィグ画面に切り替え
		this.changeScene(constant.CONFIG_SCENE);
	},
	// コンフィグ画面から戻ったら
	notifyConfigDone: function() {
		// タイトル画面に切り替え
		this.changeScene(constant.TITLE_SCENE);
	},
	// プロローグ画面が終わったら
	notifyPrologue2Done: function() {
		// ステージ画面に切り替え
		this.changeScene(constant.STAGE_SCENE);
	},
	// ステージ画面が終わったら
	notifyStageDone: function() {
		// エンディング分岐
		if(this.currentScene().score > Config.THRESHOLD_EPILOGUE_A) {
			this.changeScene(constant.EPILOGUE_A_SCENE);
		}
		else if(this.currentScene().score > Config.THRESHOLD_EPILOGUE_B) {
			this.changeScene(constant.EPILOGUE_B_SCENE);
		}
		else {
			this.changeScene(constant.EPILOGUE_C_SCENE);
		}
	},
	// エピローグAが終わったら
	notifyEpilogueADone: function() {
		// エンディングに切り替え
		this.changeScene(constant.STAFFROLL_SCENE);
	},
	// エピローグBが終わったら
	notifyEpilogueBDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// エピローグCが終わったら
	notifyEpilogueCDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	notifyStaffRollDone: function() {
		this.changeScene(constant.END_SCENE);
	},
	notifyEndDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// 体験版終了
	notifyTrialDone: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	// ステージをポーズから終了
	notifyStageQuit: function() {
		this.changeScene(constant.TITLE_SCENE);
	},
	handleGamePad: function() {
		if(!this.is_connect_gamepad) return;

		var pads = navigator.getGamepads();
		var pad = pads[0]; // 1Pコン

		if(!pad) return;

		// 初期化
		this.keyflag = 0x00;

		// ボタン入力
		for (var i = 0; i < pad.buttons.length; i++) {
			if(pad.buttons[i].pressed) { // 押下されてたら
				this.keyflag |= this.user_config.getKeyByButtonId(i); // button_id に割り当てられたキーを取得
			}
		}

		// 十字キー入力
		this.keyflag |= pad.axes[1] < -0.5 ? constant.BUTTON_UP:         0x00;// UP
		this.keyflag |= pad.axes[1] >  0.5 ? constant.BUTTON_DOWN:       0x00;// DOWN
		this.keyflag |= pad.axes[0] < -0.5 ? constant.BUTTON_LEFT:       0x00;// LEFT
		this.keyflag |= pad.axes[0] >  0.5 ? constant.BUTTON_RIGHT:      0x00;// RIGHT
	},
	enableGamePad: function() {
		this.is_connect_gamepad = 1;
	},
};

module.exports = Game;
