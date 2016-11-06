'use strict';

var cjs = require("../createjs");

var CreateJS = function(cjs_obj, width, height) {
	this.canvas = document.createElement('canvas');
	this.canvas.width  = width;
	this.canvas.height = height;

	this.stage = new cjs.Stage(this.canvas);
	this.stage.addChild(cjs_obj);
};

CreateJS.prototype.update = function() {
	this.stage.update();
};


module.exports = CreateJS;
