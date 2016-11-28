var React = require('react');
var PropTypes = React.PropTypes;

//  general functions and  helpers.  reuse functions
import { get_HUC } from '../utils/helpers';

var MenuItemComponent = React.createClass({
  propTypes: {
    handleMenuClick: PropTypes.func.isRequired,
    getActive: PropTypes.func.isRequired,
    getFilter: PropTypes.func.isRequired,
    set_search_method: PropTypes.func.isRequired,
  },
  componentDidMount: function() {
    $('.ui.dropdown').dropdown();

    $('.ui.fluid.search.selection.dropdown .dropdown.icon').click( () => {
      this.props.set_search_method('menu')
    });
  },
  componentWillUpdate: function(nextProps, nextState) {
    $('.ui.dropdown').dropdown();

  },
  render: function() {

    $('#menu-placeholder-'+this.props.name.replace(' ','_')).remove();

    const HUC_desgination = get_HUC(this.props.name);

    //hacky jquery way but it works
    const geography_level_count = this.props.geography_levels ? this.props.geography_levels.length : 3
    const full_items_width = $('.geography_levels_holder').width()
    const three_width = (full_items_width/geography_level_count) <= 250 ? 250 : (full_items_width/geography_level_count) ;

    //change widths based on window width
    let select_width = three_width + "px"

    //render the menu selections for the list
    if (this.props.lists){
      var namesList = this.props.lists.map(function(listItem){
          return   <option key={listItem.VALUE} value={listItem.VALUE} style={{width:select_width}}>{listItem.MAIN}-({listItem.SUB})</option>
      }.bind(this))
    }


    return (
        <div className="stackable column" style={{width:select_width}}>
          <div className="ui form">
            <div className="field">
              <label>
                Choose a {this.props.name}  ({HUC_desgination})
              </label>
              <div className="ui input" onClick={this.props.handleMenuClick.bind(null, this.props.name)} style={{height: "50px"}}>
                <select className="ui fluid search selection dropdown" id={'search-select-'+this.props.name.replace(' ','_')} onChange={this.props.menuChange.bind(null, this.props.name)}   style={{width:select_width}}>
                  <option value="" style={{width:select_width}}>Choose a {this.props.name}  ({HUC_desgination})</option>
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
