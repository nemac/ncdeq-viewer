var React = require('react');
var PropTypes = React.PropTypes;

var ProjectMapAdd = React.createClass({

  render: function() {
    return (
      <div className="ui action input">
        <input type="text" placeholder="Search..."/>
        <button className="ui icon button">
          <i className="add icon"></i>
        </button>
      </div>
    );
  }

});

module.exports = ProjectMapAdd;
