var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');

require('../main.css');

var Main = React.createClass({
  render: function () {
    return (
      <div className="ui one column padded grid">
        <Header />
          {/*
          // search
          // mapWrapper
          // Rankings
          // TRAs
          // Compare
          */}
      </div>
    )
  }
});

module.exports = Main;
