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
    this.leafletElement = esri.basemapLayer(layer)
  }
}
