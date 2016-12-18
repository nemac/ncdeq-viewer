var React = require('react');
var PropTypes = React.PropTypes;
import HelperComponent from '../components/HelperComponent'

var AccordionComponent = React.createClass({
  componentDidMount: function() {

  },
header
description
note
content or chidlren
helper_name

  render: function() {

    return (
      <div className="ui fluid accordion" style={{display: "block", backgroundColor: BACKGROUND_COLOR_FG,marginBottom: SPACING,border:BOX_BORDER,paddingTop:"0px", borderRadius: BOX_BORDER_RADUIS}}>
        <div className="active title" style={{borderBottom: BOX_BORDER,marginTop: SPACING,paddingBottom: SPACING,height: ADJUSTED_TITLE_HEIGHT}}>
          <div className="header" style={{fontSize: "1.28571429em",fontWeight: "700"}}>
            <i className="dropdown left floated icon" style={{float:"left"}}></i>
              <span style={{float:"left"}}>{tra_header}
                <HelperComponent helper_name={"TRA Point"}/>
            </span>
            <span style={{float:"left",fontSize:".75em!important",fontWeight: "500!important",color: "rgba(0,0,0,.6)"}}>
              <span className="description"></span>
              <span className="note"></span>
            </span>
          </div>
        </div>
        <div className="active content">
          <div className="meta">
            <span className="description"></span>
          </div>

          <div className="description" style={{padding: SPACING,width:this.props.chart_width}}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

})

module.exports = AccordionComponent;
