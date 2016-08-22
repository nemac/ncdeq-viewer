import React from 'react';

//import components
var HeaderComponent = require('../components/HeaderComponent');
var SectionWrapper = require('../components/SectionWrapper');
var RowWrapper = require('../components/RowWrapper');
var MapRowWrapper = require('../components/MapRowWrapper');
var HeaderRowWrapper = require('../components/HeaderRowWrapper');
var MapRowComponent = require('../components/MapRowComponent');
var ModalAbout = require('../components/ModalAbout');
import ChartRowContainer from '../containers/ChartRowContainer';
import MenuContainer from '../containers/MenuContainer';

import {HEADER_HEIGHT ,
  BREAD_CRUMBS_HEIGHT,
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
    },
    render: function() {

      //get sizes from props and check if the prop has been set.
      //  putting to const's so we can account for undefined props on first render...
      const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : ROW_PADDING;
      const mapHeight = this.props.default_settings ? this.props.default_settings.mapHeight : MAP_HEIGHT;
      const breadCrumbsHeight = this.props.default_settings ? this.props.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
      const headerHeight = this.props.default_settings ? this.props.default_settings.headerHeight : HEADER_HEIGHT;
      const defpad = this.props.default_settings ? this.props.default_settings.defpad : DEF_PAD;
      const chartHeight = this.props.default_settings ? this.props.default_settings.chartHeight : CHART_HEIGHT;
      const columnWidth = this.props.charts.chart_visibility ? MAP_CHART_WIDTH : MAP_FULL_WIDTH;

      const HeaderContent = "The purpose of this tool is to display the Division of Mitigation Services Targeted Resource Areas (TRAs) and " +
                      "identify watersheds where ecological and hydrological function can be improved.  " +
                      "TRAs identify clusters of areas where habitat, hydrology and/or water quality variables " +
                      "can be managed to improve watershed function. " +
                      "  To get started click a River Basin on the map, " +
                      "or search for a location to zoom to."
      return (
        <div className="ui one column relaxed padded grid">

          <HeaderComponent content={HeaderContent}/>


          <RowWrapper rowPadding={"1"} height={breadCrumbsHeight}>
            <MenuContainer />
          </RowWrapper>

          <MapRowWrapper rowPadding={rowPadding} >
            {/* only render the charts section when the user has made the charts visibility true */}
            { this.props.charts.chart_visibility &&
              <ChartRowContainer />
            }
            <MapRowComponent columnWidth={columnWidth}/>
          </MapRowWrapper>
          <ModalAbout />
        </div>
      );

    }

  });

  module.exports = MainComponent;
