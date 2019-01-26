import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import Lists from './Lists.jsx';
import './App.css';
import '../Global.css';
import { browserHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconList } from '../../constants';
import logo from '../../images/logo.jpg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterKey: '',
      filterEntered: false
    }
    this.icons = iconList;
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

  addIcon(icon) {
    let value = Object.values(icon)[0].name;
    let valueId = value + "-filter-button";

    // TODO wtf why doesn't this work?
    this.setState({ filterKey: value });
    this.setState({ filterEntered: true });

    this.icons.forEach(item => {
      if (item.name === value) {
        item.selected = item.selected === true ? false : true;
      }
    });

    if (document.getElementById(valueId)) {
      document.getElementById(valueId).blur();
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div style={{ margin: '5px' }}>
        <img className="logo" src={logo} alt="blue links" />
        <div className="list-option-headers">
          <div className="list-expansion">
            <h1 className="list-option-title">Make Money Sharing Your Expertise</h1>
            <a href="/addlist">
              <button className="primary-button app-section-header list-option-title">
                Add A List
          </button></a>
          </div>
          <div className="list-expansion">
            <h1 className="list-option-title">Find Out What the Experts Use</h1>
            <button className="primary-button app-section-header list-option-title"
              onClick={() => this.filterLists()}
              id="filter-button">Filter Lists
                  <FontAwesomeIcon size="sm" icon="filter" />
            </button>
          </div>
        </div>
        {this.showIcons ?
          <div className="icon-group">
            {this.icons.map((icon, index) => {
              return (
                <button className={"icon-button " + (icon.selected ? "selected-icon" : "")}
                  onClick={() => this.addIcon({ icon })}
                  key={index}
                  id={icon.name + "-filter-button"}>
                  <FontAwesomeIcon size="2x" icon={icon.name} /></button>
              )
            })}
          </div>
          : <div></div>
        }
        <Lists filterKey={this.state.filterKey} filterEntered={this.state.filterEntered} />
      </div>);
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, null)(App);
