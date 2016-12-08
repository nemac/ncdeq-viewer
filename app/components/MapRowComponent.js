var React = require('react');

var MapWrapper = require('./MapWrapper');

var PropTypes = React.PropTypes;

import {
  OVERIDE_WIDTH,
} from '../constants/appConstants'

var MapRowComponent = React.createClass({

  render: function() {
    const columnWidth = this.props.columnWidth;
    const ADJUSTED_COLUMN_WIDTH = window.innerWidth < OVERIDE_WIDTH ? "sixteen" : columnWidth;

    return (
      <div className={"ui stackable internally celled " + ADJUSTED_COLUMN_WIDTH + " wide column grid"} style={{paddingLeft:"7px",paddingTop:"0px"}}>
        <div className="stretched row" >

          <MapWrapper />

        </div>

      </div>


    );
  }

});

module.exports = MapRowComponent;
