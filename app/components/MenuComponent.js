var React = require('react');
var MenuItemComponent = require('../components/MenuItemComponent');
var PropTypes = React.PropTypes;

//  general functions and  helpers.  reuse functions
import { getNextLevelName, getCategoryName, getAGOGeographyLabel, getAGOFeatureId, get_matchEnd, zoomToGeoJson} from '../utils/helpers';
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
    if (this.props.geography_levels){

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
    } else {
      return null;
    }
  },
  handleSearch: function(comp,e){
    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

    //update data for change
    //  the chart data update is handled in menu change
    this.props.handleSearchChange(comp,e)
  },
  updateFilters: function(value){

    //loop all levels - probably need to get this from data, but for now hardcoded
    const levels = ['River Basins','Cataloging Units','HUC12']

    //loop the levels object
    levels.map((level)=>{

      //get the string length for substring'  the current value.
      //  the current value should always be huc 12 so River Basins and Cataloging Units
      //  should be 2 and 4 lengths less..
      const matchEnd = get_matchEnd(level);

      //ensure value was defined.
      if(value){

          //get the value for the level
          const selectedValue = value.substring(0,matchEnd)

          //set the filter in redux store for the level
          //  this will ensure the menus/breadcrumbs will also update appropiately
          this.props.change_geographyLevelFilter(selectedValue,level)

          //kind of hacky--how to do this in redux?
          $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);

          //get the value selected.
          // there are times when the value dose not exists in the selector so we need overcome this
          let HTMLvalue = $('#search-select-'+level.replace(' ','_')).dropdown('get value');

          //if the value in the selector does not match what the user selected. that means there was no
          //  value in the selector (pick list).
          if (HTMLvalue[0] != selectedValue){
            $('#search-select-'+level.replace(' ','_')).dropdown('set selected',selectedValue);
          }
      }
    })
  },
  getLevelFilter: function(){

    if (this.props.geography_levels){
      //filter the levels to get the active tab
      const activeFilterObject = this.props.geography_levels.filter( key =>{
        return key.active === true;
      })

      //set default active tab - as Highest level
      let activeFilter = ''
      if (activeFilterObject.length > 0){
        //get the active tab and convert the name to the name used in the app.
        //  this will eventually be driven by config or data....???
        activeFilter = activeFilterObject[0].current_id;
      }

      return activeFilter
    }else{
      return null
    }
  },
  menuChange: function(e){

    // //get the current level
    var currentLevel = this.getLevel();

    //get the expected length for the level
    const expectedLength = get_matchEnd(currentLevel);
    const valueLength = e.target.value.length;

    this.updateFilters(e.target.value)

    //only get chart data and feature data when expectedLength and the value lenght match.
    //  not sure why values from other geography levels are making it here.
    if (Number(valueLength) === Number(expectedLength)){
      //update the chartdata redux store
      this.props.get_ChartData(e.target.value,currentLevel)

      //get the ago layer id of the currentLevel
      const feature_id = getAGOFeatureId(currentLevel)

      //get the attributes of the huc12 layer on a user click
      this.props.get_LayerInfo_ByValue(e.target.value, feature_id);

      //update the menu for curret active layer
      //  this runs to ensure the list is updated for the active geograhpy Level
      $('#search-select-'+currentLevel.replace(' ','_')).dropdown('set selected',e.target.value);

    }


  },
  handleMenuClick: function(val,e) {

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
        </div>
        <div className="left menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input className="mapSearch" type="text" placeholder="Search to zoom..." onChange={this.handleSearch.bind(null,this)} />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>


    );
  }

});

module.exports = MenuComponent;
