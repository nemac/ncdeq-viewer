import React from 'react';

//import components
import MapRowContainer from '../containers/MapRowContainer';
var ModalAbout = require('../components/ModalAbout');
import ChartRowContainer from '../containers/ChartRowContainer';
import MenuContainer from '../containers/MenuContainer';
import HeaderContainer from '../containers/HeaderContainer';

import {
  HEADER_DESCRIPTION_VISIBILITY,
  CHART_VISIBILITY,
  MAP_FULL_WIDTH,
  MAP_CHART_WIDTH,
  BOX_BORDER,
  BACKGROUND_COLOR_BG,
  OVERIDE_WIDTH,
} from '../constants/appConstants'

var MainComponent = React.createClass({
    handleResize: function(e) {
      //update map size when browser is reiszed.
      //  this updates redux store - MapComponent is subscribed to it.
      this.props.set_defaults();

      //leaflet map dosenot update size this forces the issue
      if(this.props.leafletMap){
        const leafletMap = this.props.leafletMap.leafletMap;
        if(leafletMap){
          leafletMap.invalidateSize(true)
          setTimeout(function(){ leafletMap.invalidateSize(true)}, 0);
        }
      };

    },
    shouldComponentUpdate: function(nextProps, nextState) {
      if(!nextProps.constants){
        return false;
      }
      return true

    },
    componentWillMount: function() {
      this.props.set_constants();

      //get and populate the geography_levels state...
      this.props.get_GeographyLevels();

      //get chart levels
      this.props.get_ChartLevels();

      //get and populate the chart data
      this.props.get_ChartData();

      //get and populate the map data
      this.props.get_defaultMapData();

      //leaflet needs an actual mapheight. and we want to dynamically resize the map as the user resizes the browser....
      this.props.set_defaults();

    },
    componentDidMount: function() {

      //handle resize.  - map and chart areas should scale to browser
      //width and height
      window.addEventListener('resize', this.handleResize);

      //for semantic-ui dropdowns
      $('.ui.dropdown').dropdown();
      $('#search-select').dropdown();
      $('.ui.sticky').sticky();
    },
    render: function() {

      //get sizes from props and check if the prop has been set.
      //  putting to const's so we can account for undefined props on first render...
      let is_chart_vis = true

      if(this.props.charts.chart_visibility === undefined){
        is_chart_vis = true
      } else {
        is_chart_vis = this.props.charts.chart_visibility
      }

      const columnWidth = is_chart_vis ? MAP_CHART_WIDTH : MAP_FULL_WIDTH;
      const header_description_visibility =  this.props.default_settings ? this.props.default_settings.HEADER_DESCRIPTION_VISIBILITY : HEADER_DESCRIPTION_VISIBILITY;

      const ADJUSTED_COLUMN_WIDTH = window.innerWidth < OVERIDE_WIDTH ? "sixteen" : columnWidth;

      const padding = this.props.default_settings ? this.props.default_settings.PADDING : 0;
      const leftover =  this.props.default_settings ? this.props.default_settings.MAPHEIGHT : 0;

      return (
        <div className="ui stackable one column padded grid" style={{backgroundColor: BACKGROUND_COLOR_BG}}>
          <HeaderContainer  header_description_visibility={header_description_visibility} />
          <div id="breadCrumbsHeight"  className="row">
            <div className="column">
              <MenuContainer />
            </div>
          </div>
          <div id="mapandcharts" className="row" style={{height:leftover,padding:"0px"}}>
            <div className="column" style={{padding:"0px"}}>
              <div className="ui stackable two column padded grid" style={{height:leftover,backgroundColor: BACKGROUND_COLOR_BG}}>
                <div className="row" style={{padding:"0px"}}>
                  {/* only render the charts section when the user has made the charts visibility true */}
                  { is_chart_vis &&
                    <div id="chartColumn" className={"ui " + ADJUSTED_COLUMN_WIDTH + " wide column"} style={{height:leftover,paddingTop:"0px !important"}}>
                      <ChartRowContainer />
                    </div>
                  }
                  <div id="mapColumn" className={"ui " + ADJUSTED_COLUMN_WIDTH + " wide column"} style={{height:leftover,paddingTop:"0px !important"}}>
                    <MapRowContainer columnWidth={columnWidth} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ModalAbout />
        </div>
      );

    }

  });

  module.exports = MainComponent;
