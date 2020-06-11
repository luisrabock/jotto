import React from "react";
import { mount } from "enzyme";

import { findByTestAttr } from "../../tests/testUtils";
import hookActions from "../actions/hookActions";
import App from "../App";

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest
    .fn()
    .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
  React.useReducer = mockUseReducer;
  return mount(<App />);
};
it("App renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.length).toBe(1);
});

describe("getSecretWorld calls", () => {
  it("getSecretWorld gets called on App mount", () => {
    setup();

    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  it("secret world does not update on App update", () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    //wrapper.update doesn't trigger update, issue open
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe("secretWord is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup("party");
  });
  it("renders the app when secretWord is not null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    expect(appComponent.exists()).toBe(true);
  });
  it("does not renders the spinner when secretWord is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe("secretWord is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });
  it("does not renders the app when secretWord is null", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");

    expect(appComponent.exists()).toBe(false);
  });
  it("renders the spinner when secretWord is null", () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");

    expect(spinnerComponent.exists()).toBe(true);
  });
});
