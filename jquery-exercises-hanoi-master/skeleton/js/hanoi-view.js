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
