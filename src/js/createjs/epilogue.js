'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.epilogue = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{tenchou:2241});

	// timeline functions:
	this.frame_3 = function() {
	};

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(3).call(this.frame_3).wait(7857));

	// text
	this.instance = new lib.s1();
	this.instance.setTransform(191.8,62.7,0.752,0.752);

	this.instance_1 = new lib.s2();
	this.instance_1.setTransform(191.8,62.7,0.752,0.752);

	this.instance_2 = new lib.s3();
	this.instance_2.setTransform(191.8,62.7,0.752,0.752);

	this.instance_3 = new lib.s4();
	this.instance_3.setTransform(191.8,62.7,0.752,0.752);

	this.instance_4 = new lib.s5();
	this.instance_4.setTransform(191.8,62.7,0.752,0.752);

	this.instance_5 = new lib.s6();
	this.instance_5.setTransform(191.8,62.7,0.752,0.752);

	this.instance_6 = new lib.s7();
	this.instance_6.setTransform(191.8,62.7,0.752,0.752);

	this.instance_7 = new lib.s8();
	this.instance_7.setTransform(191.8,62.7,0.752,0.752);

	this.instance_8 = new lib.s9();
	this.instance_8.setTransform(191.8,62.7,0.752,0.752);

	this.instance_9 = new lib.s10();
	this.instance_9.setTransform(191.8,62.7,0.752,0.752);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance_1}]},267).to({state:[{t:this.instance_2}]},605).to({state:[{t:this.instance_3}]},257).to({state:[{t:this.instance_4}]},283).to({state:[{t:this.instance_5}]},206).to({state:[{t:this.instance_6}]},171).to({state:[{t:this.instance_7}]},448).to({state:[{t:this.instance_8}]},378).to({state:[{t:this.instance_9}]},409).to({state:[]},282).wait(4551));

	// textWindow
	this.instance_10 = new lib.voice1_1();
	this.instance_10.setTransform(320,111.5);

	this.instance_11 = new lib.voice2();
	this.instance_11.setTransform(320,111.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_10,p:{skewY:0}}]},4).to({state:[{t:this.instance_10,p:{skewY:180}}]},872).to({state:[{t:this.instance_10,p:{skewY:0}}]},257).to({state:[{t:this.instance_11}]},283).to({state:[{t:this.instance_10,p:{skewY:0}}]},206).to({state:[{t:this.instance_10,p:{skewY:180}}]},171).to({state:[{t:this.instance_10,p:{skewY:0}}]},448).to({state:[{t:this.instance_10,p:{skewY:0}}]},378).to({state:[{t:this.instance_10,p:{skewY:180}}]},409).to({state:[]},282).wait(4551));

	// bo
	this.instance_12 = new lib.bo();
	this.instance_12.setTransform(320,240);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(7535).to({_off:false},0).to({alpha:1},51).wait(275));

	// wo
	this.instance_13 = new lib.wo();
	this.instance_13.setTransform(320,240);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(3423).to({_off:false},0).to({alpha:1},132).wait(190).to({alpha:0},109).to({_off:true},1).wait(4006));

	// 1
	this.instance_14 = new lib._1_1();
	this.instance_14.setTransform(320,240);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(3745).to({_off:false},0).wait(358).to({alpha:0},35).to({_off:true},1).wait(3722));

	// 2
	this.instance_15 = new lib._2_1();
	this.instance_15.setTransform(320,240);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(4103).to({_off:false},0).wait(135).to({alpha:0},39).to({_off:true},1).wait(3583));

	// 3
	this.instance_16 = new lib._3_1();
	this.instance_16.setTransform(320,240);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(4103).to({_off:false},0).wait(345).to({alpha:0},71).to({_off:true},1).wait(3341));

	// 4
	this.instance_17 = new lib._4_1();
	this.instance_17.setTransform(320,240);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(4448).to({_off:false},0).wait(370).to({alpha:0},63).to({_off:true},1).wait(2979));

	// 5
	this.instance_18 = new lib._5_1();
	this.instance_18.setTransform(320,240);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(4818).to({_off:false},0).wait(377).to({alpha:0},65).to({_off:true},1).wait(2600));

	// 6
	this.instance_19 = new lib._6_1();
	this.instance_19.setTransform(320,240);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(5195).to({_off:false},0).wait(326).to({alpha:0},61).to({_off:true},1).wait(2278));

	// 7
	this.instance_20 = new lib._7_1();
	this.instance_20.setTransform(320,240);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(5521).to({_off:false},0).wait(378).to({alpha:0},63).to({_off:true},1).wait(1898));

	// 8
	this.instance_21 = new lib._8_1();
	this.instance_21.setTransform(320,240);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(5899).to({_off:false},0).wait(335).to({alpha:0},75).to({_off:true},1).wait(1551));

	// 9
	this.instance_22 = new lib._9_1();
	this.instance_22.setTransform(320,240);
	this.instance_22._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(6234).to({_off:false},0).wait(504).to({alpha:0},60).to({_off:true},1).wait(1062));

	// 10
	this.instance_23 = new lib._10_2();
	this.instance_23.setTransform(320,240);
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(6738).to({_off:false},0).wait(544).to({alpha:0},25).to({_off:true},1).wait(553));

	// 11
	this.instance_24 = new lib._11_1();
	this.instance_24.setTransform(320,240);
	this.instance_24._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(7282).to({_off:false},0).to({_off:true},305).wait(274));

	// renko
	this.instance_25 = new lib.renko_1();
	this.instance_25.setTransform(154.3,376.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(3310).to({x:259.4},113).to({_off:true},132).wait(4306));

	// merry
	this.instance_26 = new lib.merry_1();
	this.instance_26.setTransform(444.7,376.6);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1416).to({_off:false},0).to({_off:true},1612).wait(4833));

	// drenko
	this.instance_27 = new lib.dopperu();
	this.instance_27.setTransform(444.7,376.6);
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(876).to({_off:false},0).to({_off:true},540).wait(1612).to({_off:false},0).wait(282).to({x:385.6},113).to({_off:true},132).wait(4306));

	// bg
	this.instance_28 = new lib.hakureiShrine();
	this.instance_28.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_28}]}).to({state:[]},3555).wait(4306));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.1,0,664.2,626.6);


// symbols:
(lib._01 = function() {
	this.initialize(img._01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._02 = function() {
	this.initialize(img._02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._03 = function() {
	this.initialize(img._03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._04 = function() {
	this.initialize(img._04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._05 = function() {
	this.initialize(img._05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._06 = function() {
	this.initialize(img._06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._07 = function() {
	this.initialize(img._07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._08 = function() {
	this.initialize(img._08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._09 = function() {
	this.initialize(img._09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._10_1 = function() {
	this.initialize(img._10_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);

(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.drenko = function() {
	this.initialize(img.drenko);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.hakureiShrine = function() {
	this.initialize(img.hakureiShrine);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.merry = function() {
	this.initialize(img.merry);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko = function() {
	this.initialize(img.renko);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.s1 = function() {
	this.initialize(img.s1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s10 = function() {
	this.initialize(img.s10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s2 = function() {
	this.initialize(img.s2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s3 = function() {
	this.initialize(img.s3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s4 = function() {
	this.initialize(img.s4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s5 = function() {
	this.initialize(img.s5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s6 = function() {
	this.initialize(img.s6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s7 = function() {
	this.initialize(img.s7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s8 = function() {
	this.initialize(img.s8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


(lib.s9 = function() {
	this.initialize(img.s9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,105);


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
	this.instance.setTransform(-319.9,-239.9,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib.voice2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice3();
	this.instance.setTransform(-239.9,-111.4,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-239.9,-111.4,480,223);


(lib.voice1_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(-239.9,-111.4,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-239.9,-111.4,480,223);


(lib.renko_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko();
	this.instance.setTransform(178.5,-249.9,0.5,0.5,0,0,180);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-178.4,-249.9,357,500);


(lib.merry_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.merry();
	this.instance.setTransform(-178.4,-249.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-178.4,-249.9,357,500);


(lib.dopperu = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.drenko();
	this.instance.setTransform(-178.4,-249.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-178.4,-249.9,357,500);


(lib.bo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(-319.9,-239.9,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._11_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._11();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._10_2 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._10_1();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._9_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._09();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._8_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._08();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._7_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._07();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._6_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._06();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._5_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._05();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._4_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._04();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._3_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._03();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);


(lib._2_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._02();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640.1,480.1);


(lib._1_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib._01();
	this.instance.setTransform(-319.9,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;
