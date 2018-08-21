import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import AddList from './Add/AddList';
import Lists from './Lists.jsx';
import './App.css';
import '../Global.css';
import { browserHistory } from "react-router";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        filterKey: ''
    }
  }

  signOut() {
    firebaseApp.auth().signOut();
    browserHistory.push('/signin');
  }

  render() {
    return (
    <div style={{margin: '5px'}}>
      <div className="app-header">
        <h1 className="masthead">Special List</h1>
        <input type="text" 
              className="app-header-item"
              placeholder="Find a List"
              onChange={event => this.setState({filterKey: event.target.value})}/>
        {this.props.user.email ?
        <h1 className="welcome-message">Welcome {this.props.user.email}</h1>
        : <h1 className="app-header-item"><a href="signin">Sign In/ Sign Up</a></h1>
        }
      </div>
      <AddList />
      <h4 className="app-section-header">Lists</h4>
      <Lists filterKey={this.state.filterKey}/>
      <hr /> 
      {this.props.user.email ? <button className="primary-button"
              onClick={() => this.signOut()}> Sign Out</button>
      : <div></div>
      }
    </div>);
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, null)(App);
