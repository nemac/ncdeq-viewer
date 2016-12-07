var React = require('react');
var PropTypes = React.PropTypes;
var ChartBars = require('../components/ChartBars');

import {
  BOX_BORDER,
  SPACING,
  BACKGROUND_COLOR_FG,
  BOX_BORDER_RADUIS
} from '../constants/appConstants'

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

    return {last_chart_level, last_chart_matchid, last_chart_label, current_chart_level, current_chart_matchid }
  },
  check_next_level_valid: function(){
    //get constants from redux
    const charts_limits = this.props.charts.chart_levels.chart_limits;
    const chart_type =  this.props.chart_type;

    //get a filtered array of the chart type limits
    const chart_type_limt = charts_limits.filter( item => {
      return item.chart_type.toUpperCase() === chart_type.toUpperCase();
    })

    const is_valid = (chart_type_limt[0] ? chart_type_limt[0].is_next_level : true)

    return is_valid

  },
  sort_byid: function(chart_levels){

    //sort by chart id Setting up to count #of ids if more than one
    // we will make a selector and update the chart
    const sorted_levels = chart_levels.sort(function (a, b) {
      if (Number(a.properties.chart_id) > Number(b.properties.chart_id)) {
        return -1;
      }
      if (Number(a.properties.chart_id) < Number(b.properties.chart_id)) {
        return 1;
      }

      // a must be equal to b or must be a null value?
      return 0;
    });


    return sorted_levels;

  },
  check_dupes: function(chart_levels, chart_id){
    let has_dupes =  false;
    let count = 0;
    let last_id = 0
    chart_levels.map( item => {
      if(last_id === chart_id){
        count = count + 1;
        if(count > 1){
          has_dupes = true
        }
      }
      if(item.properties){
        last_id  = Number(item.properties.chart_id)
      } else {
        last_id  = Number(item.chart_id)
      }
    })
    return has_dupes
  },
  get_initial_dupe: function() {

    const chart_levels = this.get_chart_levels()
    const last_chart = this.get_chart_Previous()
    const is_next_valid = this.check_next_level_valid()
    const chart_type =  this.props.chart_type;
    const sort_id = this.sort_byid(chart_levels);

    const new_chart_levels = this.update_ChartLevels(sort_id)
    let keycnt=0

    const dup = new_chart_levels.map( item => {

      const has_dupes = this.check_dupes(new_chart_levels,item.chart_id)
      if(has_dupes){
        keycnt += 1
      } else {
        keycnt = 0
      }
      //set initial active function picker
      if(has_dupes && keycnt===1){
        this.set_initial(item.chart_level_label)
        const data = {chart_id:item.chart_id, active_name:item.chart_level_label, chart_type:this.props.chart_type}
        this.props.set_active_function(item.chart_id, item.chart_level_label, this.props.chart_type)
        return (data)
      }
    })

  },
  get_dupes: function(chart_levels, chart_id){
    let keycnt=0
    const chart_type = this.props.chart_type;
    const dup = chart_levels.map( item => {
      if(Number(item.chart_id) === Number(chart_id)){
        const colors = this.props.get_keyColors(item.chart_level_label)
        const button_color = {"backgroundColor": colors[1]+"!important"}
        return (
          <div  key={keycnt++} className={"item function " + chart_type.toUpperCase()} style={button_color}>
            <span className="text" onClick={this.handleChange.bind(null,item.chart_id,item.chart_level_label)}>{item.chart_level_label}</span>
          </div>)
      }
    })
    return dup
  },
  update_ChartLevels: function(chart_levels){
    let new_chart_levels = []
    chart_levels.map( item => {
      const has_dupes = this.check_dupes(chart_levels, Number(item.properties.chart_id));
      new_chart_levels.push({...item.properties,has_dupes})
    })
    return new_chart_levels
  },
  handleChange: function(chart_id, label, e){
    this.props.set_active_function(chart_id, label, this.props.chart_type)
  },
  componentDidMount: function() {
    const chart_type = this.props.chart_type;
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown({allowCategorySelection: true});
    // if(this.props.chart_type === 'tra'){
      this.get_initial_dupe()
    // }

  },

  componentDidUpdate: function(prevProps, prevState) {
    const chart_type = this.props.chart_type;
    let label =  $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('get text');
    let function_limits;

    if(label === ''){
        function_limits = this.props.active_function.filter( af => {
          return af.chart_type === chart_type
      })
      label = function_limits[0].active_name
    }

    const colors = this.props.get_keyColors(label)

    const csstext = 'background-color: ' + colors[1] + ' !important;padding: 0px !important;padding-left: 0px !important;padding-right: 30px !important;'

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).css("background-color",colors[1])
    $('.ui.tiny.disabled.right.labeled.icon.black.button.function.' + chart_type.toUpperCase()).css( "cssText", csstext )
    $('ui.tiny.black.right.labeled.icon.button.function.' + chart_type.toUpperCase()).css( "cssText", csstext )

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).css("color","#fff")
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).css("font-size",".85714286rem")

    $('.ui.tiny.disabled.right.labeled.icon.black.button.function.' + chart_type.toUpperCase()).css( "cssText", csstext  )
    $('.ui.tiny.black.right.labeled.icon.button.function.' + chart_type.toUpperCase()).css( "cssText", csstext )

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set text',label);
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set value',label);
  },
  set_initial: function(value){
    const chart_type = this.props.chart_type;

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set text',value);
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set value',value);
  },

  render: function() {

    //get the chart levels
    const chart_levels = this.get_chart_levels()
    const last_chart = this.get_chart_Previous()
    const is_next_valid = this.check_next_level_valid()
    const chart_type =  this.props.chart_type;
    const sort_id = this.sort_byid(chart_levels);

    const new_chart_levels = this.update_ChartLevels(sort_id)

    //check if at the charts top heirachy
    const at_top = (last_chart.current_chart_level === 2 && last_chart.current_chart_matchid === 1)

    //set up all messaging for drilldowns
    const keyback = "back";
    const backtext = ( at_top ? ' Function ' : " Back ");
    const last_chart_level = last_chart.last_chart_level;
    const last_matchid = last_chart.last_chart_matchid;
    const last_chart_type  = this.props.chart_type;
    const key_back_class = ( at_top ? 'ui tiny black basic button' : 'ui tiny grey button' );

    //return the chart and drill downs
    const drilldown_note = 'Click a function to drill down '

    //no next level text
    const no_next_level = "There is nothing else to drill into"
    //get the previous labels
    const previous_label = last_chart.last_chart_label.trim() === "" ?  "Total" : last_chart.last_chart_label;
    const ADJUSTED_TITLE_HEIGHT = window.innerWidth < 1260 ? "3.5em" : "3em";

    const space = (<span>&nbsp;</span>)

    let last_chart_id = 0
    let last_has_dupe = false

    let function_limits;
    if(this.props.active_function){
      function_limits = this.props.active_function.filter( af => {
        return af.chart_type === chart_type
      })
    }

    return (

        <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
          <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: ADJUSTED_TITLE_HEIGHT}}>
            <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
              <i className="dropdown left floated icon" style={{float:"left"}}></i>
              <span style={{float:"left"}}>{this.props.title} ({this.props.level_label})</span>
              <span style={{float:"left",fontSize:".75em!important",fontWeight: "500!important",color: "rgba(0,0,0,.6)"}}>
                <span className="description">{this.props.title_description}</span>
                <span className="note">{space}- {this.props.note}</span>
              </span>
            </div>
          </div>


          <div className="active content">
            <div className="meta">
              <span className="description">{this.props.title_description}</span>
            </div>

          <div className="description" style={{paddingLeft:"20px",width:this.props.chart_width}}>

          <div >
            <span className="note">
              {drilldown_note}
            </span>
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


            { new_chart_levels &&

              new_chart_levels.map(function(item) {
                const is_selector_done = Number(item.chart_id) === last_chart_id
                const has_dupes  = item.has_dupes;

                const label = item.chart_level_label;
                const next_chart_level = item.chart_level+1;

                const next_matchid = item.chart_id;
                const chart_type  = item.chart_type;
                const colors = this.props.get_keyColors(label)
                const button_color = {"backgroundColor":  colors[1]+"!important"}
                const button_color_pulldown = {"backgroundColor":  colors[1]+"!important","padding": "0px!important","paddingLeft": "0px!important","paddingRight":  "30px!important"}

                let button_class = is_next_valid ? "ui tiny black right labeled icon button" : "ui tiny disabled right labeled icon black button";
                let button_class_pulldown = is_next_valid ? "ui tiny black right labeled icon button function " + chart_type : "ui tiny disabled right labeled icon black button function " + chart_type;

                const start = (has_dupes && !last_has_dupe)

                last_chart_id = Number(item.chart_id)
                last_has_dupe = has_dupes
                let keycnta = 0
                let keycntb = 0

                if(start){
                  const testobj = this.get_dupes(new_chart_levels,item.chart_id);
                  return (


                    <button className={button_class_pulldown} key={label + '-' + keycntb++ } style={button_color_pulldown} >
                    <div key={label + '-' + keycnta++} className={"ui dropdown compact button function " + chart_type} style={{padding:"10px"}}>
                      <span className="text" key="start" ></span>
                        <i className="dropdown right floated icon"></i>
                      <div className="menu">
                        {testobj}
                      </div>
                    </div>
                    <i className="level down right floated icon" onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type)}></i>
                </button>
                  )
                }

                if(!has_dupes){
                  return (  <button className={button_class} key={label + '-' + keycntb++ } style={button_color}
                                      onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type)} >
                             {label}
                             <i className="level down icon"></i>
                            </button>)
                }

            }.bind(this))
          }

            <ChartBars key={this.props.title}
                        chart_width={this.props.chart_width}
                        chart_type={this.props.chart_type}
                        chart_data={this.props.chart_data}
                        chart_filter={this.props.chart_filter}
                        get_LayerInfo_ByValue={this.props.get_LayerInfo_ByValue}
                        get_LayerGeom_ByValue={this.props.get_LayerGeom_ByValue}
                        change_geographyLevelActive={this.props.change_geographyLevelActive}
                        set_search_method={this.props.set_search_method }
                        tra_data={this.props.tra_data}
                        get_tra_info={this.props.get_tra_info}
                        charts={this.props.charts}
                        ChartLevels={chart_levels}
                        get_keyColors={this.props.get_keyColors}
                        top_label={this.props.top_label}
                        bottom_label={this.props.bottom_label}
                        level_label={this.props.level_label}
                        function_limits={function_limits}
                                      />

          </div>
        </div>
      </div>

    );
  }
});

module.exports = ChartRowWrapper;
