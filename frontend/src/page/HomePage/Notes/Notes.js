import React, { Component } from "react";
import { Editor } from "draft-js";
import "./Notes.css";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
  }
  componentDidMount() {
    this.editor && this.editor.focus(); // or however you want
  }
  render() {
    return (
      <div style={{ color: `${this.props.themeValue.textColor}` }}>
        <div className="notes-title">
          <span
            style={{
              color: `${this.props.themeValue.primaryColor}`,
            }}
          >
            #Notes
          </span>
          <br />
          Write notes about the interview here. These notes are only visible to
          you.
        </div>
        <Editor
          ref={(elt) => (this.editor = elt)}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Notes;
