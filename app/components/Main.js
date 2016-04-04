var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var RowWrapper = require('./RowWrapper');

var SearchBar = require('./Search');
var MapWrapper = require('./MapWrapper');
var BottomSectionWrapper = require('./BottomSectionWrapper');
var styles = require('../styles');
var MapContainer = require('../containers/MapContainer')

require('../main.css');

var Main = React.createClass({

  getDefaultProps: function() {
    return {
      defHeight: 200,
      isResultsVisible: true,
      headerHeight: 100,
      mapHeight: 250,
      chartHeight: 200,
      breadCrumbsHeight: 50
    };
  },
  getHeight(repeat,val){
    if(repeat<1){
      return val
    } else{
      return this.getHeight(repeat-1, val/1.618)
    }
  },
  getInitialState: function () {

    var mapHeight = this.getHeight(2,window.outerHeight );
    var headerHeight = 100 //this.getHeight(4,window.outerHeight );
    var breadCrumbsHeight = 50//this.getHeight(5,window.outerHeight );
    var chartHeight = window.outerHeight - (mapHeight + headerHeight + breadCrumbsHeight)

    return {
      isResultsVisible: true,
      headerHeight: headerHeight,
      mapHeight: mapHeight,
      chartHeight: chartHeight,
      breadCrumbsHeight: breadCrumbsHeight
    }
  },
  handleMenuClick: function(e) {
    console.log(e.target );
    e.target.className = 'active ' + e.target.className
  },
  handleResize: function(e) {
    // console.log('map height HR ',this.state.mapHeight);
    // this.getHeight(3,window.outerHeight );
    //
    // var mapH = this.getHeight(4,window.outerHeight );
    //
    // console.log('Resize header $.height()', this.getHeight(1,window.innerHeight )) //this.refs.header.offsetHeight);
    // console.log('Resize breadCrumbs $.height()', this.refs.breadCrumbs.offsetHeight);
    // console.log('Resize mapmain $.height()', this.refs.mapMain.offsetHeight);
    // console.log('Resize charts $.height()', this.refs.charts.offsetHeight);

    // console.log('Resize $.outerHeight()', ReactDOM.findDOMNode(this).offsetHeight);
    // console.log('Resize $.nodeName()', this.refs.mapMain.nodeName);
    // console.log('Resize $.innerWidth()', window.innerHeight);


    // var chartheight = window.innerHeight - (window.innerHeight * (.38 * 2));
    //  var height = 250;
    //
    // window.innerHeight - (this.refs.header.offsetHeight+this.refs.breadCrumbs.offsetHeight+this.refs.charts.offsetHeight) >= 250 ?
    //   height =  window.innerHeight - (this.refs.header.offsetHeight+this.refs.breadCrumbs.offsetHeight+this.refs.charts.offsetHeight) :
    //   height = 250;
    // //this.refs.mapMain.clientHeight;
    // //window.innerHeight * .66;
    //
    var mapHeight = this.getHeight(2,window.outerHeight );
    var headerHeight = 100 //this.getHeight(4,window.outerHeight );
    var breadCrumbsHeight = 50//this.getHeight(5,window.outerHeight );
    var chartHeight = window.outerHeight - (mapHeight + headerHeight + breadCrumbsHeight)

    this.setState({
      headerHeight: headerHeight,
      mapHeight: mapHeight,
      chartHeight: chartHeight,
      breadCrumbsHeight: breadCrumbsHeight
    })
  },

  componentDidMount: function() {
    console.log('CDM total', window.innerHeight  )
    var first = window.innerHeight - (window.innerHeight / 1.618);
    var second = first / 1.618;
    var third = second / 1.618;

    console.log('first ',first);
    console.log('second ',second);
    console.log('third ',third);
    var start
    this.getHeight(2,window.innerHeight )


    //console.log(this.refs);
    //console.log('CDM header $.height()', this.refs.header.offsetHeight);
    // console.log('CDM breadCrumbs $.height()', this.refs.breadCrumbs.offsetHeight);
    // console.log('CDM mapmain $.height()', this.refs.mapMain.offsetHeight);
    // console.log('CDM charts $.height()', this.refs.charts.offsetHeight);
    //
    // console.log('CDM $.outerHeight()', ReactDOM.findDOMNode(this).offsetHeight);
    // console.log('CDM $.nodeName()', this.refs.mapMain.nodeName);
    // console.log('CDM $.innerWidth()', window.innerHeight);

    // var height =  window.innerHeight - (this.refs.header.offsetHeight+this.refs.breadCrumbs.offsetHeight+this.refs.charts.offsetHeight)
    // var chartheight = window.innerHeight - (window.innerHeight * (.38 * 2))
    //
    // this.setState({
    //   height:  height,
    //   chartheight: chartheight
    // })

    window.addEventListener('resize', this.handleResize);
    $('.ui.dropdown').dropdown();
  },
  render: function () {
    return (
      <div className="ui one column relaxed padded grid">

        <RowWrapper refText="header" height={this.state.headerHeight} >
          <Header content='To get started click a River Basin on the map, or search for a location to zoom to.'/>
        </RowWrapper>

        <RowWrapper refText="breadCrumbs" height={this.state.breadCrumbsHeight}>

            <div className="ui pointing menu" onClick={this.handleMenuClick} >
              <a className="item">
                River Basins
              </a>
              <a className="item">
                Cataloging Units
              </a>
              <a className="item">
                HUC
              </a>
              <div className="right menu">
                <div className="item">
                  <div className="ui transparent icon input">
                    <input type="text" placeholder="Search..." />
                    <i className="search link icon"></i>
                  </div>
                </div>
              </div>
            </div>

      </RowWrapper>

      <RowWrapper refText="mapWrapper" >

          <div className="ui stackable internally celled grid">
            <div ref="mapMain"  className="stretched row" style={{padding:'0px'}}>
              <div className="twelve wide column" style={{padding:'0px',height:this.state.mapHeight}}>
                <MapContainer />
              </div>
              <div className="four wide column">

                <div className="ui internally celled grid">
                  <div className="row">
                    <div className="sixteen wide column">
                      <p>Search</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="sixteen wide column">
                      <p>Toggle</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="sixteen wide column">
                      <p>Projects</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>


        </RowWrapper>

        <RowWrapper refText="mapWrapper"  height={this.state.chartHeight}>
          <h3 className="ui left floated header">
            Charts
          </h3>
        </RowWrapper>

    </div>

      )
    }
  });

  module.exports = Main;
