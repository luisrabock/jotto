import React from "react";
import { mount } from "enzyme";

import { findByTestAttr, checkProps } from "../../tests/testUtils";
import languageContext from "../contexts/languageContext";
import successContext from "../contexts/sucessContext";
import guessedWordsContext from "../contexts/guessedWordsContext";

import Input from "../Input";

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={secretWord} />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

it("Renders without error", () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, "component-input");
  expect(inputComponent.length).toBe(1);
});

it("does not throw warning with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  it("state update with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toBeCalledWith("train");
  });

  it("field is cleared upon submit button click", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");

    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toBeCalledWith("");
  });
});

describe("languagePicker", () => {
  it("correctly renders submit string in english", () => {
    const wrapper = setup({});
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });
  it("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });

  it("input component does not show when success is true", () => {
    const wrapper = setup({ secretWord: "party", success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
