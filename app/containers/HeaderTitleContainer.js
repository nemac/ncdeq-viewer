var React = require('react');
var HeaderTitleComponent = require('../components/HeaderTitleComponent')
var PropTypes = React.PropTypes;

var HeaderTitleContainer = React.createClass({
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
      <HeaderTitleComponent title={this.state.title} />
    );
  }

});

module.exports = HeaderTitleContainer;
