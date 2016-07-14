

// *
// Build a tree compatible with the d3 treemap library from data
//    on a single cataloging unit.
//
// @param data is a GeoJSON feature collection of chart data
//    for every HUC12 in a single HUC8 (cataloging unit).
//    Each feature contains a normalized average value (range is [0, 1])
//    as well as metadata describing the feature's place
//    in the geography and chart hierarchy.
//
// @return a tree-structured JS object where nodes are features (objects)
//    and child nodes are put into an array
//    and accessed by the _children field of a parent node.
//
// *
export const makeTreeFromHuc8Data = (features) => {
  features = cleanFeatureCollectionForTreemap(features);

  // Make the root of the tree, representing the HUC8.
  var huc8Tree = {
      // Each feature has an 'ID' field identifying the HUC12 being described.
      // The field 'geography_match_id' is the ID of a feature's geographic parent,
      // in this case the ID of the HUC8 we're building the tree for.
      // This field should be identical for every feature,
      // so just grab it from the first feature in the list
      // and use it as the identifier for the root.
      ID : 'HUC8 ' + features[0].geography_match_id,

      // Each child of the root will be a feature describing the grand total
      // chart value for a single HUC12.
      _children : [],
    }

  // Group the features by what HUC12 they belong to.
  var huc12s = {}
  features.forEach( (feature) => {
    if (!huc12s[feature.ID]) { huc12s[feature.ID] = [] }
    huc12s[feature.ID].push(feature)
  })

  // Build a subtree for each HUC12 and add it to the list of children of the root.
  //
  // At the moment we cannot reliably build a HUC12 tree from incomplete data,
  // so we only add a subtree for a HUC12 if its array of features is complete.
  const HUC12_NUM_FEATURES = 16
  Object.keys(huc12s).forEach( (ID) => {
    // Note: for some reason only bracket notation works here
    if (huc12s[ID].length === HUC12_NUM_FEATURES) {
      huc8Tree._children.push(makeTreeFromHuc12Data(huc12s[ID]))
    }
  })

  return huc8Tree
}


// *
// Build a tree compatible with the d3 treemap library from HUC12 chart data.
//
// @param data is an array of objects.
//    Each feature object contains a normalized average chart value
//    (range is [0, 1]) as well as metadata describing the feature's place
//    in the geography and chart hierarchy.
//
// @return a tree-structured JS object where nodes are feature objects
//    and child nodes live in an array assigned to an object property.
//
// *
export const makeTreeFromHuc12Data = (features) => {

  // The number of decimal places chart values are rounded to.
  // If a chart value is rounded to zero it is not rendered in the treemap.
  const DECIMAL_PRECISION = 5

  features = cleanFeatureCollectionForTreemap(features)

  // The finished tree is a direct representation of the
  // chart hierarchy for a single HUC12.
  // 
  // We start with the root. We use the feature for total value for the HUC12;
  // That is, the feature object with a chart_level of 1.
  var huc12Tree = features.filter( (feature) => feature.chart_level === 1 )[0]

  // We add an array field for the root's children, i.e. level 2 chart data.
  // Due to internal machinations of d3 (see treemap.jsx), we name it '_children'.
  // Do NOT name this field 'children'!
  huc12Tree._children = []

  // Separate the features by chart level into an auxiliary data structure.
  var chart_levels = {}
  features.forEach((feature) => {
    // We already handled the 'root' object, so skip it in this loop
    if (feature.chart_level === 1) { return }

    if (!chart_levels[feature.chart_level]) {
      chart_levels[feature.chart_level] = []
    }
    // If the chart value is rounded to zero we don't use it!    
    feature.chart_value = (1*feature.chart_value).toFixed(DECIMAL_PRECISION)
    if (feature.chart_value > 0) { chart_levels[feature.chart_level].push(feature) }
  })

  // For each feature of each chart level, find any of its children in the
  // chart hierarchy and add them to the feature's _children array.
  //
  // Each feature has a 'chart_id' and 'chart_matchid' property.
  // The 'chart_id' is the unique id for the feature, and the 'chart_matchid'
  // is the 'chart_id' of the feature's parent in the chart hierarchy.
  // We use this relationship to find features' child nodes at each chart level.
  //
  // Children of the root are any features in the second chart level
  chart_levels[2].forEach((levelTwoFeature) => {
    huc12Tree._children.push(levelTwoFeature)
  })
  chart_levels[3].forEach((levelThreeFeature) => {
    huc12Tree._children.forEach((levelTwoFeature) => {
      if (levelThreeFeature.chart_matchid === levelTwoFeature.chart_id) {
        if (!levelTwoFeature._children) {
          levelTwoFeature._children = []
        }
        levelTwoFeature._children.push(levelThreeFeature)
      }
    })
  })
  chart_levels[4].forEach((levelFourFeature) => {
    huc12Tree._children.forEach((levelTwoFeature) => {
      if (levelTwoFeature._children) {
        levelTwoFeature._children.forEach((levelThreeFeature) => {
          if (levelFourFeature.chart_matchid === levelThreeFeature.chart_id) {
            if (!levelThreeFeature._children) levelThreeFeature._children = []
            levelThreeFeature._children.push(levelFourFeature)
          }
        })
      }
    })
  })
  
  return huc12Tree
}


// *
// A utility function to clean up a feature collection.
//
// @param data is an array of feature objects from a GeoJSON feature collection.
//   The sub-object 'properties' of each feature object has all of the relevant
//   information we need.
//
// *
const cleanFeatureCollectionForTreemap = (features) => {
  if (features[0].properties) {
    return features.map((d) => d.properties)
  } else return features
}
