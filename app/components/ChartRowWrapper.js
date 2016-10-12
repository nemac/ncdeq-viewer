var React = require('react');
var PropTypes = React.PropTypes;
var ChartBars = require('../components/ChartBars');

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
    // console.log(this.props.chart_data)

    return (
      <div className="item" style={{display: "block"}}>
        <div className="item" style={{display: "block", minHeight: "30px"}}>
          <i className="left floated dropdown icon"></i>
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <div className="meta">
            <span className="description">{this.props.title_description}</span>
            <span className="note">{this.props.note}</span>
          </div>
        </div>
        <div className="item" style={{display: "block"}}>
          <ChartBars key={this.props.title} chart_width={this.props.chart_width}
                                    chart_type={this.props.chart_type}
                                    chart_data={this.props.chart_data}
                                    chart_filter={this.props.chart_filter}
                                    get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
                                    change_geographyLevelActive={this.props.change_geographyLevelActive}
                                    set_search_method={this.props.set_search_method }/>
        </div>
        <div className="meta">
          <span className="description">{this.props.title_description}</span>
          <span className="note">{this.props.note}</span>
        </div>

      </div>
    );
  }
});

module.exports = ChartRowWrapper;
