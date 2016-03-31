var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var SearchBar = require('./Search');
var MapWrapper = require('./MapWrapper');
var BottomSectionWrapper = require('./BottomSectionWrapper');

require('../main.css');

var Main = React.createClass({
  getInitialState: function () {
    return {
      isResultsVisible: true
    }
  },
  render: function () {
    var bottomSection;
    if (this.state.isResultsVisible){
      bottomSection = <SectionWrapper><BottomSectionWrapper text="Rankings" /><BottomSectionWrapper text="TRA's" /><BottomSectionWrapper text="Compare" /></SectionWrapper>;
      // bottomSection =  bottomSection + <BottomSectionWrapper text="TRA's" />;
      // bottomSection =  bottomSection + <BottomSectionWrapper text="Compare" />;
    }
    return (
      <div className="ui one column padded divided grid">

        <SectionWrapper>
          <Header />
        </SectionWrapper>

        <SectionWrapper>
          <MapWrapper />
        </SectionWrapper>

        <SectionWrapper>
          <BottomSectionWrapper text="Rankings" />
        </SectionWrapper>

        <SectionWrapper>
          <BottomSectionWrapper text="TRA's" />
          </SectionWrapper>

        <SectionWrapper>
          <BottomSectionWrapper text="Compare" />
          </SectionWrapper>

      </div>


      )
    }
  });

  module.exports = Main;
