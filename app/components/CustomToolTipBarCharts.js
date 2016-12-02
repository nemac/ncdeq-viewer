var React = require('react');
var PropTypes = React.PropTypes;

import { BarChart, Bar, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HUC12_MAP_FEATUREID, TRA_MAP_FEATUREID, CATALOGING_MAP_FEATUREID, NLCD_MAP_FEATUREID } from '../constants/actionConstants';

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
  get_layer_id: function(layer){
    switch (layer) {
      case 'baseline':
        return HUC12_MAP_FEATUREID
        break;
      case 'uplift':
        return HUC12_MAP_FEATUREID
        break;
      case 'tra':
        return TRA_MAP_FEATUREID
        break;
      default:
        return HUC12_MAP_FEATUREID
    }
  },
  componentWillUpdate: function(nextProps, nextState) {

    const layer_id = this.get_layer_id(nextProps.chart_type)

    //yes jquery but I cannot hook to the elements in d3 svg.
    //  so i need to bind to them...
    $('.recharts-bar-cursor').unbind('click');
    $('.recharts-bar-cursor').unbind('mouseenter');
    $('.recharts-bar-cursor').unbind('mouseleave');

    $('.recharts-bar-rectangles').unbind('click');
    $('.recharts-bar-rectangles').unbind('mouseenter');
    $('.recharts-bar-rectangles').unbind('mouseleave');

    $('.recharts-bar-cursor').on("click",function(){console.log('clicked' + JSON.stringify({value:nextProps.label,chart_type: nextProps.chart_type, layer_id}))})
    $('.recharts-bar-rectangles').on("click",function(){console.log('clicked' + JSON.stringify({value:nextProps.label,chart_type: nextProps.chart_type, layer_id}))})

    $('.recharts-bar-cursor').on("mouseenter",function(){console.log('mouseenter' + JSON.stringify({value:nextProps.label,chart_type: nextProps.chart_type, layer_id}))})
    $('.recharts-rectangle .recharts-bar-rectangles').on("mouseenter",function(){console.log('mouseenter' + JSON.stringify({value:nextProps.label,chart_type: nextProps.chart_type, layer_id}))})

    $('.recharts-bar-cursor').on("mouseleave",function(){console.log('mouseleave' + JSON.stringify({value:null,chart_type: null, layer_id: null}))})
    $('.recharts-bar-rectangles').on("mouseleave",function(){console.log('mouseleave' + JSON.stringify({value:null,chart_type: null, layer_id: null}))})

  },
  render() {

    const { active } = this.props;
    let html_hov = '';
    if (active) {
      const { payload, label } = this.props;


      const layer_id = this.get_layer_id(this.props.chart_type)

      // this.props.get_LayerGeom_ByValue(label,this.props.chart_type)
      // console.log({value:label,chart_type: this.props.chart_type, layer_id: layer_id})

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

        const value = bar_segment.value ?  bar_segment.value.toString().substring(0,5) : 'N/A';
        const name = bar_segment.name + ": "

        //when tra's have a value of 0 do not display the tool tip...
        if((bar_segment.value === 0 || !bar_segment.value ) && this.props.chart_type.toUpperCase() === 'TRA'){
          return null
        } else {
          return ( <p key={bar_segment.name} style={toolTipName}>{name}<span style={toolTipValue}>{value}</span></p>)
        }
      })

      //check to see if there is data in the case of tra's there could be no data and
      //  we want to tell users that there is no data.
      let hasdata = false;
      thedata.map( d  => {
        if(d){hasdata = true}
      })

      const labelstr = label.toString().trim();

      //null tip when there is no id
      if (!labelstr || !hasdata){
        return (<div key={labelstr+'blanktip'} />)
      }

      //return tooltip
      return (
        <div key={labelstr+'tooltip'} style={tooltipstyle}>
          <p style={toolTipLabel}>{this.props.level_label}: {`${labelstr}`}</p>
          {thedata}
        </div>
      );
    }

    return null;
  }
});

module.exports = CustomToolTipBarCharts;
