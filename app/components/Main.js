var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
require('../main.css');

var Main = React.createClass({
  render: function () {
    return (
      <div className="ui one column padded grid">
        <div className="column">
            <div className="ui raised padded segment">
              <h2 className="ui header">Explore a River Basin</h2>
              <p>To get started click a River Basin on the map, or search for a location.</p>
            </div>
          </div>
          {/* 
          // header
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
