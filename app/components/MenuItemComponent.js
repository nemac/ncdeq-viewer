var React = require('react');
var PropTypes = React.PropTypes;

//  general functions and  helpers.  reuse functions
import { get_HUC } from '../utils/helpers';

var MenuItemComponent = React.createClass({
  propTypes: {
    handleMenuClick: PropTypes.func.isRequired,
    getActive: PropTypes.func.isRequired,
    getFilter: PropTypes.func.isRequired
  },
  componentDidMount: function() {
      $('.ui.dropdown').dropdown();
  },
  divider: function(){
    return (<div className="ui vertical divider">then</div>);
  },
  render: function() {

    $('#menu-placeholder-'+this.props.name.replace(' ','_')).remove();

    //render the menu selections for the list
    if (this.props.lists){
      var namesList = this.props.lists.map(function(listItem){
          return   <option key={listItem.VALUE} value={listItem.VALUE}>{listItem.MAIN}-({listItem.SUB})</option>
      }.bind(this))
    }

    const HUC_desgination = get_HUC(this.props.name);

    return (
        <div className="stackable column" style={{width:"350px"}}>
          <div className="ui form">
            <div className="field">
              <label>
                Choose a {this.props.name}  ({HUC_desgination})
              </label>
              <div className="ui input" onClick={this.props.handleMenuClick.bind(null, this.props.name)} >
                <select className="ui fluid search selection dropdown" id={'search-select-'+this.props.name.replace(' ','_')} onChange={this.props.menuChange}   >
                  <option value="">Choose a {this.props.name}  ({HUC_desgination})</option>
                  {namesList}
                </select>
              </div>
            </div>
          </div>
        </div>

    )
  }

});

module.exports = MenuItemComponent;
