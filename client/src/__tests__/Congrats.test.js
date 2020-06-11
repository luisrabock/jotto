import React from "react";
import { mount } from "enzyme";

import LanguageContext from "../contexts/languageContext";
import successContext from "../contexts/sucessContext";
import { findByTestAttr } from "../../tests/testUtils";

import Congrats from "../Congrats";

const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats success={success} />
      </successContext.SuccessProvider>
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

it("Renders no text when `Success` is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

it("Renders no empty congrats when `success` is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "component-congrats");
  expect(message.text().length).not.toBe(0);
});
