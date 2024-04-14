import React, { Component } from "react";
import "./DropDownInvite.css";
import axios from "axios";
import { toast, Slide } from "material-react-toastify";

class DropDownInvite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      value: "",
      error: null,
      open: false,
    };
  }

  handleOpen = (value) => {
    this.setState({
      open: value,
    });
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var value = this.state.value.trim();

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: "",
        });
      }
    }
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null,
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    });
  };

  handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (emails) {
      var toBeAdded = emails.filter((email) => !this.isInList(email));

      this.setState({
        items: [...this.state.items, ...toBeAdded],
      });
    }
  };

  isValid(email) {
    let error = null;

    if (this.isInList(email)) {
      error = `${email} has already been added.`;
    }

    if (!this.isEmail(email)) {
      error = `${email} is not a valid email address.`;
    }

    if (error) {
      this.setState({ error });

      return false;
    }

    return true;
  }

  isInList(email) {
    return this.state.items.includes(email);
  }

  isEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  openInviteDialog = (value) => {
    this.setState({
      show: !this.state.show,
      emails: [],
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
      items: [],
      value: "",
      error: "",
    });
  };

  // api call

  requestToAPI = async () => {
    try {
      await axios.post(
        "http://localhost:8080/inviteothers",
        {
          emailId: this.state.items,
          roomId: this.props.roomID,
          username: this.props.username,
        }
      );
    } catch (e) {}
  };

  handleSend = () => {
    if (this.state.items.length > 0) {
      if (this.state.value === "") {
        this.requestToAPI();

        this.props.setApply(!this.props.apply);
        toast("Link Sent Successfull!!.", {
          position: "top-right",
          autoClose: true,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          pauseOnFocusLoss: false,
          progress: undefined,
          style: { zIndex: "200" },
        });

        this.setState({
          items: [],
          value: "",
        });
      } else if (this.state.value !== "" && this.isValid(this.state.value)) {
        this.setState({
          items: this.state.items.push(this.state.value),
        });

        this.requestToAPI();
        this.props.setApply(!this.props.apply);
        toast("Link Sent Successfull!!.", {
          position: "top-right",
          autoClose: true,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          pauseOnFocusLoss: false,
          progress: undefined,
          style: { zIndex: "200" },
        });

        this.setState({
          items: [],
          value: "",
        });
      }
    } else {
      if (this.state.value !== "" && this.isValid(this.state.value)) {
        this.setState({
          items: this.state.items.push(this.state.value),
        });

        this.requestToAPI();
        this.props.setApply(!this.props.apply);
        toast("Link Sent Successfull!!.", {
          position: "top-right",
          autoClose: true,
          transition: Slide,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          pauseOnFocusLoss: false,
          progress: undefined,
          style: { zIndex: "200" },
        });

        this.setState({
          items: [],
          value: "",
        });
      } else if (this.state.value === "") {
        this.setState({
          error: "Please enter Your email!!",
        });
      } else {
        this.isValid(this.state.value);
      }
    }
  };

  handleCopy = () => {
    this.copyInput.select();
    document.execCommand("copy");
    toast("Link copied.", {
      position: "top-right",
      autoClose: true,
      transition: Slide,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      pauseOnFocusLoss: false,
      progress: undefined,
      style: { zIndex: "200" },
    });
  };

  render() {
    return (
      <div
        className="dropdown-invite"
        style={
          this.props.themeValue.category === "dark"
            ? {
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }
            : {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }
        }
      >
        <div
          className="copyHeading"
          style={
            this.props.themeValue.category === "dark"
              ? { color: "#000000" }
              : { color: "#ffffff" }
          }
        >
          <b style={{ fontWeight: "600" }}>Invite via Link</b>
          <br></br>
          Copy the link and share it with the other person(s).
        </div>
        <div
          className="inputAndButton"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <input
            ref={(el) => (this.copyInput = el)}
            className={"inputCopy"}
            value={this.props.roomURL}
            readOnly
            style={
              this.props.themeValue.category === "dark"
                ? {
                    color: "#000000",
                    border: `1px solid ${this.props.themeValue.primaryColor}`,
                  }
                : {
                    color: "#ffffff",
                    border: `1px solid ${this.props.themeValue.primaryColor}`,
                  }
            }
          />
          <button
            className="copyButton"
            onClick={() => {
              this.handleCopy();
              this.props.setApply(!this.props.apply);
            }}
            style={{
              backgroundColor: this.props.themeValue.primaryColor,
            }}
          >
            Copy
          </button>
        </div>
        <div
          className="emailHeading"
          style={
            this.props.themeValue.category === "dark"
              ? { color: "#000000" }
              : { color: "#ffffff" }
          }
        >
          <b style={{ fontWeight: "600" }}>Invite via Emails</b>
          <br></br>
          We will send the link over email.
        </div>
        <div
          className="inputAndButton"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <input
            className={"input-email " + (this.state.error && " has-error")}
            value={this.state.value}
            placeholder="example@example.com"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleChange}
            onPaste={this.handlePaste}
            style={
              this.props.themeValue.category === "dark"
                ? {
                    color: "#000000",
                    border: `1px solid ${this.props.themeValue.primaryColor}`,
                  }
                : {
                    color: "#ffffff",
                    border: `1px solid ${this.props.themeValue.primaryColor}`,
                  }
            }
          />

          <button
            className="sendButton"
            onClick={() => {
              this.handleSend();

              // this.props.setApply(!this.props.apply);
            }}
            style={{
              backgroundColor: this.props.themeValue.primaryColor,
            }}
          >
            Send
          </button>
        </div>
        {this.state.error && <p className="error">{this.state.error}</p>}

        <div
          className="emailsList"
          style={{
            maxHeight: "20vh",
            overflow: "scroll",
            marginTop: "20px",
          }}
        >
          {this.state.items
            .map((item) => (
              <div
                className="tag-item"
                key={item}
                style={{
                  backgroundColor: this.props.themeValue.shadeColorInput,
                  color: this.props.themeValue.textColor,
                }}
              >
                {item}
                <button
                  type="button"
                  className="button"
                  onClick={() => this.handleDelete(item)}
                  style={{
                    backgroundColor: this.props.themeValue.shadeColorInput,
                    color: "#CC0000",
                  }}
                >
                  &times;
                </button>
              </div>
            ))
            .reverse()}
        </div>
      </div>
    );
  }
}

export default DropDownInvite;
