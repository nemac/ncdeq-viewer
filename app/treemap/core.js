
const DECIMAL_PRECISION = 5;

// Build a tree from a list of chart data for all HUC12s in a single HUC8
// An example query's WHERE field:
// geography_match_id='03020104' and chart_value is not null
export const makeTreeFromHuc8Data = (data) => {
  var huc8Tree = {
        ID : 'HUC8 ' + data[0].properties.geography_match_id,
        _children : [],
      },
      huc12Map = new Map();
  // Organize the list of features by HUC12 with a map keyed by ID
  data.forEach( (d) => {
    d = d.properties;
    if (!huc12Map.has(d.ID)) {
      huc12Map.set(
        d.ID,
        data.filter((e) => d.ID === e.properties.ID)
      );
    }
  });

  huc12Map.forEach((arr, id) => {
    if (arr.length === 16) huc8Tree._children.push(makeTreeFromHuc12Data(arr, id));
  });
  return huc8Tree;
}

// Build a tree from a list of chart data for a single HUC12
// Chart values are rounded and zero values are not used.
export const makeTreeFromHuc12Data = (data, id) => {
  if (data[0].properties) data = data.map((d) => d.properties);
  var huc12_root = data.filter( (d) => d.chart_level === 1)[0];
  huc12_root._children = [];
  var chart_levels = new Map();
  for (var i=2; i<=4; i++) {
    chart_levels.set(i, data.filter( (d) => {
      d.chart_value = (1*d.chart_value).toFixed(DECIMAL_PRECISION);
      return d.chart_level === i && d.chart_value > 0;
    }));
  }
  chart_levels.get(2).forEach((d) => {
    huc12_root._children.push(d);
  });
  chart_levels.get(3).forEach((d) => {
    huc12_root._children.forEach((e) => {
      if (d.chart_matchid === e.chart_id) {
        if (!e._children) e._children = [];
        e._children.push(d);
      }
    })
  });
  chart_levels.get(4).forEach((d) => {
    huc12_root._children.forEach((e) => {
      if (e._children) {
        e._children.forEach((f) => {
          if (d.chart_matchid === f.chart_id) {
            if (!f._children) f._children = [];
            f._children.push(d);
          }
        });
      }
    });
  });
  return huc12_root;
}
