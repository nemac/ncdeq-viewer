var React = require('react');

var MainComponent = require('../components/MainComponent');

require('../main.css');

var PropTypes = React.PropTypes;

var MainContainer = React.createClass({
  getDefaultProps: function() {
    return {
      latitude: 35.6684,
      longitude: -80.4786,
      isChartsVisible: false,
      headerHeight:100,
      breadCrumbsHeight:50,
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
      latitude: 35.6684,
      longitude: -80.4786,
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
  handleSearchChange: function(comp,e){
    console.log(e.target.value)

    var input = e.target;
    var options = {componentRestrictions: {country: 'us'}};
    var ac = new google.maps.places.Autocomplete(input, options);

    var self = this;

    google.maps.event.addListener(ac, 'place_changed', function () {
      var place = ac.getPlace();
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      self.setState({
        latitude: lat,
        longitude: lng
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

    //for semantic-ui dropdowns..  not implemented yet
    $('.ui.dropdown').dropdown();
  },
  render: function() {
    return (
      <MainComponent
        defpad={this.state.defpad}
        latitude= {this.state.latitude}
        longitude= {this.state.longitude}
        handleChartToggle={this.handleChartToggle}
        handleSearchChange={this.handleSearchChange}
        isChartsVisible={this.state.isChartsVisible}
        handleMapClick={this.handleMapClick}
        headerHeight={this.state.headerHeight}
        mapHeight={this.state.mapHeight}
        chartHeight={this.state.chartHeight}
        breadCrumbsHeight={this.state.breadCrumbsHeight}
        rowPadding={this.state.rowPadding} />
    )

  }

});

module.exports = MainContainer;
