import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import AddList from './AddList';
import Lists from './Lists';
import './styles/App.css';
import './styles/Global.css'

class App extends Component {

  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    return (
    <div style={{margin: '5px'}}>
      <div className="app-header">
        <h1 className="app-header-item">Special List</h1>
        <h1 className="app-header-item">Sign In/ Sign Up</h1>
      </div>
      <AddList/>
      <h4 className="app-section-header">Most Popular Lists</h4>
      <Lists />
      <hr />    
      <button className="primary-button"
              onClick={() => this.signOut()}>
      Sign Out  
      </button>
    </div>);
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, null)(App);
