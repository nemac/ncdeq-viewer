var React = require('react');
var PropTypes = React.PropTypes;

var Search = React.createClass({

  render: function() {
    return (
            <div className="ui fluid icon input">
              <input type="text" placeholder="Search..." />
              <i className="inverted circular search link icon"></i>
            </div>
    );
  }

});

module.exports = Search;
