var React = require('react');
var PropTypes = React.PropTypes;

var RowWrapper = React.createClass({
  render: function() {
    return (
      <div className="stretched row" style={{borderWidth:'1px',padding:this.props.rowPadding +'px'}} >
        <div className="sixteen wide column" style={{padding:this.props.rowPadding +'px',height:this.props.height+'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = RowWrapper;
