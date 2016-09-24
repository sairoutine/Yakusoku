'use strict';

var BulletTypes = [
	// 文：黄色い弾
	{
		'image':       'shot',
		'indexX':           3,
		'indexY':           1,
		'width':           13,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 20,
		'is_rotate':       true
	},
	// 文：赤い弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           1,
		'width':           13,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 20,
		'is_rotate':       true
	},
	// stage1 道中雑魚：赤い円形弾
	{
		'image':       'shot',
		'indexX':           2,
		'indexY':           0,
		'width':           20,
		'height':          20,
		'collisionWidth':  18,
		'collisionHeight': 18,
		'is_rotate':       false
	},
];

module.exports = BulletTypes;
