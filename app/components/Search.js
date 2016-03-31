var React = require('react');
var PropTypes = React.PropTypes;

var Search = React.createClass({
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
            <div className="ui fluid icon input">
              <input type="text" placeholder={this.state.placeholder} />
              <i className="inverted circular search link icon"></i>
            </div>
    );
  }

});

module.exports = Search;
