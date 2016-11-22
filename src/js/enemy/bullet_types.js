'use strict';

var BulletTypes = [
	// 0;文：黄色い弾
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
	// 1:文：赤い弾
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
	// 2: stage1 道中雑魚：青い円形弾
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
	// 3: 文：オレンジっぽい弾
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
	// 4: 文：赤いにじゅうまる弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           4,
		'width':           23,
		'height':          23,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       false
	},
	// 5: 文：デカイ赤い弾
	{
		'image':       'shot',
		'indexX':           4,
		'indexY':           1,
		'width':           64,
		'height':          64,
		'collisionWidth':  48,
		'collisionHeight': 48,
		'is_rotate':       false
	},
	// 6: 文：クナイみたいな赤い弾
	{
		'image':       'shot',
		'indexX':           0,
		'indexY':           7,
		'width':           15,
		'height':          20,
		'collisionWidth':  14,
		'collisionHeight': 14,
		'is_rotate':       true
	},
	// 7: 文：黄色ビーム
	{
		'image':       'beam',
		'indexX':           1,
		'indexY':           0,
		'width':           20,
		'height':          256,
		'collisionWidth':  18,
		'collisionHeight': 248,
		'is_rotate':       true
	},

	// 8; 米びつ黄緑弾
	{
		'image':       'shot',
		'indexX':           1,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},
	// 9: 米びつ青弾
	{
		'image':       'shot',
		'indexX':           2,
		'indexY':           1,
		'width':           14,
		'height':          20,
		'collisionWidth':  13,
		'collisionHeight': 13,
		'is_rotate':       true
	},

];

module.exports = BulletTypes;
