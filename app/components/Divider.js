var React = require('react');
var PropTypes = React.PropTypes;

var Divider = React.createClass({
  propTypes: {
    columns: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      columns:'sixteen wide column'
    };
  },
  getInitialState: function() {
    return {
      columns: this.props.columns + ' wide column'
    };
  },
  render: function() {
    return (
      <div className={this.state.columns}>
        <div className="ui divider"></div>
      </div>
    );
  }

});

module.exports = Divider;
