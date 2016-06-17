var React = require('react');
var PropTypes = React.PropTypes;
import ChartRowWrapperContainer from '../containers/ChartRowWrapperContainer';

var Divider = require('./Divider');
// var agoHelpers = require('../utils/ago-helpers');

var ChartRow = React.createClass({
  // handleAPI: function(){
  //   agoHelpers.get_Basins()
  //     .then(function(basins){
  //       //console.log(basins)
  //     })
  // },
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
        <ChartRowWrapperContainer title="HUC's" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapperContainer title="TRA's" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapperContainer title="Compare" />
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
