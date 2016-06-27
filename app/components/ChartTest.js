var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart,Treemap } from 'rd3';

var chartData = [{
  "label": "Darron Weissnat IV",
  "value": 20.72,
  "age": 39,
  "birthday": "2005-01-03T00:00:00.000Z",
  "city": "East Russel",
  "married": false,
  "index": 0
}, {
  "label": "Pablo Ondricka",
  "value": 19.32,
  "age": 38,
  "birthday": "1974-05-13T00:00:00.000Z",
  "city": "Lake Edytheville",
  "married": false,
  "index": 1
}, {
  "label": "Mr. Stella Kiehn Jr.",
  "value": 16.8,
  "age": 34,
  "birthday": "2003-07-25T00:00:00.000Z",
  "city": "Lake Veronicaburgh",
  "married": false,
  "index": 2
}, {
  "label": "Lavon Hilll I",
  "value": 20.57,
  "age": 12,
  "birthday": "1994-10-26T00:00:00.000Z",
  "city": "Annatown",
  "married": true,
  "index": 3
}, {
  "label": "Clovis Pagac",
  "value": 24.28,
  "age": 26,
  "birthday": "1995-11-10T00:00:00.000Z",
  "city": "South Eldredtown",
  "married": false,
  "index": 4
}, {
  "label": "Gaylord Paucek",
  "value": 24.41,
  "age": 30,
  "birthday": "1975-06-12T00:00:00.000Z",
  "city": "Koeppchester",
  "married": true,
  "index": 5
}, {
  "label": "Ashlynn Kuhn MD",
  "value": 23.77,
  "age": 32,
  "birthday": "1985-08-09T00:00:00.000Z",
  "city": "West Josiemouth",
  "married": false,
  "index": 6
}, {
  "label": "Fern Schmeler IV",
  "value": 27.33,
  "age": 26,
  "birthday": "2005-02-10T00:00:00.000Z",
  "city": "West Abigaleside",
  "married": true,
  "index": 7
}, {
  "label": "Enid Weber",
  "value": 18.72,
  "age": 17,
  "birthday": "1998-11-30T00:00:00.000Z",
  "city": "Zackton",
  "married": true,
  "index": 8
}, {
  "label": "Leatha O'Hara",
  "value": 17.68,
  "age": 42,
  "birthday": "2010-10-17T00:00:00.000Z",
  "city": "Lake Matilda",
  "married": false,
  "index": 9
}, {
  "label": "Korbin Steuber",
  "value": 16.35,
  "age": 39,
  "birthday": "1975-06-30T00:00:00.000Z",
  "city": "East Armandofort",
  "married": true,
  "index": 10
}, {
  "label": "Brennon Torphy",
  "value": 27.37,
  "age": 24,
  "birthday": "2003-10-21T00:00:00.000Z",
  "city": "Croninfort",
  "married": true,
  "index": 11
}, {
  "label": "Ms. Genoveva Bradtke",
  "value": 28.63,
  "age": 19,
  "birthday": "1983-01-10T00:00:00.000Z",
  "city": "Port Emanuel",
  "married": true,
  "index": 12
}, {
  "label": "Gregg Halvorson",
  "value": 15.45,
  "age": 15,
  "birthday": "2004-06-15T00:00:00.000Z",
  "city": "Lake Angelinastad",
  "married": false,
  "index": 13
}, {
  "label": "Mr. Sabina Schroeder III",
  "value": 24.27,
  "age": 26,
  "birthday": "1980-11-22T00:00:00.000Z",
  "city": "Toyview",
  "married": true,
  "index": 14
}, {
  "label": "Alanna Mitchell",
  "value": 29.25,
  "age": 37,
  "birthday": "1971-08-04T00:00:00.000Z",
  "city": "Lake Monserratmouth",
  "married": false,
  "index": 15
}, {
  "label": "Ronny Sanford",
  "value": 29.16,
  "age": 24,
  "birthday": "1994-11-24T00:00:00.000Z",
  "city": "New Claudhaven",
  "married": false,
  "index": 16
}, {
  "label": "Emmitt Pouros",
  "value": 27.95,
  "age": 14,
  "birthday": "1989-04-04T00:00:00.000Z",
  "city": "Moorefurt",
  "married": true,
  "index": 17
}, {
  "label": "Earl Purdy",
  "value": 18.34,
  "age": 38,
  "birthday": "2013-04-03T00:00:00.000Z",
  "city": "Lake Rowanberg",
  "married": true,
  "index": 18
}, {
  "label": "Cordelia Klocko",
  "value": 25.85,
  "age": 36,
  "birthday": "2011-01-17T00:00:00.000Z",
  "city": "Lakinchester",
  "married": true,
  "index": 19
}, {
  "label": "Guido Conroy",
  "value": 25.17,
  "age": 39,
  "birthday": "1977-04-20T00:00:00.000Z",
  "city": "Scarlettland",
  "married": true,
  "index": 20
}, {
  "label": "Miss Demond Weissnat V",
  "value": 21.44,
  "age": 19,
  "birthday": "2007-06-09T00:00:00.000Z",
  "city": "Savionberg",
  "married": false,
  "index": 21
}, {
  "label": "Easton Mante",
  "value": 20.61,
  "age": 43,
  "birthday": "2007-01-29T00:00:00.000Z",
  "city": "Kutchberg",
  "married": false,
  "index": 22
}, {
  "label": "Dayton Ebert",
  "value": 29.88,
  "age": 20,
  "birthday": "1978-04-27T00:00:00.000Z",
  "city": "West Wiley",
  "married": true,
  "index": 23
}]

var barData = [
  {
    "name": "Total Baseline",
    "values": [{"x":"Total Habitat Baseline","y":0.917354555440997},{"x":"Total Hydrology Baseline","y":0.251070214379195},{"x":"Total Water Quality Baseline","y":0.032061733370518}]
  }
];

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
    console.log(JSON.stringify(this.props.BarChartData_D3))
    return (
      <div className="ui segments">
        <div className="ui basic segment">
          <span key="1" >test</span>
            <Treemap
              data={chartData}
              width={500}
              height={200}
              fill={'#3182bd'}
              title="Treemap"
              textColor="#484848"
              fontColor="12px"
              hoverAnimation={true}
            />
            <BarChart
            data={this.props.BarChartData_D3}
            width={1000}
            height={300}
            title="Bar Chart"
            xAxisLabel="Value"
            yAxisLabel="Label"
            />
        </div>
      </div>
    );
  }
});

module.exports = ChartTest;
