import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { basemapLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRIBaseMap extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { layer } = this.props;
    this.leafletElement = esri.basemapLayer(layer)
  }
}
