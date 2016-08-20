var React = require('react');
var PropTypes = React.PropTypes;

var ModalAbout = React.createClass({
  render: function() {
    return (
      <div className="ui modal" id="modal-about">
        <div className="actions" style={{backgroundColor: "#fff", "float": "right"}}>
          <div className="circular ui icon button floated right ok" style={{padding: "0", backgroundColor: "#fff"}}>
            <i className="remove circle outline icon red" style={{fontSize: "2rem"}}></i>
          </div>
        </div>
        <div className="header">
          About the North Carolina DEQ Watershed Viewer
        </div>
        <div className="content">
          <div className="description">
            <div className="ui header">Here is a description</div>
            <p>Oni on patro veadi, duon ferio malpli ja enz. Multa tutampleksa as mia. Sat jo gardi kunskribado, movi vendo pronomeca e igi. Pli danke ekkrio rolfinaĵo in, hura helpverbo bedaŭrinde nek he, tera esperanto aspektismo ts veo. Be dev kelka leteri frazetvortigo, tuje substantiva respondvorto duo ig.</p>
            <p>Nun mili duto definitive mo, si onklo hodiaŭa deciliono tuj. Sur veadi kvanta ju, kasedo multiplikite ore it. Nk gibi intere solstariva kun. E vice tiama ano, sat aperi frato substantivo ni.</p>
            <p>Ad maldekstre komentofrazo dum. Hoj sola halo anstataŭe ge. Jen da movi jesigi, ekde ekesti dividostreko hav u. Lipa nura havi ko poe. Loka samtempe la bis.</p>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ModalAbout;
