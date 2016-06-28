var React = require('react');
var HeaderTitleComponent = require('../components/HeaderTitleComponent');
var SectionWrapper = require('./SectionWrapper');

var HeaderComponent = require('../components/HeaderComponent')

var PropTypes = React.PropTypes;

var HeaderComponent = React.createClass({
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
      <SectionWrapper>
        <div className='header' >
          <HeaderTitleComponent  title='Explore a River Basin'/>
          <p>{this.state.content}</p>
        </div>
      </SectionWrapper>
    );
  }
});


module.exports = HeaderComponent;
