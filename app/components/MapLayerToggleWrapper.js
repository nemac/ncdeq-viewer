var React = require('react');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;
import Divider from '../components/Divider'
import {
  BOX_BORDER,
  SPACING
} from '../constants/appConstants'


var MapLayerToggleWrapper = React.createClass({
  render: function() {
    let layers = [];
    if (this.props.map_settings){
      layers = this.props.map_settings.layers;
    }
    // console.log(this.props.geojson_layers)
    let geojson_layers  = []
    if(this.props.geojson_layers){
      geojson_layers = this.props.geojson_layers
    }

    let data_array = []

    //make the name an array
    Object.keys(geojson_layers).forEach(key => {
      if(key.toUpperCase() != 'NAME'){
        data_array.push({name:key,layer:geojson_layers[key]})
      }
    })

    const geojson_comp = data_array.map( item => {
      if(item.layer){
        return (<MapLayerToggle  key={item.name} toggleText={item.name} layer={item.layer} leafletMap={this.props.leafletMap.leafletMap} />)        
      }
    })


    return (
      <div className="row" style={{backgroundColor:"rgba(255,255,255,.5)",border:BOX_BORDER,padding:SPACING}}>
        <MapLayerToggleName  text='Toggle Layers'/>
        <Divider />
        { layers.map(function(item) {
           return (<MapLayerToggle  key={item.name} toggleText={item.name} layer={item.layer} leafletMap={this.props.leafletMap.leafletMap} />)
         }.bind(this))
      }
      <MapLayerToggleName  text='Data Layers'/>
      <Divider />
      {geojson_comp}
      </div>
      );
    }

  });

  module.exports = MapLayerToggleWrapper;
