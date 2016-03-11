var Util = require('./utils.js');
var MovingObject = require('./movingObject.js');
var Ship = require('./ship.js');

var util = new Util();

var COLOR = "#000000";
var RADIUS = 30;

var Asteroid = function(pos, game){
  var vec = util.randomVec(Math.floor((Math.random() * 10) + 1));
  MovingObject.call(this, pos, vec, RADIUS, COLOR, game);
};

util.inherits(MovingObject, Asteroid);

Asteroid.prototype.collidedWith = function (other) {
  console.log(other);
  // console.log("YO IM AN ASTEROID");

  if (other instanceof Ship){
    // console.log("I HIT A SHIP");
    other.relocate();
  }

};


module.exports = Asteroid;


// window.Asteroid = new Asteroid([20,20]);
