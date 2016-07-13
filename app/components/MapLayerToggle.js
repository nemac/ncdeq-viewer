var React = require('react');
var PropTypes = React.PropTypes;

var MapLayerToggle = React.createClass({

  propTypes: {
    toggleText: PropTypes.string,
  },
  handleLayerClick: function(e){
    console.log(this)
  },
  getDefaultProps: function() {
    return {
      toggleText:'Layer Toggle'
    };
  },
  getInitialState: function() {
    this.toggleText = this.props.toggleText;
    return {
      toggleText: this.toggleText
    };
  },
  render: function() {
    return (
      <div>
        <div className="ui checkbox">
          <input type="checkbox" name="togglelayer" onClick={this.handleLayerClick} />
          <label>{this.state.toggleText}</label>
        </div>
      </div>
    );
  }

});

module.exports = MapLayerToggle;
