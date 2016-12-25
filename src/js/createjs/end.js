'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.epilog = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_180 = function() {
		//playSound("ending003_MSTwav");
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(180).call(this.frame_180).wait(10458));

	// ed
	this.instance = new lib.end_A_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10298).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// BO
	this.instance_1 = new lib.BO_1("synched",0);
	this.instance_1.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},59).wait(10580));

	// l01.png
	this.instance_2 = new lib.l01_1("synched",0);
	this.instance_2.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(401).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(9848));

	// l02.png
	this.instance_3 = new lib.l02_1("synched",0);
	this.instance_3.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(833).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(338).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(9388));

	// l03.png
	this.instance_4 = new lib.l03_1("synched",0);
	this.instance_4.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1293).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8956));

	// l04.png
	this.instance_5 = new lib.l04_1("synched",0);
	this.instance_5.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1725).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(346).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8488));

	// l05.png
	this.instance_6 = new lib.l05_1("synched",0);
	this.instance_6.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2193).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(345).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(8021));

	// l06.png
	this.instance_7 = new lib.l06_1("synched",0);
	this.instance_7.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2660).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(393).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(7506));

	// l07.png
	this.instance_8 = new lib.l07_1("synched",0);
	this.instance_8.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(3175).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(332).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(7052));

	// l08.png
	this.instance_9 = new lib.l08_1("synched",0);
	this.instance_9.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(3629).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(375).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(6555));

	// l09.png
	this.instance_10 = new lib.l09_1("synched",0);
	this.instance_10.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(4126).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(351).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(6082));

	// l10.png
	this.instance_11 = new lib.l10_1("synched",0);
	this.instance_11.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(4599).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(5650));

	// l11.png
	this.instance_12 = new lib.l11_1("synched",0);
	this.instance_12.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(5031).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(397).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(5131));

	// l12.png
	this.instance_13 = new lib.l12_1("synched",0);
	this.instance_13.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(5550).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(4699));

	// l13.png
	this.instance_14 = new lib.l13_1("synched",0);
	this.instance_14.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(5982).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(360).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(4217));

	// l14.png
	this.instance_15 = new lib.l14_1("synched",0);
	this.instance_15.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(6464).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(3785));

	// l15.png
	this.instance_16 = new lib.l15_1("synched",0);
	this.instance_16.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(6896).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(3353));

	// l16.png
	this.instance_17 = new lib.l16_1("synched",0);
	this.instance_17.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(7328).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(424).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(2807));

	// l17.png
	this.instance_18 = new lib.l17_1("synched",0);
	this.instance_18.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(7874).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(349).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(2336));

	// l18.png
	this.instance_19 = new lib.l18_1("synched",0);
	this.instance_19.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(8345).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(393).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(1821));

	// l19.png
	this.instance_20 = new lib.l19_1("synched",0);
	this.instance_20.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(8860).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(1389));

	// l20.png
	this.instance_21 = new lib.l20_1("synched",0);
	this.instance_21.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(9292).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(957));

	// l21.png
	this.instance_22 = new lib.l21_1("synched",0);
	this.instance_22.setTransform(320.1,438.5,0.95,0.95,0,0,0,225.8,43.8);
	this.instance_22.alpha = 0;
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(9724).to({startPosition:0,_off:false},0).to({scaleX:1,scaleY:1,alpha:1},40).wait(310).to({startPosition:0},0).to({regY:43.7,scaleX:1.05,scaleY:1.05,alpha:0},39).to({_off:true},1).wait(525));

	// WO
	this.instance_23 = new lib.WO_1("synched",0);
	this.instance_23.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(59).to({startPosition:0,_off:false},0).wait(121).to({startPosition:0},0).to({alpha:0},119).to({_off:true},1).wait(8701).to({startPosition:0,_off:false},0).to({alpha:1},1187).wait(451));

	// lastcut
	this.instance_24 = new lib.lastcut("synched",0);
	this.instance_24.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).to({scaleX:0.7,scaleY:0.7},10188).wait(451));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.end_A = function() {
	this.initialize(img.end_A);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.l01 = function() {
	this.initialize(img.l01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l02 = function() {
	this.initialize(img.l02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l03 = function() {
	this.initialize(img.l03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l04 = function() {
	this.initialize(img.l04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l05 = function() {
	this.initialize(img.l05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l06 = function() {
	this.initialize(img.l06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l07 = function() {
	this.initialize(img.l07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l08 = function() {
	this.initialize(img.l08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l09 = function() {
	this.initialize(img.l09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l10 = function() {
	this.initialize(img.l10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l11 = function() {
	this.initialize(img.l11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l12 = function() {
	this.initialize(img.l12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l13 = function() {
	this.initialize(img.l13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l14 = function() {
	this.initialize(img.l14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l15 = function() {
	this.initialize(img.l15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l16 = function() {
	this.initialize(img.l16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l17 = function() {
	this.initialize(img.l17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l18 = function() {
	this.initialize(img.l18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l19 = function() {
	this.initialize(img.l19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l20 = function() {
	this.initialize(img.l20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.l21 = function() {
	this.initialize(img.l21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,903,175);


(lib.last = function() {
	this.initialize(img.last);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.WO_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.lastcut = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.last();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.l21_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l21();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l20_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l20();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l19_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l19();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l18_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l18();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l17_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l17();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l16_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l16();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l15_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l15();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l14_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l14();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l13_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l13();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l12_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l12();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l11_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l11();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l10_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l09();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l08_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l08();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.l01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.l01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,451.5,87.5);


(lib.end_A_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_A();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,150,30);


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
