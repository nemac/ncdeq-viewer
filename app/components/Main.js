var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Header = require('./Header');
var SectionWrapper = require('./SectionWrapper');
var SearchBar = require('./Search');
var MapWrapper = require('./MapWrapper');


require('../main.css');

var Main = React.createClass({
  render: function () {
    return (
      <div className="ui one column padded grid">
        <SectionWrapper>
          <Header />
        </SectionWrapper>

        <SectionWrapper>
          <SearchBar />
        </SectionWrapper>

        <SectionWrapper>
          <MapWrapper />
        </SectionWrapper>
        {/*
          // Rankings
          // TRAs
          // Compare
          */}
        </div>
      )
    }
  });

  module.exports = Main;
