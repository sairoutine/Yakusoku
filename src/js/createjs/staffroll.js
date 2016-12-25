'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.staffroll = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(7808));

	// BO
	this.instance = new lib.BO_1("synched",0);
	this.instance.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(102).to({startPosition:0},0).to({alpha:0},251).to({_off:true},1).wait(7140).to({startPosition:0,_off:false},0).to({alpha:1},104).wait(211));

	// renko_d
	this.instance_1 = new lib.renko_d_1("synched",0);
	this.instance_1.setTransform(60.6,-64.8,1,1,0,0,0,37.5,52.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7532).to({startPosition:0,_off:false},0).to({y:536.1},22).to({_off:true},1).wait(254));

	// e06.png
	this.instance_2 = new lib.e06_1("synched",0);
	this.instance_2.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_2.alpha = 0.5;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(6277).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(252).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(1200));

	// e05.png
	this.instance_3 = new lib.e05_1("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_3.alpha = 0.5;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(5183).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(2295));

	// e04.png
	this.instance_4 = new lib.e04_1("synched",0);
	this.instance_4.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_4.alpha = 0.5;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4089).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(3389));

	// e03.png
	this.instance_5 = new lib.e03_1("synched",0);
	this.instance_5.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_5.alpha = 0.5;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2995).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(4483));

	// e02.png
	this.instance_6 = new lib.e02_1("synched",0);
	this.instance_6.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_6.alpha = 0.5;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2001).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(251).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(5477));

	// e01.png
	this.instance_7 = new lib.e01_1("synched",0);
	this.instance_7.setTransform(320,240,1,1,0,0,0,152.5,97.5);
	this.instance_7.alpha = 0.5;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1005).to({startPosition:0,_off:false},0).to({_off:true},1).wait(3).to({alpha:0.77,_off:false},0).to({_off:true},1).wait(1).to({alpha:1,_off:false},0).to({_off:true},2).wait(1).to({alpha:0,_off:false},0).to({alpha:1},17).wait(253).to({startPosition:0},0).to({alpha:0},53).to({_off:true},1).wait(6471));

	// mask
	this.instance_8 = new lib.BO_1("synched",0);
	this.instance_8.setTransform(498,209,0.536,0.067,0,0,0,640,240);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(413).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(455).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(392).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(454).to({startPosition:0,_off:false},0).to({regX:641,scaleX:0.01},99).to({_off:true},1).wait(492).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(488));

	// mask
	this.instance_9 = new lib.BO_1("synched",0);
	this.instance_9.setTransform(498,244,0.536,0.067,0,0,0,640,240);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(413).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(455).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(243).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(454).to({startPosition:0,_off:false},0).wait(149).to({startPosition:0},0).to({regX:640.1,scaleX:0.06},99).to({_off:true},1).wait(343).to({regX:640,scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(488));

	// mask
	this.instance_10 = new lib.BO_1("synched",0);
	this.instance_10.setTransform(498,278.6,0.536,0.081,0,0,0,640,240);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(3397).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(453).to({startPosition:0,_off:false},0).wait(298).to({startPosition:0},0).to({scaleX:0.13},99).to({_off:true},1).wait(194).to({scaleX:0.54,alpha:0,_off:false},0).to({alpha:1},48).to({_off:true},1).wait(1583));

	// s07.png
	this.instance_11 = new lib.s07_1("synched",0);
	this.instance_11.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(6680).to({startPosition:0,_off:false},0).to({_off:true},641).wait(488));

	// s06.png
	this.instance_12 = new lib.s06_1("synched",0);
	this.instance_12.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(5585).to({startPosition:0,_off:false},0).to({_off:true},641).wait(1583));

	// s05.png
	this.instance_13 = new lib.s05_1("synched",0);
	this.instance_13.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(4491).to({startPosition:0,_off:false},0).to({_off:true},641).wait(2677));

	// s04.png
	this.instance_14 = new lib.s04_1("synched",0);
	this.instance_14.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(3397).to({startPosition:0,_off:false},0).to({_off:true},641).wait(3771));

	// s03.png
	this.instance_15 = new lib.s03_1("synched",0);
	this.instance_15.setTransform(320,240,1,1,0,0,0,178,67);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2403).to({startPosition:0,_off:false},0).to({_off:true},541).wait(4865));

	// s01.png
	this.instance_16 = new lib.s01_1("synched",0);
	this.instance_16.setTransform(320,240,1,1,0,0,0,178,67);

	this.instance_17 = new lib.s02_1("synched",0);
	this.instance_17.setTransform(320,240,1,1,0,0,0,178,67);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_16}]},413).to({state:[]},541).to({state:[{t:this.instance_17}]},455).to({state:[]},541).wait(5859));

	// renko
	this.instance_18 = new lib.renko("synched",0);
	this.instance_18.setTransform(567.5,240,1,1,0,0,0,72.5,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1465).to({startPosition:0},0).wait(5807).to({startPosition:0},0).to({alpha:0},48).to({_off:true},1).wait(488));

	// bg
	this.instance_19 = new lib.bg();
	this.instance_19.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19}]}).wait(7809));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.e01 = function() {
	this.initialize(img.e01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e02 = function() {
	this.initialize(img.e02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e03 = function() {
	this.initialize(img.e03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e04 = function() {
	this.initialize(img.e04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e05 = function() {
	this.initialize(img.e05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.e06 = function() {
	this.initialize(img.e06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,390);


(lib.renko_d = function() {
	this.initialize(img.renko_d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,290,960);


(lib.renko_d_sil = function() {
	this.initialize(img.renko_d_sil);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,210);


(lib.s01 = function() {
	this.initialize(img.s01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s02 = function() {
	this.initialize(img.s02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s03 = function() {
	this.initialize(img.s03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s04 = function() {
	this.initialize(img.s04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s05 = function() {
	this.initialize(img.s05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s06 = function() {
	this.initialize(img.s06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s07 = function() {
	this.initialize(img.s07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,712,268);


(lib.s07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.s01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356,134);


(lib.renko_d_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d_sil();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,75,105);


(lib.renko = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,145,480);


(lib.e06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.e01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.e01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,305,195);


(lib.BO_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;
