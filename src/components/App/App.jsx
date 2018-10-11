import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import AddList from './Add/AddList';
import Lists from './Lists.jsx';
import './App.css';
import '../Global.css';
import { browserHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconList } from '../../constants';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        filterKey: '',
        filterEntered: false
    }
    this.icons = iconList    
    this.showIcons = false;
  }

  signOut() {
    firebaseApp.auth().signOut();
    browserHistory.push('/signin');
  }

  filterLists() {
    this.showIcons = this.showIcons ? false : true;
    this.forceUpdate();
    if (document.getElementById("filter-button")) {
      document.getElementById("filter-button").blur();
    }
  }

  render() {
    return (
    <div style={{margin: '5px'}}>
      <div className="app-header">
        <h1 className="masthead">Specialisting</h1>
        {this.props.user.email ?
        <h1 className="welcome-message">Welcome {this.props.user.email}</h1>
        : <h1 className="app-header-item"><a href="signin">Sign In/ Sign Up</a></h1>
        }
      </div>
      <AddList />
      <h4 className="app-section-header">Filter Lists
        <button className="primary-button add-list-button"
                onClick={() => this.filterLists()}
                id="filter-button">
                <FontAwesomeIcon size="sm" icon="filter" />
        </button>
      </h4>
      { this.showIcons ?
      <div className="icon-group">
          {this.icons.map((icon, index) => {
              return (
                  <button className={"icon-button " + (icon.selected ? "selected-icon" : "")}
                      onClick={() => this.addIcon({icon})}
                      key={index}>
                      <FontAwesomeIcon size="2x" icon={icon.name}/></button>
              )
          })}
      </div>
      : <div></div>
      }
      <Lists filterKey={this.state.filterKey} filterEntered={this.state.filterEntered}/>
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
