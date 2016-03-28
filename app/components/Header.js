var React = require('react');
var MainTitle = require('./MainTitle');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
            <div>
              <MainTitle  text='Explore a River Basin'/>
              <p>To get started click a River Basin on the map, or search for a location.</p>
              {/*
                bread crumb wrapper - breadcrumbs
                */}
            </div>
    );
  }

});

module.exports = Header;
