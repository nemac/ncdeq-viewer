var React = require('react');
var PropTypes = React.PropTypes;

var ChartRowWrapper = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  render: function() {
    const level_data = this.props.level_data.length > 0 ? JSON.stringify(this.props.level_data) : null;
    const id_data =  this.props.id_data.length > 0 ? JSON.stringify(this.props.id_data) : null;

    return (
      <div className="ui segments">
        <div className="ui grey tertiary inverted clearing segment">
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <h4 className="ui right floated header">
            <i className="dropdown icon"></i>
          </h4>
        </div>
        <div className="ui basic segment">
          {id_data}
          {level_data}
          <br />
          <br />
          <p>Navigate to a Cataloging Unit to view chart data</p>
          <div refs={this.props.title} >
          </div>
          {/*
              add chartwrapper
                charts...
             */}
        </div>
      </div>
    );
  }
});

module.exports = ChartRowWrapper;
