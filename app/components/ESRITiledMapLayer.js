//not using yet but may mopve to the esri base map for licenseing purposes... want to keep the logic in place
import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { tiledMapLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRITileMapLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url, max_zoom, min_zoom, tileOpacity, z_Index, imageryVisibility, leafletMap} = this.props;

    //MAKE sure opacity is set
    var the_opacity = 1.0;
    if(tileOpacity){
      the_opacity = Number(tileOpacity);
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
    let the_ZIndex = 0;
    if(z_Index){
      the_ZIndex = z_Index;
    }

    var name = this.props.name

    //add layer to map from tiled service
    this.leafletElement = esri.tiledMapLayer({
      url: url,
      opacity: the_opacity,
      maxZoom: the_max_zoom,
      minZoom: the_min_zoom,
      maxNativeZoom: the_max_zoom,
      zIndex: the_ZIndex,
    })

    const thelayer = this.leafletElement

      // this.leafletElement is the layer to map.addLayer(name) or map.removeLayer(name) - toggle layer
      this.props.setMapLayers({name,layer:this.leafletElement})
 }
}
