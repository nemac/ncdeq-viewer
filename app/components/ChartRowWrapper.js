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

  handle_chart_level_click: function(comp, next_level, next_matchid, e){

    //update the chart level
    this.props.update_ChartLevels(next_level, next_matchid)
    // this.props.update_ChartMatchId(next_matchid)

    console.log(next_level)
    console.log(next_matchid)


    return
  },
  // get the chart level for the current chart type, levels and matchid
  //    this will build a list of clickable buttons for drilldowns on charts.
  //    and make the charts data drivien. currently they are the chart categorys or keys are
  //    hard coded
  get_chart_levels: function(){

    //get constants from redux
    const charts_levels = this.props.charts.chart_levels.levels.features;
    const chart_type =  this.props.chart_type;
    const current_chart_level = this.props.charts.current_level;
    const current_chart_matchid = this.props.charts.current_matchid

    //return the filterd data should be an array of chart types that includes
    //  chart_level, chart_level_label, chart_matchid, and chart_type from the ArcGIS online api
    return charts_levels.filter( charts_levels_features => {
     return charts_levels_features.properties.chart_type.toUpperCase() === chart_type.toUpperCase() &&
              charts_levels_features.properties.chart_level === current_chart_level &&
              charts_levels_features.properties.chart_matchid === current_chart_matchid
   })
  },

  render: function() {

    //get the chart levels
    const chart_levels = this.get_chart_levels()

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

          { chart_levels &&
            chart_levels.map(function(item) {
              const label = item.properties.chart_level_label;
              const next_chart_level = item.properties.chart_level+1;
              const next_matchid = item.properties.chart_id;
              console.log(item)
              return (  <button className="ui black button" key={label}
                                  onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid)} >
                         {label}
                        </button>)


          }.bind(this))
        }
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
