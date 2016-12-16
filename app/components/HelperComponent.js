var React = require('react');
var PropTypes = React.PropTypes;

import { get_helper } from '../utils/helpers'

var HelperComponent = React.createClass({
  componentDidMount: function() {
    const class_name_text = this.props.helper_name.replace(' ','_')

    $('.help.circle.icon.'+class_name_text).popup();
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    const topic = nextProps.helper_name
    const helper_text = get_helper(topic)

    //only render if there is a helper
    if(helper_text){return false}
    return true
  },
  render: function() {
    const class_name_text = this.props.helper_name.replace(' ','_')
    const topic = this.props.helper_name
    const helper_text = get_helper(topic)
    const title = topic
    console.log(helper_text)
    return(
      <span>
        {helper_text &&
          <i className={"inverted black help circle icon "+class_name_text} data-title={title} data-content={helper_text}  style={{"paddingLeft":"7px"}}></i>
        }
        {!helper_text &&
          <span></span>
        }
      </span>
    )
  }
})

module.exports = HelperComponent;
