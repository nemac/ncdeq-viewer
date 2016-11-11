import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;





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
    //make the name an array
    Object.keys(data).forEach(key => {
      if(key.toUpperCase() != 'NAME'){
        data_array.push(key)
      }
    })

    //return bars
    return (
      data_array.map(key => (
        <Bar key={keycnt++} dataKey={key}  fill={this.get_keyColors(key)}  >
        </Bar>
      ))
    )

    return null;

  },
	render () {

    const data = this.props.chart_data
    const note = data.length < 1 ? 'No Catchments found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;
    const bars = this.get_bars(data[0])
  	return (

      <div className="item" style={{display: "block"}}>

        <div className="item" style={{display: "block", minHeight: "30px"}}>
          <i className="left floated dropdown icon"></i>
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <div className="meta">
            <span className="description">{this.props.title_description}</span>
            <span className="note">{note}</span>
          </div>
        </div>
        <div className="item" style={{display: "block"}}>
          { data.length < 1 &&
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
          { data.length > 0 &&
            <BarChart width={this.props.chart_width} height={200} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="name" hide={false} tick={false}  tickLine={false} axisLine={false} />
             <YAxis hide={false} tick={false}  tickLine={false} axisLine={false} />
              <Tooltip/>
             <Legend />
             {bars}
            </BarChart>
          }
        </div>


      </div>


    );
  }
})



module.exports = ChartSimpleBar;
