var React = require('react');
var PropTypes = React.PropTypes;

var BreadCrumbWrapper = React.createClass({

  render: function() {
    return (
      <div className="ui tiny stackable steps">
        <div className="link step">
          <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
          <div className="content">
            <div className="title">River Basin</div>
            <div className="description">The Current River Basin</div>
          </div>
        </div>
        <div className="link step">
          <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
          <div className="content">
            <div className="title">Cataloging Unit</div>
            <div className="description">The Current Cataloging Unit</div>
          </div>
        </div>
      <div className="link active step">
        <img className="ui middle aligned spaced mini image" src="http://semantic-ui.com/images/wireframe/square-image.png" />
        <div className="content">
          <div className="title">HUC</div>
          <div className="description">The Current HUC</div>
        </div>
      </div>
    </div>
    );
  }

});

module.exports = BreadCrumbWrapper;
