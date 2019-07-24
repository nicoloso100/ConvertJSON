import React, { Component } from "react";

import AceEditor from "react-ace";
import "brace/mode/json";
import "brace/theme/twilight";

import "./textEditor.css";

class TextEditor extends Component {
  state = {
    text: ""
  };

  onChange = text => {
    this.props.setText(text);
  };

  render() {
    return (
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
          value={this.props.getText()}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </div>
    );
  }
}

export default TextEditor;
