var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const CustomToolTipPieChart = React.createClass({
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

       const colors = this.props.get_keyColors(bar_segment.name)
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
      if (label === '1' || label === '2' ){
        return (<div key={label+'blanktip'}/>)
      }

      const labelstr = label.toString();

      return (<div key={labelstr+'tooltip'} style={tooltipstyle}>
                {thedata}
              </div>);
    }

    return null;
  }
});

module.exports = CustomToolTipPieChart;
