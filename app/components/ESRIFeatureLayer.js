import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { featureLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRIFeatureLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url,layerStyle } = this.props;

    //make sure style json is set null if not
    var jsonSyle ={}
    if(layerStyle){
      jsonSyle= JSON.parse(layerStyle);
    }

    this.leafletElement = esri.featureLayer({url:url,
    style: function(){
        return jsonSyle
      }
    })
  }
}
