var React = require('react');
var HeaderTitle = require('./HeaderTitle');
var SectionWrapper = require('./SectionWrapper');

var PropTypes = React.PropTypes;

function HeaderComponent (props) {
  return(
    <SectionWrapper>
      <div className='header' >
        <HeaderTitle  text='Explore a River Basin'/>
        <p>{props.content}</p>
      </div>
    </SectionWrapper>
  )
}

HeaderComponent.PropTypes = {
  content: PropTypes.string.isRequired
}


module.exports = HeaderComponent;
