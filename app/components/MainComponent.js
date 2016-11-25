import React from 'react';

//import components
var HeaderComponent = require('../components/HeaderComponent');
var SectionWrapper = require('../components/SectionWrapper');
var RowWrapper = require('../components/RowWrapper');
var MapRowWrapper = require('../components/MapRowWrapper');
var MapRowComponent = require('../components/MapRowComponent');
var ModalAbout = require('../components/ModalAbout');
import ChartRowContainer from '../containers/ChartRowContainer';
import MenuContainer from '../containers/MenuContainer';

import {HEADER_HEIGHT ,
  BREAD_CRUMBS_HEIGHT,
  HEADER_DESCRIPTION_VISIBILITY,
  ROW_PADDING,
  DEF_PAD,
  MAP_HEIGHT,
  CHART_HEIGHT,
  CHART_VISIBILITY,
  MAX_SEARCH_ZOOM,
  MAP_FULL_WIDTH,
  MAP_CHART_WIDTH
} from '../constants/appConstants'

var MainComponent = React.createClass({
    handleResize: function(e) {
      //update map size when browser is reiszed.
      //  this updates redux store - MapComponent is subscribed to it.
      this.props.update_MapHeight();
    },
    componentDidMount: function() {

      //get and populate the geography_levels state...
      this.props.get_GeographyLevels();

      //get chart levels
      this.props.get_ChartLevels();

      //get and populate the chart data
      this.props.get_ChartData();

      //get and populate the map data
      this.props.get_defaultMapData();

      //set default app i.e div heights, padding, and such
      this.props.set_defaults();

      //leaflet needs an actual mapheight. and we want to dynamically resize the map as the user resizes the browser....
      this.props.update_MapHeight();

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
      // let is_chart_vis = this.props.charts.chart_visibility ? true : false
      // is_chart_vis = this.props ? true : this.props.charts.chart_visibility
      const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : ROW_PADDING;
      const mapHeight = this.props.default_settings ? this.props.default_settings.mapHeight : MAP_HEIGHT;
      const breadCrumbsHeight = this.props.default_settings ? this.props.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
      const headerHeight = this.props.default_settings ? this.props.default_settings.headerHeight : HEADER_HEIGHT;
      const defpad = this.props.default_settings ? this.props.default_settings.defpad : DEF_PAD;
      const chartHeight = this.props.default_settings ? this.props.default_settings.chartHeight : CHART_HEIGHT;
      const columnWidth = is_chart_vis ? MAP_CHART_WIDTH : MAP_FULL_WIDTH;
      const header_description_visibility =  this.props.default_settings ? this.props.default_settings.header_description_visibility : HEADER_DESCRIPTION_VISIBILITY;

      const HeaderContent = "The purpose of this tool is to display the Division of Mitigation Services Targeted Resource Areas (TRAs) and " +
                      "identify watersheds where ecological and hydrological function can be improved.  " +
                      "TRAs identify clusters of areas where habitat, hydrology and/or water quality variables " +
                      "can be managed to improve watershed function. " +
                      "  To get started click a River Basin on the map, " +
                      "or search for a location to zoom to."
      return (
        <div className="ui stackable one column padded grid">

          <HeaderComponent content={HeaderContent}  header_description_visibility={header_description_visibility} />


            <MenuContainer />


            {/* only render the charts section when the user has made the charts visibility true */}
            { is_chart_vis &&
              <ChartRowContainer />
            }
            <MapRowComponent columnWidth={columnWidth} />

          <ModalAbout />
        </div>
      );

    }

  });

  module.exports = MainComponent;
