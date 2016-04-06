var React = require('react');
var PropTypes = React.PropTypes;

var RowWrapper = React.createClass({
  propTypes: {
    ref: PropTypes.string,
    height: PropTypes.number,
    rowPadding: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      ref:'Title',
      rowPadding: 1
    };
  },
  getInitialState: function() {
    return {
      ref: this.props.refText,
      height: this.props.height,
      rowPadding: this.props.rowPadding
    };
  },
  componentDidMount: function() {
    console.log('mount row wrapper')
  },
  render: function() {
    return (
      <div ref={this.state.ref}  className="stretched row" style={{borderWidth:'1px',padding:this.state.rowPadding +'px'}} >
        <div className="sixteen wide column" style={{padding:this.state.rowPadding +'px',height:this.state.height+'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = RowWrapper;
