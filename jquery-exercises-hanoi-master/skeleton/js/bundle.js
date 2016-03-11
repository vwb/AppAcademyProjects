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
/******/ 	__webpack_require__.p = "/js/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	var HanoiGame = __webpack_require__(2);

	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new View(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var View = function (game, $el){
	  this.$el = $el;
	  this.game = game;

	  this.setUpTowers();
	  this.render();
	  this.bindEvents();
	};

	View.prototype.setUpTowers = function () {
	  for (var i = 0; i < 3; i++) {
	    var $tower = $("<ul>").data("idx", i);
	    for (var j = 0; j < 3; j++) {
	      var $disc = $("<li>");
	      $tower.append($disc);
	    }
	    this.$el.append($tower);
	  }
	};

	View.prototype.bindEvents = function () {
	  this.$el.on("click", "ul", this.clickTower.bind(this));
	};

	View.prototype.render = function () {
	  var towers = this.game.towers;
	  var piles = this.$el.find("ul");
	  this.clear();

	  for (var i = 0; i < towers.length; i++) {
	    var pile = piles.eq(i);
	    for (var j = 0; j < towers[i].length; j++) {
	      pile.children().eq(2-j).addClass("disk-"+towers[i][j]);
	    }
	  }
	};

	View.prototype.clear = function () {
	  this.$el.find("li")
	    .removeClass("disk-1")
	    .removeClass("disk-2")
	    .removeClass("disk-3");
	};

	View.prototype.clickTower = function (e) {
	  e.preventDefault();
	  if (this.$clickTower) {
	    this.$clickTower2 = $(e.currentTarget);
	  } else {
	    this.$clickTower = $(e.currentTarget);
	    this.$clickTower.addClass("selected");
	  }

	  if (this.$clickTower2 && this.$clickTower) {
	    this.move();
	  }
	};

	View.prototype.clearTowers = function () {
	  this.$clickTower2 = undefined;
	  this.$clickTower.removeClass("selected");
	  this.$clickTower = undefined;
	};

	View.prototype.move = function () {
	  if (this.game.move(this.$clickTower.data("idx"),
	    this.$clickTower2.data("idx"))){

	    this.clearTowers();
	    this.render();
	    this.gameIsWon();

	  } else {

	    this.clearTowers();
	    alert("Invalid move!");

	  }
	};

	View.prototype.gameIsWon = function () {
	  if (this.game.isWon()){
	    this.$el.find("ul").addClass("game-over");
	    // this.$el.find("li").addClass("game-over");
	    // this.$el.find("ul").css("cursor", "default");

	    this.$el.unbind();
	  }
	};


	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	// Game.prototype.print = function () {
	//   console.log(JSON.stringify(this.towers));
	// };
	//
	// Game.prototype.promptMove = function (reader, callback) {
	//   this.print();
	//   reader.question("Enter a starting tower: ", function (start) {
	//     var startTowerIdx = parseInt(start);
	//     reader.question("Enter an ending tower: ", function (end) {
	//       var endTowerIdx = parseInt(end);
	//       callback(startTowerIdx, endTowerIdx)
	//     });
	//   });
	// };
	//
	// Game.prototype.run = function (reader, gameCompletionCallback) {
	//   this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	//     if (!this.move(startTowerIdx, endTowerIdx)) {
	//       console.log("Invalid move!");
	//     }
	//
	//     if (!this.isWon()) {
	//       // Continue to play!
	//       this.run(reader, gameCompletionCallback);
	//     } else {
	//       this.print();
	//       console.log("You win!");
	//       gameCompletionCallback();
	//     }
	//   }).bind(this));
	// };

	module.exports = Game;


/***/ }
/******/ ]);