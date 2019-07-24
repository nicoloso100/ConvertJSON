import React, { Component } from "react";
import "./App.css";
import "./animate.css";

import AceEditor from "react-ace";

import "brace/mode/json";
import "brace/theme/twilight";
import Axios from "axios";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  state = {
    text: ""
  };

  onChange = text => {
    this.setState({ text: text });
  };

  verificaJson = () => {
    let json = this.state.text;
    let fixed = '"' + json.replace(/"/g, '\\"') + '"';
    Axios.post(`http://localhost:52671/api/Conversion/GetConversion`, fixed, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.addNotification(
            "success",
            "Verificado",
            "La estructura del Json es correcta"
          );
        } else {
          console.log(res);
          this.addNotification(
            "error",
            "warning",
            "No se ha interpretado la respuesta"
          );
        }
      })
      .catch(err => {
        console.log();
        this.addNotification(
          "danger",
          "error",
          "La estructura del Json NO es correcta"
        );
      });
  };

  addNotification(type, title, message) {
    this.notificationDOMRef.current.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animated", "flipInX"],
      animationOut: ["animated", "flipOutX"],
      dismiss: { duration: 4000 },
      dismissable: { click: true }
    });
  }

  render() {
    return (
      <React.Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="container">
          <div className="right">
            <AceEditor
              style={{ height: "100vh", width: "100%" }}
              placeholder="Placeholder Text"
              mode="json"
              theme="twilight"
              name="blah2"
              onChange={text => this.onChange(text)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={this.state.text}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </div>
          <div className="left">
            <h1>1) Escriba el Json</h1>
            <img
              className="arrow"
              src={require("./img/left-arrow.png")}
              alt="arrow"
            />
            <h1>2) Valide si el Json se puede convertir</h1>
            <div className="ButtonV" onClick={() => this.verificaJson()}>
              Verificar Json
            </div>
            <h1>3) Descargar XML:</h1>
            <div className="ButtonV">Descargar</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
