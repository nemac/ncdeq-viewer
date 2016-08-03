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

    // console.log(chart_types);

    let baseline_data = chart_types.filter( key => {
      return key.chart_type === 'baseline'
    })

    let baseline_filter = baseline_data[0].chart_limit
    // console.log(baseline_data[0])
    // console.log(baseline_filter)
    // console.log(baseline_data[0].chart_features)
    let baseline_data_limited = baseline_data[0].chart_features.filter( key => {
      //console.log(key)
      return key.properties.ID === baseline_filter
    })

    let test = this.getJSONElement_ById(baseline_data_limited,1)
    // console.log(test[0].properties.chart_level_label)
    //blank json arrays
    // id_json is the currently selected single id chart data.
    let id_json = [];
    //level_json is chart data for all the huc's at a level lower then the current geography level
    //  unless we are at huc12 then we show all the huc12's for the Cataloging unit
    let level_json = [];

    //ensure the objects exsists
    if ( this.props.charts ){
      if(this.props.charts.chart_data){

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




    // console.log(level_json.length)
    // console.log(id_json.length)

    //stack bar in d3 is a series so need to re-org the data into series format
    // this is the first level of next in the series.
    // bar chart needs a element in every series even if its null to render properly have to
    // restructure data to make sure that happens

    //get unique list of ids
    //const chart_levels = [...new Set(baseline_data_limited.map(item => item.properties.chart_level))];
    //console.log(chart_levels);

    let all_hucs_bar = [];

    const matchids = [...new Set(baseline_data[0].chart_features.map(item => item.properties.chart_matchid))];

    let levelsix =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 6 && chart_objects.properties.chart_id != 6
    })

    let levelfive =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 5 && chart_objects.properties.chart_id != 5
    })

    let levelfour =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 4 && chart_objects.properties.chart_id != 4
    })


    let levelthree =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 3 && chart_objects.properties.chart_id != 3
    })

    let leveltwo =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 2 && chart_objects.properties.chart_id != 2
    })


    let levelone =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_matchid === 1 && chart_objects.properties.chart_id != 1
    })

    let levelTop =  baseline_data[0].chart_features.filter ( chart_objects => {
      return chart_objects.properties.chart_id === 1;
    })


    // console.log(levelone)
    // let series = levelone.

    const series = [...new Set(levelone.map(item => item.properties.chart_id))];


    // sort by value
    let levelSort = levelTop.sort(function (a, b) {
      if (a.properties.chart_value > b.properties.chart_value) {
        return -1;
      }
      if (a.properties.chart_value < b.properties.chart_value) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });

    const sortedhucs = [...new Set(levelSort.map(item => item.properties.ID))];
    // console.log(levelonesort);

    //create series data fro stack bar
    series.map(level => {
      // console.log(level)
      let all_hucs_values = [];

      const cname_arry = this.getJSONElement_ById(baseline_data[0].chart_features,level);
      const x_name = cname_arry[0].properties.chart_description;
      // console.log(x_name);




      levelone.map(chart => {

        if (chart.properties.chart_id === level){


          const cname_value_arry = this.getJSONElement_ById(baseline_data[0].chart_features,chart.properties.chart_matchid);
          const x_value_name = cname_value_arry[0].properties.chart_description;

          // console.log(chart.properties.ID + ' (' + x_name + ')')
          // console.log(baseline_filter)
          all_hucs_values.push({"x":  chart.properties.ID , "y": Number(chart.properties.chart_value) })
        }
      })

      // values.map(value => {
      //   console.log(value)
      //   //all_hucs_values.push({"x": value.properties.chart_description + '-' + value.properties.ID, "y": Number(value.properties.chart_value)})
      // })

      all_hucs_bar.push({name: x_name , values: all_hucs_values})

    })
    let rechart_bar = [];

    // levelone.map(chart => {
    //
    //   let value = 0;
    //   if (Number(chart.properties.chart_value)){
    //     value =  Number(chart.properties.chart_value);
    //   }
    //
    //   var o = new Object;
    //   o["name"] =  chart.properties.ID;
    //   o["pv"] =  value*1000;
    //   o["uv"] = 1000;
    //   rechart_bar.push(o);
    //   // console.log(o)
    // })


    const allhucs = [...new Set(levelTop.map(item => item.properties.ID))];
    allhucs.map(huc => {
      // console.log(huc)

      var name = huc;
      var o = new Object;
      o["name"] =  name;

      const levelones = levelone.filter(item => {
        return item.properties.ID === huc;
      })

      levelones.map(item => {
        // console.log(item.properties)
        var value = Number(item.properties.chart_value);
        o[item.properties.chart_description] =  value;
        o["chart_id"] =  item.properties.chart_id;
      })
      rechart_bar.push(o);
    })


      // var i = 0;
      // levelTop.map(level => {
      //   var value = Number(level.properties.chart_value);
      //
      //   var name = level.properties.ID;
      //   var o = new Object;
      //   o["name"] =  name;
      //   o["value"] =  value;
      //   rechart_bar.push(o);
      //   i++
      // })
      // console.log(rechart_bar)

    const rechart_bar2 = [
      {name: "030201010904", pv: 0.900637814497369, uv: 1000},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

// console.log(rechart_bar2)

    // levelone.map(level => {
    //   // console.log(level)
    //   const cname_arry = this.getJSONElement_ById(baseline_data[0].chart_features,level.properties.chart_matchid);
    //   const x_name = cname_arry[0].properties.chart_description
    //
    //
    //   //get all the names for this level and loop
    //   //  for each level loop get the values and name it by huc
    //   // console.log(x_name); //values
    //   // console.log("Total for " + level.properties.ID); // series
    //
    //   //all_hucs_values.push({"x": x_name + '-' + level.properties.ID , "y": Number(level.properties.chart_value)})
    //   // //
    //   // all_hucs_bar.push({name: level.properties.chart_description + '-' + level.properties.ID, values: all_hucs_values})
    //
    // })
    // console.log(all_hucs_bar)
    //     let this_chart = baseline_data_limited.filter( chart_objects => {
    //       return chart_objects.properties.chart_level === level
    //     })
    //       valuesArray.push({"x": level.name , "y": chartVAL})

    // chart_levels.map( level => {
    //
    //
    //   //get the chart objects for the next chart level....
    //   let this_chart = baseline_data_limited.map( chart_objects => {
    //
    //     let cvalue = null;
    //     if (level === chart_objects.properties.chart_level){
    //        cvalue = Number(chart_objects.properties.chart_value);
    //     }
    //     console.log(cvalue);
    //   })
    //
    //   //console.log(this_chart)
    //
    // })

    // const level_ids2 = [...new Set(baseline_data.map(item => item.properties.chart_id))];
    // console.log(baseline_data_limited)
    // console.log(id_json)

    // chart_levels.map( level => {
    //
    //     //get the chart objects for the next chart level....
    //     let this_chart = baseline_data_limited.filter( chart_objects => {
    //       return chart_objects.properties.chart_level === level
    //     })
    //
    //
    //     this_chart.map( chartOBJ => {
    //       console.log('---------------');
    //
    //
    //       const cname_arry = this.getJSONElement_ById(baseline_data_limited,chartOBJ.properties.chart_matchid);
    //       console.log(cname_arry[0].properties.chart_description);
    //       console.log(cname_arry[0].properties.chart_level_label.toUpperCase());
    //
    //       console.log('');
    //       console.log(chartOBJ.properties.ID);
    //       console.log(chartOBJ.properties.chart_matchid);
    //       console.log(chartOBJ.properties.chart_description);
    //       console.log(Number(chartOBJ.properties.chart_value));
    //       console.log('');
    //       console.log('');
    //
    //     })
    //     // console.log(this_chart)
    // })

    // baseline_data_limited.map( ChartComponent => {
    //   console.log(ChartComponent.properties.chart_description);
    //   console.log(Number(ChartComponent.properties.chart_value));
    //   console.log(ChartComponent.properties.chart_matchid);
    //   const cname_arry = this.getJSONElement_ById(id_json,ChartComponent.properties.chart_matchid);
    //   console.log(cname_arry[0].properties.chart_level_label);
    //   console.log(cname_arry[0].properties.chart_level);
    //
    // })
    // level_ids.map( l => {
    //   const cname_arry = this.getJSONElement_ById(id_json,l);
    //   // console.log(cname_arry[0].properties.chart_level_label);
    //   // console.log(Number(cname_arry[0].properties.chart_value));
    // })



    id_json.map(featureCollection=>{
      var data = levels.find( function( ele ) {
        return ele.name && ele.name === featureCollection.properties.chart_matchid;
      } );

      if( !data ) {
        const cname_arry = this.getJSONElement_ById(id_json,featureCollection.properties.chart_matchid);
        const chartName = cname_arry[0].properties.chart_description;
        const chartValue = cname_arry[0].properties.chart_value;
        // console.log(Number(chartValue))

        levels.push({name: chartName, values:[]})
      }
    })

     levels = levels.filter(function (e, i, arr) {
        return arr.lastIndexOf(e) === i;
    });

    // console.log(levels)

    //this is the second level of the series. contains the values...
    id_json.map(featureCollection => {
      let valuesArray = [];
      // console.log(featureCollection.properties.chart_matchid)
      // console.log(featureCollection.properties.chart_matchid)
      const cname_arry = this.getJSONElement_ById(id_json,featureCollection.properties.chart_matchid);
      const chartName = cname_arry[0].properties.chart_description;
      levels.map(level => {
        //const id = this.chartName(data,featureCollection.properties.ID)
        //console.log(id);
        const chartVAL = (chartName  === level.name && featureCollection.properties.chart_matchid != featureCollection.properties.chart_id ? Number(featureCollection.properties.chart_value) : null);
        valuesArray.push({"x": level.name , "y": chartVAL})
      })
      BarChartData_D3.push({name: chartName, values:valuesArray})
      // console.log({name: chartName, values:valuesArray})

    })


    // console.log(BarChartData_D3)
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
        {/* <ChartRowWrapper key="HUCS" title="HUC's" id=""  level_data={level_json} id_data=""  /> */}
        {/* <ChartTest BarChartData_D3={rechart_bar} /> */}
        {/* <ChartTest BarChartData_D3={all_hucs_bar} /> */}

        <ChartTest BarChartData_D3={rechart_bar} baseline_filter={baseline_filter} get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>

      </div>
      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper key="TRA" title="TRA's"  id=""  level_data="" id_data="" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        {/* <ChartRowWrapper  key="COMPARE"  title="Compare" id=""  level_data="" id_data={id_json} /> */}
        {/* <ChartTest BarChartData_D3={BarChartData_D3} /> */}
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
