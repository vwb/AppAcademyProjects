var MovingObject = require('./movingObject.js');
var Util = require('./utils.js');
var util = new Util();

var COLOR = "#ff33cc";
var RADIUS = 15;
var VEL = [0,0];

function Ship(pos, game){

  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
}

util.inherits(MovingObject, Ship);

Ship.prototype.relocate = function () {
  console.log(this.pos);
  this.pos = this.game.randomPosition();
  console.log(this.pos);
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};



module.exports = Ship;
