var React = require('react');
var RiverBasinData = require('../utils/data.js');
var MenuComponent = require('../components/MenuComponent');

var PropTypes = React.PropTypes;

var MenuContainer = React.createClass({
  defaultItems: function(){
    return (RiverBasinData)
  },
  componentDidMount: function() {
    //var input = document.getElementById('searchTextField');
    //var options = {componentRestrictions: {country: 'us'}};
    //new google.maps.places.Autocomplete(input, options);
  },
  limitPullDown: function(value){

      var st = this.state
      var self = this;
      var activeTab = Object.keys(st).filter(function (key) {
          return  st[key] === true;
      });

    var level = activeTab[0]
    //console.log('level: ' + level)
    var chars = 0;
    var limitVal;
    var nextLevel;
    var filter;

    switch (level) {
      case 'River Basins':
        chars = 5;
        limitVal = value;
        nextLevel = 'Cataloging Units';
        filter = 'main';
        break;
      case 'Cataloging Units':
        chars = 7;
        limitVal = value;
        nextLevel = 'HUC12';
        filter = 'main';
        break;
      case 'HUC12':
        chars = 11;
        filter = 'main';
        break;
      default:
        chars = 0;
    }

    var defs = RiverBasinData;

    var nextValues =  defs.map(function (lev) {
      //console.log(lev)
      var newlev = []
      if(lev.name === nextLevel){
        var list = lev.lists.filter(function (list) {
          //console.log(value,list[filter].toString().substring(0,chars) )
          //console.log(list[filter].toString().substring(0,chars) === value )
          return list[filter].toString().substring(0,chars) === value;
        })
        newlev = Object.assign({}, lev, {lists:list});
      } else{
        newlev = lev;
      }

      //return lev.name === nextLevel;
      //console.log(newlev)
      return(newlev)
    })

    //console.log('default: ', RiverBasinData)
    //console.log('next: ',nextValues)
    return nextValues
    // var nextLimit =  nextValues[0].lists.filter(function (lev) {
    //   //  console.log(lev.main.toString().substring(0,chars) == value);
    //   //  console.log(lev.main.toString().substring(0,chars) + '--' + value);
    //   return lev.main.toString().substring(0,chars) == value;
    // })
    //
    // console.log(nextLimit)
    //object.assign

    //
    // var limitVal = initVal.substring(0,chars);
    // console.log(limitVal);
    //
    // var newValues =  values[level].filter(function (hucs) {
    //   return hucs.sub === limitVal;
    // })
    //
    // cosnole.log(newValues);
    //
    // return newValues
  },
  getStateObject: function(){

    var obj = {};
    var items = RiverBasinData;

    //this is mutating the state tree so I need to fix this....
    //leaving out the sub
    items.map(function(item) {
      obj[ item.name ] = false;
    })
    //console.log(obj)
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
    //console.log('changer:'+e.target.value)

    //console.log(this.state)
    RiverBasinData =  this.limitPullDown(e.target.value);
    //console.log(test)

  },
  handleMenuClick: function(val,e) {
    //console.log(val)
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
      <MenuComponent
        handleSearchChange={this.props.handleSearchChange}
        menuChange={this.menuChange}
        handleMenuClick={this.handleMenuClick}
        handleChange={this.handleChange}
        getActive={this.getActive}
        items = {this.defaultItems()}/>
    );
  }

});

module.exports = MenuContainer;
