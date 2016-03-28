var React = require('react');
var PropTypes = React.PropTypes;
var BottomSectionTitle = require('./BottomSectionTitle');

var BottomSectionHeader = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  getInitialState: function() {
    this.titleText = this.props.text;
    return {
      title: this.titleText
    };
  },
  render: function() {
    return (
      <div className="ui clearing segment">
        <BottomSectionTitle text={this.state.title} />
        <h4 className="ui right floated header">
          <i className="dropdown icon"></i>
        </h4>
      </div>
    );
  }

});

module.exports = BottomSectionHeader;
