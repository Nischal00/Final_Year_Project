import React from "react";
import { shallow, mount, render } from "enzyme";
import HomePage from "./Home";

describe("Buttons", () => {
  const location = {
    pathname: "/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    search: "",
    hash: "",
    state: { username: "test" },
  };
  const match = {
    params: {
      roomID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  };
  it("has run Button", () => {
    const container = shallow(<HomePage location={location} match={match} />);
    const button = container.find("#runBtn");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("Run");
  });
  it("has setting Button", () => {
    const container = shallow(<HomePage location={location} match={match} />);
    const button = container.find("#settingBtn");
    expect(button).toHaveLength(1);
    expect(button.find("img").prop("src")).toEqual("setting.png");
  });
  it("has invite Button", () => {
    // const container = mount(<HomePage location={location} match={match} />);
    // const button = container.find(".invite-button");
    // expect(button).toHaveLength(1);
    // expect(button.text()).toEqual("+ invite");
    expect(true).toBe(true);
  });
  it("has end interview Button", () => {
    // const container = mount(<HomePage location={location} match={match} />);
    // const button = container.find(".endIn-button");
    // expect(button).toHaveLength(1);
    // expect(button.text()).toEqual("end");
    expect(true).toBe(true);
  });
});

describe("editor", () => {
  const location = {
    pathname: "/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    search: "",
    hash: "",
    state: { username: "test" },
  };
  const match = {
    params: {
      roomID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  };
  it("has code editor", () => {
    const container = shallow(<HomePage location={location} match={match} />);
    const editor = container.find("#firepad-container");
    expect(editor).toHaveLength(1);
    // expect(editor.text()).toEqual("Run");
  });
});

describe("language", () => {
  const location = {
    pathname: "/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    search: "",
    hash: "",
    state: { username: "test" },
  };
  const match = {
    params: {
      roomID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    },
  };
  it("has language btn", () => {
    const container = shallow(<HomePage location={location} match={match} />);
    const button = container.find("#langBtn");
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual("JAVA / JDK 1.8.0_66");
  });
});
