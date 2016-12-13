var React = require('react');
var PropTypes = React.PropTypes;

import {
  SPACING,
} from '../constants/appConstants'

var HeaderComponent = React.createClass({

  getDefaultProps: function() {
    return {
      content:'Do Something on the map'
    };
  },
  get_title: function(constants){

    if(!constants){return 'web app'}

    const title_obj = constants.filter( constant => {
      return constant.name === 'TITLE'
    })

    return title_obj[0].value ? title_obj[0].value : 'web app';
  },
  getInitialState: function() {
    return {
      title: 'web app'
    };
  },
  componentWillReceiveProps: function(nextProps) {

    //get title form constants
    this.setState({
      title: this.get_title(nextProps.constants)
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
      <div className="ui centered align basic segment" style={{borderWidth:'1px', backgroundColor: "#092940", color: "#fff" ,padding:"10px", marginBottom: "0px", width: "100%"}}>
        <div className="item">
          <div className="ui content" >

            <div className="ui center aligned large header" style={{color: "#fff"}} >
              <a href="http://deq.nc.gov/" className="ui left floated image" style={{width: "225px",height:"auto",fontSize: "1rem",padding: "0 14px 0 14px"  }}>
                <img src="config/l_agency-ncdenr.svg"  />
              </a>
              <span style={{padding: "0 14px 0 14px"}} >{this.state.title}</span>
              <div className="ui right floated buttons" style={{padding: "0 14px 0 14px" }}>
                <a  className="ui inverted button"  href="#/Resources/" >
                  Resources
                </a>
                <button id="about" className="ui inverted button"  >
                  About
                </button>
                <a  className="ui inverted button"  href="#/" >
                  Map and Charts
                </a>
              </div>

            </div>

            { this.props.header_description_visibility &&
              <div className="ui left alingned basic segment" style={{paddingBottom:"0px"}}>
                <span style={{color: "#fff"}} >{ HeaderContent}<br /><br /></span>
                <span style={{color: "#fff"}} >From North Carolina Department of Environmental Quality (NCDEQ) -Division of Mitigation Services</span>
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
});


module.exports = HeaderComponent;
