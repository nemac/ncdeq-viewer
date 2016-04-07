var React = require('react');

var MainComponent = require('../components/MainComponent');

require('../main.css');

var PropTypes = React.PropTypes;

var MainContainer = React.createClass({
  getDefaultProps: function() {
    return {
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
    var mapHeight = this.setHeight(1,leftover);
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

    //set suze varriabe
    return {
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
      defpad:5,
      isResultsVisible: true,
      rowPadding: 1,
      headerHeight: sizes.headerHeight,
      mapHeight: sizes.mapHeight,
      chartHeight: sizes.chartHeight,
      breadCrumbsHeight: sizes.breadCrumbsHeight
    }
  },
  handleResize: function(e) {
    //handling the scaling of map and chart areas
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
  render: function() {
    return (
      <MainComponent
        defpad={this.state.defpad}
        isResultsVisible={this.state.isResultsVisible}
        headerHeight={this.state.headerHeight}
        mapHeight={this.state.mapHeight}
        chartHeight={this.state.chartHeight}
        breadCrumbsHeight={this.state.breadCrumbsHeight}
        rowPadding={this.state.rowPadding} />
    )

  }

});

module.exports = MainContainer;
