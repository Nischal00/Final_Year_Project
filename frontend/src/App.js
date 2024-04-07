import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./page/MainPage/Main/Main";
import Features from "./page/MainPage/Features/Features";
import Blogs from "./page/MainPage/Blogs/Blogs";
import Login from "./page/HomePage/Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/features" exact component={Features} />
          <Route path="/blogs" exact component={Blogs} />
          <Route path="/:roomID" exact component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
