var React = require('react');
var MenuItemComponent = require('../components/MenuItemComponent');

var PropTypes = React.PropTypes;

var MenuItemContainer = React.createClass({
  propTypes: {
    name: PropTypes.string,
    list: PropTypes.array,
    activeValue: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      name:'Item',
      list: [],
      activeValue:'ItemActive'
    };
  },
  getInitialState: function() {
    return {
      name: this.props.name,
      list: this.props.lists,
      activeValue: this.props.activeValue
    };
  },
  render: function() {
    return (
      <MenuItemComponent
        handleMenuClick={this.props.handleMenuClick}
        getActive={this.props.getActive}
        name={this.state.name}
        lists = {this.props.lists}
        activeValue={this.state.activeValue} />
    );
  }

});

module.exports = MenuItemContainer;
