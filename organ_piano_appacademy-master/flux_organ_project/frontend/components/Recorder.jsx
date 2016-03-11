var React = require('react');
var Track = require('../util/Track');
var KeyStore = require('../stores/KeyStore');
var TrackStore = require('../stores/TrackStore');

var Recorder = React.createClass({
  getInitialState: function(){
    return {
      isRecording: false,
      Track: new Track({name: "A track", roll: []})
    };
  },

  handleStart: function () {
    this.state.Track.startRecording();
    this.setState({isRecording: true});
  },

  handleStop: function () {
    this.state.Track.stopRecording();
    this.setState({isRecording: false});
  },

  handlePlay: function(){
    this.state.Track.play();
  },

  componentDidMount: function () {
    KeyStore.addListener(this._getTrackKeys);
  },

  _getTrackKeys: function () {
    if (this.state.isRecording) {
      var allKeys = KeyStore.all();
      this.state.Track.addNotes(allKeys);
    }
  },

  render: function(){
    return (
      <div>
        <button onClick={this.handleStart}>
          Start Recording
        </button>
        <button onClick={this.handleStop}>
          Stop Recording
        </button>
        <button onClick={this.handlePlay}>
          Play Recording
        </button>
      </div>
    );
  }
});

module.exports = Recorder;
