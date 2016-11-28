var React = require('react');
var PropTypes = React.PropTypes;

var ChartTRA = React.createClass({
  handleStatClick: function(constructor, entry, data, index) {

    const name = entry

    //if the tra is same as current state do nothing.  this will help with
    //  ensure the hover does not try and search for the tra over and over again on a mouse on
    if(this.state){
      if(name === this.state.tra_filter){
        return
      }
    }

    //get the chart type {tra, baseline, uplift, LULC, catchment}
    const chart_type = this.props.chart_type

    //set current geography level in redux state store
    this.props.change_geographyLevelActive(name);

    //only do this if the id is tra.
    if(chart_type.toUpperCase() === "TRA"){
      this.setState({
        tra_filter: name
      })

      this.props.get_tra_info(name)

    }
    this.props.set_search_method('tra clicked')

  },
  //keys for tra
   get_Colors: function(key){
    let color = '#5475A8';
    //this is hard coded may need to move this to a config file
    switch (key) {

      case 'Water Quality':
        color = '#67e48f'
        break;

      case 'Hydrology':
        color = '#6eb3dd'
        break;

      case 'Habitat':
        color = '#fecc9a'
        break;


      default:
        color = '#67e48f'
        break;
    }
    return color;
  },
  get_tra_outline: function(tra){
    let tra_style = {
                      cursor: "pointer",
                      boxShadow:"0 1px 3px 0 rgba(212, 212, 213, 1),0 0 0 1px rgba(212, 212, 213, 1)",
                      WebkitBoxShadow: "0 1px 3px 0 rgba(212, 212, 213, 1),0 0 0 1px rgba(212, 212, 213, 1)",
                      MozBoxShadow: "0 1px 3px 0 rgba(212, 212, 213, 1),0 0 0 1px rgba(212, 212, 213, 1)",
                      margin: ".4em .4em",
                    }
    if(this.state){
      if(tra === this.state.tra_filter){
        tra_style = {
                      cursor: "pointer",
                      boxShadow: "0 1px 4px 0 rgba(255, 0, 0, 0.4),0 0 0 2px rgba(255, 0, 0, 0.4)",
                      WebkitBoxShadow: "0 4px 4px 0 rgba(255, 0, 0, 0.4),0 0 0 2px rgba(255, 0, 0, 0.4)",
                      MozBoxShadow: "0 4px 4px 0 rgba(255, 0, 0, 0.4),0 0 0 2px rgba(255, 0, 0, 0.4)",
                      margin: ".4em .4em",
                    }
      }
    }
    return tra_style
  },
  get_tras_cards: function(data){
    let keycnt = 0;


    //return bars
    return (
      <div key={keycnt++} className="ui cards" style={{paddingLeft:10}} >
        {
          data.map(key => (

            <div key={key.ID} className="card"
              onMouseEnter={this.handleStatClick.bind(null,this,key.ID)}
              onClick={this.handleStatClick.bind(null,this,key.ID)}
              onMouseOver={this.handleStatClick.bind(null,this,key.ID)}
              style={this.get_tra_outline(key.ID)}>
              <div className="content center aligned">
                <div className="header">{key.ID}</div>
                  <div className="header">is a <span style={{color: this.get_Colors(key.NAME),cursor: "pointer"}}>{key.NAME}</span> TRA</div>
                <div className="description">
                    <div className="ui mini statistic"
                      style={{cursor: "pointer"}}>
                      <div className="label" style={{cursor: "pointer"}}>
                        with a score of
                      </div>
                      <div className="value" style={{color: this.get_Colors(key.NAME),cursor: "pointer"}}>
                        {Number(key.VALUE.substring(0,5))}
                      </div>
                    </div>
                </div>
              </div>
             </div>



          ))
        }
      </div>

    )

      return null;
  },

  render() {

    const data = this.props.chart_data
    let tra_data_unsorted = []
    let tra_data = []

    if(data){


      if(data[0].chart_features){

        //filter the tra data to only show the data for the tra type
        //  so if the tra is habitat tra only show habitat
        const features = data[0].chart_features
        const filter_data = features.filter( feature => {
          return feature.properties.chart_matchid === 1 &&
                feature.properties.chart_level === 2 &&
                  feature.properties.chart_level_label === feature.properties.geography_label.replace("TRA ","")
        })

        //sort the tra's
        tra_data_unsorted = filter_data.map( feature => {
          return {
                  ID: feature.properties.ID,
                  NAME: feature.properties.chart_level_label,
                  VALUE: feature.properties.chart_value,
                  TYPE: feature.properties.geography_label
                }
        })

        //sort the catchment data.
        tra_data = tra_data_unsorted.sort(function (a, b) {
          if (a.VALUE > b.VALUE) {
            return -1;
          }
          if (a.VALUE < b.VALUE) {
            return 1;
          }
          // a must be equal to b
            return 0;
          });
      }
    }


    return (
        <div className="item" style={{display: "block"}}>
          <div className="content">
            <div className="header">
              <i className="left floated dropdown icon"></i>
              {this.props.title}
            </div>
            <div className="meta">
              <span className="note">{this.props.note }</span>
            </div>
            <div className="description" style={{paddingTop:"5px"}}>
              {this.get_tras_cards(tra_data)}
            </div>
          </div>
        </div>

    );
  }

})

module.exports = ChartTRA;
