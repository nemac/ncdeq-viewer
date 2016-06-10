var React = require('react');
//var RiverBasinData = require('../utils/data.js');
var MenuComponent = require('../components/MenuComponent');
var agoHelpers = require('../utils/ago-helpers');

var PropTypes = React.PropTypes;

var MenuContainer = React.createClass({
  componentDidMount: function() {
    //var input = document.getElementById('searchTextField');
    //var options = {componentRestrictions: {country: 'us'}};
    //new google.maps.places.Autocomplete(input, options);
    agoHelpers.get_MenuList()
      .then(function(RiverBasinData){
        return this.setState ({RiverBasinData})
      }.bind(this))

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

    var blankListing = {"id": "            ","NAME": "            ","VALUE": "            ","MAIN": "            ","SUB": "            "};

    if(!this.state){
      var items = [ {name:'River Basins',lists:[blankListing]},{name:'Cataloging Units',lists:[blankListing]},{name:'HUC12',lists:[blankListing]} ];
    }else{
      var items = this.state.RiverBasinData;
    }

    items.map(function(item) {
      obj[ item.name ] = {
        'active':false,
        'filter': !this.state ? '' : !this.state[item.name] ? '':  this.state[item.name].filter };
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
    var self = this;
    var level = this.getLevel();
    this.updateFilterState(level,e.target.value)

    console.log(level);
    if(level === 'HUC12'){
      agoHelpers.get_ChartData_byID(e.target.value)
        .then(function(chartData){
          //this not in state so if we re-render the the chart area it will no longer be available
          $('#Compare_chart').html(JSON.stringify(chartData))

          //this state does not get passed to parents so it will need to managed by redux
          self.setState(chartData)
          return chartData
        }.bind(this))
    }

      agoHelpers.get_AllChartDataLowerLevel_byID(e.target.value,level)
        .then(function(chartData){
          //this not in state so if we re-render the the chart area it will no longer be available
          $("#HUCs_chart").html(JSON.stringify(chartData))
          console.log({chartData})

          //this state does not get passed to parents so it will need to managed by redux
          self.setState({chartData})
          return chartData
        }.bind(this))

  },
  handleMenuClick: function(val,e) {
    //reset menu
    this.resetMenus();
    //change state to active for clicked menu
    this.setState({
      [val]:{'active': true,
        'filter': (!this.state[val] ? '' : this.state[val].filter)
      }
    })

  },
  getActive: function(val){
    if (this.state[val]) {
      return  (this.state[val].active ? 'active item' : 'item')
    }else{
      return ''
    }
  },
  getFilter: function(val){
    if (this.state[val]) {
      return  (this.state[val].filter)
    } else {
      return ''
    }
  },
  render: function() {
    return (
      <MenuComponent
        handleSearchChange={this.props.handleSearchChange}
        menuChange={this.menuChange}
        handleMenuClick={this.handleMenuClick}
        handleChange={this.handleChange}
        getActive={this.getActive}
        items = {this.state.RiverBasinData}
        getFilter={this.getFilter} />
    );
  }

});

module.exports = MenuContainer;
