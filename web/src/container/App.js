import React, { Component } from "react";
import "./App.css";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import TextEditor from "../components/TextEditor/textEditor";
import Wizard from "../components/Wizard/wizard";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
    this.state = {
      text: ""
    };
  }

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

  setText = text => {
    this.setState({
      text: text
    });
  };

  getText = () => {
    return this.state.text;
  };

  render() {
    return (
      <React.Fragment>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="container">
          <TextEditor setText={this.setText} getText={this.getText} />
          <Wizard
            addNotification={this.addNotification}
            text={this.getText()}
          />
        </div>
      </React.Fragment>
    );
  }
}
