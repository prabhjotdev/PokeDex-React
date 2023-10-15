import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/* In this code snippet, `ReactDOM.createRoot` is used to create a new root for rendering React
elements. The `document.getElementById("root")` is used to select the HTML element with the id
"root" where the React app will be rendered. */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
