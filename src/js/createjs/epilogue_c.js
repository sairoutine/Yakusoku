'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_C = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});
	// ed
	this.instance = new lib.end_C_1("synched",0);
	this.instance.setTransform(550.8,453.4,1,1,0,0,0,75,15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3982).to({startPosition:0,_off:false},0).to({alpha:1},52).wait(240).to({startPosition:0},0).to({alpha:0},47).to({_off:true},1).wait(1));

	// textmask_bk
	this.instance_1 = new lib.bo("synched",0);
	this.instance_1.setTransform(305.8,237.8,0.829,0.063,0,0,0,320,240.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3440).to({startPosition:0,_off:false},0).to({regX:319.4,scaleX:0.02,x:564.7},206).to({_off:true},1).wait(193).to({regX:320,scaleX:0.83,x:305.8,alpha:0,_off:false},0).to({alpha:1},88).to({_off:true},1).wait(394));

	// voice_c14
	this.instance_2 = new lib.C14();
	this.instance_2.setTransform(70,216,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},3440).to({state:[]},489).wait(394));

	// BO
	this.instance_3 = new lib.bo("synched",0);
	this.instance_3.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(3196).to({startPosition:0,_off:false},0).to({alpha:1},73).wait(964));

	// textmask_1
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(316,69,0.362,0.063,0,0,180,320.1,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(207).to({startPosition:0,_off:false},0).wait(7).to({startPosition:0},0).to({regX:319.9,scaleX:0.26,x:348.8},14).to({_off:true},1).wait(169).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(11).to({startPosition:0},0).to({scaleX:0.25,x:352.5},22).to({_off:true},1).wait(179).to({scaleX:0.36,x:316,_off:false},0).wait(7).to({startPosition:0},0).to({scaleX:0.25,x:352.5},10).to({_off:true},1).wait(156).to({scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},20).to({_off:true},1).wait(186).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.2,scaleX:0.16,x:381},18).to({_off:true},1).wait(243).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.28,x:344},14).to({_off:true},1).wait(281).to({scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({regX:320.3,scaleX:0.08,x:405.5},24).to({_off:true},1).wait(256).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(5).to({startPosition:0},0).to({scaleX:0.26,x:350},14).to({_off:true},1).wait(265).to({scaleX:0.36,x:316,_off:false},0).wait(9).to({startPosition:0},0).to({scaleX:0.24,x:356},11).to({_off:true},1).wait(151).to({scaleX:0.36,x:316,_off:false},0).wait(6).to({startPosition:0},0).to({regX:320.2,scaleX:0.18,x:374.5},21).to({_off:true},1).wait(166).to({regX:320.1,scaleX:0.36,x:316,_off:false},0).wait(10).to({startPosition:0},0).to({scaleX:0.24,x:356},18).to({_off:true},1).wait(252).to({scaleX:0.36,x:316,_off:false},0).wait(10).to({startPosition:0},0).to({scaleX:0.26,x:349.5},19).to({_off:true},1).wait(156).to({scaleX:0.36,x:316,_off:false},0).wait(12).to({startPosition:0},0).to({regX:320.3,scaleX:0.08,x:407},28).to({_off:true},1).wait(1313));

	// textmask_2
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(997).to({startPosition:0,_off:false},0).wait(44).to({startPosition:0},0).to({scaleX:0.22,x:395},19).to({_off:true},1).wait(203).to({scaleX:0.43,x:328,_off:false},0).wait(41).to({startPosition:0},0).to({scaleX:0.08,x:437},29).to({_off:true},1).wait(230).to({scaleX:0.43,x:328,_off:false},0).wait(47).to({startPosition:0},0).to({scaleX:0.15,x:417},29).to({_off:true},1).wait(209).to({scaleX:0.43,x:328,_off:false},0).wait(43).to({startPosition:0},0).to({scaleX:0.13,x:423.5},38).to({_off:true},1).wait(569).to({scaleX:0.43,x:328,_off:false},0).wait(43).to({startPosition:0},0).to({regX:320.1,scaleX:0.1,x:431},34).to({_off:true},1).wait(203).wait(186).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(62).to({startPosition:0},0).to({scaleX:0.16,x:414.5},29).to({_off:true},1).wait(1262));

	// textmask_3
	this.instance_6 = new lib.wo("synched",0);
	this.instance_6.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1264).to({startPosition:0,_off:false},0).wait(90).to({startPosition:0},0).to({scaleX:0.3,x:336},11).to({_off:true},1).wait(199).to({scaleX:0.38,x:312,_off:false},0).wait(86).to({startPosition:0},0).to({scaleX:0.2,x:369},24).to({_off:true},1).wait(2647));

	// text
	this.instance_7 = new lib.C01();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.C02();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.C03();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.C04();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.C05();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.C06();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.C07();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.C08();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.instance_15 = new lib.C09();
	this.instance_15.setTransform(80,0,0.5,0.5);

	this.instance_16 = new lib.C10();
	this.instance_16.setTransform(80,0,0.5,0.5);

	this.instance_17 = new lib.C11();
	this.instance_17.setTransform(80,0,0.5,0.5);

	this.instance_18 = new lib.C12();
	this.instance_18.setTransform(80,0,0.5,0.5);

	this.instance_19 = new lib.C13();
	this.instance_19.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},207).to({state:[{t:this.instance_8}]},191).to({state:[{t:this.instance_9}]},213).to({state:[{t:this.instance_10}]},174).to({state:[{t:this.instance_11}]},212).to({state:[{t:this.instance_12}]},267).to({state:[{t:this.instance_13}]},301).to({state:[{t:this.instance_14}]},286).to({state:[{t:this.instance_15}]},285).to({state:[{t:this.instance_16}]},172).to({state:[{t:this.instance_17}]},194).to({state:[{t:this.instance_18}]},281).to({state:[{t:this.instance_19}]},186).to({state:[]},390).wait(964));

	// voice_base01
	this.instance_20 = new lib.voice_1("synched",0);
	this.instance_20.setTransform(320,111.5,1,1,0,0,180,240,111.5);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(197).to({startPosition:0,_off:false},0).wait(201).to({skewY:0},0).wait(213).to({skewY:180},0).wait(174).to({skewY:0},0).wait(212).to({skewY:180},0).wait(267).to({skewY:0},0).wait(301).to({skewY:180},0).wait(286).to({skewY:0},0).wait(457).to({skewY:180},0).wait(194).to({skewY:0},0).wait(281).to({skewY:180},0).wait(186).to({skewY:0},0).to({_off:true},390).wait(964));

	// renko_sad.png
	this.instance_21 = new lib.renko_sad_1("single",1);
	this.instance_21.setTransform(178.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(398).to({startPosition:0},0).wait(213).to({startPosition:1},0).wait(174).to({startPosition:0},0).to({_off:true},3).wait(3535));

	// renko_calm.png
	this.instance_22 = new lib.renko_calm_1("single",0);
	this.instance_22.setTransform(178.5,374.4,1,1,0,0,0,178.5,250);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(788).to({startPosition:0,_off:false},0).wait(1).to({y:376.3},0).wait(1).to({y:377.8},0).wait(1).to({y:378.9},0).wait(1).to({y:379.8},0).wait(1).to({y:380.5},0).wait(1).to({y:381.1},0).wait(1).to({y:381.4},0).wait(1).to({y:381.7},0).wait(1).to({y:381.9},0).wait(1).to({y:382},0).wait(1).to({startPosition:0},0).wait(198).to({startPosition:1},0).wait(267).to({startPosition:0},0).wait(301).to({startPosition:1},0).wait(286).to({startPosition:0},0).wait(285).to({startPosition:0},0).wait(172).to({startPosition:1},0).wait(194).to({startPosition:0},0).wait(281).to({startPosition:1},0).wait(186).to({startPosition:0},0).to({_off:true},390).wait(964));

	// calm.png
	this.instance_23 = new lib.merry_calm_1("single",1);
	this.instance_23.setTransform(461.5,382,1,1,0,0,0,178.5,250);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(197).to({startPosition:0},0).wait(201).to({startPosition:1},0).wait(213).to({startPosition:0},0).wait(174).to({startPosition:1},0).to({_off:true},212).wait(1786).to({startPosition:0,_off:false},0).wait(186).to({startPosition:1},0).to({_off:true},390).wait(964));

	// merry_troubled
	this.instance_24 = new lib.merry_troubled_1("single",0);
	this.instance_24.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(997).to({startPosition:0,_off:false},0).wait(267).to({startPosition:1},0).to({_off:true},301).wait(2758));

	// merry_disppointed.png
	this.instance_25 = new lib.merry_disppointed_1("single",0);
	this.instance_25.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1565).to({startPosition:0,_off:false},0).wait(286).to({startPosition:1},0).to({_off:true},457).wait(2015));

	// merry_nomal
	this.instance_26 = new lib.merry_nomal_1("single",0);
	this.instance_26.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(2308).to({startPosition:0,_off:false},0).wait(194).to({startPosition:1},0).to({_off:true},281).wait(1540));

	// hakureiShrine
	this.instance_27 = new lib.bg_ED_C();
	this.instance_27.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_27}]}).to({state:[]},3359).wait(964));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.9,0,660,642);


// symbols:
(lib.bg_ED_C = function() {
	this.initialize(img.bg_ED_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.C01 = function() {
	this.initialize(img.C01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C02 = function() {
	this.initialize(img.C02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C03 = function() {
	this.initialize(img.C03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C04 = function() {
	this.initialize(img.C04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C05 = function() {
	this.initialize(img.C05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C06 = function() {
	this.initialize(img.C06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C07 = function() {
	this.initialize(img.C07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C08 = function() {
	this.initialize(img.C08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C09 = function() {
	this.initialize(img.C09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C10 = function() {
	this.initialize(img.C10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C11 = function() {
	this.initialize(img.C11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C12 = function() {
	this.initialize(img.C12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C13 = function() {
	this.initialize(img.C13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.C14 = function() {
	this.initialize(img.C14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1000,96);


(lib.end_C = function() {
	this.initialize(img.end_C);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,60);


(lib.merry_calm = function() {
	this.initialize(img.merry_calm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_disppointed = function() {
	this.initialize(img.merry_disppointed);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_nomal = function() {
	this.initialize(img.merry_nomal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.merry_troubled = function() {
	this.initialize(img.merry_troubled);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_calm = function() {
	this.initialize(img.renko_calm);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_sad = function() {
	this.initialize(img.renko_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_troubled = function() {
	this.initialize(img.renko_troubled);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.voice1 = function() {
	this.initialize(img.voice1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.voice3 = function() {
	this.initialize(img.voice3);
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


(lib.renko_calm_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_calm();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_troubled_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_troubled();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_nomal_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_nomal();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_disppointed_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_disppointed();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_calm_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_calm();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.end_C_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.end_C();
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
