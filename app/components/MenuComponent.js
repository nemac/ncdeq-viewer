var React = require('react');
var MenuItemComponent = require('../components/MenuItemComponent');
var PropTypes = React.PropTypes;
//  general functions and  helpers.  reuse functions
import { getNextLevelName, getCategoryName, getAGOGeographyLabel} from '../utils/helpers';
import {
  START_LATITUDE,
  START_LONGITUDE,
  START_ZOOM, } from '../constants/appConstants'

var MenuComponent = React.createClass({
  handleMapFillClick: function(e){
    this.props.set_mapToPoint(START_LATITUDE,START_LONGITUDE,START_ZOOM,e);
  },
  handleChartButtonClick: function(e){

    //toggle chart visibility with button click
    this.props.update_ChartVisiblity();
    this.props.update_MapHeight();

  },
  componentDidMount: function() {
    //var input = document.getElementById('searchTextField');
    //var options = {componentRestrictions: {country: 'us'}};
    //new google.maps.places.Autocomplete(input, options);

    this.props.get_MenuList();

  },
  getDefaultMenu: function(level){
    //filter the levels to get the active tab
    //check if DefaultMenuLists exsists
    if (this.props.DefaultMenuLists){
      const DefaultMenuObject = this.props.DefaultMenuLists.filter( key =>{
        return key.name === level;
      })

      //set default menus for level
      let DefaultMenu = [];
      if (DefaultMenuObject.length > 0){
        //get the menu only need the first in array since that is all that SHOULD exsist
        DefaultMenu = DefaultMenuObject[0].lists;
      }

      return DefaultMenu
    } else {
      return null
    }
  },
  checkList: function(list){
    if (list){
      return  this.props.DefaultMenuLists;
    }
  },

  getLevel: function(){

    //filter the levels to get the active tab
    const ActiveTabObject = this.props.geography_levels.filter( key =>{
      return key.active === true;
    })

    //set default active tab - as Highest level
    let activeTab = 'River Basins'
    if (ActiveTabObject.length > 0){
      //get the active tab and convert the name to the name used in the app.
      //  this will eventually be driven by config or data....???
      activeTab = getCategoryName(ActiveTabObject[0].geography_label);
    }

    return activeTab
  },


  updateFilterState(level,value){

    var nextLevel = getNextLevelName(level);

    //set filter and active state for next level(s)
    if(nextLevel){

      //kind of hacky--how to do this in redux?
      $('#search-select-'+nextLevel.replace(' ','_')).dropdown('set text','Choose a ' + nextLevel)

      //recursive call to update all level filters
      return this.updateFilterState(nextLevel,value)
    } else{
      return
    }
  },
  menuChange: function(e){

    var level = this.getLevel();
    this.updateFilterState(level,e.target.value);

    this.props.get_ChartData(e.target.value,level)
    this.props.change_geographyLevelFilter(e.target.value,level)

  },
  handleMenuClick: function(val,e) {

    //get current geography level
    var level = this.getLevel();

    //set current geography level in redux state store
    this.props.change_geographyLevelActive(val);

  },
  getActive: function(val){

    const level = getAGOGeographyLabel(val)
    //can I make this a generic function since I am using same logic over.
    //filter the levels to get the current passed level
    const FilterObject = this.props.geography_levels.filter( key =>{
      return key.geography_label === level;
    })

    //set default
    let isActive = false;
    if (FilterObject.length > 0){
      //get active boolen
      isActive = FilterObject[0].active;
    }

    //return active setting
    return (isActive ? 'active item' : 'item');

  },
  getFilter: function(val){
    const level = getAGOGeographyLabel(val)

    //filter the levels to get the current passed level
    const FilterObject = this.props.geography_levels.filter( key =>{
      return key.geography_label === level;
    })

    //set default
    let theFilter = ''
    if (FilterObject.length > 0){
      //get the Filter
      theFilter = FilterObject[0].filter;
    }

    return theFilter;

  },
  //{this.props.charts.chart_visibility ? "Show Charts" : "Hide Charts" }
  render: function() {
    return (
      <div className="ui pointing menu"  >
        <div className="header item">
          &nbsp;
        </div>

          { this.props.geography_levels &&
            this.props.geography_levels.map(function(item) {
              const name = getCategoryName(item.geography_label)

              //get filtered menu list
              let menuList = item.filtered_menu_list;

              //if filtered list is not set get the default menu list
              if (menuList.length === 0){
                menuList = this.getDefaultMenu(name);
              }

              return (
                <MenuItemComponent key={name} name={name} lists={menuList}  getFilter={this.getFilter} getActive={this.getActive} handleMenuClick={this.handleMenuClick} menuChange={this.menuChange}/>
              )
            }.bind(this))
          }

          <a className="item" id="menu-placeholder-River_Basins" >
            <select className="ui search selection dropdown"   >
              <option value="">Choose a River Basins</option>
            </select>
          </a>
          <a className="item" id="menu-placeholder-Cataloging_Units" >
            <select className="ui search selection dropdown"  >
              <option value="">Choose a Cataloging Unit</option>
            </select>        </a>
          <a className="item" id="menu-placeholder-HUC12" >
            <select className="ui search selection dropdown"  >
              <option value="">Choose a HUC12</option>
            </select>
          </a>

        <div className="header item" >
          <button className="ui button" onClick={this.handleChartButtonClick.bind(null,this)}>{!this.props.charts.chart_visibility ? "Show Charts" : "Hide Charts" }</button>
        </div>
        <div className="header item" >
          <button className="ui button" onClick={this.handleMapFillClick.bind(null,this)}>Map Back to Start</button>
        </div>      <div className="left menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input className="mapSearch" type="text" placeholder="Search to zoom..." onChange={this.props.handleSearchChange.bind(null,this)} />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>


    );
  }

});

module.exports = MenuComponent;
