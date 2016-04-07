var React = require('react');
var HeaderTitleContainer = require('../containers/HeaderTitleContainer');
var SectionWrapper = require('./SectionWrapper');

var PropTypes = React.PropTypes;

function HeaderComponent (props) {
  return(
    <SectionWrapper>
      <div className='header' >
        <HeaderTitleContainer  title='Explore a River Basin'/>
        <p>{props.content}</p>
      </div>
    </SectionWrapper>
  )
}

HeaderComponent.PropTypes = {
  content: PropTypes.string.isRequired
}


module.exports = HeaderComponent;
