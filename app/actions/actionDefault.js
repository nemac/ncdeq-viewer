//action for setting and updating varoius dom stuff. like height and width of div's
///   this especially important for Leaflet which needs an absilte hieght to fill
import {
  HEADER_DESCRIPTION_VISIBILITY,
  CHART_VISIBILITY,
} from '../constants/appConstants'

export function update_HeaderVis(){
    return (dispatch, getState) => {

      const state = getState()

      const HEADER_DESCRIPTION_VISIBILITY = false;
      const chart_visibility = state.charts ? state.charts.chart_visibility : CHART_VISIBILITY

      const PADDING = 14
      const HEADERHEIGHT = $('#headerrow').outerHeight()
      const BREADCRUMBSHEIGHT = $('#breadCrumbsHeight').outerHeight()
      const LEFTOVER = window.innerHeight - (HEADERHEIGHT + BREADCRUMBSHEIGHT + PADDING)
      const MAPHEIGHT = LEFTOVER
      const CHARTHEIGHT = LEFTOVER

      const LEFTOVERINNER = window.innerHeight - (HEADERHEIGHT + BREADCRUMBSHEIGHT + (PADDING*2))
      const CHARTWIDTH = $('#chartColumn').innerWidth()-(PADDING*2)
      const CHARTSUBCOLUMN = $('#chartSubColumn').innerWidth()-(PADDING-2)
      const CHARTHEADER = $('#chartHeader').innerHeight()
      const CHARTAREAHEIGHT = LEFTOVERINNER-CHARTHEADER
      const MAPWIDTH = $('#mapColumn').innerWidth() - (PADDING*2)

      //create map config object
      const default_settings = {PADDING, HEADERHEIGHT, BREADCRUMBSHEIGHT, LEFTOVER, MAPHEIGHT,
                                CHARTHEIGHT, LEFTOVERINNER, CHARTWIDTH, CHARTSUBCOLUMN,
                                CHARTHEADER, CHARTAREAHEIGHT, MAPWIDTH, HEADER_DESCRIPTION_VISIBILITY,
                                chart_visibility};

      dispatch(defaultSate('UPDATE_HEADER_DESCRIPTION_VISIBILITY',default_settings));

    }
}

//default state
export function set_defaults(){
  return (dispatch, getState) => {

    //get redux state
    const state = getState()

    const chart_visibility = state.charts ? state.charts.chart_visibility : CHART_VISIBILITY
    const HEADER_DESCRIPTION_VISIBILITY_CHANGED =  state.default_settings.default_settings ? state.default_settings.default_settings.HEADER_DESCRIPTION_VISIBILITY : HEADER_DESCRIPTION_VISIBILITY;

    const PADDING = 14
    const HEADERHEIGHT = $('#headerrow').outerHeight()
    const BREADCRUMBSHEIGHT = $('#breadCrumbsHeight').outerHeight()
    const LEFTOVER = window.innerHeight - (HEADERHEIGHT + BREADCRUMBSHEIGHT + PADDING)
    const MAPHEIGHT = LEFTOVER
    const CHARTHEIGHT = LEFTOVER

    const LEFTOVERINNER = window.innerHeight - (HEADERHEIGHT + BREADCRUMBSHEIGHT + (PADDING*2))
    const CHARTWIDTH = $('#chartColumn').innerWidth()-(PADDING*2)
    const CHARTSUBCOLUMN = $('#chartSubColumn').innerWidth()-(PADDING-2)
    const CHARTHEADER = $('#chartHeader').innerHeight()
    const CHARTAREAHEIGHT = LEFTOVERINNER-CHARTHEADER-20
    const MAPWIDTH = $('#mapColumn').innerWidth() - (PADDING*2)

    //create map config object
    const default_settings = {PADDING, HEADERHEIGHT, BREADCRUMBSHEIGHT, LEFTOVER, MAPHEIGHT,
                              CHARTHEIGHT, LEFTOVERINNER, CHARTWIDTH, CHARTSUBCOLUMN,
                              CHARTHEADER, CHARTAREAHEIGHT, MAPWIDTH, HEADER_DESCRIPTION_VISIBILITY:HEADER_DESCRIPTION_VISIBILITY_CHANGED,
                              chart_visibility};

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
