var React = require('react');
var MapRowComponent = require('../components/MapRowComponent');

var PropTypes = React.PropTypes;

var MapRowContainer = React.createClass({
  propTypes: {
    mapHeight: PropTypes.number,
    rowPadding: PropTypes.number
  },
  handleSetCenter: function(mapComp,e){
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
  getDefaultProps: function() {
    return {
      latitude: 35.6683,
      longitude: -80.4786,
      mapHeight: 300,
      rowPadding: 1
    };
  },
  getInitialState: function () {
    return {
      latitude: 35.6683,
      longitude: -80.4786,
      rowPadding: this.props.rowPadding
    }
  },
  render: function() {
    return (
      <MapRowComponent handleSetCenter={this.handleSetCenter} handleCenter={this.handleCenter} latitude={this.state.latitude} longitude={this.state.longitude} handleMapClick={this.props.handleMapClick} rowPadding={this.state.rowPadding} mapHeight={this.props.mapHeight} />
    );
  }

});

module.exports = MapRowContainer;
