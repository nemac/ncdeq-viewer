var React = require('react');
var PropTypes = React.PropTypes;


function MenuItemComponent (props) {
  if (props.lists){
     var namesList = props.lists.map(function(listItem){

                            //get fiter value for current menu
                            var filterValue = props.getFilter(props.name)

                            //get value of current item in the list and get the left most characters
                            //should match length of filter value
                            var value = listItem.value ? listItem.value :listItem.main
                            var checkedValue = value.toString().substring(0, filterValue.length)

                            //only render options if the match the filter
                            if(filterValue === checkedValue ){
                             return   <option key={listItem.value} value={listItem.value}>{listItem.main}-({listItem.sub})</option>
                            }
                           })
  }

return (
  <a className={props.getActive(props.name)}  onClick={props.handleMenuClick.bind(null, props.name)} >

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
  activeValue: PropTypes.string.isRequired,
  getFilter: PropTypes.func.isRequired
}

module.exports = MenuItemComponent;
