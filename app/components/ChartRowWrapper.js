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
  handle_chart_match_click: function(comp, new_matchid, e){
    //update the chart level
    this.props.update_ChartMatchId(new_matchid)

    return
  },
  handle_chart_level_click: function(comp, new_level, e){

    //update the chart level
    this.props.update_ChartLevels(new_level)

    return
  },
  render: function() {
    const charts_levels = this.props.charts.chart_levels.levels.features

    //limits for level
    let current_chart_level = charts_levels.filter( chart_level_features => {
      return chart_level_features.properties.chart_level === this.props.charts.current_level
    })

    //limits for chart match id
    //  not sure why && is not limiting...
    let current_chart_match = charts_levels.filter( chart_level_features => {
      return chart_level_features.properties.chart_matchid === this.props.charts.current_matchid
    })


    console.log(current_chart_match)

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

          <button className="ui black button" onClick={this.handle_chart_level_click.bind(null,this,3)}>
            Update chart levels
          </button>

          <button className="ui black button" onClick={this.handle_chart_match_click.bind(null,this,3)}>
            Update chart machid
          </button>

          <ChartBars key={this.props.title} chart_width={this.props.chart_width}
                                    chart_type={this.props.chart_type}
                                    chart_data={this.props.chart_data}
                                    chart_filter={this.props.chart_filter}
                                    get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
                                    change_geographyLevelActive={this.props.change_geographyLevelActive}
                                    set_search_method={this.props.set_search_method }
                                    tra_data={this.props.tra_data}
                                    get_tra_info={this.props.get_tra_info}
                                    charts={this.props.charts}
                                    getChart_FilteredByType={this.props.getChart_FilteredByType}/>
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
