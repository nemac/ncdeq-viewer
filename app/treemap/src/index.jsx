import './styles.css'
import ReactDOM from 'react-dom';
import React from 'react';
import Treemap from './components/treemap.jsx';
import {makeTreeFromHuc12Data, makeTreeFromHuc8Data} from './core';

const huc12AllChartLevels = require('../data/single_huc12.json').features;
const __huc12Tree = makeTreeFromHuc12Data(huc12AllChartLevels);

const huc8AllChartLevels = require('../data/huc8_03020104_all_chart_levels.json').features
const __huc8Tree = makeTreeFromHuc8Data(huc8AllChartLevels);

const __tree = __huc8Tree;
const props = {
  root: __tree,
}

const mountingPoint = document.createElement('div');
mountingPoint.className = 'treemap-app';
document.body.appendChild(mountingPoint);
ReactDOM.render(<Treemap {...props}/>, mountingPoint)

