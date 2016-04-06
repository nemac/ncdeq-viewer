var React = require('react');
var MenuItemComponent = require('../components/MenuItemComponent');

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
      <MenuItemComponent
        handleMenuClick={this.props.handleMenuClick}
        getActive={this.props.getActive} 
        name={this.state.name}
        activeValue={this.state.activeValue} />
    );
  }

});

module.exports = MenuItemContainer;
