var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var ChartTest = require('../components/ChartTest');
var SectionWrapper = require('./SectionWrapper');
var HeaderTitleComponent = require('../components/HeaderTitleComponent');

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

      //awesome that this the chart features have been extracted already if there is no chart_features object
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
    //  nothing passed awesome its false or not a top level chart.
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
    // aget unique set of of hucs and sum their values.
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
  getChart_data: function(chart_data){
    // builds chart data into proper format for rechart library (bar charts)
    let chart_data_array = [];

    if(chart_data){

      //get fist level chart
      let levelone =  this.getChart_FilteredByChartLevel( chart_data, 1, false );

      // sort by value
      let sorted_hucs = this.getChart_Sorted(levelone);

      sorted_hucs.map(huc => {

       var name = huc.substring(0,12);
       var chart_object = new Object;
       chart_object["name"] =  name;

       const levelones = this.getChart_FilteredByHUC(levelone, name);
       let children = [];

       levelones.map(item => {
         var value = Number(item.properties.chart_value);
         chart_object[item.properties.chart_description] =  value;
         chart_object["chart_id"] =  item.properties.chart_id;

         //pass chart id get all matchids of current chart of there is data that exists then add to children
         // this will create for drilldown bar charts
         let next_limit = this.getChart_FilteredByHUC(chart_data, name);
         let next_level =  this.getChart_FilteredByChartLevel( next_limit, item.properties.chart_id, false );

        //  var next_chart_object = new Object;
        //  next_chart_object[item.properties.chart_description] = next_level;
        //  children.push(next_chart_object)
         chart_object[item.properties.chart_description.replace(' ','_') + "_child_chart_data"] = next_level;

       })
       chart_data_array.push(chart_object);
     })
    }
    return chart_data_array
  },
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    //get data for chart type of baseline
    let baseline_data = this.getCharType_Data('baseline');

    //get data for chart type of baseline
    let uplift_data = this.getCharType_Data('uplift');
    //console.log(uplift_data[0])
    //get the user selected huc so we can filter
    let chart_filter = this.getChart_Filter(baseline_data[0]);

    //get the baseline chart filtered by the user selected huc
    let baseline_data_limited = this.getChart_FilteredByHUC(baseline_data[0], chart_filter);

    //get the uplift chart filtered by the user selected huc
    let uplift_data_limited = this.getChart_FilteredByHUC(uplift_data[0], chart_filter);



    let chart_baseline_bar = [];
    let chart_upflift_bar = [];
    let all_hucs_bar = [];

    chart_baseline_bar = this.getChart_data(baseline_data[0]);
    chart_upflift_bar = this.getChart_data(uplift_data[0]);

    return (
      <div className="ui basic segment">
            <h2 className="ui block header">Bar Charts Example
              <div id="description" className="sub header">Check out our plug-in marketplace</div>
            </h2>
        <ChartTest key="baseline" chart_type="baseline" chart_data={chart_baseline_bar} chart_filter={chart_filter} get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>
        <ChartTest key="uplift" chart_type="uplift" chart_data={chart_upflift_bar}  chart_filter={chart_filter} get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>

      </div>
    );
  }

});

module.exports = ChartRow;
