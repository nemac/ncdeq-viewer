var React = require('react');

var MapWrapper = require('./MapWrapper');
var ProjectMapWrapper = require('./ProjectMapWrapper');
import MapLayerToggleContainer from '../containers/MapLayerToggleContainer';

var PropTypes = React.PropTypes;

var MapRowComponent = React.createClass({

  render: function() {
    const columnWidth = this.props.columnWidth;
    return (
      <div className={"ui stackable internally celled " + columnWidth + " wide column grid"}>
        <div className="stretched row" >

          <MapWrapper />

        </div>

      </div>


    );
  }

});

module.exports = MapRowComponent;
