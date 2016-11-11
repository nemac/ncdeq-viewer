import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
 	const radius = innerRadius + (outerRadius) + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${payload.name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

//keys for landuse landcover
 function get_keyColors(key){
  let color = '#5475A8';
  //this is hard coded may need to move this to a config file
  switch (key) {
    case 'Water':
      color = '#5475A8'
      break;

    case 'Developed':
      color = '#ff0000'
      break;

    case 'Barren':
      color = '#D2CDC0'
      break;

    case 'Forested':
      color = '#85C77E'
      break;

    case 'Shrubland':
      color = '#AF963C'
      break;

    case 'Grassland':
      color = '#FDE9AA'
      break;

    case 'Cultivated':
      color = '#CA9146'
      break;

    case 'Wetland':
      color = '#64B3D5'
      break;


    default:
      color = '#22c355'
      break;
  }
  return color;
}

//custom legend. to display landuse landcover category with correct fill
const renderLegend = (props) => {
  const { payload } = props;

  //get thevalues into an array
  var values = payload.map ( entry => {
    return entry.value
  })

  //get the total of the values
  var total = values.reduce(function(a, b) {
    return a + b;
  }, 0);

  return (


    <div className="ui list">
      {
        payload.map((entry, index) => (

          <div className="item"  key={`item-${index}`}>

          <svg  width="14" height="14" >
            <path stroke-strokeWidth="4" fill={entry.fill} stroke={entry.stroke} d="M0,0h32v32h-32z" >
            </path>
          </svg>
          {`  ${entry.name}  (${((entry.value/total) * 100).toFixed(1)}%)` }
          </div>
        ))
      }
    </div>
  );
}

const ChartPie = React.createClass({



	render () {

    const data = this.props.chart_data
    const note = data.length < 1 ? 'No Catchments found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search the map to try again' : '' ;
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
          <PieChart key="" width={this.props.chart_width} height={200} onMouseEnter={this.onPieEnter}>
            <Legend content={renderLegend} verticalAlign={"top"} align={"right"}/>

            <Pie
              data={data}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
            >
            	{
              	data.map((entry, index) => <Cell key={index} fill={get_keyColors(entry.name)}/>)
              }
            </Pie>
            <Tooltip/>
          </PieChart>
        }

        </div>


      </div>


    );
  }
})



module.exports = ChartPie;
