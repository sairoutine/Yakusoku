'use strict';
var Constant = require('../constant');

var BulletDictionaries = [
	[
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
	],
	[
		{
			'vector': { 'aimed': true, 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 3 } },
		},
	],
	[
		{ vector: { r: 3, theta: 45,  w: 0, ra: 0, wa: 0, raa: 0 } },
		{ vector: { r: 3, theta: 135, w: 0, ra: 0, wa: 0, raa: 0 } },
		{ vector: { r: 3, theta: 225, w: 0, ra: 0, wa: 0, raa: 0 } },
		{ vector: { r: 3, theta: 315, w: 0, ra: 0, wa: 0, raa: 0 } },
	],
	[
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  0, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  45, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  90, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  135, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  180, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  225, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  270, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},
		{
			'type': Constant.BULLET_DOUBLEBALL_RED,
			'vector': { 'r': 5, 'theta':  315, 'w': 0, 'ra': 0.1, 'wa': 0, 'raa': -0.01, 'rrange': { 'min': 2 } },
		},

	],
];

module.exports = BulletDictionaries;
