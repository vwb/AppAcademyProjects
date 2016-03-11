var React = require('react');
var TrackStore = require('../stores/TrackStore');
var TrackPlayer = require('./TrackPlayer');

var Jukebox = React.createClass({

  getInitialState: function(){
    return {
      tracks: []
    };
  },

  componentDidMount: function(){
    TrackStore.addListener(this._updateTrackList);
  },

  componentWillUnmount: function(){
    TrackStore.removeListener(this._updateTrackList);
  },

  _updateTrackList: function(){
    var tracks = TrackStore.all();
    this.setState({tracks: tracks});
  },

  generateTracks: function(){
    return this.state.tracks.map(function(track, id){
      <TrackPlayer track={track} key={id}/>;
    });
  },

  render: function(){
    return (
      <div>
        {this.generateTracks()}
      </div>
    );
  }
});

module.exports = Jukebox;
