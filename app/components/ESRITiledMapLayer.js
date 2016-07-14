//not using yet but may mopve to the esri base map for licenseing purposes... want to keep the logic in place
import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { tiledMapLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRITileMapLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url } = this.props;

    //add layer to map from tiled service
    this.leafletElement = esri.tiledMapLayer({
      url:url,
      maxNativeZoom:9
    })

    var name = this.props.name

    //this.leafletElement is the layer to map.addLayer(name) or map.removeLayer(name) - toggle layer
    this.props.setMapLayers({name,layer:this.leafletElement})

  }
}
