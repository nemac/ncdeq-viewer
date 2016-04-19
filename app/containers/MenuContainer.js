var React = require('react');
var RiverBasinData = require('../utils/data.js');
var MenuComponent = require('../components/MenuComponent');

var PropTypes = React.PropTypes;

var MenuContainer = React.createClass({
  propTypes: {
    RiverBasinData: PropTypes.array
  },
  getDefaultProps: function() {
    return {
      RiverBasinData: RiverBasinData
    };
  },

  //  defaultItems: function(){
  //    return (RiverBasinData)
  //  },
  componentDidMount: function() {
    //var input = document.getElementById('searchTextField');
    //var options = {componentRestrictions: {country: 'us'}};
    //new google.maps.places.Autocomplete(input, options);
  },
  getLevel: function(){
    var st = this.state

    var activeTab = Object.keys(st).filter(function (key) {
        return  st[key]['active'] === true;
    });

    return activeTab[0]
  },
  getNextLevel: function(level){

    switch (level) {
      case 'River Basins':
        return 'Cataloging Units';
        break;
      case 'Cataloging Units':
        return 'HUC12';
        break;
      case 'HUC12':
        return '';
        break;
      default:
        return '';
    }

  },
  // limitPullDown: function(value){
  //
  //   //need to handle new river basin click.
  //   // this should reset all menus
  //   // right now I am mutating the RiverBasinData variable
  //   // need to make limited the items part of the state
  //   //var st = this.state
  //   var self = this;
  //
  //   //var activeTab = Object.keys(st).filter(function (key) {
  //   //    return  st[key] === true;
  //   //});
  //
  //   var level = this.getLevel();
  //   var chars = 0;
  //   var limitVal;
  //   var nextLevel;
  //   var filter;
  //
  //   switch (level) {
  //     case 'River Basins':
  //       chars = 5;
  //       limitVal = value;
  //       nextLevel = 'Cataloging Units';
  //       filter = 'main';
  //       break;
  //     case 'Cataloging Units':
  //       chars = 7;
  //       limitVal = value;
  //       nextLevel = 'HUC12';
  //       filter = 'main';
  //       break;
  //     case 'HUC12':
  //       chars = 11;
  //       filter = 'main';
  //       break;
  //     default:
  //       chars = 0;
  //   }
  //
  //   var defs = this.props.RiverBasinData;
  //
  //   var nextValues =  defs.map(function (lev) {
  //     var newlev = []
  //     if(lev.name === nextLevel){
  //       var list = lev.lists.filter(function (list) {
  //         return list[filter].toString().substring(0,chars) === value;
  //       })
  //       newlev = Object.assign({}, lev, {lists:list});
  //     } else{
  //       newlev = lev;
  //     }
  //     return(newlev)
  //   })
  //
  //   return nextValues
  //
  // },
  getStateObject: function(){

    var obj = {};
    var items = this.props.RiverBasinData;

    items.map(function(item) {
      obj[ item.name ] = {
        'active':false,
        'filter': !this.state ? '' : this.state[item.name].filter };
    },this)

    return obj
  },
  getInitialState: function () {
    return this.getStateObject();
  },
  resetMenus: function(){
    //set all to false
    this.setState(this.getStateObject())
  },
  menuChange: function(e){
    //this.props.RiverBasinData =  this.limitPullDown(e.target.value);
    var level = this.getLevel();
    var nextLevel = this.getNextLevel(level);

    this.setState({
      [nextLevel]:{
        'active': this.state[nextLevel].active,
        'filter': e.target.value
      }
      // [nextLevel]:{'filter': e.target.value}
    })

  },
  handleMenuClick: function(val,e) {
    //reset menu
    this.resetMenus();

    //change state to active for clicked menu
    this.setState({
      [val]:{'active': true,
        'filter': this.state[val].filter
      }
    })

  },
  getActive: function(val){
    return  (this.state[val].active ? 'active item' : 'item')
  },
  getFilter: function(val){
    return  (this.state[val].filter)
  },
  render: function() {
    console.log(this.state)
    return (
      <MenuComponent
        handleSearchChange={this.props.handleSearchChange}
        menuChange={this.menuChange}
        handleMenuClick={this.handleMenuClick}
        handleChange={this.handleChange}
        getActive={this.getActive}
        items = {this.props.RiverBasinData}
        getFilter={this.getFilter} />
    );
  }

});

module.exports = MenuContainer;
