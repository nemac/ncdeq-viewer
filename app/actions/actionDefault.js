//action for setting and updating varoius dom stuff. like height and width of div's
///   this especially important for Leaflet which needs an absilte hieght to fill

//get constants for default sizes and settings
import {HEADER_HEIGHT , BREAD_CRUMBS_HEIGHT, ROW_PADDING , DEF_PAD , MAP_HEIGHT , CHART_HEIGHT , CHART_VISIBILITY} from '../constants/appConstants'

function setHeight(repeat,val){
  //set the height of element based on a ratio 1.618
  if(repeat<1){
    return val
  } else{
    return setHeight(repeat-1, val/1.618)
  }
}

function calculate_NewHeights(state){

  //when state is not defined yet set to true
  var vis = state.chartData.chart_visibility ? state.chartData.chart_visibility : CHART_VISIBILITY;

  const headerHeight = state.default_settings.default_settings ? state.default_settings.default_settings.headerHeight : HEADER_HEIGHT ;
  const breadCrumbsHeight = state.default_settings.default_settings ? state.default_settings.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
  const rowPadding = state.default_settings.default_settings ? state.default_settings.default_settings.rowPadding : ROW_PADDING;
  const defpad = state.default_settings.default_settings ? state.default_settings.default_settings.defpad : DEF_PAD;


  //map and chart areas should scale to browser
  //for leaflet the map height needs to be explicit
  //adjustable heights.
  //first get whats leftover from fixed components
  // the calculate the map hieght.
  //give the rest to the chart
  const leftover = window.innerHeight -
                    (headerHeight + breadCrumbsHeight +
                      (rowPadding*4)
                    );

  if (vis){
    var mapHeight = setHeight(1,leftover);
    var chartHeight = window.innerHeight - (leftover - mapHeight);
  } else {
    var mapHeight  = leftover
    var chartHeight = 0;
  }

  //do not let map height less than 300 pixels
  if (mapHeight < MAP_HEIGHT){
    mapHeight = MAP_HEIGHT
  }

  //do not let chart area less than 100 pixels
  //  may need to rethink this if the charts need more space....
  if (chartHeight < CHART_HEIGHT){
    chartHeight = CHART_HEIGHT
  }

  return {
    mapHeight,
    chartHeight
  }

}
export function update_ChartHeight(){
    return (dispatch, getState) => {

        //get redux state
      const state = getState();
      const heights = calculate_NewHeights(state);

      const headerHeight = state.default_settings.default_settings.headerHeight;
      const breadCrumbsHeight = state.default_settings.default_settings.breadCrumbsHeight;
      const rowPadding = state.default_settings.default_settings.rowPadding;
      const defpad = state.default_settings.default_settings.defpad;
      const mapHeight = heights.mapHeight;
      const chartHeight = heights.chartHeight;

      //create map config object
      const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad};

      dispatch(defaultSate('UPDATE_CHART_HEIGHT',default_settings));

    }
}
export function update_MapHeight(){
    return (dispatch, getState) => {

      //get redux state
      const state = getState();
      const heights = calculate_NewHeights(state);

      const headerHeight = state.default_settings.default_settings ? state.default_settings.default_settings.headerHeight : HEADER_HEIGHT ;
      const breadCrumbsHeight = state.default_settings.default_settings ? state.default_settings.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
      const rowPadding = state.default_settings.default_settings ? state.default_settings.default_settings.rowPadding : ROW_PADDING;
      const defpad = state.default_settings.default_settings ? state.default_settings.default_settings.defpad : DEF_PAD;
      const mapHeight = heights.mapHeight;
      const chartHeight = heights.chartHeight;

      //create map config object
      const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad};

      dispatch(defaultSate('UPDATE_MAP_HEIGHT',default_settings));

    }
}
//default state
export function set_defaults(e){
  return (dispatch, getState) => {

    //get redux state
    const state = getState();

    const headerHeight = HEADER_HEIGHT;
    const breadCrumbsHeight = BREAD_CRUMBS_HEIGHT;
    const rowPadding = ROW_PADDING;
    const defpad = DEF_PAD;
    const mapHeight = MAP_HEIGHT;
    const chartHeight = CHART_HEIGHT;

    //create map config object
    const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad};

    dispatch(defaultSate('SET_DEFAULT_SETTINGS',default_settings));

  }
}
function  defaultSate(type,data) {
  return {
    type: type,
    default_settings: data,
    receivedAt: Date.now()
  }
}
