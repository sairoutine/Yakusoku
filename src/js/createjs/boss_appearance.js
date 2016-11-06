'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.boss_appearance = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_57 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(57).call(this.frame_57));

	// circle
	this.instance = new lib.circle_motion();
	this.instance.setTransform(480,480);
	this.instance.alpha = 0.602;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27).to({_off:false},0).wait(31));

	// housya
	this.instance_1 = new lib.emlight_motion();
	this.instance_1.setTransform(480,480);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(27).to({_off:false},0).to({_off:true},30).wait(1));

	// maru
	this.instance_2 = new lib.dot_1();
	this.instance_2.setTransform(480,480);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({_off:true},30).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


// symbols:
(lib.circle = function() {
	this.initialize(img.circle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,480,480);


(lib.dot = function() {
	this.initialize(img.dot);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.emlight = function() {
	this.initialize(img.emlight);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.emlight_image = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.emlight();
	this.instance.setTransform(-149.9,-149.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.dot_imge = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.dot();
	this.instance.setTransform(-149.9,-149.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.circle_image = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.circle();
	this.instance.setTransform(-239.9,-239.9);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-239.9,-239.9,480,480);


(lib.emlight_roll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.emlight_image();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:360},59).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.emlight_motion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.emlight_roll();
	this.instance.setTransform(0,0,0.47,0.47);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.63,scaleY:1.63,alpha:1},12).wait(3).to({scaleX:1,scaleY:1,alpha:0},14).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.4,-70.4,140.9,140.9);


(lib.dot_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.dot_imge();
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.69,scaleY:1.69,alpha:0.52},14).to({scaleX:2.43,scaleY:2.43,alpha:0},15).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.9,-149.9,300,300);


(lib.circle_roll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.circle_image("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:90},14).to({rotation:180},15).to({rotation:270.1},15).to({rotation:360},15).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.9,-239.9,480,480);


(lib.circle_alpha = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_9 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(9).call(this.frame_9));

	// レイヤー 1
	this.instance = new lib.circle_roll();
	this.instance.setTransform(0,0,1.146,1.146);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:1},9).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-274.9,-274.9,550,550);


(lib.circle_motion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_82 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(82).call(this.frame_82));

	// レイヤー 1
	this.instance = new lib.circle_alpha();
	this.instance.setTransform(0,0,0.35,0.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.81,scaleY:1.81},34).to({scaleX:0.35,scaleY:0.35},32).to({scaleX:0.4,scaleY:0.4},16).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.2,-96.2,192.5,192.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
module.exports = lib;
