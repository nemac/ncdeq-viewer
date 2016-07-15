import React from 'react'
import d3 from 'd3'

const TOOLTIP_WIDTH = 170
const TOOLTIP_HEIGHT = 32

const BACK_BUTTON_TEXT = 'Up'
const FORWARD_BUTTON_TEXT = 'Down'

export default class Treemap extends React.Component {
  componentWillReceiveProps(nextProps) {

    this.treemap = d3.layout.treemap()
        .size([nextProps.width, nextProps.height - nextProps.rootHeight])
        .value(nextProps.value)
        .children(nextProps.children)
        .sort((a, b) => nextProps.value(a) - nextProps.value(b))
        .ratio(1)
    this.layout(nextProps.root)
    this.setState({
      grandparent: nextProps.root,
      grandparentText: nextProps.id(nextProps.root),
      nodes: nextProps.root._children,
      focused: null,
      tooltip: null,
      xScale: d3.scale.linear()
        .domain([0, nextProps.width])
        .range([0, nextProps.width]),
      yScale: d3.scale.linear()
        .domain([0, nextProps.height])
        .range([nextProps.rootHeight, nextProps.height + nextProps.rootHeight]),
    })

  }
  constructor(props) {
    super(props)
    this.treemap = d3.layout.treemap()
        .size([props.width, props.height - props.rootHeight])
        .value(props.value)
        .children(props.children)
        .sort((a, b) => props.value(a) - props.value(b))
        .ratio(1)
    this.layout(props.root)
    this.state = {
      grandparent: props.root,
      grandparentText: props.id(props.root),
      nodes: props.root._children,
      focused: null,
      tooltip: null,
      xScale: d3.scale.linear()
        .domain([0, props.width])
        .range([0, props.width]),
      yScale: d3.scale.linear()
        .domain([0, props.height])
        .range([props.rootHeight, props.height + props.rootHeight]),
    }
  }

  layout(node) {
    this.treemap.nodes({ children: node._children })
    node._children.forEach((d) => {
      d.parent = node
    })
  }

  handleNodeClick(node) {
    if (node !== this.state.focused) {
      this.setState({
        focused: node, 
      })
    }
  }

  zoom(node) {
    if (node === this.state.grandparent) {
      // Zoom OUT
      node = node.parent
      this.setState({
        focused: node,
        grandparentText: this.state.grandparentText
          .split(' => ').slice(0, -1).join(' => '),
      })
    } else {
      // Zoom IN
      this.setState({
        grandparentText: this.state.grandparentText
          += ' => ' + this.props.id(node)
      })
    }
    this.layout(node)
    this.setState({
      focused: null,
      grandparent: node,
      nodes: node._children,
    })
  }


  /*
  setTooltip(node, event) {
    // if the right edge of the tooltip is
    // farther right than the right edge of the node rect,
    // shift the tooltip to the left by the width of the tooltip
    var tooltipX = event.nativeEvent.offsetX
    var tooltipY = event.nativeEvent.offsetY
    if ( (tooltipX + TOOLTIP_WIDTH) > (node.x + node.dx) )
      tooltipX -= TOOLTIP_WIDTH*2
    else if ( (tooltipY + TOOLTIP_HEIGHT) > (node.y + node.dy) )
      tooltipY -= TOOLTIP_HEIGHT*2
    this.setState({
      tooltip: {
        OBJECTID: node.OBJECTID,
        value: this.props.value(node),
        id: this.props.id(node),
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      },
    })
  }
  */

  /***** RENDER *****/

  render() {
    return (<div>
      <div className="treemap-side">
        <div className="treemap-nav">
          { this.renderBackButton() }
          { this.renderForwardButton() }
        </div>
        { this.renderNodeInfo() }
      </div>
      { this.renderTreemap() }
    </div>)
  }

  /****** STATELESS FUNCTIONAL COMPONENTS ******/

  renderForwardButton() {
    return (<button
      className={'treemap-nav-button-forward'}
      onClick={ this.state.focused && this.state.focused._children ?
        this.zoom.bind(this, this.state.focused) : null
      }
      disabled={ this.state.focused && this.state.focused._children ? false : true }
    >
      {FORWARD_BUTTON_TEXT}
    </button>)

  }

  renderBackButton() {
    return (<button
      className={'treemap-nav-button-back'}
      onClick={ this.state.grandparent.parent ?
        this.zoom.bind(this, this.state.grandparent) : null
      }
      disabled={ this.state.grandparent.parent ? false : true }
    >
      {BACK_BUTTON_TEXT}
    </button>)
  }

  renderNodeInfo() {
    return (<div className={'treemap-node-info'}>
      <h3>BASELINE</h3>
      <p>{ `OBJECTID: ${ this.state.focused ? this.state.focused.OBJECTID : '' }` }</p>
      <p>{ `Chart Label: ${this.state.focused ? this.props.id(this.state.focused) : '' }` }</p>
      <p>{ `Chart Value: ${this.state.focused ? this.state.focused.value : '' }`}</p>
    </div>)
  }

  /* SVG COMPONENTS */

  renderTreemap() {
    return (<svg width={this.props.width} height={this.props.height}>
    <g>
      { this.renderGrandparent() }
      { this.renderNodes() }
    </g>
  </svg>)
  }

  renderGrandparent() {
    return (<g className={'grandparent'}>
      <rect
        className={'grandparent'}
        width={this.props.width}
        height={this.props.rootHeight}>
      </rect>
      <text x={4} y={6}>{this.state.grandparentText}</text>
    </g>)
  }

  renderNodes() {
    return (<g className={'depth'}>
      { this.state.nodes.map( (node) => this.renderNode(node), this) }
    </g>
)  }

//  <text> element should not be wider than the width of the child <rect>
// or else this <g> element will be too wide and trigger the mouse event
// even when the cursor is not visiting the rect element.

// onMouseEnter={ this.setTooltip.bind(this, node) }

  renderNode(node) {
    return (<g
        key={node.OBJECTID}
        className={'children'}

        onClick={ this.handleNodeClick.bind(this, node) }
      >
      { this.renderRect(node, node._children ? 'parent' : 'leaf') }
      { /* node._children.map( (child) => this.renderRect(child, 'child') ) */ }
      { this.renderText(node) }
    </g>)
  }

  renderText(node) {
    return (<text
      x={this.state.xScale(node.x) + 4}
      y={this.state.yScale(node.y) - 2}
      dy={'.75em'}>
        { this.props.id(node) }
    </text>)
  }

  renderRect(node, relation) {
    return (<rect
      key={node.OBJECTID}
      className={`treemap-rect ${this.state.focused === node ? 'focused-node' : relation}`}
      x={this.state.xScale(node.x)}
      y={this.state.yScale(node.y)}
      width={this.state.xScale(node.dx) - this.state.xScale(0)}
      height={this.state.yScale(node.dy) - this.state.yScale(0)}
    ></rect>)
  }

  renderTooltip() {
    if (this.state.tooltip) {
      return (<g key={'tooltip.' + this.state.tooltip.OBJECTID}>
        <rect
          className={'tooltip'}
          x={ this.state.tooltip.x }
          y={ this.state.tooltip.y }
          width={TOOLTIP_WIDTH}
          height={TOOLTIP_HEIGHT}
        ></rect>
        <text
          x={ this.state.tooltip.x + 4}
          y={ this.state.tooltip.y }
          dy={5}
        >
          { 'id: ' + this.state.tooltip.id }
        </text>
        <text
          x={ this.state.tooltip.x + 4 }
          y={ this.state.tooltip.y }
          dy={20}
        >
          { 'value: ' + this.state.tooltip.value }
        </text>
      </g>)
    }
  }
}

Treemap.defaultProps = {
  width: 450,
  height: 450,
  rootHeight: 20,
  value: (d) => d.chart_value,
  children: (d) => d.children,
  id: (d) => {
    if (d.chart_level > 1) return d.chart_level_label ? d.chart_level_label : d.chart_description
    if (d.geography_level > 2) return d.ID.slice(-4)
    return d.ID ? d.ID : d.chart_type
  },
}

Treemap.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  rootHeight: React.PropTypes.number.isRequired,
  value: React.PropTypes.func.isRequired,
  children: React.PropTypes.func.isRequired,
  id: React.PropTypes.func.isRequired,

  root: React.PropTypes.object.isRequired,
}
