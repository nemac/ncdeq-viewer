var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var ChartTest = require('../components/ChartTest');

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
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';
    const chart_types = this.props.charts.chart_data.chart_types

    let baseline_data = chart_types.filter( key => {
      return key.chart_type === 'baseline'
    })

    let baseline_filter = baseline_data[0].chart_limit

    let baseline_data_limited = baseline_data[0].chart_features.filter( key => {
      return key.properties.ID === baseline_filter
    })


    //this is not used in this version but holding it for use in
    //  chart examples from a few examples I looked at.
    //  these basically re-org the data for use in the treemap and stacked bar charts we will start tesgting shortly
    let BarChartData_D3 = [];
    let all_hucs_bar = [];
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


    let levelone =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 1 && chart_objects.properties.chart_id != 1
    })

    let levelTop =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_id === 1;
    })


    let rechart_bar = [];

    //get all hucs in the top level of charts
    const allhucs = [...new Set(levelTop.map(item => item.properties.ID))];

    allhucs.map(huc => {

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
      })
      rechart_bar.push(o);
    })

    return (

      <div className="ui stackable centered grid" style={{display:vis}}>
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
              <div className="small basic ui button" onClick={this.chartToggle} >
                <i className="remove icon"></i>
              </div>
      </div>

      <Divider />

      <div className="fourteen wide column">

        <ChartTest BarChartData_D3={rechart_bar} baseline_filter={baseline_filter} get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>

      </div>



    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
