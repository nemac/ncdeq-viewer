var React = require('react');
var PropTypes = React.PropTypes;

var MapRowWrapper = React.createClass({
  render: function() {
    return (
      <div className="row" style={{borderWidth:'1px',padding:this.props.rowPadding +'px'}} >
        <div className="ui two column padded grid" style={{padding:this.props.rowPadding +'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = MapRowWrapper;
