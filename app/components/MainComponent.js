var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var HeaderComponent = require('../components/HeaderComponent');
var SectionWrapper = require('../components/SectionWrapper');
var RowWrapper = require('../components/RowWrapper');
var MenuContainer = require('../containers/MenuContainer');
var MapRowContainer = require('../containers/MapRowContainer');
var ChartRow = require('../components/ChartRow');

import store from '../stores/RBRPStore'

require('../main.css');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var MainComponent = React.createClass({
  getDefaultProps: function() {
    return {
      latitude: 35.6684,
      longitude: -80.4786,
      zoom: 7,
      isChartsVisible: false,
      headerHeight:100,
      breadCrumbsHeight:50
    };
  },
  setHeight(repeat,val){
    //set the height of element based on a ratio 1.618
    if(repeat<1){
      return val
    } else{
      return this.setHeight(repeat-1, val/1.618)
    }
  },
  setSize: function(chartVis){
    //when state is not defined yet set to true
    var vis = this.state ? chartVis : false;
    var padding = this.state ? this.state.rowPadding : true;

    //components with fixed heights.
    var headerHeight = this.props.headerHeight;
    var breadCrumbsHeight = this.props.breadCrumbsHeight;

    //map and chart areas should scale to browser
    //for leaflet the map height needs to be explicit
    //adjustable heights.
    //first get whats leftover from fixed components
    // the calculate the map hieght.
    //give the rest to the chart
    var leftover = window.innerHeight -
    (headerHeight + breadCrumbsHeight +
      (padding*4)
    );

    if (vis){
      var mapHeight = this.setHeight(1,leftover);
      var chartHeight = window.innerHeight - (leftover - mapHeight);
    } else {
      var mapHeight  = leftover
      var chartHeight = 0;
    }

    //do not let map height less than 250 pixels
    if (mapHeight < 300){
      mapHeight = 300
    }

    //do not let chart area less than 100 pixels
    //  may need to rethink this if the charts need more space....
    if (chartHeight < 100){
      chartHeight = 100
    }

    //set size varriabe
    return {
      isChartsVisible: vis,
      headerHeight: headerHeight,
      mapHeight: mapHeight,
      chartHeight: chartHeight,
      breadCrumbsHeight: breadCrumbsHeight,
      rowPadding: 1
    }
  },
  getInitialState: function () {
    var sizes = this.setSize();

    return{
      latitude: 35.6683,
      longitude: -80.4786,
      zoom: 7,
      defpad:5,
      isChartsVisible: false,
      rowPadding: 1,
      headerHeight: sizes.headerHeight,
      mapHeight: sizes.mapHeight,
      chartHeight: sizes.chartHeight,
      breadCrumbsHeight: sizes.breadCrumbsHeight
    }
  },
  handleChartToggle: function(e){
    //toggle state of chart area
    //var active = !this.state.isChartsVisible;

    //set new map size without chart area
    var sizes = this.setSize(false);

    this.setState({
      isChartsVisible: sizes.isChartsVisible,
      headerHeight: sizes.headerHeight,
      mapHeight: sizes.mapHeight,
      chartHeight: sizes.chartHeight,
      breadCrumbsHeight: sizes.breadCrumbsHeight
    })

  },
  HandleMapZoomEnd: function(mapComp,e){
    var L = mapComp.refs.map.leafletElement

    var zoom = L.getZoom();
    var center = L.getCenter();

    this.setState({
      zoom: zoom,
      latitude: center.lat,
      longitude: center.lng
    })

  },
  handleMapMoveEnd: function(mapComp,e){
    var L = mapComp.refs.map.leafletElement
    var center = L.getCenter();
    var zoom = L.getZoom();

    this.setState({
      zoom: zoom,
      latitude: center.lat,
      longitude: center.lng
    })
  },
  handleCenter: function(e){
    this.setState({
      latitude: 35.6683,
      longitude: -81.4786
    })
  },
  handleSearchChange: function(comp,e){

    var input = e.target;

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(33.6878, -84.5288),
      new google.maps.LatLng(36.9674, -74.8169));

      var options = {bounds: defaultBounds}
      var self = this;

      var ac = new google.maps.places.SearchBox(input,options);


      google.maps.event.addListener(ac, 'places_changed', function () {
        var place = ac.getPlaces()[0];

        if (!place.geometry) return;

        if (!place.address_components){
          input.value = place.formatted_address
        }


        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var zoom = self.state.zoom > 12 ? self.state.zoom  : 12
        //will need to add ability to detect the huc's this point falls in

        self.setState({
          latitude: lat,
          longitude: lng,
          zoom: zoom
        })

      });


    },
    handleMapClick: function(e){

      //set new map size without chart area
      var sizes = this.setSize(true);

      this.setState({
        isChartsVisible: sizes.isChartsVisible,
        headerHeight: sizes.headerHeight,
        mapHeight: sizes.mapHeight,
        chartHeight: sizes.chartHeight,
        breadCrumbsHeight: sizes.breadCrumbsHeight
      })

    },
    handleResize: function(e) {

      //handling the scaling of map and chart areas
      var sizes = this.setSize(this.state.isChartsVisible);

      this.setState({
        headerHeight: sizes.headerHeight,
        mapHeight: sizes.mapHeight,
        chartHeight: sizes.chartHeight,
        breadCrumbsHeight: sizes.breadCrumbsHeight
      })
    },
    componentDidMount: function() {

      //handle resize.  - map and chart areas should scale to browser
      //width and height
      window.addEventListener('resize', this.handleResize);

      //for semantic-ui dropdowns
      $('.ui.dropdown').dropdown();
      $('#search-select').dropdown();

    },
    render: function() {
      return (
        <div className="ui one column relaxed padded grid">

          <RowWrapper rowPadding={this.state.rowPadding} height={this.state.headerHeight} >
            <HeaderComponent content='To get started click a River Basin on the map, or search for a location to zoom to.'/>
          </RowWrapper>

          <RowWrapper rowPadding={this.state.rowPadding} height={this.state.breadCrumbsHeight}>
            <MenuContainer handleSearchChange={this.handleSearchChange} zoom={this.state.zoom} latitude={this.state.latitude} longitude={this.state.longitude} />
          </RowWrapper>

          <RowWrapper rowPadding={this.state.rowPadding} >
            <MapRowContainer zoom={this.state.zoom} latitude={this.state.latitude} longitude={this.state.longitude} HandleMapZoomEnd={this.HandleMapZoomEnd} handleMapMoveEnd={this.handleMapMoveEnd} handleCenter={this.handleCenter} handleMapClick={this.handleMapClick} rowPadding={this.state.rowPadding} mapHeight={this.state.mapHeight}  />
          </RowWrapper>

          { this.state.isChartsVisible &&
            <RowWrapper rowPadding={this.state.defpad} height={this.state.chartHeight} >
              <ChartRow isChartsVisible={this.state.isChartsVisible} handleChartToggle={this.handleChartToggle} />
            </RowWrapper>
          }

        </div>
      );

    }

  });

  module.exports = MainComponent;
