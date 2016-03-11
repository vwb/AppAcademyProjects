var AppDispatcher = require('../dispatcher/Dispatcher');

var KeyActions = {
  keyPressed: function (key) {
    if (key) {
      AppDispatcher.dispatch({
        actionType: "ADD_KEY",
        key: key
      });
    }
  },
  keyRemoved: function (key) {
    if (key) {
      AppDispatcher.dispatch({
        actionType: "REMOVE_KEY",
        key: key
      });
    }
  },

  playKeys: function (keysArray) {
    AppDispatcher.dispatch({
      actionType: "PLAY_KEYS",
      keys: keysArray
    });
  }
};

module.exports = KeyActions;
