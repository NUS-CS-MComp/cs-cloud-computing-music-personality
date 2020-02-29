import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import Categories from "./Categories/Categories";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/categories" component={Categories} />
  </Switch>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
