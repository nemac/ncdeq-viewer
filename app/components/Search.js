var React = require('react');
var PropTypes = React.PropTypes;

var Search = React.createClass({

  render: function() {
    return (
      <div className="column">
        <div className="ui raised segment">
            <div className="ui fluid icon input">
              <input type="text" placeholder="Search..." />
              <i className="inverted circular search link icon"></i>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = Search;
