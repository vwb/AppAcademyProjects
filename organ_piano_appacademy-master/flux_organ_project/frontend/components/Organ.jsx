var React = require('react'),
    Tones = require('../constants/Tones'),
    Key = require('./Key'),
    Recorder = require('./Recorder'),
    Jukebox = require('./Jukebox');


var Organ = React.createClass({
  render: function(){
    return (
      <div className="keyboard">
        {this.createKeys()}
        <div> <Recorder /> </div>
        <div> <Jukebox /> </div>
      </div>
    );
  },

  createKeys: function(){
    var keys = Object.keys(Tones).map(function(noteName, ind){
      return <Key noteName={noteName} key={ind} />;
    });
    return keys;
  }
});

module.exports = Organ;
