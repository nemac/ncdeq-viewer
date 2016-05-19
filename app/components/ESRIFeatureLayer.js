import {BaseTileLayer} from 'react-leaflet';
import { PropTypes } from 'react';
import { tileLayer } from 'leaflet';
import { featureLayer } from 'esri-leaflet'
var esri = require('esri-leaflet')

export default class ESRIFeatureLayer extends BaseTileLayer {
  componentWillMount() {
    super.componentWillMount();
    const { url } = this.props;
    this.leafletElement = esri.featureLayer({url:url})
  }
}
