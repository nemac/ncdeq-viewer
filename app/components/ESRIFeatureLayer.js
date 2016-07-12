//extension for esri data into leaflet.
//  IMPORTANT must use older version of esri-leaflet
///  aka esri-leaflet  Leaflet 0.7.3, please use Esri Leaflet 1.0.0.
//   react-leaflet is dependent on Leaflet 0.7.3 working towards Leaflet version 1.0.0

import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { featureLayer } from 'esri-leaflet'


var esri = require('esri-leaflet')

export default class ESRIFeatureLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url, layerStyle, zoom, max_zoom, min_zoom } = this.props;

    //make sure style json is set to null
    //styles defined by leaflet path
    //http://leafletjs.com/reference.html#path-options
    var jsonSyle ={}
    if(layerStyle){
      jsonSyle= JSON.parse(layerStyle);
    }
    //make sure maxzoom json is set to null
    var the_max_zoom = 19;
    if(max_zoom){
      the_max_zoom = max_zoom;
    }
    //make sure min_zoom json is set to null
    var the_min_zoom = 0;
    if(min_zoom){
      the_min_zoom = min_zoom;
    }

    //add layer to map with style
    this.leafletElement = esri.featureLayer({url:url,
    style: function(){
        return jsonSyle
      },
    maxZoom: the_max_zoom,
    minZoom: the_min_zoom,

    })
    //console.log(this.props.name)
    var name = this.props.name
    //this.leafletElement is the layuer to map.addLayer(name) or map.removeLayer(name) - toggle layer
     this.setState({name:this.leafletElement })

  }
}
