var React = require('react');
var PropTypes = React.PropTypes;

var ChartRowWrapper = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  render: function() {
    return (
      <div className="ui segments">
        <div className="ui grey tertiary inverted clearing segment">
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <h4 className="ui right floated header">
            <i className="dropdown icon"></i>
          </h4>
        </div>
        <div className="ui basic segment">
          <span key="1" >{JSON.stringify(this.props.data)}</span>
          <span key="2" >{JSON.stringify(this.props.alldata)}</span>
          <p>Navigate to a Cataloging Unit to view chart data</p>
          <div refs={this.props.title} >
          </div>
          {/*
              add chartwrapper
                charts...
             */}
        </div>
      </div>
    );
  }
});

module.exports = ChartRowWrapper;
