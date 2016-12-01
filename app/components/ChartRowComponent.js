var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
import ChartPie from '../components/ChartPie';
import ChartSimpleBar from '../components/ChartSimpleBar';
import ChartTRA from '../components/ChartTRA';
var SectionWrapper = require('./SectionWrapper');

import {
  CHART_WIDTH,
  CHART_WIDTH_PX,
  MAP_HEIGHT,
  CHART_HEIGHT_ADJUSTMENT
} from '../constants/appConstants'


import { getCategoryName, getFriendlyName } from '../utils/helpers';


var Divider = require('./Divider');

var ChartRow = React.createClass({
  getInitialState: function() {
    return {
      working: false
    };
  },
  get_keyColors: function(key){
    let key_colors = [];
    //this is hard coded may need to move this to a config file
    switch (key) {
      case 'Water Quality':
        key_colors = ['#22c355' , '#67e48f']
        break;

        case 'Phosphorus':
          key_colors = ['#22c355' , '#67e48f']
          break;

          case 'Phosphorus Agriculture':
            key_colors = ['#22c355' , '#67e48f']
            break;
          case 'Phosphorus Atmosphere':
            key_colors = ['#2b83ba' , '#6eb3dd']
            break;
          case 'Phosphorus Urban':
            key_colors = ['#fd9935' , '#fecc9a']
            break;

        case 'Nitrogen':
          key_colors = ['#2b83ba' , '#6eb3dd']
          break;

          case 'Nitrogen Agriculture':
            key_colors = ['#22c355' , '#67e48f']
            break;
          case 'Nitrogen Atmosphere':
            key_colors = ['#2b83ba' , '#6eb3dd']
            break;
          case 'Nitrogen Urban':
            key_colors = ['#fd9935' , '#fecc9a']
            break;


      case 'Hydrology':
        key_colors = ['#2b83ba' , '#6eb3dd']
        break;

        case '2 year peak':
          key_colors = ['#22c355' , '#67e48f']
          break;
        case '10 year peak':
          key_colors = ['#2b83ba' , '#6eb3dd']
          break;
        case '50 year peak':
          key_colors = ['#fd9935' , '#fecc9a']
          break;
        case '100 year peak':
          key_colors = ['#aa64b4' , '#aa64b4']
          break;

      case 'Habitat':
        key_colors = ['#fd9935' , '#fecc9a' ]
        break;


        case 'Habitat Likelhood':
          key_colors = ['#22c355' , '#67e48f']
          break;

        case 'Aquatic Connectivity':
          key_colors = ['#22c355' , '#67e48f']
          break;
        case 'Streams Restoration':
          key_colors = ['#2b83ba' , '#6eb3dd']
          break;
        case 'Wetlands and BMPs':
          key_colors = ['#fd9935' , '#fecc9a']
          break;
        case 'Avoided Conversion':
          key_colors = ['#aa64b4' , '#d0a9d6' ]
          break;


          //needs more Categories
          // are 5 shades apart on http://www.w3schools.com/colors/colors_picker.asp


      default:
        key_colors = ['#1a9641' , '#3cdd6f']
        break;
    }
    return key_colors;
  },
  chartToggle: function(e){

    this.props.update_ChartVisiblity();
    //update map height comes after chart vis sp map will resize to full hieght.
    this.props.update_MapHeight();

    //update header vis in action
    this.props.update_HeaderVis()

  },
  getChartType_Data: function(type){

    //get all chart data for chart type of  {baseline,uplift, maybe TRA}
    //  this is the most current or actual data from model outputs

    //get the chart types object this holds the chartdata for each chartype {baseline,uplift, maybe TRA}
    const chart_types = this.props.charts.chart_data ? this.props.charts.chart_data.chart_types : []

    //get the baseline data
    let chart_type_data = chart_types.filter( key => {
      return key.chart_type === type
    })

    //return the chart data for the type {baseline,uplift, maybe TRA}
    return chart_type_data
  },
  getChart_Filter: function(chart_data){
    //gets the HUC value for the filtering the chart data or get
    //  the current HUC that a user located by searching or clicking

    //set initial value blank in case if has not been set Yet
    let filter_value = '';

    //make sure the data has been set
    if(chart_data){
      //extract the limit
      filter_value = chart_data.chart_limit;
    }
    return filter_value;
  },
  getChart_FilteredByHUC: function(chart_data, filter_value){
  //gets the chart data Filtered by the chart limit or HUC

  let chart_data_limited =[];

    //make sure the data has been set
    if(chart_data){

      //assume that this the chart features have been extracted already if there is no chart_features object
      if(chart_data.chart_features){
        chart_data_limited = chart_data.chart_features.filter( key => {
          return key.properties.ID === filter_value
        })
      } else {
        chart_data_limited = chart_data.filter( key => {
          return key.properties.ID === filter_value
        })
      }
    }
    //returned the filtered chart data
    return chart_data_limited
  },
  getChart_FilteredByChartLevel: function(chart_data, filter_value, is_top){
  //gets the chart data Filtered by the chart limit or HUC

    let use_top = true;
    //make sure something was passed so arg is optional if
    //  nothing passed assume its false or not a top level chart.
    //  a top level chart is only used to do the sort... and has children that comprise it's total.
    if(!is_top){
      use_top = false;
    }

    let chart_data_limited =[];

    //make sure the data has been set
    if(chart_data){
      if(use_top){
        if(chart_data.chart_features){
          chart_data_limited =  chart_data.chart_features.filter ( chart_objects => {
            return chart_objects.properties.chart_id === filter_value;
          })
        } else {
          chart_data_limited =  chart_data.filter ( chart_objects => {
            return chart_objects.properties.chart_id === filter_value;
          })
        }
      } else {
        if(chart_data.chart_features){
          chart_data_limited =  chart_data.chart_features.filter ( chart_objects => {
            return chart_objects.properties.chart_matchid === filter_value && chart_objects.properties.chart_id != filter_value
          })

        } else {
          chart_data_limited =  chart_data.filter ( chart_objects => {
            return chart_objects.properties.chart_matchid === filter_value && chart_objects.properties.chart_id != filter_value
          })
        }
      }
    }
    //returned the filtered chart data
    return chart_data_limited
  },
  getChart_GroupSum: function(chart_data){
    //returns an array of hucs and their summed value for any level
    // get unique set of of hucs and sum their values.
    // this will ensure the sum of the values for the chart level are aggregated
    const groupsum = chart_data.reduce(function(acc, x) {

      //capture null values....
      const chart_value =  Number([x.properties.chart_value] ) ? Number([x.properties.chart_value] ) : Number(0);

      // first check if the given group is in the object
      acc[x.properties.ID + '_' + x.properties.chart_matchid] = acc[x.properties.ID + '_' + x.properties.chart_matchid] ?  acc[x.properties.ID + '_' + x.properties.chart_matchid] + chart_value : chart_value;

      return acc;

    }, {});

    return groupsum

  },
  getChart_Sorted: function(chart_data){
    //returns an array of hucids sorted by thier value
    // will use this to loop through and create the chart values

    //get the hucs grouped and summed (grouped by the huc and the machted chart id which is the next level up chart...)
    const grouped_sum =  this.getChart_GroupSum(chart_data)

    //now sort the grouped hucs
    const sorted_hucs = Object.keys(grouped_sum).sort(function (a, b) {
      if (grouped_sum[a] > grouped_sum[b]) {
        return -1;
      }
      if (grouped_sum[a] < grouped_sum[b]) {
        return 1;
      }

      // a must be equal to b or must be a null value?
      return 0;
    });


    return sorted_hucs;

  },
  getChart_data: function(chart_data, chart_type){
    // builds chart data into proper format for rechart library (bar charts)
    let chart_data_array = [];

    if(chart_data){

      //get constants from redux
      const charts_limits = this.props.charts.chart_levels.chart_limits;

      //get a filtered array of the chart type limits
      const chart_type_limt = charts_limits.filter( item => {
        return item.chart_type.toUpperCase() === chart_type.toUpperCase();
      })

          //get the chart types limits to apply to the data
          const current_chart_matchid = (chart_type_limt[0] ? chart_type_limt[0].current_chart_matchid : 2)

          //get the chart for the current chart hierarchical level
          let levelone =  this.getChart_FilteredByChartLevel( chart_data, current_chart_matchid, false );

          // sort by value
          let sorted_hucs = this.getChart_Sorted(levelone);

          //create chart objects
          var blank_chart_object = new Object;
          var blank_chart_object_two = new Object;

          //loop through the sorted huvs and prepare the data for the chart.
          sorted_hucs.map(huc => {

            const underscore = "_"

            let underscore_position = huc.indexOf(underscore);

            //find the underscore sperates the huc id from the id of chart_matchid  only need the huc_id
            if( (huc.split(underscore).length -1 ) > 1){
              underscore_position = huc.indexOf(underscore,underscore_position + 1);
            }

           //get the huc id from the array
           var name = huc.substring(0,underscore_position);

           //create an object to hold the chart data
           var chart_object = new Object;

           chart_object["name"] =  name;
           blank_chart_object["name"] = " "
           blank_chart_object_two["name"] = "   "

           //get the chart for each indivual huc
           const levelones = this.getChart_FilteredByHUC(levelone, name);

           levelones.map(item => {

             //Get the value for chart bar--cell
             var value = item.properties.chart_value

             //numbers need to be truncated.  rounding results in values such as
             // .999999 to round to 1.0 which is not correct
             if( value ){
               //value = item.properties.chart_value.substring(0,5)
               value = item.properties.chart_value
             }

             //convert back to a number type
             var value = Number( value );
             chart_object[item.properties.chart_level_label] =  value;
             blank_chart_object[item.properties.chart_level_label] = null
             blank_chart_object_two[item.properties.chart_level_label] = null

             chart_object["chart_id"] =  item.properties.chart_id;
             blank_chart_object["chart_id"] = item.properties.chart_id
             blank_chart_object_two["chart_id"] = item.properties.chart_id

           })
           chart_data_array.push(chart_object);
         })

        //until I can upgrade recharts to .11 I need to overcome a bug with one bar and tool tip not working.
        if(chart_data_array.length === 1){

            //add a blank bar to each side of a one bar chart so the tooltips will apears
            chart_data_array.unshift(blank_chart_object)
            chart_data_array.push(blank_chart_object_two)

        }

      }


    return chart_data_array
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
  shouldComponentUpdate: function(nextProps, nextState) {

    let should_update = true;

    //check status of rendering only re-render if not fetching something
    //  since I am doing some caclulations in render this forces render to only happen in rendering

    //status of fetching map
    if( nextProps.fetching_map ){
      should_update = true
    }

    //status of fetching chart
    if( nextProps.fetching_chart ){
      should_update = true
    }

    //status of fetching tra
    if( nextProps.fetching_tra){
      should_update = false
    }

    //status of fetching geograpy levels
    if( nextProps.fetching_geo){
      should_update = false
    }

    //status of fetching menus
    if( nextProps.fetching_menu){
      should_update = false
    }

    //return should update.
    return should_update

  },
  componentWillReceiveProps: function(nextProps) {

    // console.log('true')

  },
  componentDidUpdate: function(prevProps, prevState) {

    // console.log('false')

  },
  render: function() {

    let is_fetching = false;

    if( this.props.fetching_map ){
      is_fetching = true
    }

    if( this.props.fetching_chart){
      is_fetching = true
    }

    if( this.props.fetching_tra){
      is_fetching = true
    }

    if( this.props.fetching_geo){
      is_fetching = true
    }

    if( this.props.fetching_menu){
      is_fetching = true
    }

    const working = is_fetching

    //messages for working
    const working_message = working ? "loading..." : ""
    const working_class = working ? "ui active inverted dimmer" : "ui disabled inverted dimmer"

    //get chart width in pixels from redux should handle resize in actiion creators
    let chart_width_px = CHART_WIDTH_PX;

    //not sure yet ho to handle this but chartHeight needs to be adjusted by to px in the chart component
    let chart_grid_height =  MAP_HEIGHT-CHART_HEIGHT_ADJUSTMENT;

    let searchMethod = ""
    let show_point = false;

    //check the serach method so we no if we need to show or display
    //  the point in a tra message
    if(this.props.searchMethod){
        searchMethod = this.props.searchMethod;
        show_point =  (searchMethod === "location searched" || searchMethod === "clicked" || searchMethod === "tra clicked" || searchMethod === "chart clicked");
    }

    //get the chart width and chart height settings from the redux store
    //  so we can pass it as a prop to the chart components
    if(this.props.default_settings){
      chart_width_px = this.props.default_settings.chartWidth;
      chart_grid_height = this.props.default_settings.mapHeight-CHART_HEIGHT_ADJUSTMENT;
    }

    let is_chart_vis = true

    if(this.props.charts.chart_visibility === undefined){
      is_chart_vis = true
    } else {
      is_chart_vis = this.props.charts.chart_visibility
    }

    //check current vissibility of the chart areas
    let vis = is_chart_vis ?  'show' : 'none';

    //get data for chart type of baseline
    let baseline_data = this.getChartType_Data('baseline');

    //get data for chart type of baseline
    let uplift_data = this.getChartType_Data('uplift');

    //get data for chart type of TRA
    let tra_data = this.getChartType_Data('tra');

    //get the user selected huc so we can filter
    let chart_filter = this.getChart_Filter(baseline_data[0]);

    let chart_baseline_bar = [];
    let chart_upflift_bar = [];
    let chart_tar_bar = [];
    let all_hucs_bar = [];

    //get the chart data
    chart_baseline_bar = this.getChart_data(baseline_data[0], 'BASELINE');
    chart_upflift_bar = this.getChart_data(uplift_data[0], 'UPLIFT');
    chart_tar_bar = this.getChart_data(tra_data[0], 'TRA');

    //probably need to rename this to describe it better I already got confused
    const tra_point_info = this.props.traPointInfo

    var tra_message_point = ""

    var tra_text_message_point = ""

    var tra_code_point = ""

    var success_class_point = ""

    var icon_point = ""

    var icon_map = ""

    var sub_header_point = ""

    var TRA_OBJ = []

    //set defaults for messages abouyt
    tra_text_message_point = "Please Click on the Map or Search for a location to discover if it is in a TRA"
    icon_map = (<div />)
    success_class_point = "ui icon info message"
    icon_point = (<i className="info circle icon"></i>)
    sub_header_point = ""

    //create tra point message.  user clicked on the map or searched for a location
    if(tra_point_info){
      // no features in the tra point object means
      if (tra_point_info.features){

        //walk over all the tra points and make the ids (names) into an array
        TRA_OBJ = tra_point_info.features.map (feature => {
          return feature.properties.ID
        })

        //make the tra array into comma delimited string
        const tra_string = TRA_OBJ.toString().split(",").join(", ");

        //if the user clicked or searched the map.
        //  and that location or cliced point was inside a tra format the message
        if(TRA_OBJ.length > 0){
          const extra_tra = TRA_OBJ.length > 1 ? "'s" : "";
          icon_map = (<i className="big marker icon" style={{color:"#3388cc"}}></i>)
          tra_text_message_point = "The point on the map is in a TRA. "
          success_class_point = "ui icon success message"
          icon_point = (<i className="check circle icon"></i>)
          sub_header_point = (<p>This includes the TRA{extra_tra}: {tra_string}</p>)

          //if the user clicked or searched the map.
          //  and that location or cliced point was NOT inside a tra format the message
        } else {
          icon_map = (<i className="big marker icon" style={{color:"#3388cc"}}></i>)
          success_class_point = "ui icon negative message"
          icon_point = (<i className="remove circle icon"></i>)
          tra_text_message_point = "The point on the map is NOT in a TRA"
          sub_header_point = ""

        }
      }
    }


  //if the method to get a huc was not a map click or search for location we need
  //  show a message to indicate.  this should stop jumpy and give user
  //  a indication that something can happen
  if(!show_point){
    tra_text_message_point = "Please Click on the Map or Search for a location to discover if it is in a TRA"
    success_class_point = "ui icon info message"
    icon_point = (<i className="info circle icon"></i>)
    sub_header_point = ""
  }

  //TRA  message for clicks and searches
  tra_message_point = (
      <div className={success_class_point} >
        {icon_point}
        <div className="content">
          <div className="header">
            {icon_map}{tra_text_message_point}
          </div>
          {sub_header_point}
        </div>
      </div>)

    //default text for chart is to give user a push to do an action...
    let chart_cataloging_unit = 'Please Click on the Map, Search for a location, or Choose a HUC to get started.'
    let huc_message = "No HUC's Selected yet."

    //if there is filter text for charts and data should be about the data
    if(chart_filter){
      chart_cataloging_unit = "Charts and Data for the Cataloging Unit " + chart_filter.substring(0,8);
      huc_message = "The " + this.getLevel() + " " +  chart_filter + " is currently highlighted."
    }

    //land use land cover data
    let NLCD_ID_obj = this.props.NLCDPointInfo ? this.props.NLCDPointInfo : []

    if(searchMethod === 'menu'){
      NLCD_ID_obj = []
    }

    //make ure there is features in the object: NLCD_ID_obj
    //  this object holds the catchment id
    let NLCD_ID = []
    if(NLCD_ID_obj.features){
      NLCD_ID = NLCD_ID_obj.features.length > 0 ? NLCD_ID_obj.features[0].properties.ID : []
    }

      let ncld_chart_data = this.props.ncld_chart_data ? this.props.ncld_chart_data : []
      let ncld_chart_data_huc12 = this.props.ncld_chart_data_huc12 ? this.props.ncld_chart_data_huc12 : []

      // get catchment data from redux store
      let catchment_chart_ar = this.props || this.props.catchment_chart_ar ? this.props.catchment_chart_ar : []

      //clear chart data when menu selected
      if(searchMethod === 'menu'){
        ncld_chart_data =[];
        catchment_chart_ar = [];
      }

      //tra note
      let tra_note = "TRA's in this Cataloging Unit"
      if(chart_filter){
        tra_note = "TRA's in the Cataloging Unit " + chart_filter.substring(0,8)
      }

    return (
      <div className={"ui stackable internally celled " + CHART_WIDTH + " wide column vertically divided items "} style={{paddingTop:"0px"}}>
        <div className={working_class}>
            <div className="ui loader"></div>
        </div>

        <div className="ui sticky" style={{width:"50px!important",border: "1px solid rgba(34, 36, 38, 0.14902)",padding: "14px",marginBottom: "14px",backgroundColor:"#ffffff"  }}>
          <div className="content" style={{marginTop: "14px"}}>
          <div className="ui header">
            {chart_cataloging_unit}
          </div>
        </div>
        </div>

      <div className={"ui stackable internally celled " + CHART_WIDTH + " wide column vertically divided items "} style={{display:vis,backgroundColor: "#fafafa",height:chart_grid_height,overflowY:"scroll",overflowX:"hidden",paddingBottom:"0px",marginBottom:"0px", marginTop:"10px"}}>

      {/*  only show tra message when their is filter.  the filter indicates the user took an action
        that results in data and charts that can be displayed
        */}
      { chart_filter &&
          <div className="ui item" style={{backgroundColor: "#ffffff",marginBottom: "14px!important",marginTop: "14px!important",padding:"14px",border: "1px solid rgba(34,36,38,.15)"}}>
            <div className="content" style={{marginTop: "14px"}}>
              {tra_message_point}
            </div>
          </div>
      }

      { chart_filter &&
        <ChartRowWrapper key="tra"
          chart_width={chart_width_px}
          title="Targeted Resource Areas"
          title_description=""
          note={tra_note}
          chart_type="tra"
          chart_data={chart_tar_bar}
          chart_filter={chart_filter}
          get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
          change_geographyLevelActive={this.props.change_geographyLevelActive}
          set_search_method={this.props.set_search_method }
          tra_data={this.props.tra_data}
          get_tra_info={this.props.get_tra_info}
          charts={this.props.charts}
          update_ChartLevels={this.props.update_ChartLevels}
          update_ChartMatchId={this.props.update_ChartMatchId}
          get_keyColors={this.get_keyColors}
          top_label=""
          bottom_label=""
          level_label={"TRA"}
          />
        }
        { chart_filter &&
        <ChartRowWrapper key="baseline"
          chart_width={chart_width_px}
          title="BASELINE"
          title_description=""
          note="The taller the bar chart the more impaired."
          chart_type="baseline"
          chart_data={chart_baseline_bar}
          chart_filter={chart_filter}
          get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
          change_geographyLevelActive={this.props.change_geographyLevelActive}
          set_search_method={this.props.set_search_method }
          tra_data={this.props.tra_data}
          get_tra_info={this.props.get_tra_info}
          charts={this.props.charts}
          update_ChartLevels={this.props.update_ChartLevels}
          update_ChartMatchId={this.props.update_ChartMatchId}
          get_keyColors={this.get_keyColors}
          top_label="Most Impaired"
          bottom_label="Least Impaired"
          level_label={this.getLevel()}
          />
        }
        { chart_filter &&
        <ChartRowWrapper key="uplift"
          chart_width={chart_width_px}
          title="UPLIFT"
          title_description=""
          note="The taller the bar chart the more potential for improvement."
          chart_type="uplift"
          chart_data={chart_upflift_bar}
          chart_filter={chart_filter}
           get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
           change_geographyLevelActive={this.props.change_geographyLevelActive}
           set_search_method={this.props.set_search_method }
           tra_data={this.props.tra_data}
           get_tra_info={this.props.get_tra_info}
           charts={this.props.charts}
           update_ChartLevels={this.props.update_ChartLevels}
           update_ChartMatchId={this.props.update_ChartMatchId}
           get_keyColors={this.get_keyColors}
           top_label="More Potential"
           bottom_label="Less Potential"
           level_label={this.getLevel()}
           />
         }
         { chart_filter &&
           <ChartPie
             chart_width={chart_width_px}
             title="Landuse-Landcover (HUC12)"
             title_description=""
             note={"For HUC12: " + chart_filter}
             chart_data={ncld_chart_data_huc12}
             use_percent={true}
             />
         }
         { chart_filter &&
           <ChartPie
             chart_width={chart_width_px}
             title="Landuse-Landcover (Catchment)"
             title_description=""
             note={"For Catchment: " + NLCD_ID}
             chart_data={ncld_chart_data}
             use_percent={true}
             />
         }
         { chart_filter && catchment_chart_ar &&

           <ChartSimpleBar
             chart_width={chart_width_px}
             title="Catchment Baseline (Catchment)"
             title_description=""
             note={"For Catchment: " + NLCD_ID}
             chart_data={catchment_chart_ar}
             searchMethod={searchMethod}
             />

         }


      </div>
    </div>
    );

  }

});

module.exports = ChartRow;
