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


    // if(name === "base map" || name === "base map labels" || name === "imagery"){
    //   the_ZIndex = 9999
    // }

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

    // if(leafletMap){
    //
    //   console.log('leafletMap.length')
    //   console.log(leafletMap.length)
    //   if(leafletMap.length > 0){
    //     console.log('name')
    //     console.log(name)
    //
    //     if(name === "base map"){
    //       console.log('name')
    //       console.log(name)
    //       if(imageryVisibility){
    //         leafletMap.removeLayer(thelayer)
    //       }
    //     }
    //
    //     if( name === "base map labels"){
    //       if(imageryVisibility){
    //         leafletMap.removeLayer(thelayer)
    //       }
    //     }
    //
    //     if( name === "imagery"){
    //       if(!imageryVisibility){
    //         leafletMap.removeLayer(thelayer)
    //       }
    //     }
    //   }
    // }


    //   console.log(0)
    //   thelayer.setZIndex(0)
    //   // if(thelayer){
    //   //   thelayer.bringToBack()
    //   // }
    // }

      // this.leafletElement is the layer to map.addLayer(name) or map.removeLayer(name) - toggle layer
      this.props.setMapLayers({name,layer:this.leafletElement})
 }
}
