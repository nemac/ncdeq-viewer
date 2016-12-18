//HTML size defaults
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

//huc stuff
export const START_POSITION = 0;
export const CATALOGING_UNIT_FROM_HUC12_END_POISTION = 8;


//map constants
export const CHART_VISIBILITY = true;
export const IMAGERY_VISIBILITY = false;
export const HEADER_DESCRIPTION_VISIBILITY = true;

export const NORTH_EAST_LATITUDE = 33.7528762817383;
export const NORTH_EAST_LONGITUDE = -94.3218765258789;
export const SOUTH_WEST_LATITUDE = 36.5880393981934;
export const SOUTH_WEST_LONGITUDE = -65.4001159667969;
export const START_LATITUDE =  35.393528;
export const START_LONGITUDE = -79.755249;

export const START_ZOOM = 7;
export const MIN_ZOOM = 6;
export const MAX_ZOOM = 16;

// semantic constants
export const MAP_FULL_WIDTH = "sixteen"
export const MAP_CHART_WIDTH = "eight"; // these two need to add up to sixteen
export const CHART_WIDTH = "eight";
export const MAP_FULL_WIDTH_INT = 16;
export const MAP_CHART_WIDTH_INT = 8; // these two need to add up to sixteen
export const CHART_WIDTH_INT= 8;
export const OVERIDE_WIDTH = 1030;
export const OVERIDE_WIDTH_NORMAL = 768;

//style
export const BOX_BORDER = "1px solid rgba(0,0,0,.09)"
export const BOX_BORDER_RADUIS = ".28571429rem"
export const SPACING = "14px"
export const BACKGROUND_COLOR_BG = "#fafafa"
export const BACKGROUND_COLOR_FG = "#ffffff"
