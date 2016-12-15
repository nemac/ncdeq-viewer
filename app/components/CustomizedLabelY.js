var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID, TRA_FEATUREID, CATALOGING_MAP_FEATUREID, NLCD_CATCHMENT_FEATUREID } from '../constants/actionConstants';


const CustomizedLabelY  = React.createClass({
  render () {
    const {x, y, stroke, payload, width, height} = this.props;

    const message = this.props.level_label + "'s"
    const x_offset = 45
    const y_offset = 20
    const top_label_array = this.props.top_label.toString().split(" ")

    return (
      <g>
        <text x={x} y={y-10} dy={y_offset} dx={x_offset} fill={stroke} fontSize={10} textAnchor="end">
          <tspan>{this.props.top_label}</tspan>
          </text>
        <text x={x} y={height} dy={y_offset} dx={x_offset} fill={stroke} fontSize={10} textAnchor="end">
          <tspan>{this.props.bottom_label}</tspan>
        </text>
      </g>
    )
  }
});

module.exports = CustomizedLabelY;
