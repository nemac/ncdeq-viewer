var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID, TRA_FEATUREID, CATALOGING_MAP_FEATUREID, NLCD_CATCHMENT_FEATUREID } from '../constants/actionConstants';
import { getFriendlyName_NextLevel, getAGOGeographyLabel_NextLevel } from '../utils/helpers'

const tooltipstyle = {
  width: '100%',
  margin: 0,
  lineHeight: 24,
  border: '1px solid #f5f5f5',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: 10,
};

const toolTipLabel = {
  margin: '0',
  color: '#666',
  fontWeight: '700',
};

const CustomToolTipBarCharts  = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },
  getInitialState: function () {
    return {
      counter: 0,
    };
  },
  incrementCounter: function () {
    this.setState({
      counter: this.state.counter + 1
    });
  },
  get_layer_id: function(layer){
    switch (layer) {
      case 'baseline':
        return HUC12_MAP_FEATUREID
        break;
      case 'uplift':
        return HUC12_MAP_FEATUREID
        break;
      case 'tra':
        return TRA_FEATUREID
        break;
      default:
        return HUC12_MAP_FEATUREID
    }
  },
  update_hover: function (data){
    const chart_type = this.props.chart_type
    this.props.set_search_method('chart hover ' + chart_type)

    let current_huc_level = 'huc_12'
    let geography_level =  getAGOGeographyLabel_NextLevel(this.props.level_label)

    if(chart_type.toUpperCase() === 'TRA'){
      geography_level = 'tra'
    }
    const DATE_SENT = Date.now()

    if(data.value){
      this.props.set_active_hover(data.value, geography_level, DATE_SENT)
    }

  },
  componentWillUnmount: function() {
    const chart_type = this.props.chart_type

    let current_huc_level = 'huc_12'
    let geography_level =  getAGOGeographyLabel_NextLevel(this.props.level_label)
    if(chart_type.toUpperCase() === 'TRA'){
      geography_level = 'tra'
    }
    this.props.set_active_hover(null, geography_level)
  },
  componentWillUpdate: function(nextProps, nextState) {
    const { active } = nextProps;
    let html_hov = '';
    if (active) {
      const new_label = nextProps.label;
      const last_label = this.props.label
      if(new_label != last_label || this.state.counter < 1){

        const self = this;
        const layer_id = this.get_layer_id(nextProps.chart_type)
        const data = {value:nextProps.label, chart_type: nextProps.chart_type, layer_id};
        const chart_type = nextProps.chart_type
        self.update_hover(data)
      }
    }

    //
    const self = this;
    const chart_type = nextProps.chart_type
    const nodata = {value:null, chart_type: null, layer_id: null}
    const foreground_bar = $('#bar-chart-'+chart_type).find('.recharts-rectangle.recharts-bar-rectangle')
    const background_bar = $('#bar-chart-'+chart_type).find('.recharts-bar-cursor')
    const background_bar2 = $('#bar-chart-'+chart_type).find('.recharts-wrapper')
    const background_bar3 = $('#bar-chart-'+chart_type).find('.recharts-layer.recharts-bar-graphical')
    const background_bar4 = $('#bar-chart-'+chart_type).find('.recharts-tooltip-wrapper')

    //yes jquery but I cannot hook to the elements in d3 svg.
    //  so i need to bind to them...
    $(foreground_bar).unbind('click');
    $(background_bar).unbind('click');
    $(background_bar2).unbind('click');

    $(background_bar).on("click",function(){
      self.props.handleClick(self,{name:nextProps.label});
    })
    $(background_bar2).on("click",function(){
      self.props.handleClick(self,{name:nextProps.label});
    })
    $(foreground_bar).on("click",function(){
      self.props.handleClick(self,{name:nextProps.label});
    })

    if(this.state.counter < 1){
      this.incrementCounter();
    }


  },
  render() {
    const self = this;
    const { active } = this.props;
    let html_hov = '';
    if (active) {
      const { payload, label } = this.props;

      const chart_type = this.props.chart_type

      const layer_id = this.get_layer_id(this.props.chart_type)

      const reversed_payload = [ ...payload ].reverse()

      const thedata = reversed_payload.map( bar_segment => {
       const colors = this.props.get_keyColors(bar_segment.name)

        const toolTipName = {
          margin: '0',
          color: colors[1],
        }

        const toolTipValue = {
          fontWeight: '800',
        }

        const value = bar_segment.value ?  bar_segment.value.toString().substring(0,5) : '0';
        const name = bar_segment.name + ": "

        const testname = this.props.function_limits[0].active_name

        //when tra's have a value of 0 do not display the tool tip...
        if((bar_segment.value === 0 || !bar_segment.value ) && this.props.chart_type.toUpperCase() === 'TRA' ){
          return null
        } else {
          if(bar_segment.value === 0 || !bar_segment.value ){
            return null
          } else {
            return ( <p key={bar_segment.name} style={toolTipName}>{name}<span style={toolTipValue}>{value}</span></p>)
          }
        }
      })

      //check to see if there is data in the case of tra's there could be no data and
      //  we want to tell users that there is no data.
      let hasdata = false;
      thedata.map( d  => {
        if(d){hasdata = true}
      })

      const labelstr = label.toString().trim();
      const background_bar = $('#bar-chart-'+chart_type).find('.recharts-bar-cursor')

      //null tip when there is no id
      if (!labelstr || !hasdata){
        $(background_bar).css({ fill: "none" })
        return (<div key={labelstr+'blanktip'} />)
      } else {
        $(background_bar).css({ fill: "#f1f1f1" })
      }

      const level_label = getFriendlyName_NextLevel(this.props.level_label)

      //return tooltip
      return (
        <div key={labelstr+'tooltip'} style={tooltipstyle}>
          <p style={toolTipLabel}>{level_label}: {`${labelstr}`}</p>
          {thedata}
        </div>
      );
    }

    return null;
  }
});

module.exports = CustomToolTipBarCharts;
