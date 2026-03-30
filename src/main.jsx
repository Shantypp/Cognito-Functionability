import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Amplify } from "aws-amplify";
import App from "./App";
import awsConfig from "./aws-config";
import "./index.css";
import "./App.css";

Amplify.configure(awsConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);