var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
// require `react-d3-core` for Chart component, which help us build a blank svg and chart title.
var Chart = require('react-d3-core').Chart;
// require `react-d3-basic` for Line chart component.
var LineChart = require('react-d3-basic').LineChart;

var Chart = React.createClass({

  render: function() {
    return (
      <div />
    );
  }

});

module.exports = Chart;
