import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
// import { firebaseApp } from "./firebase";
import App from "./components/App/App";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
// import { logUser } from './actions';
import ListPage from './components/ListPage/ListPage';

const store = createStore(reducer);

/* Below logs users out on state change, we don't ever want this to occur
  TODO is to put sign in logic on the same page as App, and have things work 
  in the other direction so no one needs to sign in to use the page
*/ 

// firebaseApp.auth().onAuthStateChanged(user => {
//   if (user) {
//     const { email } = user;
//     store.dispatch(logUser(email));
//     browserHistory.push('/app');
//   } else {
//     browserHistory.replace('/signin');
//   }
// });

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/listpage/:id" component={ListPage} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
