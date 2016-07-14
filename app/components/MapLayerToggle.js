var React = require('react');
var PropTypes = React.PropTypes;

var MapLayerToggle = React.createClass({

  propTypes: {
    toggleText: PropTypes.string,
  },
  handleLayerClick: function(e){

    const leafletMap = this.props.leafletMap;
    const leafletLayer = this.props.layer;
    const isLayerVis = leafletMap.hasLayer(leafletLayer);
    isLayerVis ? leafletMap.removeLayer(leafletLayer) : leafletMap.addLayer(leafletLayer);
    //console.log(isLayerVis)

  },
  getDefaultProps: function() {
    return {
      toggleText:'Layer Toggle'
    };
  },
  getInitialState: function() {
    this.toggleText = this.props.toggleText;
    return {
      toggleText: this.toggleText
    };
  },
  render: function() {
    return (
      <div>
        <div className="ui checked checkbox">
          <input type="checkbox"  defaultChecked  onClick={this.handleLayerClick} />
          <label>{this.state.toggleText}</label>
        </div>
      </div>
    );
  }

});

module.exports = MapLayerToggle;
