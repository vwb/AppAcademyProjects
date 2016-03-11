var AppDispatcher = require('../dispatcher/Dispatcher.js');
var Store = require('flux/utils').Store;

var TrackStore = new Store(AppDispatcher);

var _tracks = [];

TrackStore.all = function(){
  return _tracks.slice();
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "SAVE_TRACK":
      addTrack(payload.track);
      TrackStore.__emitChange();
      break;
    case "DELETE_TRACK":
      deleteTrack(payload.track);
      TrackStore.__emitChange();
      break;
  }
};

function deleteTrack(track){
  var indexOfTrack = _tracks.indexOf(track);
  _tracks.splice(indexOfTrack, 1);
}

function addTrack (track) {
  _tracks.push(track);
  debugger;
}


module.exports = TrackStore;
