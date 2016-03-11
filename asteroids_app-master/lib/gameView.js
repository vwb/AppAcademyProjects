var Game = require('./game.js');
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
