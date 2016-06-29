var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart,Treemap } from 'rd3';

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
        { this.props.BarChartData_D3 &&

            <BarChart
            data={this.props.BarChartData_D3 ?  this.props.BarChartData_D3 : [{"name": null,"values": [{"x":null,"y":null}]}]}
            width={1000}
            height={300}
            title="Bar Chart"
            xAxisLabel="Value"
            yAxisLabel="Label"
            />
        }
        </div>
      </div>
    );
  }
});

module.exports = ChartTest;
