var React = require('react'),
    Minesweeper = require('../minesweeper');

var Tile = React.createClass({
  getInitialState: function(){
    return {
      clicked: false
    };
  },

  determineTileState: function(){
    if (this.props.tile.flagged) {
      return 'F';
    } else if (this.props.tile.bombed) {
      return 'B';
    } else if ( this.props.tile.explored ){
      return this.props.tile.adjacentBombCount();
    }
  },

  handleClick: function(e){
    e.target.classList.add("clicked");
    this.setState({clicked: true});
    this.props.updateGame(this.props.tile, e.altKey);
  },

  render: function(){
    return (
      <div
        className="tile"
        onClick={this.handleClick}>

          {this.determineTileState()}

      </div>
    );
  }
});

module.exports = Tile;
