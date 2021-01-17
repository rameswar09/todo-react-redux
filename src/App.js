import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/important" exact component={Home} />

    </div>
  );
}

export default App;
