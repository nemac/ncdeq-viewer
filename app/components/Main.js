var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var RowWrapper = require('./RowWrapper');
var BreadCrumb = require('./BreadCrumb');
var MapRow = require('./MapRow');
var ChartWrapper = require('./ChartWrapper');

var SearchBar = require('./Search');
var BottomSectionWrapper = require('./BottomSectionWrapper');
var styles = require('../styles');

require('../main.css');

var Main = React.createClass({

  getDefaultProps: function() {
    return {
      isResultsVisible: true,
      headerHeight: 100,
      mapHeight: 250,
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
  getInitialState: function () {

    //components with fixed heights.
    var headerHeight = 100;
    var breadCrumbsHeight = 50;

    //adjustable heights.
    //first get whats leftover from fixed components
    // the calculate the map hieght.
    //give the rest to the chart
    var leftover = window.innerHeight -  (headerHeight + breadCrumbsHeight);
    var mapHeight = this.getHeight(1,leftover);
    var chartHeight  = window.innerHeight - (leftover + mapHeight);

    if (mapHeight < 250){
      mapHeight = 250
    }

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
  handleResize: function(e) {

    //components with fixed heights.
    var headerHeight = 100;
    var breadCrumbsHeight = 50;

    //adjustable heights.
    //first get whats leftover from fixed components
    // the calculate the map hieght.
    //give the rest to the chart
    var leftover = window.innerHeight -  (headerHeight + breadCrumbsHeight);
    var mapHeight = this.getHeight(1,leftover);
    var chartHeight  = window.innerHeight - (leftover + mapHeight);

    if (mapHeight < 250){
      mapHeight = 250
    }

    if (chartHeight < 100){
      chartHeight = 100
    }

    this.setState({
      headerHeight: headerHeight,
      mapHeight: mapHeight,
      chartHeight: chartHeight,
      breadCrumbsHeight: breadCrumbsHeight
    })
  },

  componentDidMount: function() {
    console.log('CDM total', window.innerHeight  )
    var first = window.innerHeight - (window.innerHeight / 1.618);
    var second = first / 1.618;
    var third = second / 1.618;

    console.log('first ',first);
    console.log('second ',second);
    console.log('third ',third);
    var start
    this.getHeight(2,window.innerHeight )


    window.addEventListener('resize', this.handleResize);
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

        <RowWrapper refText="mapWrapper" rowPadding={this.state.rowPadding} height={this.state.chartHeight}>
          <ChartWrapper />
        </RowWrapper>

    </div>

      )
    }
  });

  module.exports = Main;
