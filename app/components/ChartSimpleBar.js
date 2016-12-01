import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

import {
  BOX_BORDER
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
        color = '#6eb3dd'
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

    const tooltipstyle = {
      width: '100%',
      margin: 0,
      lineHeight: 24,
      border: '1px solid #f5f5f5',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: 10,
    };

    const toolTipLabel = {
      margin: '0',
      color: '#666',
      fontWeight: '700',
    };

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

          const thedata = payload.map( bar_segment => {

           const colors = self.get_keyColors(bar_segment.name)

            const toolTipName = {
              margin: '0',
              color: colors,
            }

            const toolTipValue = {
              fontWeight: '800',
            }

            const value = bar_segment.value ?  bar_segment.value.toString().substring(0,5) : 'N/A';
            const name = bar_segment.name + ": "

            return ( <p key={bar_segment.name} style={toolTipName}>{name}<span style={toolTipValue}>{value}</span></p>)
          })

          if (label === '1' || label === '2' ){
            return (<div key={label+'blanktip'}/>)
          }

          const labelstr = label.toString();

          return (

            <div key={labelstr+'tooltip'} style={tooltipstyle}>
              <p style={toolTipLabel}>Cathcment: {`${labelstr}`}</p>
              {thedata}
          </div>

          );
        }

        return null;
      }
    });

    const data = this.props.chart_data
    const bars = this.get_bars(data[0])
    const datas = data[0]
    const datas_length = this.props.searchMethod === 'menu' ? 0 : Object.keys(datas).length;

    const note = datas_length < 2 ? 'No ' + this.props.title + ' found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

    const space = (<span>&nbsp;</span>)

  	return (

      <div className="item" style={{display: "block", backgroundColor: "#ffffff",marginBottom: "14px",border: BOX_BORDER,paddingTop:"0px"}}>
        <div className="content" style={{borderBottom: BOX_BORDER,marginTop: "14px",paddingTop: "14px",paddingBottom: "14px"}}>
          <div className="header left floated">
            <i className="left floated dropdown icon"></i>
            {this.props.title}
          </div>
          <div className="content center aligned">
            <div className="meta left floated" style={{margin:"0px"}}>
              <span className="description center aligned">{this.props.title_description}</span>
              <span className="note center aligned">{space}- {note}</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="description" style={{paddingBottom:"14px",paddingLeft:"20px",width:this.props.chart_width}}>
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
                <Tooltip content={<CustomTooltip />}/>
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
//{bars}

// <Bar key="Habitat" dataKey="Habitat"  fill={this.get_keyColors("Habitat")}  />
// <Bar key="Hydrology" dataKey="Hydrology"  fill={this.get_keyColors("Hydrology")}  />
// <Bar key="Water Quality" dataKey="Water Quality"  fill={this.get_keyColors("Water Quality")}  />
module.exports = ChartSimpleBar;
