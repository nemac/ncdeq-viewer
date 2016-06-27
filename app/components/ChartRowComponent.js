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
    let chardatatest = [];

     id_json.map(featureCollection=>{
        var data = levels.find( function( ele ) {
            return ele.name && ele.name === featureCollection.properties.chart_matchid;
        } );

        //console.log(data)
        if( !data ) {
          levels.push({name: featureCollection.properties.chart_matchid, values:[]})
        }
     })

id_json.map(featureCollection => {
   let valuesArray = [];
  levels.map(level => {
      //console.log(level.name)
      //console.log(featureCollection.properties.chart_id)
      // console.log(featureCollection.properties.chart_matchid)
      // console.log(featureCollection.properties.chart_id)
      const chartVAL = (featureCollection.properties.chart_matchid === level.name && featureCollection.properties.chart_matchid != featureCollection.properties.chart_id ? Number(featureCollection.properties.chart_value) : null);
      valuesArray.push({"x": level.name , "y": chartVAL})
      //console.log(chartVAL);
  })
  chardatatest.push({name: featureCollection.properties.chart_matchid, values:valuesArray})
  //console.log('-----------------')

})


//
// //test
//   levels.map(level => {
//     console.log('#############')
//     console.log(level.name)
//
//      let valuesArray = [];
//      id_json.map(featureCollection=>{
//        console.log('*************')
//        const chartVAL = (level.name === featureCollection.properties.chart_matchid && featureCollection.properties.chart_matchid != featureCollection.properties.chart_id  ? Number(featureCollection.properties.chart_value) : null);
//       //  if(level.name === featureCollection.properties.chart_matchid){
//       //    console.log(featureCollection.properties.chart_value)
//       //  }else {
//       //    console.log(null)
//       //  }
//        console.log(chartVAL)
//
//
//        console.log('*************')
//          //const val = featureCollection.properties.chart_matchid === level.name ? Number(featureCollection.properties.chart_value) : null;
//          //valuesArray.push({"x": featureCollection.properties.chart_matchid, "y": val })
//          valuesArray.push({"x":  featureCollection.properties.chart_matchid , "y": chartVAL})
//
//      })
//      console.log('#############')
//      level.values = valuesArray
//      //console.log (valuesArray)
//    })
//
// //test

     //
    //  levels.map(level => {
     //
    //     const levelValues = id_json.filter(feature =>{
    //       return feature.properties.chart_matchid === level.name
    //     })
     //
    //     let valuesArray = [];
    //     const values = levelValues.map( feature => {
    //         valuesArray.push({"x": feature.properties.chart_matchid, "y": Number(feature.properties.chart_value)})
    //     })
    //     level.values = valuesArray
    //  })


     console.log(chardatatest)

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
        <ChartTest key="TRA" title="TRA's" id="" data="" alldata="" TreemapChartData_D3={TreemapChartData_D3} BarChartData_D3={chardatatest}/>
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
