var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var SearchBar = require('./Search');
var MapWrapper = require('./MapWrapper');
var BottomSectionWrapper = require('./BottomSectionWrapper');

require('../main.css');

var Main = React.createClass({
  render: function () {
    return (
      <div className="ui one column padded divided grid">

        <SectionWrapper>
          <Header />
        </SectionWrapper>

        <SectionWrapper>
          <SearchBar />
        </SectionWrapper>

        <SectionWrapper>
          <MapWrapper />
        </SectionWrapper>

        <BottomSectionWrapper text="Rankings" />
        <BottomSectionWrapper text="TRA's" />
        <BottomSectionWrapper text="Compare" />
      </div>


      )
    }
  });

  module.exports = Main;
