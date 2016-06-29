var React = require('react');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;

var MapLayerToggleWrapper = React.createClass({

  render: function() {
    return (
      <div className="row">
        <MapLayerToggleName  text='Toggle Layers'/>
        <MapLayerToggle  toggleText='Layer One'/>
        <MapLayerToggle  toggleText='Layer One'/>
        <MapLayerToggle  toggleText='Layer One'/>
        <MapLayerToggle  toggleText='Layer One'/>
      </div>
      );
    }

  });

  module.exports = MapLayerToggleWrapper;
