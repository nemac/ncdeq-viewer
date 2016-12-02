var React = require('react');
var PropTypes = React.PropTypes;

import {
  BOX_BORDER,
  SPACING
} from '../constants/appConstants'

var MapLayerToggleName = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  getInitialState: function() {
    return {
      title: this.props.text
    };
  },
  render: function() {
    return (
      <h5 className="ui inverted header" style={{marginTop:"0px"}} >{this.state.title}    </h5>
    );
  }

});

module.exports = MapLayerToggleName;
