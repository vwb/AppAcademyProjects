var KeyActions = require('../actions/KeyActions');

$(document).on('keyup', function(e){
  KeyActions.keyRemoved(keyMap[e.keyCode]);
});

$(document).on('keydown', function(e){
  KeyActions.keyPressed(keyMap[e.keyCode]);
});

var keyMap = {
  65: "C6",
  83: "D6",
  68: "E6",
  70: "F6",
  71: "G6"
};
