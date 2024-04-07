import React, { Component } from "react";
import Footer from "../Component/footer/Footer.js";
import "./Features.css";
import SupportLanguage from "../../../assets/images/feature/SupportLanguage.png";
import CodeEditorMain from "../../../assets/images/feature/CodeEditorMain.png";
import VideoAudioChat from "../../../assets/images/feature/Video-Audio-Chat.png";
import TeamCollaboration from "../../../assets/images/feature/TeamCollaboration.png";
import PreviousCode from "../../../assets/images/feature/PreviousCode.png";
import Navbar from "../Component/Navbar/Navbar.js";

class Features extends Component {
  render() {
    return (
      <div>
        <div className="main-feature">
          <Navbar />
          <div className="container text-center featureIntro-feature">
            <h2 className="ec-features-feature">CodeQuanta Features</h2>
            <h3>Everything You Need to Conduct Effective Coding Interviews</h3>
            <button
              className="start-entercoding-feature"
              onClick={() => this.props.history.push(`/`)}
            >
              Try CodeQuanta
            </button>
          </div>
          <hr className="feature-horizontal-feature"></hr>

          {/* feature section */}

          {/* support language */}
          <div className="container language-feature">
            <div className="feature-image-language-feature text-center">
              <img
                src={SupportLanguage}
                className="feature-image-feature"
                alt="support-lang"
              ></img>
            </div>
            <div className="what-language-feature text-left">
              <h2>14 Programing Languages</h2>
              <p className="what-para-feature">
                CodeQuanta supports a total of 14 programming language so that
                candidate can feel free to use any programming language as per
                their specific. In addition, each language have different
                versions of it. It all happens in your browser so no
                installation is required.
              </p>
            </div>
          </div>

          {/* Code Editor And Compiler*/}
          <div className="container editor-feature">
            <div className="what-editor-feature text-left">
              <h2>Code Editor and Compiler</h2>
              <p className="what-para-feature">
                CodeQuanta uses ace editor which is a standalone code editor
                with lots of features so that candidates can be comfortable.
                Also for the compilation CodeQuanta uses jdoodle API which is
                used by different coding platforms.
              </p>
            </div>

            <div className="feature-image-editor-feature text-center">
              <img
                src={CodeEditorMain}
                alt="code-editor"
                className="feature-image-feature"
              ></img>
            </div>
          </div>

          {/* Audio And Video*/}
          <div className="container audiovideo-feature">
            <div className="feature-image-audiovideo-feature text-center">
              <img
                src={VideoAudioChat}
                alt="video-audio"
                className="feature-image-feature"
              ></img>
            </div>

            <div className="what-audiovideo-feature text-left">
              <h2>Audio Video Chat</h2>
              <p className="what-para-feature">
                Not only there will be the shared coding environment but
                candidate can connect with Audio / Video feature using
                CodeQuanta for the smooth flow of the interview and peer
                programming. Communicate effectively with your candidates using
                audio and video calling as you run the code interview.
              </p>
            </div>
          </div>

          {/* Team Collaboration */}
          <div className="container collaboration-feature">
            <div className="what-collaboration-feature text-left">
              <h2>Team Collaboration</h2>
              <p className="what-para-feature">
                Directly invite your friends or interviewee sharing link or
                invite them through their emails and have an effective
                collaboration.
              </p>
            </div>

            <div className="feature-image-collaboration-feature text-center">
              <img
                src={TeamCollaboration}
                alt="team-collab"
                className="feature-image-feature"
              ></img>
            </div>
          </div>

          {/* Save Previous Code */}

          <div className="container saveprevious-feature">
            <div className="feature-image-saveprevious-feature text-center">
              <img
                src={PreviousCode}
                alt="previous-code"
                className="feature-image-feature"
              ></img>
            </div>

            <div className="what-saveprevious-feature text-left">
              <h2>Save Previous Code</h2>
              <p className="what-para-feature">
                CodeQuanta automatically saves the previous code before
                switching to any other programming lanuage. You can compare the
                compare code written in different programming language.
              </p>
            </div>
          </div>

          <h5 className="text-center other-features-feature">
            AND MANY OTHER FEATURES +
          </h5>
          <hr className="ending-horizontal-feature"></hr>

          <h3 className="text-center">Ready To Get Started?</h3>
          <div className="container text-center">
            <button
              className="start-entercoding-feature"
              onClick={() => this.props.history.push(`/`)}
            >
              Start
            </button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Features;
