import React from "react";
import { shallow, mount } from "enzyme";
import checkPropTypes from "check-prop-types";

import LanguageContext from "../contexts/languageContext";
import Congrats from "../Congrats";
import { findByTestAttr, checkProps } from "../../tests/testUtils";

const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  );
};

describe("language picker", () => {
  it("correctly renders congrats string in english by default", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });
  it("correctly renders string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

it("Renders without error", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

it("Renders no text when `Success` prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

it("Renders no empty congrats when `success` prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "component-congrats");
  expect(message.text().length).not.toBe(0);
});

it("Does not throw a warning with expected props", () => {
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
