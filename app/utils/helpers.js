//general functions used in multiple components, actions, and reducers

 //get the next level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
export function getNextLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 1;
      break;
    case 'Cataloging Units':
      return 3;
      break;
    case 'HUC12':
      return 3;
      break;
    default:
      return 3;
    }
}

//get the current level of geog for a geography level to use in ago api
//  example this gets all the hucs for a Cataloging unit
export function getCurrentLevel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 1;
      break;
    case 'Cataloging Units':
      return 2;
      break;
    case 'HUC12':
      return 3;
      break;
    default:
      return 99;
    }
}

//only needs this untill I change the data feed have named generically?
// or maybe control via yaml file....
export function get_AGOGeographyLabel(geogLevel){
  switch (geogLevel) {
    case 'River Basins':
      return 'huc_6';
      break;
    case 'Cataloging Units':
      return 'huc_8';
      break;
    case 'HUC12':
      return 'huc_12';
      break;
    default:
      return 'huc_12';
    }
}
