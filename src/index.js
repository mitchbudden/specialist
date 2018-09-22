import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import { firebaseApp } from "./firebase";
import App from "./components/App/App";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { logUser } from './actions';
import ListPage from './components/ListPage/ListPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee, faUmbrellaBeach,
      faSwimmer, faSuitcase, faCookieBite, faMusic,
      faBook, faPodcast, faLaptop, faSnowflake } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faUmbrellaBeach, faSwimmer,
            faSuitcase, faCookieBite, faMusic, faBook, faPodcast,
            faLaptop, faSnowflake);

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    const { email } = user;
    store.dispatch(logUser(email));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/:id" component={ListPage} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
