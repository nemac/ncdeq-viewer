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
  getInitialState: function() {
    return {
      title: this.props.title
    };
  },
  componentDidMount: function() {
    //console.log(this.props)
    //console.log('rowwrappercomponent')
    //v = this.props.getChartDataByID(this.props.current_id)
    //console.log(this.props.current_id)
  },
  render: function() {
    return (
      <div className="ui segments">
        <div className="ui grey tertiary inverted clearing segment">
          <h4 className="ui left floated header">
            {this.state.title}
          </h4>
          <h4 className="ui right floated header">
            <i className="dropdown icon"></i>
          </h4>
        </div>
        <div className="ui basic segment">
          <span key="1" >{JSON.stringify(this.props.data)}</span>
          <span key="2" >{JSON.stringify(this.props.alldata)}</span>
          <p>Navigate to a Cataloging Unit to view chart data</p>
          <div refs={this.state.title} >
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
