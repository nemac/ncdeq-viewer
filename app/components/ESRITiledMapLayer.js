//not using yet but may mopve to the esri base map for licenseing purposes... want to keep the logic in place
import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { tiledMapLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRITileMapLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url, max_zoom, min_zoom, opacity } = this.props;

    //MAKE sure opacity is set
    var the_opacity = 1.0;
    if(opacity){
      the_opacity = opacity;
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

    //add layer to map from tiled service
    this.leafletElement = esri.tiledMapLayer({
      url: url,
      opacity: the_opacity,
      maxZoom: the_max_zoom,
      minZoom: the_min_zoom,
      maxNativeZoom: the_max_zoom,
    })

    var name = this.props.name

    //this.leafletElement is the layer to map.addLayer(name) or map.removeLayer(name) - toggle layer
    this.props.setMapLayers({name,layer:this.leafletElement})

  }
}
