var React = require('react');
var BottomSectionHeader = require('./BottomSectionHeader');

var PropTypes = React.PropTypes;

var BottomSectionWrapper = React.createClass({
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
      <div className="column">
        <div className="ui raised padded segments">
          <BottomSectionHeader text={this.state.title}/>
          <div className="ui attached segment">
            <p>a bunch of charts</p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BottomSectionWrapper;
