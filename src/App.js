import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import Input from "./Input";

const reducer = (state, action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  if (!state.secretWord) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">...Loading</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }
  return (
    <div className="container" data-test="component-app">
      <Input secretWord={state.secretWord} />
    </div>
  );
};

export default App;
