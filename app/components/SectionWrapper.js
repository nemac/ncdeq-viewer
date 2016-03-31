var React = require('react');
var PropTypes = React.PropTypes;

function SectionWrapper (props){
  return(
    <div className="column">
      <div className="ui basic segment">
        {props.children}
      </div>
    </div>
  )
}

module.exports = SectionWrapper;
