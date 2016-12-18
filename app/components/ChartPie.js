import { PieChart, Pie, Sector, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;
import HelperComponent from '../components/HelperComponent'

import CustomToolTipPieChart from './CustomToolTipPieChart'
import NoDataMessage from './NoDataMessage'

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


    <div className="ui list" style={{marginLeft:"30px" }}>
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


    <div className="ui list" style={{marginLeft:"30px" }}>
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

  componentDidMount: function() {
    const chart_width = this.props.chart_width < 500 ? this.props.chart_width/2.5 : this.props.chart_width/2;

    $('.ui.accordion').accordion();
    $('.PieChart .recharts-surface').css("overflow","visible");

  },
  componentDidUpdate: function(prevProps, prevState) {
    $('.PieChart .recharts-layer.recharts-pie').attr("transform","translate(-100)");

  },
	render () {

    const data = this.props.chart_data
    const note = data.length < 1 ? 'No ' + this.props.title + ' found at this location!' : this.props.note  ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

    const self = this;
    const chart_width = this.props.chart_width < 500 ? this.props.chart_width/2.5 : this.props.chart_width/2;
    const chart_height = data.length < 1 ? "150px" : "250px"
    const space = (<span>&nbsp;</span>)

    const use_legend = window.innerWidth < 500 ? false : true;

  	return (
      <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
        <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: "3em"}}>
          <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
            <i className="dropdown left floated icon" style={{float:"left"}}></i>
            <span style={{float:"left"}}>{this.props.title}
              <HelperComponent helper_name={this.props.chart_type}/>
              </span>
            <span style={{float:"left",fontSize:".75em!important",fontWeight: "500!important",color: "rgba(0,0,0,.6)"}}>
              <span className="description">{this.props.title_description}</span>
              <span className="note">{space}- {note}</span>
            </span>
          </div>
        </div>


        <div className="active content">
          <div className="description PieChart" style={{padding: SPACING,width:this.props.chart_width,height:chart_height}}>
            { data.length < 1 &&
              <NoDataMessage note={note} sub_header={sub_header} />
            }
            { data.length > 0 &&
              <ResponsiveContainer  >
                <PieChart key=""
                  margin={{top: 0, right: 0, left: 0, bottom: 0}}  >
                  { this.props.use_percent && use_legend &&
                    <Legend content={renderLegendPercent} width={175} verticalAlign={"middle"} align={"right"}
                      margin={{top: 0, right: 0, left: 0, bottom: 0}}/>
                  }
                  { !this.props.use_percent && use_legend &&
                    <Legend content={renderLegendTotal}  width={175}  verticalAlign={"middle"} align={"right"}
                      margin={{top: 0, right: 0, left: 10, bottom: 0}}/>
                  }
                  <Pie
                    data={data}
                    labelLine={false}
                    fill="#8884d8"
                    outerRadius={'90%'}
                    >
                    {
                      data.map((entry, index) => <Cell key={index} fill={get_keyColors(entry.name)}/>)
                    }
                  </Pie>
                  <Tooltip content={<CustomToolTipPieChart get_keyColors={get_keyColors} data={data}/>}/>
                </PieChart>
              </ResponsiveContainer>
            }
          </div>
        </div>
  </div>

    );
  }
})

module.exports = ChartPie;
