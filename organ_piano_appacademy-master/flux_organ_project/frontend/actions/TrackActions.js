var AppDispatcher = require('../dispatcher/Dispatcher');


var TrackActions = {
  saveTrack: function(track){
    AppDispatcher.dispatch({
      actionType: "SAVE_TRACK",
      track: track
    });
  },

  deleteTrack: function(track){
    AppDispatcher.dispatch({
      actionType: "DELETE_TRACK",
      track: track
    });
  }
};


module.exports = TrackActions;
