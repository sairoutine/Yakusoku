'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.neko = function() {
	this.initialize();

	// レイヤー 1
	this.neko = new lib.neko_1();
	this.neko.setTransform(147,143,1,1,0,0,0,128,128);

	this.addChild(this.neko);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(19,15,256,256);


// symbols:
(lib.neko_walk01 = function() {
	this.initialize(img.neko_walk01);
}).prototype = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.neko_image = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.neko_walk01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.neko_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{},true);

	// レイヤー 1
	this.instance_1 = new lib.neko_image("synched",0);
	this.instance_1.setTransform(128,128,1,1,0,0,0,128,128);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:94},9).to({y:128},10).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
module.exports = lib;
