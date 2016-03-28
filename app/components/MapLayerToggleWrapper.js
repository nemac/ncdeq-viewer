var React = require('react');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var SearchBar = require('./Search');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var PropTypes = React.PropTypes;

var MapLayerToggleWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <div className="row top-toggles">
          <MapLayerToggleName  text='Toggle Layers'/>
          <MapLayerToggle  toggleText='Layer One'/>
        </div>
        <div className="ui hidden divider"></div>
        <ProjectMapWrapper />

        {/*
          layer toggle buttons
          add project button
          project toggle
          */}

        </div>


      );
    }

  });

  module.exports = MapLayerToggleWrapper;
