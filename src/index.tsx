import * as React from "react";
import { render } from "react-dom";
import { config } from "./overmind";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";

import App from "./components/App";

const overmind = createOvermind(config, {
  devtools: "localhost:3031"
});

const rootElement = document.getElementById("root");
render(
  <Provider value={overmind}>
    <App />
  </Provider>,
  rootElement
);
