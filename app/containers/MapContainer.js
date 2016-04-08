var React = require('react');
var PropTypes = React.PropTypes;
var MapComponent = require('../components/MapComponent');

var MapContainer = React.createClass({

  getInitialState: function() {
    return {
      latitude: 35.6683,
      longitude: -80.4786,
      zoom: 7,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      tileUrl:'http://api.tiles.mapbox.com/v3/daveism.oo0p88l4/{z}/{x}/{y}.png',
      geojson:[],
    }
  },
  render: function() {
    return (
      <MapComponent
        latitude={this.state.latitude}
        longitude={this.state.longitude}
        attribution={this.state.attribution}
        tileUrl={this.state.tileUrl}
        zoom={this.state.zoom}
        handleMapClick={this.props.handleMapClick} />
    );
  }
});

module.exports = MapContainer;
