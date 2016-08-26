var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID } from '../constants/actionConstants';


var ChartBars = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  handleClick(constructor, entry, data, index, test) {
    const name = entry.name

    //set current geography level in redux state store
    this.props.change_geographyLevelActive("HUC12");

    this.props.get_LayerInfo_ByValue(name, HUC12_MAP_FEATUREID)
    // const id = $("#data").html(name);

        //super hacky way to get values into webpage.
    // need to pass chart data for other levels so we can "drilldown"
    const props = constructor.props.chart_data
    let props_filtered = props.filter(item => {
      return item.name === name
    })
    let values = ''
    props_filtered.map( chartclickvalues => {
      for (var prop in chartclickvalues) {
        if (chartclickvalues.hasOwnProperty(prop)) {
          if(typeof chartclickvalues[prop] === 'object'){
            // values = values + prop + ": " + JSON.stringify(chartclickvalues[prop]) + "<BR />"
          }else{
            if(prop != 'chart_id'){
              if(prop === 'name'){
                values = values + "HUC: " + chartclickvalues[prop] + "<BR />"
              }else{
                values = values + prop + ": " + chartclickvalues[prop] + "<BR />"
              }
            }
          }
        }
      }

    })
    // $("#cdata").html(values);
    //$("#data").html(name);
  },
  get_keyColors: function(key){
    let key_colors = [];

    switch (key) {
      case 'Total Water Quality Baseline':
        key_colors = ['#22c355' , '#67e48f']
        break;
      case 'Total Hydrology Baseline':
        key_colors = ['#2b83ba' , '#6eb3dd']
        break;
      case 'Total Habitat Baseline':
        key_colors = ['#ec5f62' , '#fecc9a' ]
        break;
      case 'Total Water Quality Uplift':
        key_colors = ['#22c355' , '#67e48f']
        break;
      case 'Total Hydrology Uplift':
        key_colors = ['#2b83ba' , '#6eb3dd']
        break;
      case 'Total Habitat Uplift':
        key_colors = ['#ec5f62' , '#fecc9a' ]
        break;
      default:
        key_colors = ['#1a9641' , '#3cdd6f']
        break;
    }
    return key_colors;
  },
  get_legend_payload: function(chart_type){
    let custom_payload = [];
    const chart_keys = this.get_datakeys(chart_type);
    chart_keys.map( key => {
      const color_keys = this.get_keyColors(key);
      custom_payload.push({ value: key, type:'rect', id:key, color: color_keys[1] })
    })
    return custom_payload
  },
  //keys for main chart
  get_datakeys: function(chart_type){
    let data_keys = [];
    switch (chart_type) {
      case 'baseline':
        data_keys = ['Total Water Quality Baseline','Total Hydrology Baseline','Total Habitat Baseline'];
        break;
      case 'uplift':
        data_keys = ['Total Water Quality Uplift','Total Hydrology Uplift','Total Habitat Uplift'];
        break;
      default:

    }
    return data_keys;
  },
  get_cell: function(key){
    const colors = this.get_keyColors(key)
    if(this.props.chart_data){
      return (
          this.props.chart_data.map((entry, index) => (
            <Cell cursor="pointer"
                  fill={entry.name === this.props.chart_filter ? colors[0] : colors[1]}
                  stroke={entry.name === this.props.chart_filter ? colors[0] : colors[1]}
                  strokeWidth={entry.name === this.props.chart_filter ? 5 : 0}
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
          <Bar key={keycnt++} dataKey={key} stackId="a" fill="#beaed4" >
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
          //return (this.test(data))
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

          //const tip = self.set_toolTip(payload, label);
          //console.log(tip)
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
        <div id="hdata" />
        <div id="cdata" />
        <div id="bar-chart" style={{float:"left"}} >
          <BarChart key={this.props.chart_type}
                    width={this.props.chart_width}
                    height={200}
                    data={this.props.chart_data}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}  >
            <XAxis dataKey="name" hide={true}/>
            <YAxis hide={true}/>
            <Tooltip />
            <Legend   payload={this.get_legend_payload(this.props.chart_type)}  />
            {this.get_bars()}
           </BarChart>
        </div>
      </div>
    );
  }
});

//            <Tooltip content={<CustomTooltip/>}/>

module.exports = ChartBars;
