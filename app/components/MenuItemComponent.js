var React = require('react');
var PropTypes = React.PropTypes;

function MenuItemComponent (props) {
  return (
    <a className={props.getActive(props.name)}  onClick={props.handleMenuClick.bind(null, props.name)} >
      {props.name}
    </a>
  )
}

MenuItemComponent.PropTypes = {
  handleMenuClick: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  activeValue: PropTypes.string.isRequired
}

module.exports = MenuItemComponent;
