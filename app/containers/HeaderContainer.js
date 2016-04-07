var React = require('react');
var HeaderComponent = require('../components/HeaderComponent')
var SectionWrapper = require('../components/SectionWrapper');

var PropTypes = React.PropTypes;

var HeaderContainer = React.createClass({
  getDefaultProps: function() {
    return {
      content:'Do Something on the map'
    };
  },
  getInitialState: function() {
    return {
      content: this.props.content
    };
  },
  render: function() {
    return (
      <HeaderComponent content={this.state.content} />
    );
  }
});

module.exports = HeaderContainer;
