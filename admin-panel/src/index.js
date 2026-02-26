import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "./MasterAdmin.css";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/admin">
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
