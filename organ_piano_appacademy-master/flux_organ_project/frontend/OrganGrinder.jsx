// window.Dispatcher = require('./dispatcher/Dispatcher');
// window.Note = require('./util/Note');
require('./util/KeyListener');

var ReactDOM = require('react-dom');
var React = require('react');
var Organ = require('./components/Organ');
//
document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector('#content');
  ReactDOM.render(<Organ />, root);
});
