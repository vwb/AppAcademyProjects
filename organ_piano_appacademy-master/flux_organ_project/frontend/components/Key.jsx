var React = require('react');
var Note = require('../util/Note');
var Tones = require('../constants/Tones');
var KeyStore = require('../stores/KeyStore');

var Key = React.createClass({

  getInitialState: function () {
    return {
      note: "",
      className: "key"
    };
  },

  componentDidMount: function () {
    var note = new Note(Tones[this.props.noteName]);
    this.setState({note: note});

    KeyStore.addListener(this._keyChanged);
  },

  componentWillUnmount: function () {
    KeyStore.removeListener(this._keyChanged);
  },

  _keyChanged: function () {
    var allKeys = KeyStore.all();
    if (allKeys.indexOf(this.props.noteName) !== -1) {
      this.state.note.start();
      this.setState({className: "key pressed"});
    } else {
      this.state.note.stop();
      this.setState({className: "key"});
    }
  },

  render: function () {
    return (
      <div className={this.state.className}>
        {this.props.noteName}
      </div>
    );
  }


});

module.exports = Key;
