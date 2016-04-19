var React = require('react');
var PropTypes = React.PropTypes;


function MenuItemComponent (props) {
  if (props.lists){
     var namesList = props.lists.map(function(listItem){
                              //add check for listitem in case of river basins we need to make value of sub or add this to data.js?
                             return   <option key={listItem.main} value={listItem.value ? listItem.value :listItem.main}>{listItem.main}-({listItem.sub})</option>
                           })
  }

//<div className="item" key={listItem.main}>{listItem.main}<span className="">-({listItem.sub})</span></div>;

  return (
    <a className={props.getActive(props.name)}  onClick={props.handleMenuClick.bind(null, props.name)} >
{/*
      <div  className="ui floating dropdown labeled search icon button" onClick={props.menuChange}>
      <i className="world icon"></i>
        <span className="text">Choose a {props.name}</span>
        <div className="menu">
          {namesList}
        </div>
      </div>
*/}
<select className="ui search selection dropdown" id="search-select" onChange={props.menuChange} >
  <option value="">Choose a {props.name}</option>
  {namesList}
</select>
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
