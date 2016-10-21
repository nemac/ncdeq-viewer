var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID, CATALOGING_MAP_FEATUREID } from '../constants/actionConstants';


var ChartBars = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  handleClickBar(constructor, entry, data, index, test){
      console.log(entry)
  },
  handleClick(constructor, entry, data, index, test) {

    const name = entry.name

    const chart_type = this.props.chart_type

    this.props.set_search_method('chart clicked')

    //set current geography level in redux state store
    this.props.change_geographyLevelActive(name);

    //only do this if the id is tra.  tra id's start with TP
    if(chart_type.toUpperCase() === "TRA"){
      this.setState({
        tra_filter: name
      })
      this.props.get_tra_info(name)

    //not tra so should be a huc. assume huc12...
    } else {
      this.props.get_LayerInfo_ByValue(name, HUC12_MAP_FEATUREID)
    }

  },

  get_legend_payload: function(chart_type){
    let custom_payload = [];
    const chart_keys = this.get_datakeys(chart_type);
    chart_keys.map( key => {
      const color_keys = this.props.get_keyColors(key);
      custom_payload.push({ value: key, type:'rect', id:key, color: color_keys[1] })
    })
    return custom_payload
  },
  //keys for main chart
  get_datakeys: function(chart_type){

    let data_keys = [];

    //return keys for store.  data driven
    data_keys = this.props.ChartLevels.map( item => {
      return item.properties.chart_level_label;
    })

    return data_keys;
  },
  get_cell: function(key){

    const colors = this.props.get_keyColors(key)

    let chart_filter = this.props.chart_filter;
    const chart_type = this.props.chart_type

    //if the chart type is tra make the filter the id of the traInfo object.
    //  there should be onluy one object in the traInfo object and it should be the tra
    //  the user clicked in. so it should look selected.
    if(this.state){
      if (chart_type.toUpperCase() === 'TRA'){
        if(this.state){
          chart_filter = this.state.tra_filter
        }
      }
    }

    if(this.props.chart_data){
      return (
          this.props.chart_data.map((entry, index) => (
            <Cell cursor="pointer"
                  fill={entry.name === chart_filter ? colors[0] : colors[1]}
                  stroke={entry.name === chart_filter ? colors[0] : colors[1]}
                  strokeWidth={entry.name === chart_filter ? 1 : 0}
                  key={`cell-${index}`}
                  id={entry.name}
                  onClick={this.handleClick.bind(null,this,entry)}/>
              ))
      )
    }
    return null;
  },
  get_bars: function(){

    const chart_type = this.props.chart_type;
    const chart_keys = this.get_datakeys(chart_type);
    let keycnt = 0;
    if(chart_keys){
      return (
        chart_keys.map(key => (
          <Bar key={keycnt++} dataKey={key} stackId="a" fill="#beaed4"  >
            {this.get_cell(key)}
          </Bar>
        ))
      )
    }
    return null;

  },
  get_title: function(){
    if(this.props.chart_data.length > 0){
      return (
        <div key={this.props.chart_type + 'header1'} className='header' >
            <h2 key={this.props.chart_type + 'header2'} className="ui header">{this.props.chart_type} </h2>
        </div>
      )
    }
    return null
  },
  set_toolTip: function(payload, label){
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    )
  },
  set_Info: function(){


    if(this.props.chart_data){
       this.props.chart_data.map( data  => {
        if(data.name === this.props.chart_filter){
          this.setState({ data });
        }
      })
    }

    return null;

  },
  render: function() {
    //build chart data component and when there is no data returned
    //  Tell user no chart data Available
    let title;
    const self = this;
    const CustomTooltip  = React.createClass({
      propTypes: {
        type: PropTypes.string,
        payload: PropTypes.array,
        label: PropTypes.string,
      },



      render() {
        const { active } = this.props;
        let html_hov = '';
        if (active) {
          const { payload, label } = this.props;


          payload.map( bar_segment => {
            html_hov = html_hov + "<span >" + bar_segment.name + ': ' + bar_segment.value + "</span >" ;
          })
          html_hov = "<span>" + label + "</span>" + html_hov;
          $("#hdata").html(html_hov);

          return (
          	<div/>
          );
        }

        return null;
      }
    });


    if (this.props.chart_filter){
      if(this.props.chart_data.length === 0){
        title = "No Data was found HUC's for the HUC " + this.props.chart_filter + "! Try to click the map, choose a HUC, or Search for a location again."
      } else {
        title = "This chart displays ALL HUC's in the Cataloging Unit " + this.props.chart_filter.substring(0,8) + ". Click on the Chart to go to the HUC OR Place you mouse cursor over bar to get more information."
      }

    } else {
      title = "No Charts Available Yet Please Click on the map, choose a HUC, or Search for a location"
    }
    $('#description').html(title);

    return (

      <div >
        <div id="bar-chart" style={{float:"left"}} >
          <BarChart key={this.props.chart_type}
                    width={this.props.chart_width}
                    height={200}
                    data={this.props.chart_data}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}  >
            <XAxis dataKey="name" hide={true}/>
            <YAxis hide={true}/>
            <Tooltip />
            {this.get_bars()}
           </BarChart>
        </div>
      </div>
    );
  }
});
//<Legend   payload={this.get_legend_payload(this.props.chart_type)}  />
//            <Tooltip content={<CustomTooltip/>}/>

module.exports = ChartBars;
