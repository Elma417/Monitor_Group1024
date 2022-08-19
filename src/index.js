import React from "react";
//18
// import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MyRouter from "./router/index.js";

//18
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

//17
ReactDOM.render(
  <React.StrictMode>
    <MyRouter />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
