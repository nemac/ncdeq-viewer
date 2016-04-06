var React = require('react');
var Menu = require('../components/Menu');

var PropTypes = React.PropTypes;

var MenuContainer = React.createClass({
  defaultItems: function(){
    return ([
      {name:'River Basins',activeValue:'RiverBasinActive' },
      {name:'Cataloging Units',activeValue:'CatalogingActive' },
      {name:'HUC',activeValue:'HUCActive' }
    ])
  },
  getStateObject: function(){

    var obj = {};
    var items = this.defaultItems();

    items.map(function(item) {
      obj[ item.activeValue ] = false;
    })

    return obj
  },
  getInitialState: function () {
    return this.getStateObject();
  },
  resetMenus: function(){
    //set all to false
    this.setState(this.getStateObject())
  },
  handleMenuClick: function(val,e) {

    //reset menu
    this.resetMenus();

    //change state to active for clicke menu
    this.setState({
      [val]: true,
    })

  },
  getActive: function(val){
    return  (this.state[val] ? 'active item' : 'item')
  },
  render: function() {
    return (
      <Menu
        RiverBasinActive={this.state.RiverBasinActive}
        CatalogingActive={this.state.CatalogingActive}
        HUCActive={this.state.HUCActive}
        handleMenuClick={this.handleMenuClick}
        getActive={this.getActive}
        items = {this.defaultItems()}/>
    );
  }

});

module.exports = MenuContainer;
