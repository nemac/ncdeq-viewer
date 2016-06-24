var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var ChartTest = require('../components/ChartTest');

var Divider = require('./Divider');

var ChartRow = React.createClass({
  componentDidMount: function() {
  },
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    let id_json = "";
    let level_json = "";

    //ensure the objects exsists
    if ( this.props.charts ){
      if ( this.props.charts.chart_data.id_json ){
        if ( this.props.charts.chart_data.id_json.features ){
           id_json =this.props.charts.chart_data.id_json.features;
        }
      }
      if ( this.props.charts.chart_data.level_json ){
        if ( this.props.charts.chart_data.level_json.features ){
          level_json =this.props.charts.chart_data.level_json.features;
        }
      }
    }

    let TreemapChartData_D3 = [];
    let BarChartData_D3 = [];
    let levels = []
    let chartID = []
    //console.log (id_json)

     id_json.map(featureCollection=>{
        //console.log(featureCollection.properties)
        var data = levels.find( function( ele ) {
            return ele.name && ele.name === featureCollection.properties.chart_level;
        } );

        if( !data ) {
          levels.push({name: featureCollection.properties.chart_level, values:[]})
        }
     })

     levels.map(level => {

        const levelValues = id_json.filter(feature =>{
          return feature.properties.chart_level === level.name
        })

        let valuesArray = [];
        const values = levelValues.map( feature => {
            valuesArray.push({"x": feature.properties.chart_description, "y": feature.properties.chart_value})
        })
        //console.log(valuesArray)
        //console.log({"x": levelValues.properties.chart_description, "y": levelValues.properties.chart_description.chart_value })
        level.values = valuesArray
        // console.log(level.values)
        // console.log(levelValues)
     })

    //  levels.map(levels)
     console.log(levels)

    // GeoJSON.map(featureCollection=>{
    //   const featureCollectionArray = [featureCollection]
    //   featureCollectionArray.map(features => {
    //     features.map(feature =>{
    //       let chart_value = Number(feature.properties.chart_value).toPrecision();
    //       //console.log(chart_value)
    //       // if( feature.properties.chart_value  ) {
    //       //   //console.log(feature.properties.chart_value )
    //       //   chart_value = 0
    //       // }
    //
    //       //const charValue = (isNaN(feature.properties.chart_value) ? feature.properties.chart_value : 0)
    //       //console.log(feature.properties.chart_value)
    //       // if (BarChartData_D3["name"] = feature.properties.chart_level){
    //       //   console.log(feature.properties.chart_level + '= ')
    //       // }
    //
    //       TreemapChartData_D3.push({label: feature.properties.chart_description,value: chart_value })
    //       BarChartData_D3.push({"name": feature.properties.chart_level,"values":[{"x": feature.properties.chart_description, "y": chart_value }]})
    //       //console.log({"name": feature.properties.chart_level,"values":[{"x": feature.properties.chart_description, "y": chart_value }]})
    //     })
    //   })
    // })

    // var thelevels = {};
    // RawBarChartData_D3.forEach( function( item ) {
    //   var level = thelevels[item.name] = thelevels[item.names] || {};
    //   level['values'] = item.values;
    //
    //   //level['values'] = item.values;
    // });
    // console.log(thelevels)


    // console.log(RawBarChartData_D3)
    // console.log(TreemapChartData_D3)
    return (

      <div className="ui stackable centered grid" style={{display:vis}}>
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
            <div className="ui right floated compact grey inverted segment">
              <div className="meduim basic ui button" onClick={this.props.update_ChartVisiblity} >
                <i className="remove icon"></i>
              </div>
          </div>
        <div className="content"><p>Some descriptive text</p></div>
      </div>

      <Divider />

      <div className="fourteen wide column">
        <ChartRowWrapper key="HUCS" title="HUC's" id={this.props.current_id}  data="" alldata={level_json}  />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartTest key="TRA" title="TRA's" id="" data="" alldata="" TreemapChartData_D3={TreemapChartData_D3} BarChartData_D3={BarChartData_D3}/>
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper  key="COMPARE"  title="Compare" id=""  data={id_json} alldata="" />
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
