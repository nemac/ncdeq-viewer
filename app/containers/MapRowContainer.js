var React = require('react');
var MapRowComponent = require('../components/MapRowComponent');

var PropTypes = React.PropTypes;

var MapRowContainer = React.createClass({
  componentDidMount: function() {
    //do something
  },
  propTypes: {
    mapHeight: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      mapHeight: 300,
      rowPadding: 1
    };
  },

  getInitialState: function () {
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      rowPadding: this.props.rowPadding,
      zoom: this.props.zoom
    }
  },
  render: function() {
    return (
      <MapRowComponent
        handleMapClick={this.props.handleMapClick}
        HandleMapZoomEnd={this.props.HandleMapZoomEnd}
        handleMapMoveEnd={this.props.handleMapMoveEnd}
        handleCenter={this.props.handleCenter}
        zoom={this.props.zoom}
        latitude={this.props.latitude}
        longitude={this.props.longitude}
        rowPadding={this.state.rowPadding}
        mapHeight={this.props.mapHeight} />
    );
  }

});

module.exports = MapRowContainer;
