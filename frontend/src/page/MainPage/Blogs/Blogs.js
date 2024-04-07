import React, { Component } from "react";

import "./Blogs.css";
import blogImage from "../../../assets/images/blog/blogimage.jpg";
import IdeaImage from "../../../assets/images/blog/ideaimage.jpg";
import YjsImage from "../../../assets/images/blog/yjsimage.jpg";
import WebrtcImage from "../../../assets/images/blog/webrtcimage.jpg";
import FirepadImage from "../../../assets/images/blog/firepadimage.jpg";
// import t1 from "../../../assets/images/person/t1.png";
// import t2 from "../../../assets/images/person/t2.png";
// import t3 from "../../../assets/images/person/t3.png";
// import t4 from "../../../assets/images/person/t4.png";

import Footer from "../Component/footer/Footer.js";
import Navbar from "../Component/Navbar/Navbar.js";

class Blogs extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className="main-blog">
        <Navbar />
        <div className="Image-blog">
          <img className="mainImage-blog" alt="img-blog" src={blogImage}></img>
        </div>

        <div className="text-center journey-div-blog">
          <h1 className="journey-heading-blog">
            CodeQuanta Journey{" "}
            <span className="inner-journey-blog">As Final Year Project</span>
          </h1>
        </div>

        <hr></hr>
        {/* CodeQuanta Journey */}
        <div className="container CodeQuantaJourney-blog">
          <div className="image-section-blog text-center">
            <img
              src={IdeaImage}
              alt="idea-img"
              className="idea-image-blog"
            ></img>
            <h3 className="title-journey-blog">HOW WE GOT IDEA?</h3>
            <p className="idea-para-blog">
              The idea of developing CodeQuanta was generated when a friend of
              us from india told us how tech candidates are recruited through
              series of tests to check their abilities and performance. As of
              Nepal, its completely different with the scenarios of india. So we
              thought of developing CodeQuanta to ease the technical interview
              process through a real time collaborative environment.
            </p>
          </div>
          <div className="problem-yjs-blog text-left text-center">
            <img src={YjsImage} alt="yjs-img" className="yjs-image-blog"></img>
            <h3 className="title-journey-blog">PROBLEM WITH YJS?</h3>
            <p className="yjs-para-blog">
              Yjs is a shared editing framework. It exposes Shared Types that
              can be manipulated like any other data type. And they provide real
              time collaborative environment!. The Problem that we got from the
              YJS framework was that, while making collaborative environment the
              synchronization of the editor was possible only when users were
              using same network but using different network the editor was not
              able to sysnchronize which is the main reason why we switched to
              firepad Framework.
            </p>
          </div>
        </div>

        {/* next section */}
        <div className="container CodeQuantaJourney-blog">
          <div className="image-section-blog text-center">
            <img
              src={FirepadImage}
              alt="firepad"
              className="firepad-image-blog"
            ></img>
            <h3 className="title-journey-blog">FIREPAD AS SOLUTION?</h3>
            <p className="firepad-para-blog">
              Due to the above problem we switched to the firepad which is a
              open source Framework for developing collaborative Environment.
              Most collaborative text editors require special code to run on a
              server, making them impractical to use if you're not already using
              the right server stack. Firepad has no server dependencies and
              instead relies on the Firebase Realtime Database for real-time
              data synchronization. We used firepad since we encounter the
              server problem with YJS framework inorder to make it work.
            </p>
          </div>
          <div className="problem-yjs-blog text-left text-center">
            <img
              src={WebrtcImage}
              alt="webrtc"
              className="webrtc-image-blog"
            ></img>
            <h3 className="title-journey-blog">webRTC?</h3>
            <p className="webrtc-para-blog">
              With WebRTC, we can add real-time communication capabilities to
              your application that works on top of an open standard. It
              supports video, voice, and generic data to be sent between peers,
              allowing developers to build powerful voice- and
              video-communication solutions. The technology is available on all
              modern browsers as well as on native clients for all major
              platforms.
            </p>
          </div>
        </div>

        {/* <div className="container team-lead-div-blog text-center">
          <h2 className="team-lead-heading-blog">Project Team Leads</h2>
        </div> */}

        {/* our team section */}

        {/* <div className="ourteam-section-blog">
          <div className="team1-blog text-center">
            <img src={t1} alt="t1" className="team-image-blog"></img>
            <h3 className="bio-name-blog">Ghanshyam Subedi</h3>
            <h5 className="bio-post-blog">(Supervisor)</h5>
          </div>

          <div className="team2-blog text-center">
            <img
              src={t2}
              alt="t1"
              onClick={() => window.open("https://www.prabinshrestha.info.np")}
              className="team-image-blog"
              style={{ cursor: "pointer" }}
            ></img>
            <h3 className="bio-name-blog">Prabin Shrestha</h3>
            <h5 className="bio-post-blog">(Team Leader)</h5>
          </div>

          <div className="team3-blog text-center">
            <img src={t3} alt="t1" className="team-image-blog"></img>
            <h3 className="bio-name-blog">Sagar Gurung</h3>
            <h5 className="bio-post-blog">(Member)</h5>
          </div>

          <div className="team4-blog text-center">
            <img src={t4} alt="t1" className="team-image-blog"></img>
            <h3 className="bio-name-blog">Nischal Bhandari</h3>
            <h5 className="bio-post-blog">(Member)</h5>
          </div>
        </div> */}

        {/* thanks section */}

        {/* <div className="container last-section-blog-blog text-center">
          <h3 className="thanking-blog">
            Thanking Everyone For Making{" "}
            <span className="special-word-thank-blog">
              Major Project Successfull!!
            </span>
          </h3>
        </div> */}
        <Footer />
      </div>
    );
  }
}

export default Blogs;
