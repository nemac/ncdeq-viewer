var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID, TRA_FEATUREID, CATALOGING_MAP_FEATUREID, NLCD_CATCHMENT_FEATUREID } from '../constants/actionConstants';


const CustomizedLabelX  = React.createClass({
  render () {
    const {x, y, stroke, payload, height, width} = this.props;
    const newx = (this.props.viewBox.width)/2;
    const message = this.props.level_label + "'s"
    const y_offset = 15
    return (
      <text x={width/2} y={y} dy={y_offset} fill={stroke} fontSize={10} textAnchor="middle">{message}</text>
    )
  }
});

module.exports = CustomizedLabelX;
