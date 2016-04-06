var React = require('react');
var PropTypes = React.PropTypes;

var BreadCrumb = React.createClass({
  propTypes: {
    RiverBasinActive: PropTypes.bool.isRequired,
    CatalogingActive: PropTypes.bool.isRequired,
    HUCActive: PropTypes.bool.isRequired
  },
  getDefaultProps: function() {
    return {
      RiverBasinActive: false,
      CatalogingActive: false,
      HUCActive: false
    };
  },
  getInitialState: function () {
    return {
      RiverBasinActive: false,
      CatalogingActive: false,
      HUCActive: false
    }
  },
  resetMenus: function(){
    //set all to false
    this.setState({
      RiverBasinActive: false,
      CatalogingActive: false,
      HUCActive: false
    })
  },
  handleMenuClick: function(val,e) {

    //reset menu
    this.resetMenus();

    //change state to active for clicke menu
    this.setState({
      [val]: true,
    })

  },
  getActive: function(val){
    return  (this.state[val] ? 'active item' : 'item')
  },
  render: function() {

    return (
      <div className="ui pointing menu"  >
        <div className="header item">
          &nbsp;
        </div>
        <a className={this.getActive('RiverBasinActive')}  onClick={this.handleMenuClick.bind(this, 'RiverBasinActive')} >
          River Basins
        </a>
        <a className={this.getActive('CatalogingActive')}  onClick={this.handleMenuClick.bind(this, 'CatalogingActive')} >
          Cataloging Units
        </a>
        <a className={this.getActive('HUCActive')}  onClick={this.handleMenuClick.bind(this, 'HUCActive')}>
          HUC
        </a>
        <div className="header item" >
          &nbsp;
        </div>
        <div className="left menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search to zoom..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BreadCrumb;
