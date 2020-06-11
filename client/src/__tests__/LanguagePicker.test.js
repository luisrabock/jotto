import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps } from "../../tests/testUtils";
import LanguagePicker from "../LanguagePicker";

const mockSetLanguage = jest.fn();
const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage} />);
};

it("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-language-picker");
  expect(component.exists()).toBe(true);
});

it("does not throw a warning with expected props", () => {
  checkProps(LanguagePicker, { setLanguage: jest.fn() });
});
it("renders non-zero language icons", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");
  expect(languageIcons.length).toBeGreaterThan(0);
});

it("calls setLanguage prop upon click", () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, "language-icon");

  const firstIcon = languageIcons.first();
  firstIcon.simulate("click");

  expect(mockSetLanguage).toHaveBeenCalled();
});
