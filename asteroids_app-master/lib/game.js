var Util = require('./utils.js');
var Asteroid = require('./asteroid.js');
var Ship = require('./ship.js');
//
// var util = new Util();

var NUM_ASTEROIDS = 8;

function Game(dimX, dimY){

  this.asteroids = [];
  this.dimY = dimY;
  this.dimX = dimX;

  this.ship = new Ship(this.randomPosition(), this);

  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    this.addAsteroids();
  }

  this.allObjects = [this.ship].concat(this.asteroids);
  console.log(this.allObjects);
}

Game.prototype.addAsteroids = function () {
  var pos = this.randomPosition();
  this.asteroids.push(new Asteroid(pos, this));
};

Game.prototype.randomPosition = function () {
  var x = (Math.random() * this.dimX);
  var y = (Math.random() * this.dimY);
  return [x,y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);

  this.allObjects.forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects.forEach(function (object) {
    object.move();
  });
  // this.draw();
};

Game.prototype.wrap = function (pos) {
  if (pos[0] <= 0){
    pos[0] = this.dimX;
  } else if (pos[0] >= this.dimX) {
    pos[0] = 0;
  }

  if (pos[1] <= 0){
    pos[1] = this.dimY;
  } else if (pos[1] >= this.dimY) {
    pos[1] = 0;
  }
  // return pos;
};

Game.prototype.checkCollision = function () {
  var that = this;
  this.allObjects.forEach(function (asteroid, index) {
    var k = 0;
    for (var i = index + 1; k < that.allObjects.length - 1; i++) {
      i = i % that.allObjects.length;
      var result = asteroid.isCollidedWith(that.allObjects[i]);
      if (result) {
        // debugger;
        asteroid.collidedWith(that.allObjects[i]);
      }
      k++;
    }
  });
};

Game.prototype.remove = function (asteroid) {
  var index = this.asteroids.indexOf(asteroid);
  if (index > -1){
    this.asteroids.splice(index, 1);
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollision();
};

// window.game = new Game();

module.exports = Game;

 // var ctx = canvasEl.getContext("2d");
