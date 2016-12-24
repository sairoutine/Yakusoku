'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};

(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_B = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// ed
	this.instance = new lib.end_B_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3654).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// textmask_bk
	this.instance_1 = new lib.bo("synched",0);
	this.instance_1.setTransform(322.5,237.8,0.174,0.063,0,0,0,320.2,240.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3223).to({startPosition:0,_off:false},0).to({regX:320.1,scaleX:0.01,x:373.6},12).to({_off:true},1).wait(276).to({regX:320.2,scaleX:0.17,x:322.5,alpha:0,_off:false},0).to({alpha:1},88).to({_off:true},1).wait(394));

	// voice_b09
	this.instance_2 = new lib.B09();
	this.instance_2.setTransform(262,216,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},3223).to({state:[]},378).wait(394));

	// BO
	this.instance_3 = new lib.bo("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2995).to({startPosition:0,_off:false},0).to({alpha:1},63).wait(847));

	// textmask_1
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(316,69,0.362,0.063,0,0,180,320.1,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(207).to({startPosition:0,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.14,x:387.3},31).to({_off:true},1).wait(267).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(11).to({startPosition:0},0).to({regX:320,scaleX:0.12,x:392.5},43).to({_off:true},1).wait(344).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:378.9},24).to({_off:true},1).wait(305).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},20).to({_off:true},1).wait(314).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320,scaleX:0.13,x:390.8},31).to({_off:true},1).wait(428).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.8,scaleX:0.01,x:428.4},44).to({_off:true},1).wait(292).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.3,scaleX:0.16,x:381.1},30).to({_off:true},1).wait(313).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.2,x:369.5},19).to({_off:true},1).wait(1225));

	// textmask_2
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(207).to({startPosition:0,_off:false},0).wait(66).to({startPosition:0},0).to({regX:319.9,scaleX:0.13,x:422.6},32).to({_off:true},1).wait(207).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(77).to({startPosition:0},0).to({regX:319.6,scaleX:0.05,x:447},44).to({_off:true},1).wait(277).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(56).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:410.9},41).to({_off:true},1).wait(239).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(41).to({startPosition:0},0).to({regX:320.1,scaleX:0.05,x:447.9},42).to({_off:true},1).wait(256).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(57).to({startPosition:0},0).to({scaleX:0.19,x:402.3},28).to({_off:true},1).wait(379).to({scaleX:0.43,x:328,_off:false},0).wait(82).to({startPosition:0},0).to({regX:319.9,scaleX:0.21,x:396.6},29).to({_off:true},1).wait(230).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(53).to({startPosition:0},0).to({scaleX:0.14,x:420.9},36).to({_off:true},1).wait(259).to({scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({regX:319.9,scaleX:0.25,x:385.5},22).to({_off:true},1).wait(1166));

	// textmask_3
	this.instance_6 = new lib.wo("synched",0);
	this.instance_6.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1249).to({startPosition:0,_off:false},0).wait(103).to({startPosition:0},0).to({scaleX:0.06,x:414.4},42).to({_off:true},1).wait(194).to({scaleX:0.38,x:312,_off:false},0).wait(119).to({startPosition:0},0).to({regX:320.2,scaleX:0.03,x:422.7},45).to({_off:true},1).wait(991).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(132).to({startPosition:0},0).to({regX:319.9,scaleX:0.15,x:384.7},31).to({_off:true},1).wait(1086));

	// text
	this.instance_7 = new lib.B01();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.B02();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.B03();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.B04();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.B05();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.B06();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.B07();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.B08();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},207).to({state:[{t:this.instance_8}]},306).to({state:[{t:this.instance_9}]},399).to({state:[{t:this.instance_10}]},337).to({state:[{t:this.instance_11}]},340).to({state:[{t:this.instance_12}]},465).to({state:[{t:this.instance_13}]},342).to({state:[{t:this.instance_14}]},349).wait(1250));

	// voice_base01
	this.instance_15 = new lib.voice_1("synched",0);
	this.instance_15.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(197).to({startPosition:0,_off:false},0).wait(3798));

	// renko_sad.png
	this.instance_16 = new lib.renko_sad_1("single",0);
	this.instance_16.setTransform(178.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16}]}).wait(3995));

	// hakureiShrine
	this.instance_17 = new lib.bg_ED_C();
	this.instance_17.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17}]}).wait(3995));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,632);


// symbols:
(lib.B01 = function() {
	this.initialize(img.B01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B02 = function() {
	this.initialize(img.B02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B03 = function() {
	this.initialize(img.B03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B04 = function() {
	this.initialize(img.B04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B05 = function() {
	this.initialize(img.B05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B06 = function() {
	this.initialize(img.B06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B07 = function() {
	this.initialize(img.B07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B08 = function() {
	this.initialize(img.B08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.B09 = function() {
	this.initialize(img.B09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,232,96);


(lib.bg_ED_C = function() {
	this.initialize(img.bg_ED_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.end_B = function() {
	this.initialize(img.end_B);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.renko_sad = function() {
	this.initialize(img.renko_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.voice1 = function() {
	this.initialize(img.voice1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.WO = function() {
	this.initialize(img.WO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.wo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.WO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.voice_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.renko_sad_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_sad();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.end_B_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_B();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,150,30);


(lib.bo = function() {
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
