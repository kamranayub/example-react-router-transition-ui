import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import PreventTransitionsExample from "./PreventTransitionsExample";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <PreventTransitionsExample />
    </React.Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
