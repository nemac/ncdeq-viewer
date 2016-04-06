var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var RowWrapper = require('./RowWrapper');
var BreadCrumb = require('./BreadCrumb');
var MapRow = require('./MapRow');
var ChartRow = require('./ChartRow');

require('../main.css');

var Main = React.createClass({

  getDefaultProps: function() {
    return {
      defpad:5,
      isResultsVisible: true,
      headerHeight: 100,
      mapHeight: 300,
      chartHeight: 200,
      breadCrumbsHeight: 50,
      rowPadding: 1
    };
  },
  getHeight(repeat,val){
    if(repeat<1){
      return val
    } else{
      return this.getHeight(repeat-1, val/1.618)
    }
  },
  setSize: function(){

    //components with fixed heights.
    var headerHeight = this.props.headerHeight;
    var breadCrumbsHeight = this.props.breadCrumbsHeight;

    //map and chart areas should scale to browser
    //for leaflet the map height needs to be explicit
    //adjustable heights.
    //first get whats leftover from fixed components
    // the calculate the map hieght.
    //give the rest to the chart
    var leftover = window.innerHeight -  (headerHeight + breadCrumbsHeight);
    var mapHeight = this.getHeight(1,leftover);
    var chartHeight  = window.innerHeight - (leftover + mapHeight);

    //do not let map height less than 250 pixels
    if (mapHeight < 300){
      mapHeight = 300
    }

    //do not let chart area less than 100 pixels
    //  may need to rethink this if the charts need more space....
    if (chartHeight < 100){
      chartHeight = 100
    }

    return {
      isResultsVisible: true,
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
      headerHeight: sizes.headerHeight,
      mapHeight: sizes.mapHeight,
      chartHeight: sizes.chartHeight,
      breadCrumbsHeight: sizes.breadCrumbsHeight
    }
  },
  handleResize: function(e) {

    var sizes = this.setSize();

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
  render: function () {
    return (
      <div className="ui one column relaxed padded grid">

        <RowWrapper refText="header" rowPadding={this.state.rowPadding} height={this.state.headerHeight} >
          <Header content='To get started click a River Basin on the map, or search for a location to zoom to.'/>
        </RowWrapper>

        <RowWrapper refText="breadCrumbs" rowPadding={this.state.rowPadding} height={this.state.breadCrumbsHeight}>
          <BreadCrumb />
        </RowWrapper>

        <RowWrapper rowPadding={this.state.rowPadding} refText="mapRowWrapper" >
          <MapRow   rowPadding={this.state.rowPadding} mapHeight={this.state.mapHeight}  />
        </RowWrapper>

        <RowWrapper refText="mapWrapper" rowPadding={this.props.defpad} height={this.state.chartHeight}>
          <ChartRow />
        </RowWrapper>

    </div>

      )
    }
  });

  module.exports = Main;
