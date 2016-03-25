var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');
var SearchBar = require('./Search');

require('../main.css');

var Main = React.createClass({
  render: function () {
    return (
      <div className="ui one column padded grid">
        <Header />
        <SearchBar />
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
