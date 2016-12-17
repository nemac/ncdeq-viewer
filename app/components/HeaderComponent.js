var React = require('react');
var PropTypes = React.PropTypes;
import { TITLE } from '../constants/actionConstants';
import HelperComponent from '../components/HelperComponent'

import {
  SPACING,
} from '../constants/appConstants'

var HeaderComponent = React.createClass({

  getDefaultProps: function() {
    return {
      content:'Do Something on the map'
    };
  },
  get_title: function(){

    return TITLE ? TITLE : 'web app';
  },
  getInitialState: function() {
    return {
      title: 'web app'
    };
  },
  componentWillMount: function() {
    //get title form constants
    this.setState({
      title: this.get_title()
    })
  },
  componentWillReceiveProps: function(nextProps) {

    //get title form constants
    this.setState({
      title: this.get_title()
    })
  },
  componentDidMount: function() {
    $("#about").click(function () {
      $("#modal-about").modal('show');
    });
  },
  render: function() {


    const HeaderContent = "The purpose of this tool is to display the Division of Mitigation Services Targeted Resource Areas (TRAs) and " +
                    "identify watersheds where ecological and hydrological function can be improved.  " +
                    "TRAs identify clusters of areas where habitat, hydrology and/or water quality variables " +
                    "can be managed to improve watershed function. " +
                    "  To get started click a River Basin on the map, " +
                    "or search for a location to zoom to."
    return (

      <div className="row" >
        <div className="column" >
        <div className="ui equal width center aligned stackable fluid grid" style={{"backgroundColor": "#092940","color": "#fff"}}>
          <div className="three wide middle center aligned column" style={{padding:"0px"}}>
            <div className="ui basic segment">
                    <a href="http://deq.nc.gov/" className="ui medium image" >
                      <img src="config/l_agency-ncdenr.svg" className="ui fluid centered image" style={{"minWidth": "150px","maxWidth": "225px"}} />
                    </a>
            </div>
          </div>
          <div className="seven wide column" style={{padding:"0px"}}>
            <div className="ui basic segment">
              <h2>{this.state.title}
              </h2>
            </div>
          </div>
          <div className="middle aligned column" style={{"marginRight": "14px"}}>
              <div className="ui three column center aligned grid" style={{"paddingLeft": "0px,paddingRight: 14px"}}>

                <div className="sixteen wide column" style={{"paddingLeft": "0px,paddingRight: 14px"}} >
                  <div className="ui center aligned buttons" >
                    <a  className="ui inverted button"  href="#/Resources/" >
                      Resources
                    </a>
                    <button id="about" className="ui inverted button" >
                      About
                    </button>
                    <a  className="ui inverted button" href="#/" >
                      Map and Charts
                    </a>
                </div>
              </div>
            </div>
           </div>
           { this.props.header_description_visibility &&
            <div className="ui left aligned stackable padded grid">
              <div className="sixteen wide left aligned column">
              <p>The purpose of this tool is to display the Division of Mitigation Services Targeted Resource Areas (TRAs) and identify watersheds where ecological and hydrological function can be improved. TRAs identify clusters of areas where habitat, hydrology and/or water quality variables can be managed to improve watershed function. To get started click a River Basin on the map, or search for a location to zoom to.</p>
              <p>
              From North Carolina Department of Environmental Quality (NCDEQ) -Division of Mitigation Services
              </p>
            </div>
          </div>
          }
        </div>
        </div>
      </div>

    );
  }
});


module.exports = HeaderComponent;
