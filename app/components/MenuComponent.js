var React = require('react');
var MenuItemComponent = require('../containers/MenuItemContainer');

var PropTypes = React.PropTypes;


function MenuComponent (props) {


  return (

    <div className="ui pointing menu"  >
      <div className="header item">
        &nbsp;
      </div>



        { props.items &&
          props.items.map(function(item) {
            return (
              <MenuItemComponent key={item.name} name={item.name} lists={item.lists} activeValue={item.activeValue} getFilter={props.getFilter} getActive={props.getActive} handleMenuClick={props.handleMenuClick} menuChange={props.menuChange}/>
            )
          })
        }

        <a className="item" id="menu-placeholder-River_Basins" >
          <select className="ui search selection dropdown"   >
            <option value="">Choose a River Basins</option>
          </select>
        </a>
        <a className="item" id="menu-placeholder-Cataloging_Units" >
          <select className="ui search selection dropdown"  >
            <option value="">Choose a Cataloging Unit</option>
          </select>        </a>
        <a className="item" id="menu-placeholder-HUC12" >
          <select className="ui search selection dropdown"  >
            <option value="">Choose a HUC12</option>
          </select>
        </a>

      <div className="header item" >
        &nbsp;
      </div>
      <div className="left menu">
        <div className="item">
          <div className="ui transparent icon input">
            <input className="mapSearch" type="text" placeholder="Search to zoom..." onChange={props.handleSearchChange.bind(null,this)} />
            <i className="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

MenuComponent.PropTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  menuChange: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  getFilter: PropTypes.func.isRequired
}

module.exports = MenuComponent;
