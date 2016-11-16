var React = require('react');
var PropTypes = React.PropTypes;

var ChartTRA = React.createClass({
  //keys for landuse landcover
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
  get_tras: function(data){

    let keycnt = 0;


    //return bars
    return (
      <div key={keycnt++} className="ui small statistics">
        {data.map(key => (
          <div className="statistic">
            <div className="label" style={{color: this.get_Colors(key.NAME)}}>
              {key.ID} is a {key.NAME} TRA
            </div>
            <div className="value" style={{color: this.get_Colors(key.NAME)}}>
              {Number(key.VALUE.substring(0,5))}
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
    let tra_data = []
    if(data){

      if(data[0].chart_features){

        const features = data[0].chart_features
        const filter_data = features.filter( feature => {
          return feature.properties.chart_matchid === 1 &&
                feature.properties.chart_level === 2 &&
                  feature.properties.chart_level_label === feature.properties.geography_label.replace("TRA ","")
        })

        tra_data = filter_data.map( feature => {
          return {
                  ID: feature.properties.ID,
                  NAME: feature.properties.chart_level_label,
                  VALUE: feature.properties.chart_value,
                  TYPE: feature.properties.geography_label
                }
        })

        // console.log(tra_data)
      }
    }


    return (
      <div className="ui items">
        <div className="item" style={{display: "block"}}>
          <div className="content">
            <div className="header">
              <i className="left floated dropdown icon"></i>
              {this.props.title}
            </div>
            <div className="meta">
              <span className="note">{this.props.note }</span>
            </div>
            <div className="description">
              {this.get_tras(tra_data)}
            </div>
          </div>
        </div>
      </div>

    );
  }

})

module.exports = ChartTRA;
