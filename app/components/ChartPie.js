import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

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
      color = '#22c355'
      break;
  }
  return color;
}

//custom legend. to display landuse landcover category with correct fill
const renderLegendPercent = (props) => {
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
//custom legend. to display landuse landcover category with correct fill
const renderLegendTotal = (props) => {
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


    <div className="ui list" style={{marginLeft:5}}>
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
const ChartPie = React.createClass({



	render () {

    const data = this.props.chart_data
    const note = data.length < 1 ? 'No ' + this.props.title + ' found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

  	return (

      <div className="item" style={{display: "block"}}>
        <div className="content">
          <div className="header">
            <i className="left floated dropdown icon"></i>
            {this.props.title}
          </div>
          <div className="content center aligned">
            <div className="meta">
              <span className="description">{this.props.title_description}</span>
              <span className="note">{note}</span>
            </div>
          </div>
          <div className="description" style={{paddingLeft:"20px",width:this.props.chart_width}}>
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
              <PieChart key="" width={this.props.chart_width/2} height={250}
                margin={{top: 0, right: 0, left: 0, bottom: 0}}  >
                { this.props.use_percent &&
                  <Legend content={renderLegendPercent} verticalAlign={"middle"} align={"right"}/>
                }
                { !this.props.use_percent &&
                  <Legend content={renderLegendTotal} verticalAlign={"middle"} align={"right"}/>
                }

                <Pie
                  data={data}
                  labelLine={false}
                  fill="#8884d8"
                  outerRadius={100}
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
      </div>





    );
  }
})



module.exports = ChartPie;
