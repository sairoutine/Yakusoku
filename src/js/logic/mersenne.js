var MersenneTwister = require('mersenne-twister');
var generator = new MersenneTwister(1000); //乱数初期化

module.exports = generator;
