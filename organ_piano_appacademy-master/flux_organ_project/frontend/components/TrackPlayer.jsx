var React = require('react');

var TrackPlayer = React.createClass({

  handlePlay: function(){
    this.props.track.play();
  },

  handleDelete: function(){
    this.props.track.delete();
  },

  render: function(){
    return (
      <div>
        A TRACK
        {this.props.track.name}
        <button onClick={this.handlePlay}> Play </button>
        <button onClick={this.handleDelete}> Delete </button>
      </div>
    );
  }
});

module.exports = TrackPlayer;
