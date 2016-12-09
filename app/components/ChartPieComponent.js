import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

import CustomToolTipPieChart from './CustomToolTipPieChart'

import {
  BOX_BORDER,
  SPACING,
  BACKGROUND_COLOR_FG,
  BOX_BORDER_RADUIS
} from '../constants/appConstants'


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
      color = '#759ac1'
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


    <div className="ui list" >
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
const ChartPieComponent = React.createClass({

  componentDidMount: function() {
    $('.ui.accordion').accordion();
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    if(!nextProps.chart_data){return false}
    if(!nextProps){return false}
    return true
  },
	render () {
    const raw_data = this.props.chart_data
    console.log(raw_data)
    const data = raw_data === undefined ? [] : raw_data;
    console.log(data)
    const note = data.length < 1 ? 'No ' + this.props.title + '(' + this.props.geography + ')' + ' found at this location!' : "For " + this.props.geography + ": " + this.props.chart_filter ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

    const self = this;
    const chart_width = this.props.chart_width < 500 ? this.props.chart_width/2.5 : this.props.chart_width/2;

    const space = (<span>&nbsp;</span>)

  	return (
      <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
        <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: "3em"}}>
          <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
            <i className="dropdown left floated icon" style={{float:"left"}}></i>
            <span style={{float:"left"}}>{this.props.title}</span>
            <span style={{float:"left",fontSize:".75em!important",fontWeight: "500!important",color: "rgba(0,0,0,.6)"}}>
              <span className="description">{this.props.description}</span>
              <span className="note">{space}- {note}</span>
            </span>
          </div>
        </div>


        <div className="active content">
          <div className="description" style={{padding: SPACING,width:this.props.chart_width}}>
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
              <PieChart key="" width={chart_width} height={250}
                margin={{top: 0, right: 0, left: 0, bottom: 0}}  >
                { this.props.use_percent &&
                  <Legend content={renderLegendPercent} verticalAlign={"middle"} align={"right"} />
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
                <Tooltip content={<CustomToolTipPieChart get_keyColors={get_keyColors} data={data}/>}/>
              </PieChart>

            }
          </div>
        </div>
  </div>

    );
  }
})



module.exports = ChartPieComponent;
