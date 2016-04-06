var React = require('react');
var BreadCrumbItem = require('./BreadCrumbItem');

var PropTypes = React.PropTypes;

function BreadCrumb (props) {

  return (

    <div className="ui pointing menu"  >
      <div className="header item">
        &nbsp;
      </div>
      {props.items.map(function(item) {
        return (
            <BreadCrumbItem key={item.name} name={item.name} activeValue={item.activeValue} getActive={props.getActive} handleMenuClick={props.handleMenuClick} />
        );
      })}


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

BreadCrumb.PropTypes = {
  RiverBasinActive: PropTypes.bool.isRequired,
  CatalogingActive: PropTypes.bool.isRequired,
  HUCActive: PropTypes.bool.isRequired,
  handleMenuClick: PropTypes.func.isRequired,
  getActive: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

module.exports = BreadCrumb;
