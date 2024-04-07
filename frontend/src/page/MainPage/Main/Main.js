import React, { Component } from "react";
import "./Main.css";
import Navbar from "../Component/Navbar/Navbar.js";
import Footer from "../Component/footer/Footer.js";
import lapse1 from "../../../assets/videos/lapse.mp4";
import Dialouge from "../../../assets/images/main/Dialouge.png";
import macpic from "../../../assets/images/main/mac-pic.png";
import one from "../../../assets/images/svg/one.svg";
import two from "../../../assets/images/svg/two.svg";
import three from "../../../assets/images/svg/three.svg";
import { v4 as uuidv4 } from "uuid";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: "",
    };
  }
  setRoom = (room) => {
    this.setState({
      room: room,
    });
  };

  componentDidMount() {
    this.setRoom(uuidv4());
  }

  render() {
    return (
      <div className="main-page">
        <Navbar />
        <div className="wrapper-page">
          {/* heading */}
          <div className="intro-heading-page">
            <h1 className="intro-page">Your Online Platform for</h1>
            <h1 className="intro-page">Coding Interviews</h1>
          </div>
          <div className="heading-description-page text-center">
            <p className="intro-para-page">
              CodeQuanta enables candidates and recruiters to conduct online
              <br></br>
              interviews in a real-time shared coding environment.
            </p>
            <button
              className="try-demo-page"
              onClick={() => this.props.history.push(`/${this.state.room}`)}
            >
              Start
            </button>
          </div>

          {/* video */}
          <div className="container video-lapse-page text-center ">
            <video autoPlay loop width="90%" muted>
              <source src={lapse1} type="video/mp4" />
            </video>
          </div>

          {/* about section */}

          <div className="container about-page">
            <div className="what-entercoding-page text-center">
              <h2>What is CodeQuanta?</h2>
              <p className="what-entercoding-para-page">
                CodeQuanta in an online code interview platform to provide
                complete tech interview practise.Improve your interviewing
                skill, learn from your peers, and become comfortable performing
                under pressure within an interview setting.
              </p>
            </div>
            <div className="image-section-page text-center">
              <img
                src={Dialouge}
                alt="entercoding-img"
                className="entercoding-image-page"
              ></img>
            </div>
          </div>

          {/* next section */}
          <div className="container mac-image-page text-center">
            <h2>Why to use CodeQuanta?</h2>
            <img src={macpic} alt="mac-pic" className="mac-pic-page"></img>
          </div>
          {/* Description */}
          <div className="why-entercoding-page">
            <div className="container why-entercoding-inner-page">
              <div className="reason-1-page">
                <img src={one} alt="one" />
                <h6>Hire Best Developers</h6>
                <p className="reason1-para-page">
                  CodeQuanta helps recruiters to test their candidates and
                  review based on their performance in the test followed by
                  other Online Assessments.It helps the recruiters to onboard
                  the expert and best programmers for their company.
                </p>
              </div>
              <div className="reason-2-page">
                <img src={two} alt="two" />
                <h6>Peer Programming</h6>
                <p className="reason2-para-page">
                  Learn and share your logic with your peers and Communicate
                  effectively with your candidates using audio and video calling
                  as you run the CodeQuanta.
                </p>
              </div>
              <div className="reason-3-page">
                <img src={three} alt="three" />
                <h6>Evaluate Beyond CVs</h6>
                <p className="reason3-para-page">
                  An academic degree and a set of good grades isn’t always
                  relevant to spot the best developers. Also, as a tech
                  recruiter, you know that developers are not always good when
                  it comes to writing their resumes. A pre-employment
                  assessment, such as an online coding test, is a great way to
                  evaluate their actual coding skill.
                </p>
              </div>
            </div>
          </div>

          {/* last section */}
          <div className="container last-section-page text-center">
            <h4 className="enjoy-page">Enjoy programming with peers</h4>
            <h3 className="recruit-page">
              Or Recruit Through{" "}
              <span className="special-word-page">Remote Interview</span>
            </h3>
            <p className="outro-entercoding-para-page">
              Tech recruiters and engineering teams that care deeply about the
              candidate experience and want maximum flexibility to test a wide
              variety of skills. CodeQuanta could be a platform to transform
              your hiring process for the better moving forward.
            </p>
            <button
              className="try-demo-page"
              onClick={() => this.props.history.push(`/${this.state.room}`)}
            >
              Start Using CodeQuanta
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
