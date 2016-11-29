var React = require('react');
var HeaderComponent = require('../components/HeaderComponent');

var PropTypes = React.PropTypes;

import {HEADER_HEIGHT ,
  BREAD_CRUMBS_HEIGHT,
  HEADER_DESCRIPTION_VISIBILITY,
  ROW_PADDING,
  DEF_PAD,
  MAP_HEIGHT,
  CHART_HEIGHT,
  CHART_VISIBILITY,
  MAX_SEARCH_ZOOM,
  MAP_FULL_WIDTH,
  MAP_CHART_WIDTH
} from '../constants/appConstants'

var ResourcesComponent = React.createClass({



  render: function() {

    //get sizes from props and check if the prop has been set.
    //  putting to const's so we can account for undefined props on first render...
    let is_chart_vis = true

    if(this.props.charts.chart_visibility === undefined){
      is_chart_vis = true
    } else {
      is_chart_vis = this.props.charts.chart_visibility
    }

    const header_description_visibility =  this.props.default_settings ? this.props.default_settings.header_description_visibility : HEADER_DESCRIPTION_VISIBILITY;
    const rowPadding = this.props.default_settings ? this.props.default_settings.rowPadding : ROW_PADDING;

    const HeaderContent = "The purpose of this tool is to display the Division of Mitigation Services Targeted Resource Areas (TRAs) and " +
                    "identify watersheds where ecological and hydrological function can be improved.  " +
                    "TRAs identify clusters of areas where habitat, hydrology and/or water quality variables " +
                    "can be managed to improve watershed function. " +
                    "  To get started click a River Basin on the map, " +
                    "or search for a location to zoom to."

    const columnWidth = is_chart_vis ? MAP_CHART_WIDTH : MAP_FULL_WIDTH;

    return (
      <div className="ui stackable one column padded grid">

        <HeaderComponent content={HeaderContent}  header_description_visibility={header_description_visibility} />
          <div className="ui stackable internally celled sixteen wide column grid">
            <div className="stretched row" >

              <div className="row" style={{borderWidth:'1px',padding:rowPadding +'px'}} >
                <div className="ui sixteen column padded grid" style={{padding:rowPadding +'px'}} >
                  test content
                </div>
              </div>

            </div>

          </div>

      </div>
    );
  }

});

module.exports = ResourcesComponent;
