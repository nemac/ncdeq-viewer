var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var SectionWrapper = require('./SectionWrapper');
var HeaderTitleComponent = require('../components/HeaderTitleComponent');

import {
  CHART_WIDTH,
  CHART_WIDTH_PX,
  MAP_HEIGHT
} from '../constants/appConstants'


import { getCategoryName, getFriendlyName } from '../utils/helpers';


var Divider = require('./Divider');

var ChartRow = React.createClass({
  getJSONElement_ById: function(data,id){

    const dataFiltered = data.filter( key => {
      return key.properties.chart_id === id
    })

    return dataFiltered

  },
  chartToggle: function(e){

    this.props.update_ChartVisiblity();
    //update map height comes after chart vis sp map will resize to full hieght.
    this.props.update_MapHeight();

    if(this.props.leafletMap){
      const leafletMap = this.props.leafletMap.leafletMap;
      setTimeout(function(){ leafletMap.invalidateSize()}, 100);
    };

  },
  getChildChart: function(chartid,huc){

    const chart_types = this.props.charts.chart_data.chart_types

    let baseline_data = chart_types.filter( key => {
      return key.chart_type === 'baseline'
    })

    let baseline_data_limited = baseline_data[0].chart_features.filter( key => {
      return key.properties.ID === huc && key.properties.chart_matchid === chartid
    })


  },
  getCharType_Data: function(type){

    //get all chart data for chart type of  {baseline,uplift, maybe TRA}
    //  this is the most current or actual data from model outputs

    //get the chart types object this holds the chartdata for each chartype {baseline,uplift, maybe TRA}
    const chart_types = this.props.charts.chart_data.chart_types

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
  getChat_GroupSum: function(chart_data){
    //returns an array of hucs and their summed value for any level
    // get unique set of of hucs and sum their values.
    // this will ensure the sum of the values for the chart level are aggregated
    const groupsum = chart_data.reduce(function(acc, x) {
      // first check if the given group is in the object
      acc[x.properties.ID + '_' + x.properties.chart_matchid] = acc[x.properties.ID + '_' + x.properties.chart_matchid] ?  acc[x.properties.ID + '_' + x.properties.chart_matchid] + Number([x.properties.chart_value] ): Number([x.properties.chart_value]);

      return acc;

    }, {});

    return groupsum

  },
  getChart_Sorted: function(chart_data){
    //returns an array of hucids sorted by thier value
    // will use this to loop through and create the chart values

    //get the hucs grouped and summed (grouped by the huc and the machted chart id which is the next level up chart...)
    const grouped_sum =  this.getChat_GroupSum(chart_data)

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
      const charts_levels = this.props.charts.chart_levels.levels.features;
      const charts_limits = this.props.charts.chart_levels.chart_limits;

      //get a filtered array of the chart type limits
      const chart_type_limt = charts_limits.filter( item => {
        return item.chart_type.toUpperCase() === chart_type.toUpperCase();
      })


          //get the chart types limits to apply to the data
          const current_chart_matchid = (chart_type_limt[0] ? chart_type_limt[0].current_chart_matchid : 2)

          //get the chart for the current chart heierchal level
          let levelone =  this.getChart_FilteredByChartLevel( chart_data, current_chart_matchid, false );

          // sort by value
          let sorted_hucs = this.getChart_Sorted(levelone);

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
           let children = [];

           levelones.map(item => {

             //Get the value for chart bar--cell
             var value = item.properties.chart_value

             //numbers need to be truncated.  rounding results in values such as
             // .999999 to round to 1.0 which is not correct
             if( value ){
               value = item.properties.chart_value.substring(0,5)
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
  render: function() {
    //get chart width inpixl from redux should handle resize in actiion creators
    let chart_width_px = CHART_WIDTH_PX;
    let chart_grid_height =  MAP_HEIGHT;

    let searchMethod = ""
    let show_point = false;
    if(this.props.searchMethod){
        searchMethod = this.props.searchMethod;
        show_point =  (searchMethod === "location searched" || searchMethod === "clicked");
    }

    if(this.props.default_settings){
      chart_width_px = this.props.default_settings.chartWidth;
      chart_grid_height = this.props.default_settings.mapHeight;
    }


    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    //get data for chart type of baseline
    let baseline_data = this.getCharType_Data('baseline');

    //get data for chart type of baseline
    let uplift_data = this.getCharType_Data('uplift');

    //get data for chart type of TRA
    let tra_data = this.getCharType_Data('tra');

    //get the user selected huc so we can filter
    let chart_filter = this.getChart_Filter(baseline_data[0]);

    //get the baseline chart filtered by the user selected huc
    let baseline_data_limited = this.getChart_FilteredByHUC(baseline_data[0], chart_filter);

    //get the uplift chart filtered by the user selected huc
    let uplift_data_limited = this.getChart_FilteredByHUC(uplift_data[0], chart_filter);

    //get the tra chart filtered by the user selected huc
    let tra_data_limited = this.getChart_FilteredByHUC(tra_data[0], chart_filter);


    let chart_baseline_bar = [];
    let chart_upflift_bar = [];
    let chart_tar_bar = [];
    let all_hucs_bar = [];

    chart_baseline_bar = this.getChart_data(baseline_data[0], 'BASELINE');
    chart_upflift_bar = this.getChart_data(uplift_data[0], 'UPLIFT');
    chart_tar_bar = this.getChart_data(tra_data[0], 'TRA');

    //probably need to rename this to describe it better I already got confused
    const tra_point_info = this.props.traPointInfo

    var tra_message = ""
    var tra_message_point = ""
    var tra_text_message = ""
    var tra_text_message_point = ""
    var tra_code = ""
    var tra_code_point = ""
    var success_class = ""
    var success_class_point = ""
    var icon = ""
    var icon_point = ""
    var sub_header = ""
    var sub_header_point = ""

    var trasTEMP = ""

    //create tra point message.  user clicked on the map or searched for a location
    if (tra_point_info.features){
      trasTEMP = tra_point_info.features.map (feature => {
        return feature.properties.id
      })

      const tra_string = trasTEMP.toString().split(",").join(", ");

      if(trasTEMP.length > 0){
        tra_text_message_point = "The location you " + searchMethod + " is in a TRA. "
        success_class_point = "ui icon success message"
        icon_point = (<i className="check circle icon"></i>)
        sub_header_point = (<p>This includes the TRA(s): {tra_string}</p>)
      } else {
        success_class_point = "ui icon negative message"
        icon_point = (<i className="remove circle icon"></i>)
        tra_text_message_point = "The location you  " + searchMethod + " is NOT in a TRA"
      }
    }


    //make sure the TRA data object is defined
    //  this is the TRA's in the current geogLevel unless current geogLevel is huc12 then it is huc8 Cataloging Unit
    if(this.props.tra_data){
      if(this.props.tra_data.data){

        //if there is  data in the object the select huc does cross a tra
        if (this.props.tra_data.data.length > 0){
          tra_text_message = "The "  +  getFriendlyName(this.getLevel()) +  " - (" + chart_filter + ") is in a TRA."
          success_class = "ui icon success message"
          icon = (<i className="check circle icon"></i>)

          trasTEMP = this.props.tra_data.data.map (feature => {
            return feature.tra_name
          })

          const tra_string = trasTEMP.toString().split(",").join(", ");

            //list of TRA's
            sub_header = (<p>This includes the TRA(s): {tra_string}</p>)



        //if there is  no data in the object the select huc does not cross a tra
        } else {
          success_class = "ui icon negative message"
          icon = (<i className="remove circle icon"></i>)
          tra_text_message = "The "  + getFriendlyName(this.getLevel()) +  " " + chart_filter + " is NOT in a TRA"
        }


        //TRA in message
        tra_message = (
            <div className={success_class} >
              {icon}
              <div className="content">
                <div className="header">
                  {tra_text_message}
                </div>
                {sub_header}
              </div>
            </div>
        )

        //TRA  message for clicks and searches
        tra_message_point = (
            <div className={success_class_point} >
              {icon_point}
              <div className="content">
                <div className="header">
                  {tra_text_message_point}
                </div>
                {sub_header_point}
              </div>
            </div>
        )

      }
    }
    //default text for chart is to give user a push to do an action...
    let chart_cataloging_unit = 'Please Click on the Map, Search, or Choose something to get started.'
    let huc_message = "No HUC's Selected yet."

    //if there is filter text for charts and data should be about the data
    if(chart_filter){
      chart_cataloging_unit = "Charts and Data for the Cataloging Unit " + chart_filter.substring(0,8);
      huc_message = "The " + this.getLevel() + " " +  chart_filter + " is currently highlighted."
    }


    return (

      <div className={"ui stackable internally celled " + CHART_WIDTH + " wide column vertically divided items "} style={{display:vis,height:chart_grid_height,overflowY:"scroll",overflowX:"hidden"}}>
        <div className="ui item" >
          <div className="content">
            <div className="ui header left floated">
              {chart_cataloging_unit}
            </div>
            <div className="meduim basic ui button icon right floated" onClick={this.chartToggle} >
              <i className="remove icon"></i>
            </div>
          </div>
        </div>

      {/*  only show tra message when their is filter.  the filter indicates the user took an action
        that results in data and charts that can be displayed
        */}
        { show_point &&
          <div className="ui item" >
            <div className="content">
              {tra_message_point}
            </div>
          </div>
        }

      { chart_filter &&
        <div className="ui item" >
          <div className="content">
            {tra_message}
          </div>
        </div>
      }


      { chart_filter &&
        <ChartRowWrapper key="tra"
          chart_width={chart_width_px}
          title="Targeted Resource Areas (TRA)"
          title_description=""
          note="TRA's in this Cataloging Unit"
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
           />
         }

      </div>

    );
  }

});

module.exports = ChartRow;
