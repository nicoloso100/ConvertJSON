import React, { Component } from "react";
import ArrowImage from "./images/left-arrow.png";

import "./wizard.css";
import {
  obtieneVerificacionJson,
  obtieneArchivoXML
} from "../../services/wizardServices";

import { saveAs } from "file-saver";

class Wizard extends Component {
  ajustaJson = () => {
    let json = this.props.text;
    let fixedJson = '"' + json.replace(/"/g, '\\"') + '"';
    return fixedJson;
  };

  verificaJson = () => {
    obtieneVerificacionJson(this.ajustaJson(), this.props.addNotification);
  };

  descargaXML = () => {
    function getData(data) {
      var blob = new Blob([data], {
        type: "application/xml"
      });
      saveAs(blob, "ConvertedFile.xml");
    }
    obtieneArchivoXML(this.ajustaJson(), this.props.addNotification, getData);
  };

  render() {
    return (
      <div className="left">
        <h1>1) Escriba el Json</h1>
        <img className="arrow" src={ArrowImage} alt="arrow" />
        <h1>2) Valide si el Json se puede convertir</h1>
        <div className="ButtonV" onClick={() => this.verificaJson()}>
          Verificar Json
        </div>
        <h1>3) Descargar XML:</h1>
        <div className="ButtonV" onClick={() => this.descargaXML()}>
          Descargar
        </div>
      </div>
    );
  }
}

export default Wizard;
