import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import AddList from './AddList';
import Lists from './Lists';

class App extends Component {

  signOut() {
    firebaseApp.auth().signOut();
  }

  render() {
    return (
    <div style={{margin: '5px'}}>
      <h3>Special List</h3>
      <AddList />
      <hr />
      <h4>Lists</h4>
      <Lists />
      <hr />    
      <button className="btn btn-danger"
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
