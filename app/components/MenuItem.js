var React = require('react');
var PropTypes = React.PropTypes;

var MenuItem = React.createClass({
  propTypes: {
    name: PropTypes.string,
    activeValue: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      name:'Item',
      activeValue:'ItemActive'
    };
  },
  getInitialState: function() {
    return {
      name: this.props.name,
      activeValue: this.props.activeValue
    };
  },
  render: function() {
    return (
      <a className={this.props.getActive(this.state.activeValue)}  onClick={this.props.handleMenuClick.bind(null, this.state.activeValue)} >
        {this.state.name}
      </a>
    );
  }

});

module.exports = MenuItem;
