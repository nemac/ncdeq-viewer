import { PieChart, Pie, Sector, Cell, Tooltip, ResponsiveContainer } from 'recharts';
var React = require('react');
var PropTypes = React.PropTypes;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }) => {
 	const radius = innerRadius + (outerRadius) + 25;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${payload.name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

const ChartPie = React.createClass({



	render () {

    const data = this.props.chart_data

  	return (

      <div className="item" style={{display: "block"}}>

        <div className="item" style={{display: "block", minHeight: "30px"}}>
          <i className="left floated dropdown icon"></i>
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <div className="meta">
            <span className="description">{this.props.title_description}</span>
            <span className="note">{this.props.note}</span>
          </div>
        </div>
        <div className="item" style={{display: "block"}}>

          <PieChart key="" width={this.props.chart_width} height={500} onMouseEnter={this.onPieEnter}>
            <Pie
              data={data}
              cx={300}
              cy={200}
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
            >
            	{
              	data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
              }
            </Pie>
          </PieChart>


        </div>
      </div>


    );
  }
})



module.exports = ChartPie;
