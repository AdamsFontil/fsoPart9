// import React from 'react'
// import ReactDOM from 'react-dom/client'

// import App from './App'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
