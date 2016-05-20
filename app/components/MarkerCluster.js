'use strict';

import React from 'react';
import Leaflet from 'leaflet';
import { MapLayer } from 'react-leaflet';

require('esri-leaflet');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    console.log(this.props.map)
    this.leafletElement = Leaflet.esri.basemapLayer(this.props.layer).addTo(this.props.map);
    //this.leafletElement = Leaflet.markerClusterGroup();
    //this.leafletElement = Leaflet.esri.basemapLayer(this.props.layer).addTo(this.props.map);


  }

  componentDidMount() {
    const { map } = this.props;
    const el = this.leafletElement;

  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.map.removeLayer(this.leafletElement);
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  map: React.PropTypes.object,
  layer: React.PropTypes.string,

};


export default MarkerCluster;
