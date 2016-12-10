'use strict';
var Constant = require('../constant');
var i;

var BulletDictionaries = [];
BulletDictionaries[0] = [
	{
		'vector': { 'r': 5, 'theta': 165, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta': 135, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta': 105, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  75, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  15, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
];

BulletDictionaries[1] = [
	{
		'vector': { 'aimed': true, 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 3 } },
	},
];
BulletDictionaries[2] = [
	{ vector: { r: 3, theta: 45,  w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 135, w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 225, w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { r: 3, theta: 315, w: 0, ra: 0, wa: 0, raa: 0 } },
];

BulletDictionaries[3] = [
	{
		'vector': { 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  90, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  135, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  180, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  225, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  270, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},
	{
		'vector': { 'r': 5, 'theta':  315, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
	},

];

// 縦に広がる弾
BulletDictionaries[4] = [
	{ vector: { aimed: true, r: 3.0, theta: 0} },
	{ vector: { aimed: true, r: 3.5, theta: 0} },
	{ vector: { aimed: true, r: 4.0, theta: 0} },
	{ vector: { aimed: true, r: 4.5, theta: 0} },
];

// 横に広がる弾
BulletDictionaries[5] = [
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0.2, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: 0.4, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: -0.2, ra: 0, wa: 0, raa: 0 } },
	{ vector: { aimed: true, r: 3, theta: 0,  w: -0.4, ra: 0, wa: 0, raa: 0 } },
];

BulletDictionaries[6] = [];

for(i = 0; i < 8; i++) {
	BulletDictionaries[6].push(
		{
			'vector': { 'r': 5, 'theta':  22.5 + i * 45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		}
	);
}

module.exports = BulletDictionaries;
