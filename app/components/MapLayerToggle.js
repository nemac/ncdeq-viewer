var React = require('react');
var PropTypes = React.PropTypes;

var MapLayerToggle = React.createClass({

  propTypes: {
    toggleText: PropTypes.string,
  },
  handleLayerClick: function(e){

    //get map object.  saved in redux store
    const leafletMap = this.props.leafletMap;

    //get the current layer object.
    const leafletLayer = this.props.layer;

    //check if the layer is vissible
    const isLayerVis = leafletMap.hasLayer(leafletLayer);

    //if visible remove (turn off) layer otherwise add (turn on)
    isLayerVis ? leafletMap.removeLayer(leafletLayer) : leafletMap.addLayer(leafletLayer);

    if(leafletLayer.options.url === "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/"){
      leafletLayer.bringToBack()
    }

  },
  getDefaultProps: function() {
    return {
      toggleText:'Layer Toggle'
    };
  },
  getInitialState: function() {
    this.toggleText = this.props.get_display_names(this.props.toggleText);
    return {
      toggleText: this.toggleText
    };
  },
  render: function() {
    return (
      <div>
        <div className="ui checked checkbox">
          <input type="checkbox" defaultChecked onClick={this.handleLayerClick} />
          <label className="ui black label"style={{paddingTop: "2px",paddingBottom: "0px",marginBottom: "0px", fontSize:".78571429rem",paddingLeft:"2.25em"}}>
              {this.state.toggleText}
          </label>
        </div>
      </div>
    );
  }

});

module.exports = MapLayerToggle;
