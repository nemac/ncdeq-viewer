var React = require('react');
var ProjectMapAdd = require('./ProjectMapAdd');
var MapLayerToggleName = require('./MapLayerToggleName');
var MapLayerToggle = require('./MapLayerToggle');
var PropTypes = React.PropTypes;

var HeaderComponent = require('../components/HeaderComponent');
var RowWrapper = require('../components/RowWrapper');

import {HEADER_HEIGHT ,
  BREAD_CRUMBS_HEIGHT,
  ROW_PADDING,
  DEF_PAD,
  MAP_HEIGHT,
  CHART_HEIGHT,
  CHART_VISIBILITY,
  MAX_SEARCH_ZOOM
} from '../constants/appConstants'

var ProjectMapWrapper = React.createClass({

  render: function() {

    //get sizes from props and check if the prop has been set.
    //  putting to const's so we can account for undefined props on first render...
    const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : ROW_PADDING;
    const headerHeight = this.props.default_settings ? this.props.default_settings.headerHeight : HEADER_HEIGHT;

    return (



        <HeaderComponent content='To get started click a River Basin on the map, or search for a location to zoom to.'/>


    );
  }

});

module.exports = ProjectMapWrapper;
