var React = require('react');
var ReactDOM = require('react-dom');

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var SearchBar = require('./Search');
var MapWrapper = require('./MapWrapper');
var BottomSectionWrapper = require('./BottomSectionWrapper');
var styles = require('../styles');
var MapContainer = require('../containers/MapContainer')

require('../main.css');

var Main = React.createClass({

  getDefaultProps: function() {
    return {
      isResultsVisible: true,
      height: 400
    };
  },
  getInitialState: function () {
    console.log(window.innerHeight)
    var height = window.innerHeight * (.38 * 2)
    var chartheight = window.innerHeight - (window.innerHeight * (.38 * 2))
    return {
      isResultsVisible: true,
      height: height,
      chartheight: chartheight
    }
  },
  handleMenuClick: function(e) {
    console.log(e.target );
    e.target.className = 'active ' + e.target.className
  },
  handleResize: function(e) {
    console.log('Resize header $.height()', this.refs.header.offsetHeight);
    console.log('Resize breadCrumbs $.height()', this.refs.breadCrumbs.offsetHeight);
    console.log('Resize mapmain $.height()', this.refs.mapMain.offsetHeight);
    console.log('Resize charts $.height()', this.refs.charts.offsetHeight);

    console.log('Resize $.outerHeight()', ReactDOM.findDOMNode(this).offsetHeight);
    console.log('Resize $.nodeName()', this.refs.mapMain.nodeName);
    console.log('Resize $.innerWidth()', window.innerHeight);
    var chartheight = window.innerHeight - (window.innerHeight * (.38 * 2))

    var height =  window.innerHeight - (this.refs.header.offsetHeight+this.refs.breadCrumbs.offsetHeight+this.refs.charts.offsetHeight)
    //this.refs.mapMain.clientHeight;
    //window.innerHeight * .66;

    this.setState({
      height:  height,
      chartheight: chartheight
    })
  },
  componentDidMount: function() {
    console.log('CDM header $.height()', this.refs.header.offsetHeight);
    console.log('CDM breadCrumbs $.height()', this.refs.breadCrumbs.offsetHeight);
    console.log('CDM mapmain $.height()', this.refs.mapMain.offsetHeight);
    console.log('CDM charts $.height()', this.refs.charts.offsetHeight);

    console.log('CDM $.outerHeight()', ReactDOM.findDOMNode(this).offsetHeight);
    console.log('CDM $.nodeName()', this.refs.mapMain.nodeName);
    console.log('CDM $.innerWidth()', window.innerHeight);
    var height =  window.innerHeight - (this.refs.header.offsetHeight+this.refs.breadCrumbs.offsetHeight+this.refs.charts.offsetHeight)
    var chartheight = window.innerHeight - (window.innerHeight * (.38 * 2))

    this.setState({
      height:  height,
      chartheight: chartheight
    })

    window.addEventListener('resize', this.handleResize);
    $('.ui.dropdown').dropdown();
  },
  render: function () {
    return (
      <div className="ui one column relaxed padded grid">
        <div ref="header"  className="stretched row" >
          <div className="sixteen wide column" >

            <SectionWrapper>
              <Header />
            </SectionWrapper>
          </div>
        </div>
        <div ref="breadCrumbs"  className="stretched row"  style={{padding:'0px'}}>
          <div className="sixteen wide column"  style={{padding:'0px'}}>

            <div className="ui pointing menu" onClick={this.handleMenuClick} >

              <a className="item">
                Home
              </a>
              <a className="item">
                Messages
              </a>
              <a className="item">
                Friends
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

        </div>
      </div>
      <div className="stretched row" style={{padding:'0px'}} >
        <div className="sixteen wide column"  style={{padding:'0px'}}>

          <div className="ui stackable internally celled grid">
            <div ref="mapMain"  className="stretched row" style={{padding:'0px'}}>
              <div className="twelve wide column" style={{padding:'0px',height: this.state.height + 'px'}}>
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


        </div>
      </div>

      <div ref="charts" className="row" style={{height:this.state.chartheight}}>
        <div className="sixteen wide column"  >
          <p>Charts</p>
        </div>
      </div>

    </div>

      )
    }
  });

  module.exports = Main;
