var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  render: function() {
    return (
      <div className="column">
          <div className="ui raised padded segment">
            <h2 className="ui header">Explore a River Basin</h2>
            <p>To get started click a River Basin on the map, or search for a location.</p>
              {/*
                bread crumb wrapper - breadcrumbs
              */}
          </div>
        </div>
    );
  }

});

module.exports = Header;
