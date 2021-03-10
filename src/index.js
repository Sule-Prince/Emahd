import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";

ReactDom.render(<App />, document.querySelector("#root"));

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js").then((res) => {
    console.log("Registered", res.scope);
  });
}
