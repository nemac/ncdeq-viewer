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


      const values = this.props.data.map( val => {
        return val.value
      })
      //get the total of the values
      var total = values.reduce(function(a, b) {
        return a + b;
      }, 0);

      const thedata = payload.map( bar_segment => {

       const colors = get_keyColors(bar_segment.name)
        const toolTipName = {
          margin: '0',
          color: '#000',
        }

        const toolTipValue = {
          fontWeight: '800',
        }


        const value = bar_segment.value ? ((bar_segment.value/total) * 100).toFixed(1).toString() + '%' : '';
        const name = bar_segment.name + ": "

        return ( <p key={bar_segment.name} style={toolTipName}>{name}<span style={toolTipValue}>{value}</span></p>)
      })

      let tooltip = (<div />)
      if (label === 1 || label === 2 ){
        return (<div />)
      }

      const lablestr = label.toString();

      return (

        <div style={tooltipstyle}>
          {thedata}
      </div>

      );
    }

    return null;
  }
});


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
const ChartPie = React.createClass({



	render () {

    const data = this.props.chart_data
    const note = data.length < 1 ? 'No ' + this.props.title + ' found at this location!' : this.props.note ;
    const sub_header =  data.length < 1 ? 'Click or search to try again' : '' ;

    const self = this;
    const chart_width = this.props.chart_width < 500 ? this.props.chart_width/2.5 : this.props.chart_width/2;
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
                <Tooltip content={<CustomTooltip data={data}/>}/>
              </PieChart>

            }
          </div>
        </div>
      </div>





    );
  }
})



module.exports = ChartPie;
