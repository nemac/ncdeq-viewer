import React from 'react';
//import L from 'leaflet';
import {MapControl, MapLayer, BaseTileLayer} from 'react-leaflet';
var esri = require( 'esri-leaflet');

export default class ESRIBaseMap extends BaseTileLayer {

  componentWillMount() {
    super.componentWillMount();
    //this.leafletElement = ESRI()
    //console.log(this.props.layer)

  }

  componentDidMount() {
    //const { map } = this.props;
    var el = this.leafletElement;

    //L.esri.basemapLayer('Streets').addto(this.props.d)
    //this.leafletElement = L.esri.basemapLayer('Streets');
    //console.log(L)
    this.leafletElement = L.esri.featureLayer({url:'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0'})
    //.addTo(this.props.d);
    L.control.layers()
    // this.leafletElement = esri.featureLayer({
    //   url:'http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0'
    // }).addTo(this.props.map);
    //l.esri.featureLayer('http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0').addTo(this.props.map);
    // console.log(esri)
    // console.log(l)
    // l.esri = esri
    // console.log(l.esri)
    // l.featureLayer('http://services1.arcgis.com/PwLrOgCfU0cYShcG/ArcGIS/rest/services/RDRBP/FeatureServer/0').addTo(this.props.map);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    //this.props.map.removeLayer(this.leafletElement);
  }

  render() {
    return null;
  }
}

ESRIBaseMap.propTypes = {
  map: React.PropTypes.object,
  d: React.PropTypes.object,
  layer: React.PropTypes.string,
};

ESRIBaseMap.defaultProps = {
  layer: 'Imagery',
};
