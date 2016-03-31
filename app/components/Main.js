var React = require('react');
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
    var height = window.innerHeight * .66;
    return {
      isResultsVisible: true,
      height: height
    }
  },
  handleResize: function(e) {
    var height = window.innerHeight * .66;

    this.setState({
      height:  height
    })
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
  },
  render: function () {
    return (
      <div className="ui one column grid">
        <div className="stretched row" >
          <div className="sixteen wide column" >

        <SectionWrapper>
          <Header />
        </SectionWrapper>
</div>
</div>
<div className="stretched row"  style={{padding:'0px'}}>
  <div className="sixteen wide column"  style={{padding:'0px'}}>

      <div className="ui three top attached stackable steps">
        <div className="link step">
          <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
          <div className="content">
            <div className="title">River Basin</div>
            <div className="description">The Current River Basin</div>
          </div>
        </div>
        <div className="link active step">
          <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
          <div className="content">
            <div className="title">Cataloging Unit</div>
            <div className="description">The Current Cataloging Unit</div>
          </div>
        </div>
      <div className="link disabled step">
        <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
        <div className="content">
          <div className="title">HUC</div>
          <div className="description">
            No HUC Selected yet!<br />
           </div>
        </div>
      </div>
  </div>

</div>
</div>
<div className="stretched row" style={{padding:'0px'}} >
  <div className="sixteen wide column"  style={{padding:'0px'}}>

      <div className="ui stackable internally celled grid">
        <div className="stretched row" style={{padding:'0px'}}>
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
        <div className="row">
          <div className="sixteen wide column">
            <p>Results</p>
          </div>
        </div>
      </div>


    </div>
    </div>

    </div>

      )
    }
  });

  module.exports = Main;
