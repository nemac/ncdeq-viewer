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
      //console.log(key)
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

    console.log(baseline_data_limited)
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
    if(chart_data[0]){
      chart_data_limited = chart_data[0].chart_features.filter( key => {
        return key.properties.ID === filter_value
      })
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
        chart_data_limited =  chart_data.chart_features.filter ( chart_objects => {
          return chart_objects.properties.chart_id === filter_value;
        })
      } else {
        chart_data_limited =  chart_data.chart_features.filter ( chart_objects => {
          return chart_objects.properties.chart_matchid === filter_value && chart_objects.properties.chart_id != filter_value
        })
      }
    }
    //returned the filtered chart data
    return chart_data_limited
  },
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    let baseline_data = this.getCharType_Data('baseline');
    let baseline_filter = this.getChart_Filter(baseline_data);
    let baseline_data_limited = this.getChart_FilteredByHUC(baseline_data, baseline_filter);

    let rechart_bar = [];
    let all_hucs_bar = [];

    if(baseline_data[0]){

      // baseline_filter = baseline_data[0].chart_limit
      //
      // let baseline_data_limited = baseline_data[0].chart_features.filter( key => {
      //   return key.properties.ID === baseline_filter
      // })


      //this is not used in this version but holding it for use in
      //  chart examples from a few examples I looked at.
      //  these basically re-org the data for use in the treemap and stacked bar charts we will start tesgting shortly

      //
      // const matchids = [...new Set(baseline_data[0].chart_features.map(item => item.properties.chart_matchid))];
      //
      // let levelsix =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 6 && chart_objects.properties.chart_id != 6
      // })
      //
      // let levelfive =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 5 && chart_objects.properties.chart_id != 5
      // })
      //
      // let levelfour =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 4 && chart_objects.properties.chart_id != 4
      // })
      //
      //
      // let levelthree =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 3 && chart_objects.properties.chart_id != 3
      // })
      //
      // let leveltwo =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 2 && chart_objects.properties.chart_id != 2
      // })


      // let levelone =  baseline_data[0].chart_features.filter ( chart_objects => {
      //   return chart_objects.properties.chart_matchid === 1 && chart_objects.properties.chart_id != 1
      // })
      let levelone =  this.getChart_FilteredByChartLevel( baseline_data[0], 1, false )

      let levelTop =  this.getChart_FilteredByChartLevel( baseline_data[0], 1, true )
      // sort by value
       let levelSort = levelTop.sort(function (a, b) {

         if (a.properties.chart_value > b.properties.chart_value) {
           return -1;
         }
         if (a.properties.chart_value < b.properties.chart_value) {
           return 1;
         }
         // a must be equal to b or must be a null value?
         return 0;
       });

       const sortedhucs = [...new Set(levelSort.map(item => item.properties.ID))];

       //get all unique hucs in the top level of charts
       //const allhucs = [...new Set(levelTop.map(item => item.properties.ID))];

       sortedhucs.map(huc => {

         var name = huc;
         var o = new Object;
         o["name"] =  name;

         const levelones = levelone.filter(item => {
           return item.properties.ID === huc;
         })

         levelones.map(item => {
           var value = Number(item.properties.chart_value);
           o[item.properties.chart_description] =  value;
           o["chart_id"] =  item.properties.chart_id;
           o["children"] = [{name:"test",value:100}]
           this.getChildChart(item.properties.chart_id, name, )

           //pass chart id get all matchids of current chart of there is data that exists then add to children
           // this will create for drilldown bar charts
         })
         rechart_bar.push(o);
       })
    }

    return (
      <div className="ui basic segment">
        <div className='header' >
            <h2 className="ui block header">Bar Charts Example
              <div id="description" className="sub header">Check out our plug-in marketplace</div>
            </h2>
        </div>
        <ChartTest BarChartData_D3={rechart_bar} baseline_filter={baseline_filter} get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>
      </div>
    );
  }

});

module.exports = ChartRow;
