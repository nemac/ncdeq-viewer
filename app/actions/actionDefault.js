//action for setting and updating varoius dom stuff. like height and width of div's
///   this especially important for Leaflet which needs an absilte hieght to fill

//get constants for default sizes and settings
import {HEADER_HEIGHT,
        HEADER_HEIGHT_SMALL,
        HEADER_DESCRIPTION_VISIBILITY,
        BREAD_CRUMBS_HEIGHT,
        ROW_PADDING ,
        DEF_PAD ,
        MAP_HEIGHT ,
        CHART_HEIGHT ,
        CHART_VISIBILITY,
        MAP_HEIGHT_OFFSET,
        MAP_FULL_WIDTH_INT,
        MAP_CHART_WIDTH_INT,
        CHART_WIDTH_INT,
        CHART_BORDER,
        OVERIDE_WIDTH,
        OVERIDE_WIDTH_NORMAL,
        HEADER_PADDING,
        SPACING} from '../constants/appConstants'


function calculate_NewHeights(){
  const padding = 14

  const headerHeight = $('#headerrow').outerHeight()
  const breadCrumbsHeight =   $('#breadCrumbsHeight').outerHeight()
  const leftover = window.innerHeight - (headerHeight + breadCrumbsHeight + padding)
  const mapHeight = leftover
  const chartHeight = leftover

  const leftoverInner = window.innerHeight - (headerHeight + breadCrumbsHeight + (padding*2))
  const chartWidth = $('#chartColumn').innerWidth()-(padding*2)
  const chartSubColumn = $('#chartSubColumn').innerWidth()-(padding-2)
  const chartHeader = $('#chartHeader').innerHeight()
  const chartAreaHeight = leftoverInner-chartHeader
  const mapWidth = $('#mapColumn').innerWidth() - (padding*2)


  return {
    headerHeight,
    breadCrumbsHeight,
    mapHeight,
    chartHeight,
    chartWidth,
    mapWidth,
    padding
  }

}
export function update_ChartHeight(){
    return (dispatch, getState) => {

      const padding = 14

      const headerHeight = $('#headerrow').outerHeight()
      const breadCrumbsHeight =   $('#breadCrumbsHeight').outerHeight()
      const leftover = window.innerHeight - (headerHeight + breadCrumbsHeight + padding)
      const mapHeight = leftover
      const chartHeight = leftover

      const leftoverInner = window.innerHeight - (headerHeight + breadCrumbsHeight + (padding*2))
      const chartWidth = $('#chartColumn').innerWidth()-(padding*2)
      const chartSubColumn = $('#chartSubColumn').innerWidth()-(padding-2)
      const chartHeader = $('#chartHeader').innerHeight()
      const chartAreaHeight = leftoverInner-chartHeader
      const mapWidth = $('#mapColumn').innerWidth() - (padding*2)


      return {
        headerHeight,
        breadCrumbsHeight,
        mapHeight,
        chartHeight,
        chartWidth,
        mapWidth,
        padding
      }

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
      const mapWidth = heights.map_px_width;
      const chartWidth = heights.chart_px_width;
      const header_description_visibility =  state.default_settings.default_settings ? state.default_settings.default_settings.header_description_visibility : HEADER_DESCRIPTION_VISIBILITY;

      //create map config object
      const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad, mapWidth, chartWidth, header_description_visibility};

      dispatch(defaultSate('UPDATE_MAP_HEIGHT',default_settings));

    }
}

export function update_HeaderVis(){
    return (dispatch, getState) => {


      const header_description_visibility = false;

      //get redux state
      const state = getState();
      const heights = calculate_NewHeights(state, true);

      const headerHeight = HEADER_HEIGHT_SMALL;
      const breadCrumbsHeight = state.default_settings.default_settings ? state.default_settings.default_settings.breadCrumbsHeight : BREAD_CRUMBS_HEIGHT;
      const rowPadding = state.default_settings.default_settings ? state.default_settings.default_settings.rowPadding : ROW_PADDING;
      const defpad = state.default_settings.default_settings ? state.default_settings.default_settings.defpad : DEF_PAD;
      const mapHeight = heights.mapHeight;
      const chartHeight = heights.chartHeight;
      const mapWidth = heights.map_px_width;
      const chartWidth = heights.chart_px_width;


      //create map config object
      const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad, mapWidth, chartWidth, header_description_visibility};

      dispatch(defaultSate('UPDATE_HEADER_DESCRIPTION_VISIBILITY',default_settings));

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
    const mapWidth = MAP_HEIGHT;
    const chartWidth = CHART_HEIGHT;
    const header_description_visibility =  state.default_settings.default_settings ? state.default_settings.default_settings.header_description_visibility : HEADER_DESCRIPTION_VISIBILITY;


    //create map config object
    const default_settings = {mapHeight, chartHeight, headerHeight, breadCrumbsHeight, rowPadding, defpad, mapWidth, chartWidth, header_description_visibility};

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
