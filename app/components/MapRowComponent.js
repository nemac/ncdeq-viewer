var React = require('react');

var MapWrapper = require('./MapWrapper');
var ProjectMapWrapper = require('./ProjectMapWrapper');
var MapLayerToggleWrapper = require('./MapLayerToggleWrapper');
var SearchMapWrapper = require('./SearchMapWrapper');

var PropTypes = React.PropTypes;

var MapRowComponent = React.createClass({
  componentDidMount: function() {
    //do something
  },
  propTypes: {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    handleCenter: PropTypes.func.isRequired,
    handleMapClick: PropTypes.func.isRequired,
    handleMapMoveEnd: PropTypes.func.isRequired,
    mapHeight: PropTypes.number.isRequired,
    rowPadding: PropTypes.number.isRequired
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
      <div className="ui stackable internally celled grid">
        <div className="stretched row" >

          <MapWrapper HandleMapZoomEnd={this.props.HandleMapZoomEnd} handleMapMoveEnd={this.props.handleMapMoveEnd} zoom={this.props.zoom} latitude={this.props.latitude} longitude={this.props.longitude} handleMapClick={this.props.handleMapClick} rowPadding={this.props.rowPadding} mapHeight={this.props.mapHeight} />

          <div className="four wide column">

            <div className="ui internally celled grid">
              <div className="row">
                <div className="sixteen wide column">
                  <MapLayerToggleWrapper    />
                </div>
              </div>
              <div className="row">
                <div className="sixteen wide column">
                  <ProjectMapWrapper />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>


    );
  }

});

module.exports = MapRowComponent;
