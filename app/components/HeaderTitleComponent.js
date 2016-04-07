var React = require('react');
var PropTypes = React.PropTypes;

function HeaderTitle (props) {
  return (
    <h2 className="ui header">{props.title}</h2>
  )
}

HeaderTitle.PropTypes = {
  title: PropTypes.string.isRequired
}

module.exports = HeaderTitle;
