var React = require('react');
var PropTypes = React.PropTypes;

//import { BarChart,Treemap } from 'rd3';

//
import { BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { scaleOrdinal, schemeCategory10 } from 'd3-scale';


var ChartTest = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  handleClick(data, index) {
    console.log(data)
  },
  render: function() {

    return (
      <div className="ui segments">
        <div className="ui basic segment">
          <span key="1" >test</span>
          {/* only render if data is passed  */}
          { this.props.TreemapChartData_D3 &&
            <Treemap
              data={this.props.TreemapChartData_D3 ? this.props.TreemapChartData_D3 : [{"label": null,"value": null}]}
              width={1000}
              height={200}
              fill={'#3182bd'}
              title="Treemap"
              textColor="#484848"
              fontColor="12px"
              hoverAnimation={true}
            />
        }
        {/* only render if data is passed  */}
        {/*


          <BarChart
          data={this.props.BarChartData_D3 ?  this.props.BarChartData_D3 : [{"name": null,"values": [{"x":null,"y":null}]}]}
          width={1500}
          height={300}
          title="Bar Chart"
          xAxisLabel="Value"
          yAxisLabel="Label"
          legend={true}
          grouped={false}
          colorAccessor={(d, idx) => {
            console.log(d);
            console.log(idx);
            return idx
            }
          }
ffff99
          />

          */}
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
                  <Cell ref={entry.name} cursor="pointer" strokeWidth={entry.name === this.props.baseline_filter ? 2 : 0 } stroke={entry.name === this.props.baseline_filter ? '#fc9636' : '#fdc086' } fill={entry.name === this.props.baseline_filter ? '#fc9636' : '#fdc086' } key={`cell-${index}`}/>
                ))
              }
            </Bar>
            <Bar dataKey="Total Hydrology Baseline" stackId="a" fill="#beaed4"  onClick={this.handleClick} >
              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell ref={entry.name} cursor="pointer" strokeWidth={entry.name === this.props.baseline_filter ? 2 : 0 } stroke={entry.name === this.props.baseline_filter ? '#9479b9' : '#beaed4' } fill={entry.name === this.props.baseline_filter ? '#9479b9' : '#beaed4' } key={`cell-${index}`}/>
                ))
              }
            </Bar>
            <Bar dataKey="Total Habitat Baseline" stackId="a" fill="#7fc97f"  onClick={this.handleClick} >
              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell ref={entry.name} cursor="pointer" strokeWidth={entry.name === this.props.baseline_filter ? 2 : 0 } stroke={entry.name === this.props.baseline_filter ? '#44a244' : '#7fc97f' } fill={entry.name === this.props.baseline_filter ? '#44a244' : '#7fc97f' } key={`cell-${index}`}/>
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
