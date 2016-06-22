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

    $('#menu-placeholder-'+this.props.name.replace(' ','_')).remove();

    //render the menu selections for the list
    if (this.props.lists){
      var namesList = this.props.lists.map(function(listItem){
          return   <option key={listItem.VALUE} value={listItem.VALUE}>{listItem.MAIN}-({listItem.SUB})</option>
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

module.exports = MenuItemComponent;
