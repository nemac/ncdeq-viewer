var React = require('react');
import MapContainer from '../containers/MapContainer'

var PropTypes = React.PropTypes;

import {
  OVERIDE_WIDTH,
  MAP_HEIGHT,
  SPACING,
} from '../constants/appConstants'

var MapRowComponent = React.createClass({

  render: function() {

    const headerHeight = $('#headerrow').outerHeight()

    const breadCrumbsHeight =   $('#breadCrumbsHeight').outerHeight()
    const padding = 14
    const leftover = window.innerHeight - (headerHeight + breadCrumbsHeight + padding)
    const mapwidth = $('#mapColumn').innerWidth() - (padding*2)

    return (

      <div id="mapSubColumn" style={{height:leftover,width:mapwidth,padding:"0px",margin:"0px"}}>
          <MapContainer />
      </div>
    );
  }
});

module.exports = MapRowComponent;
