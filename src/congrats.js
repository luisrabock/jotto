import React from "react";

import LanguageContext from "./contexts/LanguageContext";
import successContext from "./contexts/SucessContext";
import StringsModule from "./helpers/strings";

const Congrats = () => {
  const language = React.useContext(LanguageContext);
  const [success] = successContext.useSuccess();
  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {StringsModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats"></div>;
  }
};

export default Congrats;
