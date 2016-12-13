var React = require('react');
var PropTypes = React.PropTypes;
var ChartBars = require('../components/ChartBars');

import {
  BOX_BORDER,
  SPACING,
  BACKGROUND_COLOR_FG,
  BOX_BORDER_RADUIS
} from '../constants/appConstants'

import { getFriendlyName_NextLevel } from '../utils/helpers'

var ChartRowWrapper = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  handle_chart_level_click: function(comp, next_level, next_matchid, chart_type, direction, chart_id, e){

    const chart_buttons = this.state.chart_buttons;
    const chart_bread_crumbs = this.state.chart_bread_crumbs ? this.state.chart_bread_crumbs: [];

    let new_array
    //add state for direction then in render look for direction state and flip the button click

    this.setState({
      direction: direction === "crumb" ? "up" : direction
    })

    const current_function = this.get_current_function(chart_buttons,chart_id)
    const previous_functions = this.get_previous_function(chart_buttons,chart_id)
    const last_function = this.get_last_function(chart_buttons,next_matchid)

     switch (direction) {
      case 'up':
        //update the chart level
        this.props.update_ChartLevels(next_level, next_matchid, chart_type)

        if(previous_functions.length > 1){
          new_array = chart_bread_crumbs.filter(item => {
            previous_functions.map( function_item => {
              return item != function_item.properties.chart_level_label
            });
          })
        } else {
          new_array = chart_bread_crumbs.filter(item => {
          	return item != previous_functions[0].properties.chart_level_label
          });
        }
        break;
      case 'down':
          //update the chart level
          this.props.update_ChartLevels(next_level, next_matchid, chart_type)

          new_array = [...chart_bread_crumbs,last_function]
        break;
      case 'crumb':



        if(current_function.length > 1){
          new_array = chart_bread_crumbs.filter(item => {
            current_function.map( function_item => {
              return item != function_item.properties.chart_level_label
            });
          })
        } else {
          new_array = current_function.filter(item => {
          	return item != current_function[0].properties.chart_level_label
          });
        }
        new_array = [...chart_bread_crumbs]
        this.get_all_previous_function(chart_buttons,chart_id)
        // console.log(current_function)
        // console.log(previous_functions)
        //
        //
        // console.log(current_function[0].properties.chart_level, current_function[0].properties.chart_id,current_function[0].properties.chart_type)

        // this.props.update_ChartLevels(next_level, chart_id, chart_type)
        // //update the chart level
        // if(current_function){
        //   this.props.update_ChartLevels(current_function[0].properties.chart_level+1, current_function[0].properties.chart_matchid,current_function[0].properties.chart_type)
        // } else {
        //   //update the chart level
        //   // this.props.update_ChartLevels(next_level, chart_id, chart_type)
        // }

        break;
      default:
        new_array = [...chart_bread_crumbs]
        break;
    }

    const at_top = (next_level === 2 && next_matchid === 1)

    if(at_top){
      new_array = []
    }

    this.setState({
      chart_bread_crumbs: new_array
    })

    // this.get_chart_level_()
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
        const button_color = {"backgroundColor": colors[1]+"!important","color": "rgba(0,0,0,.6)"}
        return (
          <div  key={keycnt++} className={"item function " + chart_type.toUpperCase()} style={button_color}>
            <span className="text" onClick={this.handleChange.bind(null,item.chart_id,item.chart_level_label)} style={{"color":"rgba(0,0,0,.6)"}}>{item.chart_level_label}</span>
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
    $('.level.down.icon').popup();
    this.get_initial_dupe()

    $('.level.down.icon')
      .popup({
        position : 'top center',
        content  : 'Drill Down into function'
      })

    $('.level.up.flipped.icon')
      .popup({
        position : 'top center',
        content  : 'Drill up into function'
      })
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

    $('.level.down.icon')
      .popup({
        position : 'top center',
        content  : 'Drill Down into function'
      })

    $('.level.up.flipped.icon')
      .popup({
        position : 'top center',
        content  : 'Drill up into function'
      })

    const colors = this.props.get_keyColors(label)

    const csstext = '"background-color": "' + colors[1]+ '"!important","margin":"0px!important","height":"36px","color":"rgba(0,0,0,.6)"'

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).css("background-color",colors[1])
    $('.ui.left.item.dropdown.level.function.' + chart_type.toUpperCase()).css("background-color",colors[0])

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set text',label);
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set value',label);
  },
  set_initial: function(value){
    const chart_type = this.props.chart_type;

    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set text',value);
    $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('set value',value);
  },
  componentWillMount: function() {
    const chart_type =  this.props.chart_type;
    const chart_buttons_all = this.props.chart_buttons;
    if(chart_buttons_all){

      const chart_buttons = chart_buttons_all.features.filter( button => {
        return button.properties.chart_type.toUpperCase() === chart_type.toUpperCase()
      })

      this.setState({
        chart_buttons
      })
      return
    }

    this.setState({
      chart_buttons: null
    })


  },
  get_chart_level_(chart_buttons, chart_id){
    if(chart_buttons){
      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_matchid === chart_id
      })

      return buttons.length > 0 ? buttons[0].properties.chart_level : null
    }
    return null

  },
  is_next_valid(chart_buttons, chart_id){
    if(chart_buttons){
      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_matchid === chart_id
      })

      return (buttons.length > 0)
    }
    return false

  },
  get_last_id(chart_buttons, chart_matchid){
    if(chart_buttons){
      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_matchid
      })
      return buttons.length > 0 ? buttons[0].properties.chart_matchid : null

    }
    return null
  },
  get_last_function(chart_buttons, chart_matchid){
    const chart_type =  this.props.chart_type;

    if(chart_buttons){
      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_matchid
      })

      let label = ''
      if(buttons.length > 1){
        label = $('.ui.dropdown.button.function.' + chart_type.toUpperCase()).dropdown('get text');
      } else {
        label = buttons[0].properties.chart_level_label
      }
      return buttons.length > 0 ? label : null

    }
    return null
  },
  get_current_function(chart_buttons, chart_id){

    const chart_type =  this.props.chart_type;

    if(chart_buttons){

      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_id
      })

      return buttons.length > 0 ? buttons : null

    }
    return null
  },
  get_current_function(chart_buttons, chart_id){

    const chart_type =  this.props.chart_type;

    if(chart_buttons){

      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_id
      })

      return buttons.length > 0 ? buttons : null

    }
    return null
  },
  is_at_top: function(chart_buttons, chart_id){

    const chart_type =  this.props.chart_type;

    if(chart_buttons){

      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_id
      })

      return buttons[0].properties.chart_level === 2 && buttons[0].properties.chart_matchid == 1
    }
    return false
  },
  get_previous_function(chart_buttons, chart_id){

    const chart_type =  this.props.chart_type;

    if(chart_buttons){

      const buttons_cur = chart_buttons.filter( button => {
        return button.properties.chart_id === chart_id
      })

      const match_id = buttons_cur.length > 0 ? buttons_cur[0].properties.chart_matchid : null

      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_id === match_id
      })

      return buttons.length > 0 ? buttons : null

    }
    return null
  },
  get_next_function(chart_buttons, chart_id){
    if(chart_buttons){

      const buttons = chart_buttons.filter( button => {
        return button.properties.chart_matchid === chart_id
      })

      return buttons.length > 0 ? buttons : null
    }
    return false

  },
  get_all_previous_function(chart_buttons, chart_id){

    const chart_type =  this.props.chart_type;

    if(chart_buttons){

      let is_next_valid = this.is_next_valid(chart_buttons, chart_id)
      const buttons = this.get_current_function(chart_buttons, chart_id)
      console.log(buttons[0].properties.chart_level_label)
      console.log(buttons[0].properties.chart_matchid)
      console.log(buttons[0].properties.chart_id)

      console.log(is_next_valid)

      while(is_next_valid){
        const buttons = this.get_next_function(chart_buttons, chart_id)
        console.log(buttons[0].properties.chart_level_label)
        console.log(buttons[0].properties.chart_matchid)
        console.log(buttons[0].properties.chart_id)

        is_next_valid = this.is_next_valid(chart_buttons, buttons[0].properties.chart_id)
        console.log(at_top)

      }
      // const buttons_cur = chart_buttons.filter( button => {
      //   return button.properties.chart_id === chart_id
      // })
      //
      // const match_id = buttons_cur.length > 0 ? buttons_cur[0].properties.chart_matchid : null
      //
      // const buttons = chart_buttons.filter( button => {
      //   return button.properties.chart_id === match_id
      // })
      //
      //
      // return buttons.length > 0 ? buttons : null

    }
    return null
  },
  get_ids_from_label: function(label){
    const chart_buttons = this.state.chart_buttons;

    if(chart_buttons){

      const buttons_cur = chart_buttons.filter( button => {
        return button.properties.chart_level_label === label
      })

      const match_id = buttons_cur.length > 0 ? buttons_cur[0].properties.chart_matchid : null
      const chart_id = buttons_cur.length > 0 ? buttons_cur[0].properties.chart_id : null
      return [chart_id, match_id]
    }
    return null;

  },
  get_breadcrumbs: function(breadcrumbs){
    const chart_type =  this.props.chart_type;

    if(breadcrumbs){
      let count = 0
      return breadcrumbs.map( breadcrumb => {
        count = count + 1;
        const colors = this.props.get_keyColors(breadcrumb)
        let message = (<span/>)
        if(count === 1){message = (<span className="ui item" style={{"color": "rgba(0,0,0,.6)"}} >current drill down:</span>)}
        const ids = this.get_ids_from_label(breadcrumb)
        // onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, last_chart_type, "up", item.chart_id)} >

        return (
          <span className="ui item"
            key={'breadcrumbs-'+count++}
            style={{"backgroundColor":colors[1],"color":"rgba(0,0,0,.5)","fontWeight":"500","padding":"7px","cursor":"pointer"}}
            onClick={this.handle_chart_level_click.bind(null, this, count+1, ids[1], chart_type, "crumb", ids[0])}>
            {breadcrumb}-{count+1}-{ids[1]}-{ids[0]}
          </span>
          )
      })
    }
  },
  render: function() {
    const chart_type =  this.props.chart_type;
    const chart_buttons = this.state.chart_buttons;

    //get the chart levels
    const chart_levels = this.get_chart_levels()
    const last_chart = this.get_chart_Previous()
    // const is_next_valid = this.check_next_level_valid()
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
    let direction = this.state.direction ? this.state.direction : "down";
    direction = at_top ? "down" : direction
    // const breadcrumbs = this.state.chart_bread_crumbs ? this.state.chart_bread_crumbs.toString() : [];

    const breadcrumbs_obj = this.get_breadcrumbs (this.state.chart_bread_crumbs)

    let function_limits;
    if(this.props.active_function){
      function_limits = this.props.active_function.filter( af => {
        return af.chart_type === chart_type
      })
    }
    const level_label = getFriendlyName_NextLevel(this.props.level_label)

    return (

        <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
          <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: ADJUSTED_TITLE_HEIGHT}}>
            <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
              <i className="dropdown left floated icon" style={{float:"left"}}></i>
              <span style={{float:"left"}}>{this.props.title} ({level_label})</span>
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

            <div className="ui bottom attached basic compact left aligned segment" style={{ border: "0px",margin: "0px",padding: "7px"}}>
              <h5 className="ui header">
                {drilldown_note}
              </h5>
            </div>

            <div className="ui bottom attached basic compact left aligned segment" style={{ border: "0px",margin: "0px",padding: "0px"}}>
              <div className="ui text stackable mini menu" style={{"cursor":"pointer"}}>

                <div className="ui item" key="bc">
                  {breadcrumbs_obj}{space}
                </div>

               { new_chart_levels &&

                 new_chart_levels.map(function(item) {
                   const is_selector_done = Number(item.chart_id) === last_chart_id
                   const has_dupes  = item.has_dupes;

                   const label = item.chart_level_label;
                   const next_chart_level = item.chart_level+1;

                   const next_matchid = item.chart_id;
                   const chart_type  = item.chart_type;
                   const colors = this.props.get_keyColors(label)


                   const button_color =  {"backgroundColor":  colors[1],"margin":"0px!important","height":"36px","color":"rgba(0,0,0,.5)","fontWeight":"700","minWidth":"100px!important","maxWidth":"350px!important"}
                   const button_color_icon =  {"backgroundColor":  colors[0],"margin":"0px!important","height":"36px","width":"36px!important","color":"rgba(0,0,0,.6)","borderBottomRightRadius": BOX_BORDER_RADUIS,"borderTopRightRadius": BOX_BORDER_RADUIS}
                   const button_color_left_icon =  {"backgroundColor":  colors[0],"margin":"0px!important","height":"36px","width":"36px!important","color":"rgba(0,0,0,.6)","borderBottomLeftRadius": BOX_BORDER_RADUIS,"borderTopLeftRadius": BOX_BORDER_RADUIS}

                   const is_next_valid_test = this.is_next_valid(chart_buttons,item.chart_id)
                   const last_id_test = this.get_last_id(chart_buttons,item.chart_matchid)

                   const pulldown = (has_dupes && !last_has_dupe)

                   last_chart_id = Number(item.chart_id)
                   last_has_dupe = has_dupes

                   let keycnta = 0
                   let keycntb = 0
                   let pulldown_object = (<span />)
                   let pulldown_items_obj = (<span />)
                   let button_obj = (<span />)

                   if(pulldown){
                     pulldown_items_obj = this.get_dupes(new_chart_levels,item.chart_id);

                     pulldown_object = (
                       <div className="ui left compact item" key={label + '-' + keycnta++}>
                         {!at_top &&
                           <div className={"ui left item dropdown middle aligned center aligned level function " + chart_type }  style={button_color_left_icon}
                             onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, last_chart_type, "up", item.chart_id)} >
                             <i className={"level up flipped left floated icon function " + chart_type} style={{hieght:"36px"}}></i>
                           </div>
                         }
                         <div key={label + '-' + keycnta++}
                           className={"ui left dropdown compact button item function " + chart_type}
                           style={button_color}>
                           <span className="text" key="start" ></span>
                           <i className="dropdown icon" key={label + '-' + keycnta++}></i>
                           <div className="menu" key={label + '-' + keycnta++}>
                             {pulldown_items_obj}
                           </div>
                         </div>
                         {is_next_valid_test &&
                           <div className={"ui left item dropdown middle aligned center aligned level function " + chart_type } style={button_color_icon}
                             onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type, "down", item.chart_id)}
                             key={label + '-' + keycnta++}>
                             <i className={"level down right floated icon function " + chart_type} style={{hieght:"36px"}} key={label + '-' + keycnta++}></i>
                           </div>
                         }
                       </div>)
                     }


                     if(!has_dupes){
                       button_obj  = (
                         <div className="ui left item" key={label + '-' + keycnta++}>

                           {!at_top &&
                             <div className={"ui left item button middle aligned center aligned level function " + chart_type }  style={button_color_left_icon} key={label + '-' + keycnta++}
                               onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, last_chart_type, "up", item.chart_id)} >
                               <i className={"level up flipped left floated icon function " + chart_type} style={{hieght:"36px"}} key={label + '-' + keycnta++}></i>
                             </div>
                           }
                           {!is_next_valid_test &&
                             <div className={"ui left item button function "  + chart_type} style={button_color} key={label + '-' + keycnta++}
                               onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, last_chart_type, "up", item.chart_id)} >
                               {label}-{last_chart_level}-{last_matchid}-{item.chart_id}
                             </div>
                           }
                           {is_next_valid_test && direction === 'down' &&
                             <div className={"ui left item button function "  + chart_type} style={button_color} key={label + '-' + keycnta++}
                               onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type, "down", item.chart_id)}>
                               {label}-{next_chart_level}-{next_matchid}-{item.chart_id}
                             </div>
                           }
                           { is_next_valid_test && direction === 'up' &&
                             <div className={"ui left item button function "  + chart_type} style={button_color} key={label + '-' + keycnta++}
                               onClick={this.handle_chart_level_click.bind(null, this, last_chart_level, last_matchid, chart_type, "up", item.chart_id)}>
                               {label}-{last_chart_level}-{last_matchid}-{item.chart_id}
                             </div>
                           }
                           {is_next_valid_test &&
                             <div className={"ui left item button middle aligned center aligned level function " + chart_type } style={button_color_icon} key={label + '-' + keycnta++}
                               onClick={this.handle_chart_level_click.bind(null, this, next_chart_level, next_matchid, chart_type, "down", item.chart_id)}>
                               <i className={"level down right floated icon function" + chart_type } style={{hieght:"36px"}} key={label + '-' + keycnta++}></i>
                             </div>
                           }
                         </div>
                       )
                     }

                     return (
                       <span key={label + '-' + keycnta++}>
                         {pulldown_object}
                         {button_obj}
                       </span>
                     )

                   }.bind(this))
                 }
                </div>
              </div>

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
                        set_active_hover={this.props.set_active_hover}

                                      />

          </div>
        </div>
      </div>

    );
  }
});

module.exports = ChartRowWrapper;
