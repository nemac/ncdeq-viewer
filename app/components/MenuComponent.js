var React = require('react');
var MenuItemComponent = require('../containers/MenuItemContainer');

var PropTypes = React.PropTypes;


function MenuComponent (props) {

  return (

    <div className="ui pointing menu"  >
      <div className="header item">
        &nbsp;
      </div>

        {props.items.map(function(item) {
            return (
              <MenuItemComponent key={item.name} name={item.name} activeValue={item.activeValue} getActive={props.getActive} handleMenuClick={props.handleMenuClick} />
            )
          })
        }


      <div className="header item" >
        &nbsp;
      </div>
      <div className="left menu">
        <div className="item">
          <div className="ui transparent icon input">
            <input type="text" placeholder="Search to zoom..." />
            <i className="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

MenuComponent.PropTypes = {
  handleMenuClick: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

module.exports = MenuComponent;
