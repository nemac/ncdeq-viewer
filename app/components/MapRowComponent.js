var React = require('react');
import MapContainer from '../containers/MapContainer'

var PropTypes = React.PropTypes;

import {
  OVERIDE_WIDTH,
  CHART_HEIGHT_ADJUSTMENT,
  MAP_HEIGHT,
  SPACING,
} from '../constants/appConstants'

var MapRowComponent = React.createClass({

  render: function() {
    const columnWidth = this.props.columnWidth;
    const ADJUSTED_COLUMN_WIDTH = window.innerWidth < OVERIDE_WIDTH ? "sixteen" : columnWidth;
    //not sure yet ho to handle this but chartHeight needs to be adjusted by to px in the chart component
    let chart_grid_height =  MAP_HEIGHT-CHART_HEIGHT_ADJUSTMENT;    //get the chart width and chart height settings from the redux store
    //  so we can pass it as a prop to the chart components
    if(this.props.default_settings){
      chart_width_px = this.props.default_settings.chartWidth;
      chart_grid_height = this.props.default_settings.mapHeight-CHART_HEIGHT_ADJUSTMENT;
    }

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
