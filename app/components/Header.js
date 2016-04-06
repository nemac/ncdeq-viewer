var React = require('react');
var HeaderTitle = require('./HeaderTitle');
var SectionWrapper = require('./SectionWrapper');

var PropTypes = React.PropTypes;

var Header = React.createClass({
  propTypes: {
    content: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      content:'Do Something on the map'
    };
  },
  getInitialState: function() {
    this.titleText = this.props.content;
    return {
      content: this.titleText
    };
  },
  render: function() {
    return (
          <SectionWrapper>
            <div className = 'header' >
              <HeaderTitle  text='Explore a River Basin'/>
              <p>{this.state.content}</p>
            </div>
          </SectionWrapper>
    );
  }

});

module.exports = Header;
