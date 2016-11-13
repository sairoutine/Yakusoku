'use strict';

var ShotTypes = [
	{
		'image':           'shot',
		'indexX':          6,
		'indexY':          2,
		'width':           20,
		'height':          20,
		'collisionWidth':  15,
		'collisionHeight': 15,
		'is_rotate':       false,
		'is_penetration':  false,
	},
	{
		'image':           'shot',
		'indexX':          4,
		'indexY':          1,
		'width':           64,
		'height':          64,
		'collisionWidth':  64,
		'collisionHeight': 64,
		'is_rotate':       false,
		'is_penetration':  true,
	},
	{
		'image':           'shot2',
		'indexX':          6,
		'indexY':          16,
		'width':           20,
		'height':          20,
		'collisionWidth':  20,
		'collisionHeight': 20,
		'is_rotate':       false,
		'is_penetration':  false,
	},
];

module.exports = ShotTypes;
