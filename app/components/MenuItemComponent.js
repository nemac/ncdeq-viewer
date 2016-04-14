var React = require('react');
var PropTypes = React.PropTypes;


function MenuItemComponent (props) {
  if (props.lists){
     console.log(props.lists)
     var namesList = props.lists.map(function(listItem){
                             return <div className="item" key={listItem.name}>{listItem.name}</div>;
                           })
  }

  return (
    <a className={props.getActive(props.name)}  onClick={props.handleMenuClick.bind(null, props.name)} >
      {/* {props.name} */}
      <div className="ui floating dropdown labeled search icon button">
        {/* <i className="world icon"></i> */}
        <span className="text">Choose a {props.name}</span>
        <div className="menu">
          {namesList}
        </div>
      </div>

    </a>
  )
}

MenuItemComponent.PropTypes = {
  handleMenuClick: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  lists: PropTypes.object.isRequired,
  activeValue: PropTypes.string.isRequired
}

module.exports = MenuItemComponent;
