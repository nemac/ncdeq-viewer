var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
var ChartTest = require('../components/ChartTest');

var Divider = require('./Divider');

var ChartRow = React.createClass({
  componentDidMount: function() {
  },
  render: function() {
    let vis = this.props.charts.chart_visibility ?  'show' : 'none';

    let id_json = "";
    let level_json = "";

    //ensure the objects exsists
    if ( this.props.charts ){
      if ( this.props.charts.chart_data.id_json ){
        if ( this.props.charts.chart_data.id_json.features ){
           id_json =this.props.charts.chart_data.id_json.features;
        }
      }
      if ( this.props.charts.chart_data.level_json ){
        if ( this.props.charts.chart_data.level_json.features ){
          level_json =this.props.charts.chart_data.level_json.features;
        }
      }
    }

    return (

      <div className="ui stackable centered grid" style={{display:vis}}>
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
            <div className="ui right floated compact grey inverted segment">
              <div className="meduim basic ui button" onClick={this.props.update_ChartVisiblity} >
                <i className="remove icon"></i>
              </div>
          </div>
        <div className="content"><p>Some descriptive text</p></div>
      </div>

      <Divider />

      <div className="fourteen wide column">
        <ChartRowWrapper key="HUCS" title="HUC's" id={this.props.current_id}  data="" alldata={level_json}  />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartTest key="TRA" title="TRA's" id="" data="" alldata="" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper  key="COMPARE"  title="Compare" id=""  data={id_json} alldata="" />
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
