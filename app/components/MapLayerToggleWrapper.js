var React = require('react');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;

var MapLayerToggleWrapper = React.createClass({

  render: function() {
    return (
      <div className="column">
        <MapLayerToggleName  text='Toggle Layers'/>
        <MapLayerToggle  titleText='Layer One'/>

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
