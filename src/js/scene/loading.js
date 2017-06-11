'use strict';
var cjs = require("../createjs");
var images = require("../image_store");


/* ローディング画面 */
var Util = require('../util');
var Config = require('../config');
var BaseScene = require('./base');

var LoadingScene = function(game) {
	BaseScene.apply(this, arguments);

	// 読み込んだ画像の数
	this.loadedImageNum = 0;
	// 読み込んだSEの数
	this.loadedSoundNum = 0;
	// 読み込んだBGMの数
	this.loadedBGMNum = 0;
	// 読み込んだcreatejs用画像の数
	this.loadedCjsImageNum = 0;

	// フォントの読み込みが完了したか
	this.fontLoadingDone = false;

	// ogg ファイルのBGMが再生可能かどうか
	this.canPlayOgg = Util.canPlayOgg();
};

// 基底クラスを継承
Util.inherit(LoadingScene, BaseScene);

// 初期化
LoadingScene.prototype.init = function() {
	// ゲームで使う画像の読み込み
	this._loadImages();
	// createjsで使う画像の読み込み
	this._loadCjsImages();
	// SE の読み込み
	this._loadSounds();
	// BGM の読み込み
	this._loadBGMs();
};

// 読み込んだ素材数
LoadingScene.prototype.loaded_material_num = function() {
	return this.loadedImageNum + this.loadedSoundNum + this.loadedBGMNum + this.loadedCjsImageNum;
};
// フォントの読み込み完了
LoadingScene.prototype.notifyFontLoadingDone = function () {
	this.fontLoadingDone = true;
};
// フレーム処理
LoadingScene.prototype.run = function(){
	// 素材を全て読み込んだら
	if(this.loaded_material_num() >= Config.ALL_MATERIAL_NUM && this.fontLoadingDone) {
		// 読み込み終わったことをゲームに通知
		this.game.notifyLoadingDone();
	}
};

// 画面更新
LoadingScene.prototype.updateDisplay = function(){
	this.game.clearCanvas();
	var material_num = Config.ALL_MATERIAL_NUM;
	var loaded_material_num = this.loaded_material_num();

	var ctx = this.game.surface;
	ctx.save();
	ctx.fillStyle = 'rgb( 0, 0, 0 )';
	ctx.textAlign = 'right';
	ctx.font = "30px 'Migu'" ;
	ctx.fillText('Now Loading...', 400, 225);
	ctx.fillText( loaded_material_num + '/' + material_num, 400, 285);
	ctx.restore();
};

LoadingScene.prototype._loadImages = function() {
	var self = this;

	// 画像が読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedImageNum++;
	};

	var image;
	for(var key in Config.IMAGES) {
		image = new Image();
		image.src = Config.IMAGES[key] ;
		image.onload = onload_function;
		this.game.images[key] = image;
	}

};

LoadingScene.prototype._loadCjsImages = function() {
	var self = this;

	var loader = new cjs.PreloadJS(false);
	loader.onFileLoad = function(o) {
		if (o.type === "image") {
			images[o.id] = o.result;
			self.loadedCjsImageNum++;
		}
	};
	//loader.onComplete = handleComplete;
	loader.loadManifest(Config.CJS_IMAGES);
};


LoadingScene.prototype._loadSounds = function() {
	var self = this;

	// SEが読み込まれたら読み込んだ数を+1
	var onload_function = function() {
		self.loadedBGMNum++;
	};

	var conf, audio;
	for(var key in Config.SOUNDS) {
		conf = Config.SOUNDS[key];
		audio = new Audio(conf.path);
		audio.volume = conf.volume;
		audio.addEventListener('canplay', onload_function);
		audio.load();
		this.game.sounds[key] = audio;
	}

};

LoadingScene.prototype._loadBGMs = function() {
	var self = this;

	var ext = this.canPlayOgg ? ".ogg" : ".m4a";

	for(var key in Config.BGMS) {
		/*jshint loopfunc: true */
		(function(key) {
			var conf = Config.BGMS[key];

			self._loadBGM(conf.path + ext, function(audioBuffer) {
				// BGMが読み込まれたら読み込んだ数を+1
				self.loadedBGMNum++;
				self.game.bgms[key] = audioBuffer;
			});
		})(key);
	}
};


LoadingScene.prototype._loadBGM = function(url, successCallback) {
	var self = this;
	var xhr = new XMLHttpRequest();

	xhr.onload = function() {
		if(xhr.status !== 200) {
			return;
		}

		var arrayBuffer = xhr.response;
		self.game.audio_context.decodeAudioData(arrayBuffer, successCallback, function(error) {
			if (error instanceof Error) {
				window.alert(error.message);
			} else {
				window.alert('Error : "decodeAudioData" method.');
			}
		});
	};

	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.send(null);
};
module.exports = LoadingScene;
