import React from 'react';

var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var HeaderComponent = require('../components/HeaderComponent');
var SectionWrapper = require('../components/SectionWrapper');
var RowWrapper = require('../components/RowWrapper');
import MenuContainer from '../containers/MenuContainer';

var MapRowComponent = require('../components/MapRowComponent');
import ChartRowContainer from '../containers/ChartRowContainer';

import {HEADER_HEIGHT , BREAD_CRUMBS_HEIGHT, ROW_PADDING , DEF_PAD , MAP_HEIGHT , CHART_HEIGHT , CHART_VISIBILITY} from '../constants/appConstants'


require('../main.css');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var MainComponent = React.createClass({
  handleSearchChange: function(comp,e){
    var input = e.target;

    //get max bounds from props for google search limits and prefrence.
    const northEastLatitude = this.props.map_settings.maxBounds._northEast.lat
    const northEastlongitude = this.props.map_settings.maxBounds._northEast.lng
    const southWestLatitude = this.props.map_settings.maxBounds._southWest.lat
    const southWestlongitude = this.props.map_settings.maxBounds._southWest.lng

    //search google api
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(southWestLatitude, southWestlongitude),
      new google.maps.LatLng(northEastLatitude, northEastlongitude));

      //set the bouns to the optopns
      var options = {bounds: defaultBounds}

      //get this so we can access in tin google maps callback
      var self = this;

      //instatiate a new google maps search box api
      var ac = new google.maps.places.SearchBox(input,options);

      google.maps.event.addListener(ac, 'places_changed', function () {
        var place = ac.getPlaces()[0];

        if (!place.geometry) return;

        if (!place.address_components){
          input.value = place.formatted_address
        }

        //get lat, long of user location
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();

        //set max zoom for panning to user searched point
        var zoom = self.props.map_settings.zoom > 12 ? self.props.map_settings.zoom : 12

        //set store to  new lat,long and zoom level
        //will need to add ability to detect the huc's this point falls in
        self.props.set_mapToPoint(lat,lng,zoom,null);

      });


    },
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
      const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : ROW_PADDING;
      const mapHeight = this.props.default_settings ? this.props.default_settings.mapHeight : MAP_HEIGHT;
      const breadCrumbsHeight = this.props.default_settings ? this.props.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
      const headerHeight = this.props.default_settings ? this.props.default_settings.headerHeight : HEADER_HEIGHT;
      const defpad = this.props.default_settings ? this.props.default_settings.defpad : DEF_PAD;
      const chartHeight = this.props.default_settings ? this.props.default_settings.chartHeight : CHART_HEIGHT;

      return (
        <div className="ui one column relaxed padded grid">

          <RowWrapper rowPadding={rowPadding} height={headerHeight} >
            <HeaderComponent content='To get started click a River Basin on the map, or search for a location to zoom to.'/>
          </RowWrapper>

          <RowWrapper rowPadding={rowPadding} height={breadCrumbsHeight}>
            <MenuContainer handleSearchChange={this.handleSearchChange} />
          </RowWrapper>

          <RowWrapper rowPadding={rowPadding} >
            <MapRowComponent />
          </RowWrapper>

          { this.props.charts.chart_visibility &&
            <RowWrapper rowPadding={defpad} height={chartHeight} >
              <ChartRowContainer />
            </RowWrapper>
          }
        </div>
      );

    }

  });

  module.exports = MainComponent;
