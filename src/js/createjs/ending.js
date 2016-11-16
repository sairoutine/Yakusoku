'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ending = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// bo
	this.instance = new lib.bo("synched",0);
	this.instance.setTransform(320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0},59).to({_off:true},1).wait(2050).to({startPosition:0,_off:false},0).to({alpha:1},91).wait(150).to({startPosition:0},0).to({alpha:0},57).to({_off:true},1).wait(1191));

	// wo
	this.instance_1 = new lib.wo("synched",0);
	this.instance_1.setTransform(320,240);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2351).to({startPosition:0,_off:false},0).wait(186).to({startPosition:0},0).to({alpha:0},124).to({_off:true},1).wait(938));

	// last
	this.instance_2 = new lib.last();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},2537).wait(1063));

	// renko_sil
	this.instance_3 = new lib.renko_d_sil_1("synched",0);
	this.instance_3.setTransform(59,-36.4);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2162).to({startPosition:0,_off:false},0).to({y:524.5},21).to({_off:true},1).wait(1416));

	// s1
	this.instance_4 = new lib.s1_1("synched",0);
	this.instance_4.setTransform(320,240);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(180).to({startPosition:0,_off:false},0).to({alpha:1},59).wait(310).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2990));

	// s2
	this.instance_5 = new lib.s2_1("synched",0);
	this.instance_5.setTransform(320,240);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(670).to({startPosition:0,_off:false},0).to({alpha:1},59).wait(310).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2500));

	// s3
	this.instance_6 = new lib.s3_1("synched",0);
	this.instance_6.setTransform(320,240);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1160).to({startPosition:0,_off:false},0).to({alpha:1},59).wait(310).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2010));

	// s4
	this.instance_7 = new lib.s4_1("synched",0);
	this.instance_7.setTransform(320,240);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1650).to({startPosition:0,_off:false},0).to({alpha:1},59).wait(310).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(1520));

	// renko
	this.instance_8 = new lib.renko("synched",0);
	this.instance_8.setTransform(567.5,240);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(2019).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(1520));

	// bg
	this.instance_9 = new lib.bg();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9}]}).wait(3600));

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


(lib.last = function() {
	this.initialize(img.last);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.renko_d = function() {
	this.initialize(img.renko_d);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,290,960);


(lib.renko_d_sil = function() {
	this.initialize(img.renko_d_sil);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,150,210);


(lib.s1 = function() {
	this.initialize(img.s1_e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,740,400);


(lib.s2 = function() {
	this.initialize(img.s2_e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,740,400);


(lib.s3 = function() {
	this.initialize(img.s3_e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,740,400);


(lib.s4 = function() {
	this.initialize(img.s4_e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,740,400);


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


(lib.s4_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s4();
	this.instance.setTransform(-184.9,-99.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-184.9,-99.9,370,200);


(lib.s3_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s3();
	this.instance.setTransform(-184.9,-99.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-184.9,-99.9,370,200);


(lib.s2_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s2();
	this.instance.setTransform(-184.9,-99.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-184.9,-99.9,370,200);


(lib.s1_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.s1();
	this.instance.setTransform(-184.9,-99.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-184.9,-99.9,370,200);


(lib.renko_d_sil_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d_sil();
	this.instance.setTransform(-37.4,-52.4,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-37.4,-52.4,75,105);


(lib.renko = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.renko_d();
	this.instance.setTransform(-72.4,-239.9,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-72.4,-239.9,145,480);


(lib.bo = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.BO();
	this.instance.setTransform(-319.9,-239.9,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-319.9,-239.9,640,480);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;
module.exports = lib;
