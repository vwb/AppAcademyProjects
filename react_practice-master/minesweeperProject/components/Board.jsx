var React = require("react"),
    Tile = require('./Tile');


var Board = React.createClass({

  buildRows: function(){

    var rows = this.props.boardState.grid.map( function(row, rowIndx){
      return <div key={rowIndx}> {this.buildTiles(row, rowIndx)} </div>;
    }.bind(this));

    return rows;
  },

  buildTiles: function(row, rowIndx){

    var tiles = row.map( function(tile, tileIndx){
      return <Tile
                updateGame={this.props.updateGame}
                tile={tile}
                key={[tileIndx, rowIndx]} />;
    }.bind(this));

    return tiles;

  },

  render: function(){
    return (
      <nav className = "board center">
        {this.buildRows()}
      </nav>
    );
  }
});

module.exports = Board;
