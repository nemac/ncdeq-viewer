var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapper from '../components/ChartRowWrapper';
//ChartRowContainer
var Divider = require('./Divider');

var ChartRow = React.createClass({
  componentDidMount: function() {
    console.log('chart row did mount');
    console.log(this.props.theChartDataByID.features);

  },

  render: function() {
    var vis = this.props.isChartsVisible ?  'show' : 'none';
    return (

      <div className="ui stackable centered grid" style={{display:vis}}>
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
            <div className="ui right floated compact grey inverted segment">
              <div className="meduim basic ui button" onClick={this.props.handleChartToggle} >
                <i className="remove icon"></i>
              </div>
          </div>
        <div className="content"><p>Some descriptive text</p></div>
      </div>


      <Divider />

      <div className="fourteen wide column">
        <ChartRowWrapper key="HUCS" title="HUC's" id={this.props.current_id}  data=""  />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper key="TRA" title="TRA's" id="" data=""/>
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper  key="COMPARE"  title="Compare" id=""  data={this.props.theChartDataByID.features}/>
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
