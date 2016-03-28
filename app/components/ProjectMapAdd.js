var React = require('react');
var PropTypes = React.PropTypes;

var ProjectMapAdd = React.createClass({
  propTypes: {
    placeholder: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      placeholder:'Search...'
    };
  },
  getInitialState: function() {
    this.placeholder = this.props.placeholder;
    return {
      placeholder: this.placeholder
    };
  },
  render: function() {
    return (
      <div className="ui action input">
        <input type="text" placeholder={this.state.placeholder}/>
        <button className="ui icon button">
          <i className="add icon"></i>
        </button>
      </div>
    );
  }

});

module.exports = ProjectMapAdd;
