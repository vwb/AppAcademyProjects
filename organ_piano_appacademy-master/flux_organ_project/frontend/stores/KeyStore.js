var AppDispatcher = require('../dispatcher/Dispatcher.js');
var Store = require('flux/utils').Store;

var KeyStore = new Store(AppDispatcher);

var _keys = [];

KeyStore.all = function(){
  return _keys.slice();
};

KeyStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ADD_KEY":
      addKey(payload.key);
      KeyStore.__emitChange();
      break;
    case "REMOVE_KEY":
      removeKey(payload.key);
      KeyStore.__emitChange();
      break;
    case "PLAY_KEYS":
      playKeys(payload.keys);
      KeyStore.__emitChange();
      break;
  }
};

function playKeys(keysArray){
  _keys = keysArray;
}

function addKey(key) {
  if (_keys.indexOf(key) === -1){
    _keys.push(key);
  }
  // console.log(_keys);
}

function removeKey(key) {
  var indexOfKey = _keys.indexOf(key);
  _keys.splice(indexOfKey, 1);
}

module.exports = KeyStore;
