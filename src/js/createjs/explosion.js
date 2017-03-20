'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.explosion = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 22
	this.instance = new lib.ef_maru();
	this.instance.setTransform(480,480,1.982,1.982);
	this.instance.alpha = 0;
	this.instance.compositeOperation = "lighter";
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(97).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},10).to({scaleX:0.65,scaleY:0.65,alpha:0},3).to({_off:true},1).wait(182));

	// レイヤー 20
	this.instance_1 = new lib.ef_circle();
	this.instance_1.setTransform(480,480,2.645,2.645,0,0,0,256,256);
	this.instance_1.alpha = 0;
	this.instance_1.compositeOperation = "lighter";
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(90).to({_off:false},0).to({scaleX:0.7,scaleY:0.7,x:480.1,y:480.1,alpha:1},15).to({scaleX:0.19,scaleY:0.19,x:480,y:480,alpha:0},5).to({_off:true},1).wait(28).to({_off:false},0).to({scaleX:1.57,scaleY:1.57,alpha:1},7).to({scaleX:3.54,scaleY:3.54,alpha:0},45).to({_off:true},1).wait(101));

	// ex_s
	this.instance_2 = new lib.expl_s("synched",0,false);
	this.instance_2.setTransform(516.5,416.7,0.699,0.721,-135,0,0,31.9,32);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60).to({startPosition:0,_off:false},0).to({y:607.7,startPosition:39},39).to({_off:true},1).wait(193));

	// ex_s
	this.instance_3 = new lib.expl_s("synched",0,false);
	this.instance_3.setTransform(448.3,445,0.84,0.84,0,0,0,32,32);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(48).to({startPosition:0,_off:false},0).to({y:667,startPosition:39},39).to({_off:true},1).wait(205));

	// ex_s
	this.instance_4 = new lib.expl_s("synched",0,false);
	this.instance_4.setTransform(558.1,441.2,0.999,0.999,60.2,0,0,31.9,32);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({startPosition:0,_off:false},0).to({y:691.2,startPosition:39},39).to({_off:true},1).wait(219));

	// ex_s
	this.instance_5 = new lib.expl_s("synched",0,false);
	this.instance_5.setTransform(430,472.1,0.949,0.949,60.1,0,0,32.1,31.9);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({startPosition:0,_off:false},0).to({y:671,startPosition:39},39).to({_off:true},1).wait(232));

	// ex_s
	this.instance_6 = new lib.expl_s("synched",0,false);
	this.instance_6.setTransform(499.3,447.5,0.999,0.999,-21.4,0,0,31.9,32.1);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(13).to({startPosition:0,_off:false},0).to({y:666.5,startPosition:39},39).to({_off:true},1).wait(240));

	// ex_s
	this.instance_7 = new lib.expl_s("synched",0,false);
	this.instance_7.setTransform(482.6,490.5,1.099,1.099,14.8,0,0,31.9,32);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regY:31.9,scaleX:1,scaleY:1,y:767.4,startPosition:39},39).to({_off:true},1).wait(253));

	// ex
	this.instance_8 = new lib.ef_smole();
	this.instance_8.setTransform(474.2,494.8,0.77,0.77,176,0,0,128,128);
	this.instance_8.compositeOperation = "lighter";
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(145).to({_off:false},0).to({scaleX:4.95,scaleY:4.95,rotation:227.3,x:554.9,y:502.9},6,cjs.Ease.get(1)).to({scaleX:12.37,scaleY:12.37,rotation:257.3,x:535.5,y:476.8,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_9 = new lib.ef_smole();
	this.instance_9.setTransform(463.7,518,0.577,0.577,23.2,0,0,128.1,128);
	this.instance_9.compositeOperation = "lighter";
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(145).to({_off:false},0).to({regX:128,scaleX:3.24,scaleY:3.24,rotation:74.4,x:382.3,y:569.6},6,cjs.Ease.get(1)).to({scaleX:9.28,scaleY:9.28,rotation:104.4,x:140.8,y:365.2,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_10 = new lib.ef_smole();
	this.instance_10.setTransform(466.1,466.7,0.577,0.577,175.9,0,0,128,128.1);
	this.instance_10.compositeOperation = "lighter";
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(145).to({_off:false},0).to({regY:128,scaleX:2.97,scaleY:2.97,rotation:182.3,x:372.3,y:404.4},6,cjs.Ease.get(1)).to({scaleX:9.28,scaleY:9.28,rotation:159.4,x:141.9,y:347.9,alpha:0},57).to({_off:true},1).wait(84));

	// ex
	this.instance_11 = new lib.ef_smole();
	this.instance_11.setTransform(497,494,0.481,0.481,-18.6,0,0,127.9,128.1);
	this.instance_11.compositeOperation = "lighter";
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(145).to({_off:false},0).to({regX:128,regY:128,scaleX:3.18,scaleY:3.18,rotation:-12.3,x:574.7,y:502.5},6,cjs.Ease.get(1)).to({scaleX:7.74,scaleY:7.74,rotation:-35,x:743.8,y:626.5,alpha:0},57).to({_off:true},1).wait(84));

	// レイヤー 18
	this.instance_12 = new lib.ef_smole_b();
	this.instance_12.setTransform(424.1,498.8,6.627,6.627,165,0,0,64,64);
	this.instance_12.alpha = 0.602;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(151).to({_off:false},0).to({scaleX:10.96,scaleY:10.96,x:368.1,y:484.3,alpha:0},139,cjs.Ease.get(1)).to({_off:true},1).wait(2));

	// レイヤー 17
	this.instance_13 = new lib.ef_smole_b();
	this.instance_13.setTransform(514.1,471.5,6.627,6.627,0,0,0,64,64);
	this.instance_13.alpha = 0.602;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(151).to({_off:false},0).to({scaleX:7.92,scaleY:7.92,rotation:30,x:586.7,y:506.7,alpha:0},139,cjs.Ease.get(1)).to({_off:true},1).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(243.2,246.1,472.7,465.1);


// symbols:
(lib.circle = function() {
	this.initialize(img.ef_circle);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.ef_smoke = function() {
	this.initialize(img.ef_smoke);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_b = function() {
	this.initialize(img.ef_smoke_b);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_s = function() {
	this.initialize(img.ef_smoke_s);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.maru = function() {
	this.initialize(img.maru);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,300,300);


(lib.ef_smole_b = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke_b();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,128,128);


(lib.ef_smole = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,256,256);


(lib.ef_smoke_s_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.ef_smoke_s();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,64,64);


(lib.ef_maru = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.maru();
	this.instance.setTransform(-74.9,-74.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-74.9,-74.9,150,150);


(lib.ef_circle = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.circle();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,512,512);


(lib.expl_s = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 3
	this.instance = new lib.ef_smoke_s_1();
	this.instance.setTransform(32,32,1,1,135,0,0,32,32);
	this.instance.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:2.39,scaleY:2.39,rotation:113.1,x:32.3,y:31.9},5,cjs.Ease.get(-0.99)).to({regX:32.1,scaleX:2.96,scaleY:2.96,rotation:105,x:32.2,y:32.3,alpha:0},29,cjs.Ease.get(1)).to({_off:true},1).wait(5));

	// レイヤー 1
	this.instance_1 = new lib.ef_smoke_s_1();
	this.instance_1.setTransform(32,32,1,1,0,0,0,32,32);
	this.instance_1.compositeOperation = "lighter";

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:2.03,scaleY:2.03,rotation:30,y:31.9},4,cjs.Ease.get(-0.99)).to({regX:31.9,scaleX:2.39,scaleY:2.39,rotation:45,x:31.9,alpha:0},29,cjs.Ease.get(1)).to({_off:true},1).wait(6));

	// レイヤー 4
	this.instance_2 = new lib.ef_smole_b();
	this.instance_2.setTransform(22.4,34.8,0.523,0.523,30,0,0,63.8,63.9);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:63.9,scaleX:1.26,scaleY:1.26,rotation:55.8,x:21.7,y:28.8,alpha:0.41},5,cjs.Ease.get(-0.99)).to({regX:63.8,regY:64,scaleX:1.65,scaleY:1.65,rotation:67,x:21.6,y:22,alpha:0},32,cjs.Ease.get(1)).to({_off:true},1).wait(2));

	// レイヤー 2
	this.instance_3 = new lib.ef_smole_b();
	this.instance_3.setTransform(43.3,26.8,0.523,0.523,-29.9,0,0,63.9,64);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:64,scaleX:1.26,scaleY:1.26,x:45.6,y:18.3,alpha:0.5},5,cjs.Ease.get(-0.99)).to({scaleX:1.5,scaleY:1.5,rotation:-44.8,x:42.8,y:15.4,alpha:0},34,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.2,-18.8,112.3,99.4);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;
