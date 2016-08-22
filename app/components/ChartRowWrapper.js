var React = require('react');
var PropTypes = React.PropTypes;
var ChartBars = require('../components/ChartBars');

import Treemap from '../treemap/treemap.jsx';
require('../treemap/styles.css');
var {makeTreeFromHuc12Data, makeTreeFromHuc8Data} = require('../treemap/core.js');

var ChartRowWrapper = React.createClass({
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
      <div className="item" style={{display: "block"}}>
        <div className="item" style={{display: "block", minHeight: "30px"}}>
          <i className="left floated dropdown icon"></i>
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
        </div>
        <div className="item" style={{display: "block"}}>
          <ChartBars key="baseline" chart_width={this.props.chart_width}
                                    chart_type={this.props.chart_type}
                                    chart_data={this.props.chart_data}
                                    chart_filter={this.props.chart_filter}
                                    get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}/>
          <div refs={this.props.title} >
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChartRowWrapper;
