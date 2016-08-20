var React = require('react');
var HeaderTitleComponent = require('../components/HeaderTitleComponent');
var SectionWrapper = require('./SectionWrapper');

var HeaderComponent = require('../components/HeaderComponent')

var PropTypes = React.PropTypes;

var HeaderComponent = React.createClass({
  getDefaultProps: function() {
    return {
      content:'Do Something on the map'
    };
  },
  getInitialState: function() {
    return {
      content: this.props.content
    };
  },
  componentDidMount: function() {
    $("#about").click(function () {
      $("#modal-about").modal('show');
    });
  },
  render: function() {

    return (
      <SectionWrapper>
        <div className="ui menu" style={{backgroundColor: "#2b4559", border: "0", boxShadow: "initial"}}>
          <div className='header' >
            <HeaderTitleComponent  title='Explore a River Basin'/>
            <p>{this.state.content}</p>
          </div>
          <div className="right menu" style={{padding: "25px 80px 0 0"}}>
            <a className="ui item" id="about" style={{color: "#fff", padding: "0 15px", cursor: "pointer"}}>About</a>
            <a className="ui item" style={{color: "#fff", padding: "0 15px", cursor: "pointer"}}>Resources</a>
          </div>
        </div>
      </SectionWrapper>
    );
  }
});


module.exports = HeaderComponent;
