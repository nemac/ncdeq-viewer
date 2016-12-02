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

const CustomToolTipSimpleBarCharts  = React.createClass({
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

      const reversed_payload = [ ...payload ].reverse()

      const thedata = reversed_payload.map( bar_segment => {
       const colors = this.props.get_keyColors(bar_segment.name)

        const toolTipName = {
          margin: '0',
          color: colors[1],
        }

        const toolTipValue = {
          fontWeight: '800',
        }

        const value = bar_segment.value ?  bar_segment.value.toString().substring(0,5) : 'N/A';
        const name = bar_segment.name + ": "

        //when tra's have a value of 0 do not display the tool tip...
        if((bar_segment.value === 0 || !bar_segment.value ) && this.props.chart_type.toUpperCase() === 'TRA'){
          return null
        } else {
          return ( <p key={bar_segment.name} style={toolTipName}>{name}<span style={toolTipValue}>{value}</span></p>)
        }
      })

      //check to see if there is data in the case of tra's there could be no data and
      //  we want to tell users that there is no data.
      let hasdata = false;
      thedata.map( d  => {
        if(d){hasdata = true}
      })

      const labelstr = label.toString().trim();

      //null tip when there is no id
      if (!labelstr || !hasdata){
        return (<div key={labelstr+'blanktip'} />)
      }


      //return tooltip
      return (
        <div key={labelstr+'tooltip'} style={tooltipstyle}>
          <p style={toolTipLabel}>{this.props.level_label}: {`${labelstr}`}</p>
          {thedata}
        </div>
      );
    }

    return null;
  }
});

module.exports = CustomToolTipSimpleBarCharts;
