//not using yet but may mopve to the esri base map for licenseing purposes... want to keep the logic in place
import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { basemapLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRIBaseMap extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { layer } = this.props;

    //add layer to map with style
    //add basemapLayer  can be one of following - Streets,Topographic,NationalGeographic,Oceans,Gray,DarkGray,Imagery,ShadedRelief,Terrain
    // and with labels OceansLabels - Labels to pair with the Oceans basemap, GrayLabels, DarkGrayLabels, ImageryLabels, ImageryTransportation, ShadedReliefLabels, TerrainLabels
    if(layer === "Imagery"){
      this.leafletElement = esri.basemapLayer("ImageryLabels")
      this.props.setMapLayers({name:"ImageryLabels",layer:this.leafletElement})

      this.leafletElement = esri.basemapLayer("ImageryTransportation")
      this.props.setMapLayers({name:"ImageryTransportation",layer:this.leafletElement})

    }
    this.leafletElement = esri.basemapLayer(layer)

    var name = this.props.name

    //this.leafletElement is the layer to map.addLayer(name) or map.removeLayer(name) - toggle layer
    this.props.setMapLayers({name,layer:this.leafletElement})

  }
}
