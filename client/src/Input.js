import React from "react";
import PropTypes from "prop-types";

import StringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers/index";
import guessedWordsContext from "./contexts/guessedWordsContext";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/sucessContext";

const Input = ({ secretWord }) => {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return null;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={StringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );
            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount },
            ];
            setGuessedWords(newGuessedWords);
            console.log("currentGuess..", currentGuess);
            console.log("secretWord..", secretWord);
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            setCurrentGuess("");
          }}
        >
          {StringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
