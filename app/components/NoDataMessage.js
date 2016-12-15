var React = require('react');
var PropTypes = React.PropTypes;

var NoDataMessage = React.createClass({

  render: function() {
    return (
      <div className='ui icon negative message' >
        <i className="remove circle icon"></i>
        <div className="content">
          <div className="header">
            {this.props.note}
          </div>
          {this.props.sub_header}
        </div>
      </div>
    );
  }

})

module.exports = NoDataMessage;
