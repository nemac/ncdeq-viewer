var React = require('react');
var SectionWrapper = require('./SectionWrapper');

var PropTypes = React.PropTypes;

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
      <div className="ui items" style={{borderWidth:'1px', backgroundColor: "#2b4559", color: "#fff" ,padding:"10px", marginBottom: "0px", width: "100%"}}>
        <div className="item">
          <div className="left aligned content">
            <div className="ui large header" style={{color: "#fff" }} >
              River Basin Restoration Priorities Web Application
            </div>
            { this.props.header_description_visibility &&
            <div className="description">
              <span style={{color: "#fff"}} >{ this.state.content}<br /><br /></span>
              <span style={{color: "#fff"}} >From North Carolina Department of Environmental Quality (NCDEQ) -Division of Mitigation Services</span>
            </div>
          }
            <div className="extra">
              <button className="ui right floated inverted button">
                Resources
              </button>
              <button id="about" className="ui right floated inverted button"  >
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = HeaderComponent;
