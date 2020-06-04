import React from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import { Provider } from "react-redux";
import store from "./store";
import Details from "./Details";
import SearchParams from "./SearchParams";
// import ThemeContext from "./ThemeContext";


// Took all THEME out bc we don't need to use Context with Redux
const App = () => {
  // const theme = useState("darkblue");
  return (
    <Provider store={store}>  
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));