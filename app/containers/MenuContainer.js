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
    //next level is hardcoded need to make this data driven
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
  updateFilterState(level,value){

    var nextLevel = this.getNextLevel(level);
    //set filter and active state for next level(s)
    if(nextLevel){
      this.setState({
        [nextLevel]:{
          'active': false,
          'filter': value
        }
      })

      //kind of hacky
      $('#search-select-'+nextLevel.replace(' ','_')).dropdown('set text','Choose a ' + nextLevel)

      //recursive call to update all level filters
      return this.updateFilterState(nextLevel,value)
    } else{
      return
    }
  },
  menuChange: function(e){

    var level = this.getLevel();
    this.updateFilterState(level,e.target.value)

    //console.log(e.target.value)

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
