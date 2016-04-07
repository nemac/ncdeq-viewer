var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var HeaderContainer = require('../containers/HeaderContainer');
var SectionWrapper = require('../components/SectionWrapper');
var RowWrapper = require('../components/RowWrapper');
var MenuContainer = require('../containers/MenuContainer');
var MapRow = require('../components/MapRow');
var ChartRow = require('../components/ChartRow');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

function MainComponent (props) {
  return(
    <div className="ui one column relaxed padded grid">

      <RowWrapper refText="header" rowPadding={props.rowPadding} height={props.headerHeight} >
        <HeaderContainer content='To get started click a River Basin on the map, or search for a location to zoom to.'/>
      </RowWrapper>

      <RowWrapper refText="breadCrumbs" rowPadding={props.rowPadding} height={props.breadCrumbsHeight}>
        <MenuContainer />
      </RowWrapper>

      <RowWrapper rowPadding={props.rowPadding} refText="mapRowWrapper" >
        <MapRow   rowPadding={props.rowPadding} mapHeight={props.mapHeight}  />
      </RowWrapper>

      <RowWrapper refText="mapWrapper" rowPadding={props.defpad} height={props.chartHeight}>
        <ChartRow />
      </RowWrapper>

    </div>)
  }

  MainComponent.PropTypes = {
    defpad: PropTypes.number.isRequired,
    isResultsVisible: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number.isRequired,
    breadCrumbsHeight: PropTypes.number.isRequired,
    mapHeight: PropTypes.number.isRequired,
    chartHeight: PropTypes.number.isRequired,
    rowPadding: PropTypes.number.isRequired
  }

  module.exports = MainComponent;
