import  React from 'react'
import Control from '../components/control';


var ChartButton = React.createClass({
 // componentDidMount: function() {
 //   console.log(this)
 //    //L.DomEvent.disableClickPropagation(this)
 // },
 // // refContainer(el) {
 //   this.container = el;
 // },
 render: function() {

   return (
     <Control position={this.props.position} >
         <button className="ui black button" >
           <i className={!this.props.chartVisibility ? "bar chart icon" : "bar chart icon" }></i>
           {!this.props.chartVisibility ? "Show Charts" : "Hide Charts" }
         </button>
   </Control>
   )
 }
})


module.exports = ChartButton;
