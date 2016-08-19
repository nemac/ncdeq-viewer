var React = require('react');
var PropTypes = React.PropTypes;

var HeaderRowWrapper = React.createClass({
  render: function() {
    return (
      <div className="stretched row" style={{borderWidth:'1px',padding:this.props.rowPadding +'px', backgroundColor: "#2b4559", color: "#fff"}} >
        <div className="sixteen wide column" style={{padding:this.props.rowPadding +'px',height:this.props.height+'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = HeaderRowWrapper;
