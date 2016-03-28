var React = require('react');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');

var PropTypes = React.PropTypes;

var MapLayerWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <MapLayerToggleWrapper />
        <div className="ui hidden divider"></div>
        <ProjectMapWrapper />
      </div>

    );
  }

});

module.exports = MapLayerWrapper;
