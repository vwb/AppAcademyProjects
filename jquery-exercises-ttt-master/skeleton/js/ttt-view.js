var View = function (game, $el) {
  this.$el = $el;
  this.game = game;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.on("click", ".square", this.makeMove.bind(this));
};

//unbind listeners
//break makeMove
//use classes instead of direct CSS

View.prototype.makeMove = function (e) {
  e.preventDefault();
  var $square = $(e.currentTarget);
  var mark = this.game.currentPlayer;
  try{
    this.game.playMove($square.data("pos"));
  }
  catch(error) {
    window.alert("Invalid Move!");
    return;
  }
  $square.data("mark", mark);
  $square.css("background-color", 'white');
  $square.text(mark);

  if (this.game.winner()) {
    var $winner = $("<h2>").addClass("winner").text("You win, " +
      mark + "!");

    this.$el.append($winner);

    var $squares = this.$el.find(".square");
    for (var i = 0; i < $squares.length; i++) {
      var el = $squares.eq(i);
      if (el.data("mark") === mark) {
        el.css("color", 'white').css("background-color", "green");
      } else {
        el.css("color", "red").css("background-color", "white");
      }
    }

  } else if (this.game.isOver()) {

    var $draw = $("<h2>").addClass("winner").text("Cat's game! :(");
    this.$el.find(".square").css("color", "red");
    this.$el.append($draw);

  }
};

View.prototype.setupBoard = function () {
  for (var i = 0; i < 3; i++) {
    this.addRow(i);
  }
};

View.prototype.addRow = function (rowIdx) {
  var $row = $("<ul>").addClass("row").addClass("group");

  for (var colIdx = 0; colIdx < 3; colIdx++) {
    var $square = $("<li>").addClass("square").data("pos", [rowIdx, colIdx]);

    $row.append($square);
  }

  this.$el.append($row);
};


module.exports = View;
