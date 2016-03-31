var React = require('react');
var MainTitle = require('./MainTitle');
var BreadCrumbWrapper = require('./BreadCrumbWrapper');
var PropTypes = React.PropTypes;

//              <BreadCrumbWrapper />

var Header = React.createClass({

  render: function() {
    return (
            <div className = 'header' >
              <MainTitle  text='Explore a River Basin'/>
              <p>To get started click a River Basin on the map, or search for a location to zoom to.</p>
            </div>
    );
  }

});

module.exports = Header;
