var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var ChartTest = require('../components/ChartTest');

var Divider = require('./Divider');

var ChartRow = React.createClass({
  chartToggle: function(e){

    this.props.update_ChartVisiblity();
    //update map height comes after chart vis sp map will resize to full hieght.
    this.props.update_MapHeight();
  },
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    //blank json arrays
    // id_json is the currently selected single id chart data.
    let id_json = [];
    //level_json is chart data for all the huc's at a level lower then the current geography level
    //  unless we are at huc12 then we show all the huc12's for the Cataloging unit
    let level_json = [];

    //ensure the objects exsists
    if ( this.props.charts ){
      if ( this.props.charts.chart_data.id_json ){
        if ( this.props.charts.chart_data.id_json.features ){
          //if exists return the features from geosjson
          id_json =this.props.charts.chart_data.id_json.features;
        }
      }
      if ( this.props.charts.chart_data.level_json ){
        if ( this.props.charts.chart_data.level_json.features ){
          //if exists return the features from geosjson
          level_json =this.props.charts.chart_data.level_json.features;
        }
      }
    }

    //this is not used in this version but holding it for use in
    //  chart examples from a few examples I looked at.
    //  these basically re-org the data for use in the treemap and stacked bar charts we will start tesgting shortly
    let TreemapChartData_D3 = [];
    let BarChartData_D3 = [];
    let levels = []
    let chartID = []
    let chardatatest = [];

    //this is for the tree map
    level_json.map(featureCollection=>{
      if(featureCollection.properties.chart_level === 1){
        TreemapChartData_D3.push({label:featureCollection.properties.ID,value: Number(featureCollection.properties.chart_value)})
      }
    })

    //stack bar in d3 is a series so need to re-org the data into series format
    // this is the first level of next in the series.
    id_json.map(featureCollection=>{
      var data = levels.find( function( ele ) {
        return ele.name && ele.name === featureCollection.properties.chart_matchid;
      } );

      if( !data ) {
        levels.push({name: featureCollection.properties.chart_matchid, values:[]})
      }
    })

    //this is the second level of the series. contains the values...
    id_json.map(featureCollection => {
      let valuesArray = [];
      levels.map(level => {

        const chartVAL = (featureCollection.properties.chart_matchid === level.name && featureCollection.properties.chart_matchid != featureCollection.properties.chart_id ? Number(featureCollection.properties.chart_value) : null);
        valuesArray.push({"x": level.name , "y": chartVAL})
      })
      BarChartData_D3.push({name: featureCollection.properties.chart_matchid, values:valuesArray})

    })

    return (

      <div className="ui stackable centered grid" style={{display:vis}}>
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
            <div className="ui right floated compact grey inverted segment">
              <div className="meduim basic ui button" onClick={this.chartToggle} >
                <i className="remove icon"></i>
              </div>
          </div>
        <div className="content"><p>Some descriptive text</p></div>
      </div>

      <Divider />

      <div className="fourteen wide column">
        <ChartRowWrapper key="HUCS" title="HUC's" id=""  level_data={level_json} id_data=""  />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper key="TRA" title="TRA's"  id=""  level_data="" id_data="" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper  key="COMPARE"  title="Compare" id=""  level_data="" id_data={id_json} />
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
