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
  handle_chart_level_click: function(comp, next_level, next_matchid, chart_type, e){


    console.log('button click')
    console.log(next_level, next_matchid, chart_type)

    //update the chart level
    this.props.update_ChartLevels(next_level, next_matchid, chart_type)

    return
  },
  // get the chart level for the current chart type, levels and matchid
  //    this will build a list of clickable buttons for drilldowns on charts.
  //    and make the charts data drivien. currently they are the chart categorys or keys are
  //    hard coded
  get_chart_levels: function(){

    //get constants from redux
    const charts_levels = this.props.charts.chart_levels.levels.features;
    const charts_limits = this.props.charts.chart_levels.chart_limits;
    const chart_type =  this.props.chart_type;

    //get a filtered array of the chart type limits
    const chart_type_limt = charts_limits.filter( item => {
      return item.chart_type.toUpperCase() === chart_type.toUpperCase();
    })

    //get the chart types limits to apply to the data
    const current_chart_level = (chart_type_limt[0] ? chart_type_limt[0].current_chart_level : 2)
    const current_chart_matchid = (chart_type_limt[0] ?  chart_type_limt[0].current_chart_matchid : 1)

    //return the filterd data should be an array of chart types that includes
    //  chart_level, chart_level_label, chart_matchid, and chart_type from the ArcGIS online api
    const chart_levels = charts_levels.filter( charts_levels_features => {
     return charts_levels_features.properties.chart_type.toUpperCase() === chart_type.toUpperCase() &&
              charts_levels_features.properties.chart_level === current_chart_level &&
              charts_levels_features.properties.chart_matchid === current_chart_matchid
   })

   if(chart_levels.length === 0){
     //return the filterd data should be an array of chart types that includes
     //  chart_level, chart_level_label, chart_matchid, and chart_type from the ArcGIS online api
     const chart_levels = charts_levels.filter( charts_levels_features => {
      return charts_levels_features.properties.chart_type.toUpperCase() === chart_type.toUpperCase() &&
               charts_levels_features.properties.chart_level === current_chart_level &&
               charts_levels_features.properties.chart_matchid === current_chart_matchid
    })
   }

   return chart_levels

  },
  get_chart_Previous: function(){


    //get constants from redux
    const charts_levels = this.props.charts.chart_levels.levels.features;
    const charts_limits = this.props.charts.chart_levels.chart_limits;
    const chart_type =  this.props.chart_type;

    //get a filtered array of the chart type limits
    const chart_type_limt = charts_limits.filter( item => {
      return item.chart_type.toUpperCase() === chart_type.toUpperCase();
    })

    //get the chart types limits to apply to the data
    const last_chart_level = (chart_type_limt[0] ? chart_type_limt[0].last_chart_level : 2)
    const last_chart_matchid = (chart_type_limt[0] ?  chart_type_limt[0].last_chart_matchid : 1)
    const last_chart_label = (chart_type_limt[0] ?  chart_type_limt[0].last_chart_label : "  ")
    const current_chart_level = (chart_type_limt[0] ? chart_type_limt[0].current_chart_level : null)
    const current_chart_matchid = (chart_type_limt[0] ?  chart_type_limt[0].current_chart_matchid : null)

    console.log('in get previous')
    console.log(last_chart_level, last_chart_matchid, last_chart_label, current_chart_level, current_chart_matchid )
    console.log('in get previous - actual chart_type_limt object value')
    console.log(chart_type_limt[0].last_chart_level)

    return {last_chart_level, last_chart_matchid, last_chart_label, current_chart_level, current_chart_matchid }
  },
  render: function() {

    //get the chart levels
    const chart_levels = this.get_chart_levels()
    const last_chart = this.get_chart_Previous()

    //do not render of nothing in last chart
    //  not sure why yet but something is coming back null and causing flicker in display
    // this will cause an error but for now it is stoping the flicker
    // if(!last_chart){
    //   return
    // }

    //check if at the charts top heirachy
    const at_top = (last_chart.current_chart_level === 2 && last_chart.current_chart_matchid === 1)

    const keyback = "back";
    // const backtext = ( at_top ? ' Top Category ' : "Back to " + last_chart.last_chart_label);
    const backtext = ( at_top ? ' Top Category ' : " Back ");
    const last_chart_level = last_chart.last_chart_level;
    const last_matchid = last_chart.last_chart_matchid;
    const last_chart_type  = this.props.chart_type;
    const key_back_class = ( at_top ? 'ui tiny black basic button' : 'ui tiny grey button' );

    console.log('last one')
    console.log(last_chart_level, last_matchid)

    const drilldown_note = 'Click a category'
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


          <div className="meta">
            <span className="note">{drilldown_note}</span>
          </div>

          <button className={key_back_class}
                  key={keyback}
                  onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, last_chart_type)} >
            {!at_top &&
                <i className ="left chevron icon"></i>
            }
            {backtext}
            {at_top &&
                <i className ="right chevron icon"></i>
            }
          </button>

          { chart_levels &&

            chart_levels.map(function(item) {
              const label = item.properties.chart_level_label;
              const next_chart_level = item.properties.chart_level+1;

              const next_matchid = item.properties.chart_id;
              const chart_type  = item.properties.chart_type;

              const colors = this.props.get_keyColors(label)
              const button_color = {"backgroundColor":  colors[1]}


              return (  <button className="ui tiny black button" key={label} style={button_color}
                                  onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type)} >
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
                                    ChartLevels={chart_levels}
                                    get_keyColors={this.props.get_keyColors}
                                    />
        </div>
        {/*
        <div className="meta">
          <span className="description">{this.props.title_description}</span>
          <span className="note">{this.props.note}</span>
        </div>
       */}
      </div>
    );
  }
});

module.exports = ChartRowWrapper;
