var React = require('react');
var Menu = require('../components/MenuItemComponent');

var PropTypes = React.PropTypes;

var MenuItemContainer = React.createClass({
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
      <Menu
        handleMenuClick={this.handleMenuClick}
        getActive={this.getActive} />
    );
  }

});

module.exports = MenuItemContainer;
