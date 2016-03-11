/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.GameView = __webpack_require__(1);
	window.Game = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);
	// var Keys = require('./keymaster.js');
	//

	function GameView(game){
	  this.game = game;
	  this.ship = this.game.ship;
	}

	GameView.prototype.start = function (ctx) {
	  var that = this;
	  this.bindKeyHandlers();


	  //TODO:bind handlers
	  setInterval(function(){
	    that.game.step();
	    that.game.draw(ctx);
	  }, 20);

	};

	GameView.MOVES = {
	  "w": [ 0, -1],
	  "a": [-1,  0],
	  "s": [ 0,  1],
	  "d": [ 1,  0],
	};

	GameView.prototype.bindKeyHandlers = function () {
	  var ship = this.ship;

	  Object.keys(GameView.MOVES).forEach(function (k) {
	    var move = GameView.MOVES[k];
	    key(k, function () { ship.power(move); });
	  });

	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var Asteroid = __webpack_require__(4);
	var Ship = __webpack_require__(6);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	function Util(){}

	Util.prototype.inherits = function (SuperClass, SubClass) {
	  function Surrogate () {}

	  Surrogate.prototype = SuperClass.prototype;
	  SubClass.prototype = new Surrogate();
	  SubClass.prototype.constructor = SubClass;
	};

	Util.prototype.randomVec = function (length) {
	  var x = (Math.random() * length);
	  var y = Math.sqrt(Math.pow(length, 2) - Math.pow(x, 2));

	  return [x,y];
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(5);
	var Ship = __webpack_require__(6);

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function MovingObject(pos, vel, radius, color, game){
	  this.pos = pos;
	  this.vel = vel;
	  this.radius = radius;
	  this.color = color;
	  this.game = game;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	   ctx.beginPath();

	   ctx.arc(
	     this.pos[0],
	     this.pos[1],
	     this.radius,
	     0,
	     2 * Math.PI,
	     false
	   );

	   ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] = this.pos[0]+this.vel[0];
	  this.pos[1] = this.pos[1]+this.vel[1];

	  this.game.wrap(this.pos);
	};

	MovingObject.prototype.collidedWith = function (other) {
	  // console.log("IM A MOVING OBJECT");
	};

	MovingObject.prototype.isCollidedWith = function (other) {
	  var sumRadii = this.radius + other.radius;
	  var xDistance = Math.pow((this.pos[0] - other.pos[0]), 2);
	  var yDistance = Math.pow((this.pos[1] - other.pos[1]), 2);
	  var totalDistance = Math.sqrt((xDistance + yDistance));

	  if (sumRadii > totalDistance) {
	    return true;
	  } else {
	    return false;
	  }
	};

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(5);
	var Util = __webpack_require__(3);
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


/***/ }
/******/ ]);