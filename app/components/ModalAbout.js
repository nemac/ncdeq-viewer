var React = require('react');
var PropTypes = React.PropTypes;

var ModalAbout = React.createClass({
  render: function() {
    return (
      <div className="ui modal" id="modal-about">
        <div className="actions" style={{backgroundColor: "#fff", "float": "right"}}>
          <div className="circular ui icon button floated right ok" style={{padding: "0", backgroundColor: "#fff"}}>
            <i className="remove circle outline icon red" style={{fontSize: "2rem"}}></i>
          </div>
        </div>
        <div className="header">
          About the River Basin Restoration Priorities Web Application
        </div>
        <div className="content">
          <div className="description">
            <p> NCDEQ-Division of Mitigation Services River Basin Restoration Priorities (RBRPs) are plans developed to identify priorities for
              the protection and enhancement of water quality, fisheries, wildlife habitat and recreational opportunities. DMS uses these priorities to guide its stream,
              wetland and riparian restoration and protection activities in the state’s 17 major river basins.
              The updated RBRP process identifies priorities as Targeted  Resource Areas(TRAs).
              TRAs are collections of clustered NHD+ catchments that receive priority for DMS planning and restoration project funds.
              Find out more at <a href="http://deq.nc.gov/"> http://deq.nc.gov/ </a></p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ModalAbout;
