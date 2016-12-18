var React = require('react');
import MapContainer from '../containers/MapContainer'

var PropTypes = React.PropTypes;

var MapRowComponent = React.createClass({

  render: function() {

    const headerHeight = $('#headerrow').outerHeight()

    const padding = this.props.default_settings ? this.props.default_settings.PADDING : 0;
    const leftover =  this.props.default_settings ? this.props.default_settings.LEFTOVER - (padding) : 0;
    const mapwidth = this.props.default_settings ? this.props.default_settings.MAPWIDTH : 0;

    return (

      <div id="mapSubColumn" style={{height:leftover,width:mapwidth,padding:"0px",margin:"0px"}}>
          <MapContainer />
      </div>
    );
  }
});

module.exports = MapRowComponent;
