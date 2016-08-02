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

          />

          */}
        { this.props.BarChartData_D3 &&

          <BarChart width={1000} height={300} data={this.props.BarChartData_D3} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="value" stackId="a" fill="#8884d8" >
              {
                this.props.BarChartData_D3.map((entry, index) => (
                  <Cell cursor="pointer" fill={entry.name === this.props.baseline_filter ? '#82ca9d' : '#8884d8' } key={`cell-${index}`}/>
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
