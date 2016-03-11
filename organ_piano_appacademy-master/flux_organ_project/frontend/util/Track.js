var KeyActions = require('../actions/KeyActions');
var TrackActions = require('../actions/TrackActions');

var Track = function(attributes){
  this.name = attributes.name;
  this.roll = attributes.roll;
};

Track.prototype.startRecording = function () {
  this.roll = [];
  this.startTime = new Date();
};

//noteObject not actaully a note, but holds note names and time slice.
Track.prototype.addNotes = function (playedNotes) {
  var currentTime = Date.now();
  var noteObject = {
    timeSlice: (currentTime - this.startTime),
    notes: playedNotes
  };
  this.roll.push(noteObject);
};
//TODO should the trackactions be in recorder or is this UTIL acceptable?
Track.prototype.stopRecording = function () {
  this.addNotes([]);
  TrackActions.saveTrack(this);
};

Track.prototype.play = function () {
  if (this.interval) {
    return;

  } else {

    var playBackStartTime = Date.now();
    var currentNote = 0;

    this.interval = setInterval(function(){
      if (currentNote < this.roll.length) {

        var elapsedPlaybackTime = Date.now() - playBackStartTime;
        var currentNoteTimeSlice = this.roll[currentNote].timeSlice;

        if (elapsedPlaybackTime > currentNoteTimeSlice) {
          KeyActions.playKeys(this.roll[currentNote].notes);
          currentNote += 1;
        }

      } else {

        clearInterval(this.interval);
        this.interval = undefined;


      }
    }.bind(this), 10);
  }

  Track.prototype.delete = function () {
    TrackActions.deleteTrack(this);
  };
};


module.exports = Track;
