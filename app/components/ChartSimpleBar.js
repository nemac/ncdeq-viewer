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


    //custom legend
    const customLegend = React.createClass({

      propTypes: {
        payload: PropTypes.array,
      },
      render() {
        console.log(payload)

        const { payload } = this.props;
        console.log(payload)
        let data_array = []

        //make the name an array
        Object.keys(this.props.datas).forEach(key => {
          if(key.toUpperCase() != 'NAME'){
            data_array.push(key)
          }
        })

        data_array.map( d => {
          console.log(d + " :" + datas[d])
        })

          return (


            <div className="ui list">
              {
                payload.map((entry, index) => (

                  <div className="item"  key={`item-${index}`}>

                  <svg  width="14" height="14" >
                    <path stroke-strokeWidth="4" fill={entry.fill} stroke={entry.stroke} d="M0,0h32v32h-32z" >
                    </path>
                  </svg>
                  {`  ${entry.name}  (${entry.value})` }
                  </div>
                ))
              }
            </div>
          );
      }
    })

    const data = this.props.chart_data
    const bars = this.get_bars(data[0])
    const datas = data[0]
    const datas_length = Object.keys(datas).length

    const note = datas_length < 2 ? 'No ' + this.props.title + ' found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;



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
            <BarChart width={this.props.chart_width} height={200} data={data}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
             <XAxis dataKey="name" hide={false} tick={false}  tickLine={false} axisLine={false} />
             <YAxis hide={false} tick={false}  tickLine={false} axisLine={false} />
             <Legend />
             {bars}
             <Tooltip/>
            </BarChart>
          }
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
