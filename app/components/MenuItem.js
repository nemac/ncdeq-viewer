var React = require('react');
var PropTypes = React.PropTypes;

function MenuItem (props) {
  return (
    <a className={props.getActive(props.activeValue)}  onClick={props.handleMenuClick.bind(null, props.activeValue)} >
      {props.name}
    </a>
  )
}

MenuItem.PropTypes = {
  handleMenuClick: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  activeValue: PropTypes.string.isRequired
}

module.exports = MenuItem;
