import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

var CustomToolTipSimpleBarCharts = require('./CustomToolTipSimpleBarCharts')

import {
  BOX_BORDER,
  SPACING,
  BACKGROUND_COLOR_FG,
  BOX_BORDER_RADUIS
} from '../constants/appConstants'

const ChartSimpleBar = React.createClass({
  //keys for landuse landcover
   get_keyColors: function(key){
    let color = '#5475A8';
    //this is hard coded may need to move this to a config file
    switch (key) {

      case 'Water Quality':
        color = '#67e48f'
        break;

      case 'Hydrology':
        color = '#759ac1'
        break;

      case 'Habitat':
        color = '#fecc9a'
        break;


      default:
        color = '#67e48f'
        break;
    }
    return color;
  },
  get_bars: function(data){

    let keycnt = 0;
    let data_array = []

    if(data){
      //make the name an array
      Object.keys(data).forEach(key => {
        if(key.toUpperCase() != 'NAME'){
          data_array.push(key)
        }
      })
    }

    //return bars
    return (
      data_array.map(key => (
        <Bar dataKey={key} key={keycnt++} fill={this.get_keyColors(key)} >
        </Bar>
      ))
    )

    return null;

  },

	render () {

    const self = this;

    const data = this.props.chart_data
    const bars = this.get_bars(data[0])
    const datas = data[0]
    const datas_length = this.props.searchMethod === 'menu' ? 0 : Object.keys(datas).length;

    const note = datas_length < 2 ? 'No ' + this.props.title + ' found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

    const space = (<span>&nbsp;</span>)

  	return (

        <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
          <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: "3em"}}>
            <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
              <i className="dropdown left floated icon" style={{float:"left"}}></i>
              <span style={{float:"left"}}>{this.props.title}</span>
              <span style={{float:"left",fontSize:".75em!important",fontWeight: "500!important",color: "rgba(0,0,0,.6)"}}>
                <span className="description">{this.props.title_description}</span>
                <span className="note">{space}- {note}</span>
              </span>
            </div>
          </div>

        <div className="active content">
          <div className="description" style={{paddingBottom:SPACING,paddingLeft:"20px",width:this.props.chart_width}}>
            { datas_length < 2 &&
              <div className='ui icon negative message' >
                <i className="remove circle icon"></i>
                <div className="content">
                  <div className="header">
                    {note}
                  </div>
                  {sub_header}
                </div>
              </div>
            }
            { datas_length > 1 &&
              <BarChart
                width={this.props.chart_width}
                height={200}
                data={data}
                margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                <XAxis dataKey="name" hide={false} tick={false} tickLine={false} axisLine={false} />
                <YAxis hide={false} tick={false} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomToolTipSimpleBarCharts  get_keyColors={this.get_keyColors} />}/>
                <Legend />
                {bars}
              </BarChart>
            }
          </div>
        </div>
      </div>

    );
  }
})

module.exports = ChartSimpleBar;
