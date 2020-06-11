import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "../../contexts/sucessContext";

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

it("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

it("useSuccess does not throw error when wrapper in SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow("useSuccess must be used within a SuccessProvider");
});
