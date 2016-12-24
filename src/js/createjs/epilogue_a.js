'use strict';
var createjs = require("../createjs");
var images = require("../image_store");
var lib = {};
(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.ED_A = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// BO
	this.instance = new lib.bo("synched",0);
	this.instance.setTransform(320,240,1,1,0,0,0,320,240);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(29).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(10012).to({startPosition:0,_off:false},0).to({alpha:1},20).wait(109));

	// RO
	this.instance_1 = new lib.ro("synched",0);
	this.instance_1.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(478).to({startPosition:0,_off:false},0).to({alpha:0},6).to({_off:true},1).wait(386).to({alpha:1,_off:false},0).to({alpha:0},6).to({_off:true},1).wait(9353));

	// WO
	this.instance_2 = new lib.wo("synched",0);
	this.instance_2.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7362).to({startPosition:0,_off:false},0).to({alpha:1},67).wait(595).to({startPosition:0},0).to({alpha:0},60).to({_off:true},1).wait(2146));

	// textmask_1
	this.instance_3 = new lib.wo("synched",0);
	this.instance_3.setTransform(312,69,0.375,0.063,0,0,180,320,240);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(198).to({startPosition:0,_off:false},0).to({regX:318.9,scaleX:0.17,x:378.7},28).to({_off:true},1).wait(264).to({regX:320,scaleX:0.38,x:312,_off:false},0).to({scaleX:0.23,x:358.3},4).to({_off:true},1).wait(92).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(6).to({regX:320,scaleX:0.38,x:312},0).to({scaleX:0.2,x:368.3},15).to({_off:true},1).wait(392).to({scaleX:0.38,x:312,_off:false},0).to({scaleX:0.19,x:370},33).to({_off:true},1).wait(334).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(4).to({regX:320,scaleX:0.38,x:312},0).to({regX:319.2,scaleX:0.03,x:423.4},29).to({_off:true},1).wait(224).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(10).to({regX:320,scaleX:0.38,x:312},0).to({regX:319.2,scaleX:0.03,x:423.4},34).to({_off:true},1).wait(287).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(4).to({startPosition:0},0).to({regX:319.2,scaleX:0.03,x:423.4},27).to({_off:true},1).wait(195).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(10).to({startPosition:0},0).to({regX:319.2,scaleX:0.03,x:423.4},30).to({_off:true},1).wait(211).to({regX:319.9,scaleX:0.37,x:314.9,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.2,scaleX:0.19,x:371.1},26).to({_off:true},1).wait(241).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({scaleX:0.19,x:372.5},19).to({_off:true},1).wait(347).to({regX:320.1,scaleX:0.36,x:315.8,_off:false},0).wait(4).to({scaleX:0.37,x:315.2},0).to({regX:319.9,scaleX:0.11,x:398},30).to({_off:true},1).wait(342).to({regX:320.1,scaleX:0.37,x:313.9,_off:false},0).wait(9).to({regX:319.9,scaleX:0.37,x:314.2},0).to({regX:320,scaleX:0.26,x:348.9},5).to({_off:true},1).wait(297).to({regX:319.9,scaleX:0.37,x:313.9,_off:false},0).wait(5).to({regX:320,scaleX:0.37,x:314.2},0).to({regX:320.2,scaleX:0.16,x:381.1},15).to({_off:true},1).wait(383).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(8).to({startPosition:0},0).to({scaleX:0.22,x:360.5},21).to({_off:true},1).wait(314).to({scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({regX:320.3,scaleX:0.07,x:408.9},43).to({_off:true},1).wait(377).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({scaleX:0.28,x:341.2},10).to({_off:true},1).wait(333).to({scaleX:0.37,x:315.2,_off:false},0).wait(7).to({regX:320.1,x:315.1},0).to({regX:319.9,scaleX:0.25,x:352},15).to({_off:true},1).wait(243).to({regX:320,scaleX:0.36,x:315.4,_off:false},0).wait(10).to({scaleX:0.37},0).to({regX:319.8,scaleX:0.13,x:389.5},20).to({_off:true},1).wait(165).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(4).to({startPosition:0},0).to({regX:326.2,scaleX:0,x:430.9},39).to({_off:true},1).wait(336).to({regX:320,scaleX:0.37,x:315.4,_off:false},0).wait(6).to({regX:319.9,scaleX:0.36,x:315.8},0).to({regX:319.7,scaleX:0.07,x:411},32).to({_off:true},1).wait(328).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(5).to({startPosition:0},0).to({regX:319.7,scaleX:0.09,x:403.9},34).to({_off:true},1).wait(297).to({regX:319.9,scaleX:0.37,x:315.2,_off:false},0).wait(5).to({scaleX:0.36,x:315.8},0).to({regX:320,scaleX:0.15,x:385.4},26).to({_off:true},1).wait(235).to({scaleX:0.38,x:312,_off:false},0).wait(7).to({startPosition:0},0).to({scaleX:0.17,x:378.4},20).to({_off:true},1).wait(3097));

	// textmask_2
	this.instance_4 = new lib.wo("synched",0);
	this.instance_4.setTransform(328,100,0.425,0.063,0,0,180,320,240);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(198).to({startPosition:0,_off:false},0).wait(57).to({startPosition:0},0).to({regX:319.2,scaleX:0.16,x:414.6},30).to({_off:true},1).wait(302).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(50).to({startPosition:0},0).to({regX:319.9,scaleX:0.21,x:397.5},28).to({_off:true},1).wait(335).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(70).to({startPosition:0},0).to({regX:319.9,scaleX:0.29,x:370.8},31).to({_off:true},1).wait(1335).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(46).to({startPosition:0},0).to({scaleX:0.16,x:414.5},30).to({_off:true},1).wait(196).to({scaleX:0.43,x:328,_off:false},0).wait(39).to({startPosition:0},0).to({scaleX:0.21,x:398},30).to({_off:true},1).wait(301).to({scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({scaleX:0.19,x:404.5},32).to({_off:true},1).wait(283).to({scaleX:0.43,x:328,_off:false},0).wait(44).to({startPosition:0},0).to({scaleX:0.3,x:369.7},10).to({_off:true},1).wait(257).to({scaleX:0.43,x:328,_off:false},0).wait(37).to({startPosition:0},0).to({regX:319.6,scaleX:0.05,x:447},42).to({_off:true},1).wait(324).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(49).to({startPosition:0},0).to({scaleX:0.16,x:412.7},36).to({_off:true},1).wait(258).to({scaleX:0.43,x:328,_off:false},0).wait(64).to({startPosition:0},0).to({regX:317.8,scaleX:0.01,x:461.1},49).to({_off:true},1).wait(311).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(27).to({startPosition:0},0).to({scaleX:0.15,x:415.5},26).to({_off:true},1).wait(756).to({scaleX:0.43,x:328,_off:false},0).wait(72).to({startPosition:0},0).to({scaleX:0.08,x:437.6},36).to({_off:true},1).wait(271).to({scaleX:0.43,x:328,_off:false},0).wait(66).to({startPosition:0},0).to({regX:319.9,scaleX:0.15,x:415.8},34).to({_off:true},1).wait(266).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(82).to({startPosition:0},0).to({regX:319.8,scaleX:0.14,x:419.7},40).to({_off:true},1).wait(214).to({regX:320,scaleX:0.43,x:328,_off:false},0).wait(61).to({startPosition:0},0).to({regX:319.9,scaleX:0.29,x:371.3},15).to({_off:true},1).wait(3315));

	// textmask_3
	this.instance_5 = new lib.wo("synched",0);
	this.instance_5.setTransform(312,131,0.375,0.063,0,0,180,320,240);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(198).to({startPosition:0,_off:false},0).wait(94).to({startPosition:0},0).to({regX:318.8,scaleX:0.12,x:393.4},31).to({_off:true},1).wait(678).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(149).to({startPosition:0},0).to({scaleX:0.22,x:361.3},29).to({_off:true},1).wait(1531).to({scaleX:0.38,x:312,_off:false},0).wait(97).to({startPosition:0},0).to({regX:319.4,scaleX:0.01,x:429.5},37).to({_off:true},1).wait(236).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(127).to({startPosition:0},0).to({regX:320.1,scaleX:0.03,x:422.5},34).to({_off:true},1).wait(215).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(83).to({startPosition:0},0).to({scaleX:0.07,x:409},10).to({_off:true},1).wait(218).to({scaleX:0.38,x:312,_off:false},0).wait(121).to({startPosition:0},0).to({regX:318.6,scaleX:0.02,x:427.3},46).to({_off:true},1).wait(236).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(124).to({startPosition:0},0).to({scaleX:0.19,x:370.8},26).to({_off:true},1).wait(193).to({scaleX:0.38,x:312,_off:false},0).wait(163).to({startPosition:0},0).to({scaleX:0.06,x:412.2},35).to({_off:true},1).wait(226).to({scaleX:0.38,x:312,_off:false},0).wait(93).to({startPosition:0},0).to({regX:319.8,scaleX:0.14,x:387.3},34).to({_off:true},1).wait(682).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(158).to({startPosition:0},0).to({regX:319.9,scaleX:0.17,x:377.7},22).to({_off:true},1).wait(199).to({regX:320,scaleX:0.38,x:312,_off:false},0).wait(120).to({startPosition:0},0).to({scaleX:0.09,x:402},36).to({_off:true},1).wait(210).to({scaleX:0.38,x:312,_off:false},0).wait(136).to({startPosition:0},0).to({regX:320.2,scaleX:0.17,x:379.2},29).to({_off:true},1).wait(3563));

	// text
	this.instance_6 = new lib.A01();
	this.instance_6.setTransform(80,0,0.5,0.5);

	this.instance_7 = new lib.A02();
	this.instance_7.setTransform(80,0,0.5,0.5);

	this.instance_8 = new lib.A03();
	this.instance_8.setTransform(80,0,0.5,0.5);

	this.instance_9 = new lib.A04();
	this.instance_9.setTransform(80,0,0.5,0.5);

	this.instance_10 = new lib.A05();
	this.instance_10.setTransform(80,0,0.5,0.5);

	this.instance_11 = new lib.A06();
	this.instance_11.setTransform(80,0,0.5,0.5);

	this.instance_12 = new lib.A07();
	this.instance_12.setTransform(80,0,0.5,0.5);

	this.instance_13 = new lib.A08();
	this.instance_13.setTransform(80,0,0.5,0.5);

	this.instance_14 = new lib.A09();
	this.instance_14.setTransform(80,0,0.5,0.5);

	this.instance_15 = new lib.A10();
	this.instance_15.setTransform(80,0,0.5,0.5);

	this.instance_16 = new lib.A11();
	this.instance_16.setTransform(80,0,0.5,0.5);

	this.instance_17 = new lib.A12();
	this.instance_17.setTransform(80,0,0.5,0.5);

	this.instance_18 = new lib.A13();
	this.instance_18.setTransform(80,0,0.5,0.5);

	this.instance_19 = new lib.A14();
	this.instance_19.setTransform(80,0,0.5,0.5);

	this.instance_20 = new lib.A15();
	this.instance_20.setTransform(80,0,0.5,0.5);

	this.instance_21 = new lib.A16();
	this.instance_21.setTransform(80,0,0.5,0.5);

	this.instance_22 = new lib.A17();
	this.instance_22.setTransform(80,0,0.5,0.5);

	this.instance_23 = new lib.A18();
	this.instance_23.setTransform(80,0,0.5,0.5);

	this.instance_24 = new lib.A19();
	this.instance_24.setTransform(80,0,0.5,0.5);

	this.instance_25 = new lib.A20();
	this.instance_25.setTransform(80,0,0.5,0.5);

	this.instance_26 = new lib.A21();
	this.instance_26.setTransform(80,0,0.5,0.5);

	this.instance_27 = new lib.A22();
	this.instance_27.setTransform(80,0,0.5,0.5);

	this.instance_28 = new lib.A23();
	this.instance_28.setTransform(80,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},198).to({state:[]},280).to({state:[{t:this.instance_7}]},13).to({state:[{t:this.instance_8}]},97).to({state:[]},284).to({state:[{t:this.instance_9}]},130).to({state:[{t:this.instance_10}]},368).to({state:[{t:this.instance_11}]},258).to({state:[]},246).to({state:[{t:this.instance_12}]},86).to({state:[{t:this.instance_13}]},227).to({state:[{t:this.instance_14}]},252).to({state:[{t:this.instance_15}]},273).to({state:[{t:this.instance_16}]},371).to({state:[{t:this.instance_17}]},377).to({state:[{t:this.instance_18}]},312).to({state:[{t:this.instance_19}]},404).to({state:[{t:this.instance_20}]},344).to({state:[{t:this.instance_21}]},425).to({state:[{t:this.instance_22}]},348).to({state:[]},142).to({state:[{t:this.instance_23}]},124).to({state:[{t:this.instance_24}]},196).to({state:[{t:this.instance_25}]},380).to({state:[{t:this.instance_26}]},367).to({state:[{t:this.instance_27}]},337).to({state:[{t:this.instance_28}]},267).to({state:[]},203).to({state:[]},2834).wait(88));

	// voice_base03
	this.instance_29 = new lib.voice_3("synched",0);
	this.instance_29.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(478).to({startPosition:0,_off:false},0).to({_off:true},110).wait(2872).to({skewY:180,_off:false},0).to({_off:true},716).wait(6055));

	// voice_base01
	this.instance_30 = new lib.voice_1("synched",0);
	this.instance_30.setTransform(320,111.5,1,1,0,0,0,240,111.5);
	this.instance_30._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(188).to({startPosition:0,_off:false},0).to({_off:true},290).wait(110).to({startPosition:0,_off:false},0).to({_off:true},284).wait(115).to({startPosition:0,_off:false},0).to({_off:true},887).wait(80).to({skewY:180,_off:false},0).wait(233).to({skewY:0},0).wait(252).to({skewY:180},0).wait(273).to({skewY:0},0).wait(371).to({skewY:180},0).to({_off:true},377).wait(716).to({skewY:0,_off:false},0).wait(1117).to({skewY:180},0).to({_off:true},142).wait(124).to({startPosition:0,_off:false},0).wait(196).to({skewY:0},0).wait(380).to({skewY:180},0).wait(367).to({skewY:0},0).wait(337).to({skewY:180},0).wait(267).to({skewY:0},0).to({_off:true},203).wait(2922));

	// anger.png
	this.instance_31 = new lib.renko_anger_1("single",0);
	this.instance_31.setTransform(67.5,382,1,1,0,0,0,178.5,250);
	this.instance_31.alpha = 0;
	this.instance_31._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(155).to({startPosition:0,_off:false},0).wait(1).to({x:76.2,alpha:0.078},0).wait(1).to({x:84.5,alpha:0.148},0).wait(1).to({x:92.6,alpha:0.23},0).wait(1).to({x:100.3,alpha:0.301},0).wait(1).to({x:107.7,alpha:0.359},0).wait(1).to({x:114.7,alpha:0.43},0).wait(1).to({x:121.4,alpha:0.48},0).wait(1).to({x:127.7,alpha:0.539},0).wait(1).to({x:133.7,alpha:0.602},0).wait(1).to({x:139.2,alpha:0.641},0).wait(1).to({x:144.4,alpha:0.691},0).wait(1).to({x:149.3,alpha:0.73},0).wait(1).to({x:153.7,alpha:0.781},0).wait(1).to({x:157.7,alpha:0.809},0).wait(1).to({x:161.4,alpha:0.852},0).wait(1).to({x:164.7,alpha:0.879},0).wait(1).to({x:167.7,alpha:0.898},0).wait(1).to({x:170.3,alpha:0.93},0).wait(1).to({x:172.5,alpha:0.949},0).wait(1).to({x:174.4,alpha:0.961},0).wait(1).to({x:175.9,alpha:0.98},0).wait(1).to({x:177,alpha:0.988},0).wait(1).to({x:177.9},0).wait(1).to({x:178.4,alpha:1},0).wait(1).to({x:178.5},0).to({_off:true},298).wait(9753));

	// pain.png
	this.instance_32 = new lib.renko_pain_1("single",0);
	this.instance_32.setTransform(169.9,386.5,1,1,0,0,0,178.5,250);
	this.instance_32._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(478).to({startPosition:0,_off:false},0).wait(3).to({x:186.3,y:375.4},0).wait(3).to({x:170.7,y:375.5},0).wait(3).to({x:183.1,y:386.2},0).wait(3).to({x:178.5,y:382},0).wait(402).to({startPosition:0},0).to({alpha:0},6).to({_off:true},1).wait(9332));

	// pain_blood.png
	this.instance_33 = new lib.renko_pain_blood_1("single",0);
	this.instance_33.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(872).to({startPosition:0,_off:false},0).to({_off:true},756).wait(8603));

	// troubled_blood.png
	this.instance_34 = new lib.renko_troubled_blood_1("single",0);
	this.instance_34.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1628).to({startPosition:0,_off:false},0).wait(326).to({startPosition:1},0).wait(233).to({startPosition:0},0).wait(252).to({startPosition:1},0).to({_off:true},273).wait(748).to({startPosition:1,_off:false},0).to({_off:true},716).wait(6055));

	// calm_blood.png
	this.instance_35 = new lib.renko_calm_blood_1("single",0);
	this.instance_35.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(2712).to({startPosition:0,_off:false},0).wait(371).to({startPosition:1},0).to({_off:true},377).wait(716).to({startPosition:0,_off:false},0).to({_off:true},344).wait(773).to({startPosition:1,_off:false},0).to({_off:true},462).wait(4476));

	// smile_blood.png
	this.instance_36 = new lib.renko_smile_blood_1("single",0);
	this.instance_36.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_36._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(4520).to({startPosition:0,_off:false},0).to({_off:true},773).wait(4938));

	// nomal_blood.png
	this.instance_37 = new lib.renko_nomal_blood_1("single",0);
	this.instance_37.setTransform(178.5,382,1,1,0,0,0,178.5,250);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(5755).to({startPosition:0,_off:false},0).wait(380).to({startPosition:1},0).wait(367).to({startPosition:0},0).wait(337).to({startPosition:1},0).wait(267).to({startPosition:0},0).wait(203).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:178.6},0).wait(1).to({startPosition:0},0).wait(1).to({x:178.7},0).wait(1).to({x:178.9},0).wait(1).to({x:179},0).wait(1).to({x:179.2},0).wait(1).to({x:179.4},0).wait(1).to({x:179.6},0).wait(1).to({x:179.9},0).wait(1).to({x:180.2},0).wait(1).to({x:180.5},0).wait(1).to({x:180.9},0).wait(1).to({x:181.2},0).wait(1).to({x:181.6},0).wait(1).to({x:182.1},0).wait(1).to({x:182.5},0).wait(1).to({x:183},0).wait(1).to({x:183.5},0).wait(1).to({x:184.1},0).wait(1).to({x:184.7},0).wait(1).to({x:185.3},0).wait(1).to({x:185.9},0).wait(1).to({x:186.6},0).wait(1).to({x:187.3},0).wait(1).to({x:188},0).wait(1).to({x:188.7},0).wait(1).to({x:189.5},0).wait(1).to({x:190.3},0).wait(1).to({x:191.1},0).wait(1).to({x:192},0).wait(1).to({x:192.9},0).wait(1).to({x:193.8},0).wait(1).to({x:194.7},0).wait(1).to({x:195.7},0).wait(1).to({x:196.6},0).wait(1).to({x:197.6},0).wait(1).to({x:198.7},0).wait(1).to({x:199.7},0).wait(1).to({x:200.8},0).wait(1).to({x:201.9},0).wait(1).to({x:203},0).wait(1).to({x:204.2},0).wait(1).to({x:205.3},0).wait(1).to({x:206.5},0).wait(1).to({x:207.7},0).wait(1).to({x:208.9},0).wait(1).to({x:210.2},0).wait(1).to({x:211.4},0).wait(1).to({x:212.7},0).wait(1).to({x:214},0).wait(1).to({x:215.3},0).wait(1).to({x:216.6},0).wait(1).to({x:217.9},0).wait(1).to({x:219.3},0).wait(1).to({x:220.6},0).wait(1).to({x:222},0).wait(1).to({x:223.4},0).wait(1).to({x:224.7},0).wait(1).to({x:226.1},0).wait(1).to({x:227.5},0).wait(1).to({x:228.9},0).wait(1).to({x:230.3},0).wait(1).to({x:231.7},0).wait(1).to({x:233},0).wait(1).to({x:234.4},0).wait(1).to({x:235.8},0).wait(1).to({x:237.2},0).wait(1).to({x:238.6},0).wait(1).to({x:240},0).wait(1).to({x:241.3},0).wait(1).to({x:242.7},0).wait(1).to({x:244},0).wait(1).to({x:245.4},0).wait(1).to({x:246.7},0).wait(1).to({x:248},0).wait(1).to({x:249.3},0).wait(1).to({x:250.6},0).wait(1).to({x:251.9},0).wait(1).to({x:253.1},0).wait(1).to({x:254.3},0).wait(1).to({x:255.5},0).wait(1).to({x:256.7},0).wait(1).to({x:257.9},0).wait(1).to({x:259.1},0).wait(1).to({x:260.2},0).wait(1).to({x:261.3},0).wait(1).to({x:262.3},0).wait(1).to({x:263.4},0).wait(1).to({x:264.4},0).wait(1).to({x:265.4},0).wait(1).to({x:266.4},0).wait(1).to({x:267.3},0).wait(1).to({x:268.2},0).wait(1).to({x:269.1},0).wait(1).to({x:269.9},0).wait(1).to({x:270.7},0).wait(1).to({x:271.5},0).wait(1).to({x:272.3},0).wait(1).to({x:273},0).wait(1).to({x:273.7},0).wait(1).to({x:274.3},0).wait(1).to({x:274.9},0).wait(1).to({x:275.5},0).wait(1).to({x:276},0).wait(1).to({x:276.6},0).wait(1).to({x:277},0).wait(1).to({x:277.5},0).wait(1).to({x:277.9},0).wait(1).to({x:278.3},0).wait(1).to({x:278.6},0).wait(1).to({x:278.9},0).wait(1).to({x:279.2},0).wait(1).to({x:279.4},0).wait(1).to({x:279.6},0).wait(1).to({x:279.7},0).wait(1).to({x:279.9},0).wait(1).to({x:280},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},62).wait(2740));

	// sad.png
	this.instance_38 = new lib.merry_sad_1("single",0);
	this.instance_38.setTransform(542.5,382,1,1,0,0,0,178.5,250);
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(3460).to({startPosition:0,_off:false},0).wait(1).to({x:506.2},0).wait(1).to({x:487},0).wait(1).to({x:475.8},0).wait(1).to({x:469.1},0).wait(1).to({x:465.1},0).wait(1).to({x:462.9},0).wait(1).to({x:461.8},0).wait(1).to({x:461.5},0).wait(1).to({x:455,y:374.3},0).wait(3).to({x:464.1,y:384.1},0).wait(3).to({x:463.9,y:381},0).wait(3).to({x:460.5,y:383.3},0).wait(3).to({x:461.5,y:382},0).wait(695).to({startPosition:1},0).wait(1117).to({startPosition:0},0).wait(186).to({startPosition:0},0).wait(1).to({x:461.7},0).wait(1).to({x:462.1,alpha:0.988},0).wait(1).to({x:462.8,alpha:0.98},0).wait(1).to({x:463.8,alpha:0.969},0).wait(1).to({x:465.1,alpha:0.961},0).wait(1).to({x:466.7,alpha:0.941},0).wait(1).to({x:468.5,alpha:0.91},0).wait(1).to({x:470.5,alpha:0.891},0).wait(1).to({x:472.8,alpha:0.859},0).wait(1).to({x:475.3,alpha:0.828},0).wait(1).to({x:478,alpha:0.801},0).wait(1).to({x:480.9,alpha:0.762},0).wait(1).to({x:484,alpha:0.719},0).wait(1).to({x:487.2,alpha:0.68},0).wait(1).to({x:490.6,alpha:0.641},0).wait(1).to({x:494,alpha:0.602},0).wait(1).to({x:497.6,alpha:0.551},0).wait(1).to({x:501.2,alpha:0.512},0).wait(1).to({x:504.9,alpha:0.461},0).wait(1).to({x:508.7,alpha:0.422},0).wait(1).to({x:512.4,alpha:0.371},0).wait(1).to({x:516.1,alpha:0.328},0).wait(1).to({x:519.8,alpha:0.281},0).wait(1).to({x:523.4,alpha:0.238},0).wait(1).to({x:526.9,alpha:0.191},0).wait(1).to({x:530.3,alpha:0.148},0).wait(1).to({x:533.6,alpha:0.109},0).wait(1).to({x:536.7,alpha:0.07},0).wait(1).to({x:539.7,alpha:0.039},0).wait(1).to({x:542.5,alpha:0},0).to({_off:true},1).wait(4721));

	// nomal.png
	this.instance_39 = new lib.ganger_nomal_1("single",1);
	this.instance_39.setTransform(601.5,382,1,1,0,0,0,178.5,250);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1874).to({startPosition:1,_off:false},0).wait(1).to({x:585.5,alpha:0.109},0).wait(1).to({x:571.5,alpha:0.211},0).wait(1).to({x:559.2,alpha:0.301},0).wait(1).to({x:548.4,alpha:0.379},0).wait(1).to({x:538.8,alpha:0.449},0).wait(1).to({x:530.4,alpha:0.512},0).wait(1).to({x:522.8,alpha:0.559},0).wait(1).to({x:516.1,alpha:0.609},0).wait(1).to({x:510.1,alpha:0.648},0).wait(1).to({x:504.7,alpha:0.691},0).wait(1).to({x:499.8,alpha:0.73},0).wait(1).to({x:495.5,alpha:0.762},0).wait(1).to({x:491.6,alpha:0.789},0).wait(1).to({x:488.1,alpha:0.809},0).wait(1).to({x:485,alpha:0.828},0).wait(1).to({x:482.2,alpha:0.852},0).wait(1).to({x:479.7,alpha:0.871},0).wait(1).to({x:477.4,alpha:0.891},0).wait(1).to({x:475.4,alpha:0.898},0).wait(1).to({x:473.6,alpha:0.91},0).wait(1).to({x:472,alpha:0.93},0).wait(1).to({x:470.5,alpha:0.941},0).wait(1).to({x:469.2,alpha:0.949},0).wait(1).to({x:468.1},0).wait(1).to({x:467.1,alpha:0.961},0).wait(1).to({x:466.2},0).wait(1).to({x:465.4,alpha:0.969},0).wait(1).to({x:464.7,alpha:0.98},0).wait(1).to({x:464.1},0).wait(1).to({x:463.6},0).wait(1).to({x:463.2,alpha:0.988},0).wait(1).to({x:462.8},0).wait(1).to({x:462.5},0).wait(1).to({x:462.2,alpha:1},0).wait(1).to({x:462},0).wait(1).to({x:461.9},0).wait(1).to({x:461.7},0).wait(1).to({x:461.6},0).wait(1).to({startPosition:1},0).wait(1).to({x:461.5},0).wait(1).to({startPosition:1},0).wait(39).to({startPosition:0},0).wait(233).to({startPosition:1},0).wait(252).to({startPosition:0},0).wait(273).to({startPosition:1},0).wait(371).to({startPosition:0},0).to({_off:true},377).wait(2028).to({x:513.6,alpha:0,_off:false},0).wait(1).to({x:508.7,alpha:0.09},0).wait(1).to({x:504.2,alpha:0.18},0).wait(1).to({x:500,alpha:0.262},0).wait(1).to({x:496,alpha:0.34},0).wait(1).to({x:492.3,alpha:0.41},0).wait(1).to({x:488.8,alpha:0.48},0).wait(1).to({x:485.4,alpha:0.539},0).wait(1).to({x:482.3,alpha:0.602},0).wait(1).to({x:479.4,alpha:0.66},0).wait(1).to({x:476.7,alpha:0.711},0).wait(1).to({x:474.2,alpha:0.762},0).wait(1).to({x:471.9,alpha:0.801},0).wait(1).to({x:469.8,alpha:0.84},0).wait(1).to({x:468,alpha:0.879},0).wait(1).to({x:466.3,alpha:0.91},0).wait(1).to({x:464.9,alpha:0.93},0).wait(1).to({x:463.7,alpha:0.961},0).wait(1).to({x:462.8,alpha:0.98},0).wait(1).to({x:462.1,alpha:0.988},0).wait(1).to({x:461.7,alpha:1},0).wait(1).to({x:461.5},0).wait(246).to({startPosition:1},0).to({_off:true},380).wait(4096));

	// smile.png
	this.instance_40 = new lib.ganger_smile_1("single",0);
	this.instance_40.setTransform(461.5,382,1,1,0,0,0,178.5,250);
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(6135).to({startPosition:0,_off:false},0).wait(367).to({startPosition:1},0).wait(337).to({startPosition:0},0).wait(267).to({startPosition:0},0).wait(203).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:461.4},0).wait(1).to({x:461.3},0).wait(1).to({x:461.2},0).wait(1).to({x:461},0).wait(1).to({x:460.8},0).wait(1).to({x:460.6},0).wait(1).to({x:460.3},0).wait(1).to({x:460.1},0).wait(1).to({x:459.7},0).wait(1).to({x:459.4},0).wait(1).to({x:459},0).wait(1).to({x:458.6},0).wait(1).to({x:458.2},0).wait(1).to({x:457.7},0).wait(1).to({x:457.2},0).wait(1).to({x:456.7},0).wait(1).to({x:456.2},0).wait(1).to({x:455.6},0).wait(1).to({x:455},0).wait(1).to({x:454.3},0).wait(1).to({x:453.6},0).wait(1).to({x:452.9},0).wait(1).to({x:452.2},0).wait(1).to({x:451.4},0).wait(1).to({x:450.6},0).wait(1).to({x:449.8},0).wait(1).to({x:448.9},0).wait(1).to({x:448.1},0).wait(1).to({x:447.1},0).wait(1).to({x:446.2},0).wait(1).to({x:445.2},0).wait(1).to({x:444.2},0).wait(1).to({x:443.2},0).wait(1).to({x:442.2},0).wait(1).to({x:441.1},0).wait(1).to({x:440},0).wait(1).to({x:438.9},0).wait(1).to({x:437.7},0).wait(1).to({x:436.5},0).wait(1).to({x:435.3},0).wait(1).to({x:434.1},0).wait(1).to({x:432.9},0).wait(1).to({x:431.6},0).wait(1).to({x:430.3},0).wait(1).to({x:429},0).wait(1).to({x:427.7},0).wait(1).to({x:426.3},0).wait(1).to({x:425},0).wait(1).to({x:423.6},0).wait(1).to({x:422.2},0).wait(1).to({x:420.8},0).wait(1).to({x:419.4},0).wait(1).to({x:418},0).wait(1).to({x:416.5},0).wait(1).to({x:415.1},0).wait(1).to({x:413.6},0).wait(1).to({x:412.1},0).wait(1).to({x:410.7},0).wait(1).to({x:409.2},0).wait(1).to({x:407.7},0).wait(1).to({x:406.2},0).wait(1).to({x:404.7},0).wait(1).to({x:403.2},0).wait(1).to({x:401.8},0).wait(1).to({x:400.3},0).wait(1).to({x:398.8},0).wait(1).to({x:397.3},0).wait(1).to({x:395.8},0).wait(1).to({x:394.4},0).wait(1).to({x:392.9},0).wait(1).to({x:391.5},0).wait(1).to({x:390.1},0).wait(1).to({x:388.6},0).wait(1).to({x:387.2},0).wait(1).to({x:385.9},0).wait(1).to({x:384.5},0).wait(1).to({x:383.1},0).wait(1).to({x:381.8},0).wait(1).to({x:380.5},0).wait(1).to({x:379.2},0).wait(1).to({x:377.9},0).wait(1).to({x:376.7},0).wait(1).to({x:375.4},0).wait(1).to({x:374.2},0).wait(1).to({x:373.1},0).wait(1).to({x:371.9},0).wait(1).to({x:370.8},0).wait(1).to({x:369.7},0).wait(1).to({x:368.7},0).wait(1).to({x:367.6},0).wait(1).to({x:366.6},0).wait(1).to({x:365.7},0).wait(1).to({x:364.7},0).wait(1).to({x:363.8},0).wait(1).to({x:363},0).wait(1).to({x:362.1},0).wait(1).to({x:361.3},0).wait(1).to({x:360.6},0).wait(1).to({x:359.8},0).wait(1).to({x:359.1},0).wait(1).to({x:358.5},0).wait(1).to({x:357.9},0).wait(1).to({x:357.3},0).wait(1).to({x:356.7},0).wait(1).to({x:356.2},0).wait(1).to({x:355.7},0).wait(1).to({x:355.3},0).wait(1).to({x:354.9},0).wait(1).to({x:354.6},0).wait(1).to({x:354.2},0).wait(1).to({x:354},0).wait(1).to({x:353.7},0).wait(1).to({x:353.5},0).wait(1).to({x:353.3},0).wait(1).to({x:353.2},0).wait(1).to({x:353.1},0).wait(1).to({x:353},0).wait(1).to({startPosition:0},0).to({_off:true},62).wait(2740));

	// 11.png
	this.instance_41 = new lib.cut11_1("synched",0);
	this.instance_41.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(10062).to({startPosition:0,_off:false},0).to({alpha:1},31).to({_off:true},50).wait(88));

	// 10.png
	this.instance_42 = new lib.cut10_1("synched",0);
	this.instance_42.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(9836).to({startPosition:0,_off:false},0).to({alpha:1},60).to({_off:true},197).wait(138));

	// 09.png
	this.instance_43 = new lib.cut09_1("synched",0);
	this.instance_43.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(9531).to({startPosition:0,_off:false},0).to({alpha:1},31).to({_off:true},334).wait(335));

	// 08.png
	this.instance_44 = new lib.cut08_1("synched",0);
	this.instance_44.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(9341).to({startPosition:0,_off:false},0).to({alpha:1},35).to({_off:true},186).wait(669));

	// 07.png
	this.instance_45 = new lib.cut07_1("synched",0);
	this.instance_45.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(9089).to({startPosition:0,_off:false},0).to({alpha:1},60).to({_off:true},227).wait(855));

	// 06.png
	this.instance_46 = new lib.cut06_1("synched",0);
	this.instance_46.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_46.alpha = 0;
	this.instance_46._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(8999).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},120).wait(1082));

	// 05.png
	this.instance_47 = new lib.cut05_1("synched",0);
	this.instance_47.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_47.alpha = 0;
	this.instance_47._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(8849).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},150).wait(1202));

	// 04.png
	this.instance_48 = new lib.cut04_1("synched",0);
	this.instance_48.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_48.alpha = 0;
	this.instance_48._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(8579).to({startPosition:0,_off:false},0).to({alpha:1},29).to({_off:true},271).wait(1352));

	// 03.png
	this.instance_49 = new lib.cut03_1("synched",0);
	this.instance_49.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_49.alpha = 0;
	this.instance_49._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(8366).to({startPosition:0,_off:false},0).to({alpha:1},30).to({_off:true},213).wait(1622));

	// 02.png
	this.instance_50 = new lib.cut02_1("synched",0);
	this.instance_50.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_50.alpha = 0;
	this.instance_50._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(8267).to({startPosition:0,_off:false},0).to({alpha:1},39).to({_off:true},90).wait(1835));

	// 01.png
	this.instance_51 = new lib.cut01_1("synched",0);
	this.instance_51.setTransform(320,240,1,1,0,0,0,320,240);
	this.instance_51._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(8024).to({startPosition:0,_off:false},0).to({_off:true},282).wait(1925));

	// hakureiShrine
	this.instance_52 = new lib.hakureiShrine();
	this.instance_52.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_52}]}).to({state:[]},7430).to({state:[]},2647).wait(154));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


// symbols:
(lib.A01 = function() {
	this.initialize(img.A01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A02 = function() {
	this.initialize(img.A02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A03 = function() {
	this.initialize(img.A03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A04 = function() {
	this.initialize(img.A04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A05 = function() {
	this.initialize(img.A05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A06 = function() {
	this.initialize(img.A06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A07 = function() {
	this.initialize(img.A07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A08 = function() {
	this.initialize(img.A08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A09 = function() {
	this.initialize(img.A09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A10 = function() {
	this.initialize(img.A10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A11 = function() {
	this.initialize(img.A11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A12 = function() {
	this.initialize(img.A12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A13 = function() {
	this.initialize(img.A13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A14 = function() {
	this.initialize(img.A14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A15 = function() {
	this.initialize(img.A15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A16 = function() {
	this.initialize(img.A16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A17 = function() {
	this.initialize(img.A17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A18 = function() {
	this.initialize(img.A18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A19 = function() {
	this.initialize(img.A19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A20 = function() {
	this.initialize(img.A20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A21 = function() {
	this.initialize(img.A21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A22 = function() {
	this.initialize(img.A22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.A23 = function() {
	this.initialize(img.A23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,446);


(lib.BO = function() {
	this.initialize(img.BO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


(lib.cut01 = function() {
	this.initialize(img.cut01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut02 = function() {
	this.initialize(img.cut02);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut03 = function() {
	this.initialize(img.cut03);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut04 = function() {
	this.initialize(img.cut04);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut05 = function() {
	this.initialize(img.cut05);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut06 = function() {
	this.initialize(img.cut06);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut07 = function() {
	this.initialize(img.cut07);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut08 = function() {
	this.initialize(img.cut08);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut09 = function() {
	this.initialize(img.cut09);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut10 = function() {
	this.initialize(img.cut10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.cut11 = function() {
	this.initialize(img.cut11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.ganger_nomal = function() {
	this.initialize(img.ganger_nomal);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.ganger_smile = function() {
	this.initialize(img.ganger_smile);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.hakureiShrine = function() {
	this.initialize(img.hakureiShrine);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,960);


(lib.merry_sad = function() {
	this.initialize(img.merry_sad);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_anger = function() {
	this.initialize(img.renko_anger);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_calm_blood = function() {
	this.initialize(img.renko_calm_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_nomal_blood = function() {
	this.initialize(img.renko_nomal_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_pain = function() {
	this.initialize(img.renko_pain);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_pain_blood = function() {
	this.initialize(img.renko_pain_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_smile_blood = function() {
	this.initialize(img.renko_smile_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.renko_troubled_blood = function() {
	this.initialize(img.renko_troubled_blood);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,714,1000);


(lib.RO = function() {
	this.initialize(img.RO);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,64,48);


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


(lib.voice_3 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice3();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.voice_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.voice1();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,480,223);


(lib.ro = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.RO();
	this.instance.setTransform(0,0,10,10);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.renko_troubled_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_troubled_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_smile_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_smile_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_pain_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_pain_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_pain_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_pain();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_nomal_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_nomal_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_calm_blood_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_calm_blood();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.renko_anger_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.renko_anger();
	this.instance.setTransform(357,0,0.5,0.5,0,0,180);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:357,y:0}}]}).to({state:[{t:this.instance,p:{x:347,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.merry_sad_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.merry_sad();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.ganger_smile_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.ganger_smile();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.ganger_nomal_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// レイヤー 1
	this.instance = new lib.ganger_nomal();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:0,y:0}}]}).to({state:[{t:this.instance,p:{x:10,y:10}}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,357,500);


(lib.cut11_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut11();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut10_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut10();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut09_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut09();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut08_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut08();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut07_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut07();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut06_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut06();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut05_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut05();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut04_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut04();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut03_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut03();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut02_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut02();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


(lib.cut01_1 = function() {
	this.initialize();

	// レイヤー 1
	this.instance = new lib.cut01();
	this.instance.setTransform(0,0,0.5,0.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,480);


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
