var React = require('react');
var PropTypes = React.PropTypes;

var RowWrapper = React.createClass({
  propTypes: {
    height: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      rowPadding: 1
    };
  },
  getInitialState: function() {
    return {
      height: this.props.height,
      rowPadding: this.props.rowPadding
    };
  },
  componentDidMount: function() {
    //not sure yet
  },
  render: function() {
    return (
      <div className="stretched row" style={{borderWidth:'1px',padding:this.state.rowPadding +'px'}} >
        <div className="sixteen wide column" style={{padding:this.state.rowPadding +'px',height:this.state.height+'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = RowWrapper;
