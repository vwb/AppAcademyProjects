var React = require('react'),
    Minesweeper = require('../minesweeper.js'),
    Board = require("./Board.jsx");

var Game = React.createClass({

  getInitialState: function(){
    return {
      board: new Minesweeper.Board(10, 10)
    };
  },

  updateGame: function(tile, flagging){
    if (flagging){
      tile.toggleFlag();
    } else {
      tile.explore();
    }

    this.setState({
      board: this.state.board
    });
  },

  render: function(){
    return (
      <Board
        boardState={this.state.board}
        updateGame={this.updateGame}/>);
  }
});


module.exports = Game;
