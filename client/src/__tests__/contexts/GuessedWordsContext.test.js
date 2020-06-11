import React from "react";
import { shallow, mount } from "enzyme";

import {
  GuessedWordsProvider,
  useGuessedWords,
} from "../../contexts/guessedWordsContext";

const FunctionalComponent = () => {
  useGuessedWords();
  return <div />;
};

it("useGuessedWords throws error when not wrapped in GuessedWordsProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useGuessedWords must be used within a GuessedWordsProvider");
});

it("useGuessedWords does not throw error when wrapper in GuessedWordsProvider", () => {
  expect(() => {
    shallow(
      <GuessedWordsProvider>
        <FunctionalComponent />
      </GuessedWordsProvider>
    );
  }).not.toThrow();
});
