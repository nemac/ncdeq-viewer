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
  getInitialState: function() {
    return {
      title: this.props.title
    };
  },
  render: function() {
    return (
      <div className="ui segments">
        <div className="ui grey tertiary inverted clearing segment">
          <h4 className="ui left floated header">
            {this.state.title}
          </h4>
          <h4 className="ui right floated header">
            <i className="dropdown icon"></i>
          </h4>
        </div>
        <div className="ui basic segment">
          <p>Navigate to a Cataloging Unit to view chart data</p>
          <div refs={this.state.title} >

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
