'use strict';

var BulletTypes = [
	// 文：黄色い弾
	{
		'image':       'shot',
		'indexX':           3,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// 文：赤い弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// stage1 道中雑魚：青い円形弾
	{
		'image':       'shot',
		'indexX':           2,
		'indexY':           0,
		'width':           20,
		'height':          20,
		'collisionWidth':  16,
		'collisionHeight': 16,
		'is_rotate':       false
	},
	// 文：オレンジっぽい弾
	{
		'image':       'shot',
		'indexX':           7,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
];

module.exports = BulletTypes;
