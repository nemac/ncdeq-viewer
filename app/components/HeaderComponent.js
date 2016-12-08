var React = require('react');
var SectionWrapper = require('./SectionWrapper');

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
  getInitialState: function() {
    return {
      content: this.props.content
    };
  },
  componentDidMount: function() {
    $("#about").click(function () {
      $("#modal-about").modal('show');
    });
  },
  render: function() {


    return (
      <div className="ui items" style={{borderWidth:'1px', backgroundColor: "#092940", color: "#fff" ,padding:"10px", marginBottom: "0px", width: "100%"}}>
        <div className="item">
          <div className="left aligned content left floated" >

            <div className="ui middle aligned large header" style={{color: "#fff"}} >
              <a href="http://deq.nc.gov/" className="ui middle aligned image" style={{width: "225px",height:"auto",fontSize: "1rem",paddingLeft:SPACING,paddingRight:SPACING }}>
                <img src="./config/l_agency-ncdenr.svg"  />
              </a>
              River Basin Restoration Priorities Web Application
            </div>
            <div className="ui middle aligned right floated">
              <a  className="ui middle aligned right floated inverted button"  href="#/Resources/" >
                Resources
              </a>
              <button id="about" className="ui right floated inverted button"  >
                About
              </button>
              <a  className="ui right floated inverted button"  href="#/" >
                Map and Charts
              </a>
            </div>
            { this.props.header_description_visibility &&
              <div className="left floated description">
                <span style={{color: "#fff"}} >{ this.state.content}<br /><br /></span>
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
