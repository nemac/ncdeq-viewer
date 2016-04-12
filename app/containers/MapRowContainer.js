var React = require('react');
var MapRowComponent = require('../components/MapRowComponent');

var PropTypes = React.PropTypes;

var MapRowContainer = React.createClass({

  propTypes: {
    mapHeight: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      latitude: 35.6683,
      longitude: -80.4786,
      mapHeight: 300,
      rowPadding: 1,
      zoom: 7
    };
  },
  HandleMapZoomEnd: function(mapComp,e){
    var L = mapComp.refs.map.leafletElement

    var zoom = L.getZoom();
    var center = L.getCenter();

    this.setState({
      zoom: zoom,
      latitude: center.lat,
      longitude: center.lng
    })

  },
  handleMapMoveEnd: function(mapComp,e){
    var L = mapComp.refs.map.leafletElement
    var center = L.getCenter();
    this.setState({
      latitude: center.lat,
      longitude: center.lng
    })
  },
  handleCenter: function(e){
    this.setState({
      latitude: 35.6683,
      longitude: -81.4786
    })
  },
  getInitialState: function () {
    return {
      latitude: 35.6683,
      longitude: -80.4786,
      rowPadding: this.props.rowPadding,
      zoom: 7
    }
  },
  render: function() {
    return (
      <MapRowComponent HandleMapZoomEnd={this.HandleMapZoomEnd} handleMapMoveEnd={this.handleMapMoveEnd} handleCenter={this.handleCenter} latitude={this.state.latitude} longitude={this.state.longitude} zoom={this.state.zoom} handleMapClick={this.props.handleMapClick} rowPadding={this.state.rowPadding} mapHeight={this.props.mapHeight} />
    );
  }

});

module.exports = MapRowContainer;
