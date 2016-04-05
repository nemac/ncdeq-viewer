var React = require('react');
var PropTypes = React.PropTypes;
var ChartRowWrapper = require('./ChartRowWrapper');
var Divider = require('./Divider');

var ChartRow = React.createClass({

  render: function() {
    return (

      <div className="ui stackable centered grid">
        <div className="row" >

      <div className="sixteen wide grey tertiary column" >
            <h3 className="ui left floated  header">
              Charts
            </h3>
            <h3 className="ui right floated header">
              <i className="remove icon"></i>
            </h3>
        <div className="content"><p>Some descriptive text</p></div>
      </div>

      <Divider />

      <div className="fourteen wide column">
        <ChartRowWrapper title="HUC's" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper title="TRA's" />
      </div>

      <Divider columns="fourteen"/>

      <div className="fourteen wide column">
        <ChartRowWrapper title="TRA's" />
      </div>


    </div>
  </div>
    );
  }

});

module.exports = ChartRow;
