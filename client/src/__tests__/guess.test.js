import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../../tests/testUtils";

import successContext from "../contexts/sucessContext";
import guessedWordsContext from "../contexts/guessedWordsContext";

import Input from "../Input";
import GuessedWords from "../GuessedWords";

const setup = (guessedWordsStrings = [], secretWord = "party") => {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");

  // eslint-disable-next-line array-callback-return
  guessedWordsStrings.map((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });
  return [wrapper, inputBox, submitButton];
};

describe("test word guess", () => {
  let wrapper;
  let inputBox;
  let submitButton;

  describe("non-empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup(["agile"], "party");
    });

    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      it("Input component contains no children", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
    });

    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      it("Input box remains", () => {
        expect(inputBox.exists()).toBe(true);
      });

      it("GuessedWords table row count reflects update guess", () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
  describe("empty guessWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup([], "party");
    });
    it("guessedWords shows correct guesses after incorrect guess", () => {
      const mockEvent = { taget: { value: "train" } };
      inputBox.simulate("change", mockEvent);
      submitButton.simulate("click");
      const guessedWordsTableRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
