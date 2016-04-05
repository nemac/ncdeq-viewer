var React = require('react');
var PropTypes = React.PropTypes;

var BreadCrumb = React.createClass({
  handleMenuClick: function(e) {
    console.log(e.target );
    e.target.className = 'active ' + e.target.className
  },
  render: function() {
    return (
      <div className="ui pointing menu" onClick={this.handleMenuClick} >
        <a className="item">
          River Basins
        </a>
        <a className="item">
          Cataloging Units
        </a>
        <a className="item">
          HUC
        </a>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BreadCrumb;
