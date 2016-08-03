var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';
import { getAGOFeatureId} from '../utils/helpers';
import { HUC12_MAP_FEATUREID } from '../constants/actionConstants';


var ChartTest = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  handleClick(e, name, data, index) {
    this.props.get_LayerInfo_ByValue(name, HUC12_MAP_FEATUREID)
  },
  componentDidUpdate: function(prevProps, prevState) {
  },
  render: function() {
    //build chart data component and when there is no data returned
    //  Tell user no chart data Available
    let title;
    if (this.props.baseline_filter){
      // title =  <div key="1" >ALL HUC's in the Cataloging Unit {this.props.baseline_filter.substring(0,8)}</div>
      // title =  title + <div key="2" >Click on the Chart to go to the HUC <strong>OR</strong> Place you mouse cursor over bar to get more information</div>
      if(this.props.BarChartData_D3.length === 0){
        title = "No Data was found HUC's for the HUC " + this.props.baseline_filter + "! Try to click the map, choose a HUC, or Search for a location again."
      } else {
        title = "ALL HUC's in the Cataloging Unit " + this.props.baseline_filter.substring(0,8) + "Click on the Chart to go to the HUC OR Place you mouse cursor over bar to get more information"
      }

    } else {
      title = "No Charts Available Yet Please Click on the map, choose a HUC, or Search for a location"
    }

    return (

      <div className="ui segments">
        <div className="ui basic segment">
         <div key="1" >{title}</div>
        {/* only render if data is passed  */}
        { this.props.BarChartData_D3 &&

          <BarChart width={1000} height={300} data={this.props.BarChartData_D3} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="Total Water Quality Baseline" stackId="a" fill="#fdc086"  onClick={this.handleClick} >

              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell ref={entry.name}
                        stroke={entry.name}
                        cursor="pointer"
                        fill={entry.name === this.props.baseline_filter ? '#fc9636' : '#fdc086' }
                        key={`cell-${index}`}
                        onClick={this.handleClick}   />
                ))
              }
            </Bar>
            <Bar dataKey="Total Hydrology Baseline" stackId="a" fill="#beaed4"  onClick={this.handleClick} >
              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell ref={entry.name}
                        stroke={entry.name}
                        cursor="pointer"
                        fill={entry.name === this.props.baseline_filter ? '#9479b9' : '#beaed4' }
                        key={`cell-${index}`}/>
                ))
              }
            </Bar>
            <Bar dataKey="Total Habitat Baseline" stackId="a" fill="#7fc97f"  onClick={this.handleClick} >
              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell ref={entry.name}
                        stroke={entry.name}
                        cursor="pointer"
                        fill={entry.name === this.props.baseline_filter ? '#44a244' : '#7fc97f' }
                        key={`cell-${index}`}
                        id={entry.name}
                        onClick={this.handleClick.bind(null,this,entry.name)} />
                ))
              }
            </Bar>
          </BarChart>


        }
        </div>
      </div>
    );
  }
});

module.exports = ChartTest;
