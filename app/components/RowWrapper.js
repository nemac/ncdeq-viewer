var React = require('react');
var PropTypes = React.PropTypes;

var RowWrapper = React.createClass({
  propTypes: {
    ref: PropTypes.string,
    height: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      ref:'Title'
    };
  },
  getInitialState: function() {
    return {
      ref: this.props.refText,
      height: this.props.height
    };
  },
  componentDidMount: function() {
    console.log('mount row wrapper')
  },
  render: function() {
    return (
      <div ref={this.state.ref}  className="stretched row" style={{padding:'1px'}} >
        <div className="sixteen wide column" style={{padding:'1px',height:this.state.height+'px'}} >
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = RowWrapper;
