var React = require('react');
var PropTypes = React.PropTypes;

var MenuItemComponent = React.createClass({
  propTypes: {
    handleMenuClick: PropTypes.func.isRequired,
    getActive: PropTypes.func.isRequired,
    getFilter: PropTypes.func.isRequired
  },
  componentDidMount: function() {
      $('.ui.dropdown').dropdown();
  },
  render: function() {

    var filterValue=''
    $('#menu-placeholder-'+this.props.name.replace(' ','_')).remove();
    if (this.props.lists){
      var namesList = this.props.lists.map(function(listItem){

        //get fiter value for current menu
        filterValue = this.props.getFilter(this.props.name)

        //get value of current item in the list and get the left most characters
        //should match length of filter value
        var value = listItem.VALUE ? listItem.VALUE :listItem.MAIN
        if(value){
          var checkedValue = value.toString().substring(0, filterValue.length)
        } else {
          var checkedValue = ''
        }

        //only render options if the match the filter
        if(filterValue === checkedValue ){
          return   <option key={listItem.VALUE} value={listItem.VALUE}>{listItem.MAIN}-({listItem.SUB})</option>
        }
      }.bind(this))
    }

    return (
      <a className={this.props.getActive(this.props.name)}  onClick={this.props.handleMenuClick.bind(null, this.props.name)} >

        <select className="ui search selection dropdown" id={'search-select-'+this.props.name.replace(' ','_')} onChange={this.props.menuChange} >
          <option value="">Choose a {this.props.name}</option>
          {namesList}
        </select>
      </a>
    )
  }

});

MenuItemComponent.contextTypes = {
  store: React.PropTypes.object.isRequired
};


module.exports = MenuItemComponent;
