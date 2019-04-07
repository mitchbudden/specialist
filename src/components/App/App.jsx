import React, { Component } from "react";
import { firebaseApp } from "../../firebase";
import { connect } from "react-redux";
import Lists from "./Lists.jsx";
import "./App.css";
import "../Global.css";
import { browserHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconList } from "../../constants/listCategoryIcons";
import logo from "../../images/logo.jpg";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterIcon: "",
            filterEntered: false,
            searchTerm: "",
            hasBeenReset: false
        };
        this.icons = iconList;
        this.showIcons = false;
    }

    signOut() {
        firebaseApp.auth().signOut();
        browserHistory.push("/signin");
    }

    filterLists() {
        this.showIcons = this.showIcons ? false : true;
        this.forceUpdate();
        if (document.getElementById("filter-button")) {
            document.getElementById("filter-button").blur();
        }
        this.refs.iconsList.scrollIntoView();
    }

    addIcon(icon) {
        let value = Object.values(icon)[0].name;
        let hasIconBeenSelected = !Object.values(icon)[0].selected;
        let valueId = value + "-filter-button";

        this.showIcons = false;

        this.setState({
            filterIcon: value,
            filterEntered: hasIconBeenSelected,
            hasBeenReset: false
        });

        this.icons.forEach(item => (item.selected = false));
        this.icons.forEach(item => {
            if (item.name === value) {
                item.selected = hasIconBeenSelected;
            }
        });

        if (document.getElementById(valueId)) {
            document.getElementById(valueId).blur();
        }
        this.forceUpdate();
    }

    enterSearchTerm() {
        this.setState({ filterEntered: true, hasBeenReset: false });
        document.getElementById("search-button").blur();
        this.showIcons = false;
        this.forceUpdate();
    }

    resetSearchParameters() {
        this.setState({
            filterIcon: "",
            filterEntered: false,
            searchTerm: "",
            hasBeenReset: true
        });
        this.icons.forEach(item => (item.selected = false));
        document.getElementById("reset-search-button").blur();
        this.forceUpdate();
        this.refs.iconsList.scrollIntoView();
    }

    render() {
        return (
            <div style={{ margin: "5px" }}>
                <div className="logo-flex">
                    <img className="logo" src={logo} alt="blue links" />
                </div>
                <div className="landing-container">
                    <h1 className="landing-title">
                        Share links to your favorite things. <br />
                        Get paid doing it.
                    </h1>
                </div>
                <div className="list-option-headers">
                    <div className="list-expansion">
                        <h1 className="list-option-title">
                            Make Money Sharing The Things You Love
                        </h1>
                        <a href="/addlist">
                            <button className="primary-button app-section-header list-option-title">
                                Create a List
                            </button>
                        </a>
                    </div>
                    <div className="list-expansion">
                        <h1 className="list-option-title">
                            Learn What the Experts Use
                        </h1>
                        <button
                            className="primary-button app-section-header list-option-title"
                            onClick={() => this.filterLists()}
                            id="filter-button"
                            disabled={this.state.filterEntered}
                        >
                            Find a List
                        </button>
                    </div>
                </div>
                <div ref="iconsList">&nbsp;</div>
                {this.showIcons ? (
                    <div className="icon-group">
                        <div className="search-container">
                            <h4 className="search-title">Search for a List:</h4>
                            <input
                                className="search-input"
                                type="text"
                                onChange={event =>
                                    this.setState({
                                        searchTerm: event.target.value
                                    })
                                }
                            />
                            <button
                                className="primary-button"
                                id="search-button"
                                onClick={() => this.enterSearchTerm()}
                            >
                                Search
                            </button>
                        </div>
                        <h4 className="list-option-title">
                            Or
                            <br />
                            Select a Category:
                        </h4>
                        {this.icons.map((icon, index) => {
                            return (
                                <div className="icon-and-description">
                                    <h4>{icon.description}</h4>
                                    <button
                                        className={
                                            "icon-button " +
                                            (icon.selected
                                                ? "selected-icon"
                                                : "")
                                        }
                                        onClick={() => this.addIcon({ icon })}
                                        key={index}
                                        id={icon.name + "-filter-button"}
                                    >
                                        <FontAwesomeIcon
                                            size="4x"
                                            icon={icon.name}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div />
                )}
                {this.state.filterEntered ? (
                    <div className="reset-search-flex">
                        <button
                            className="primary-button reset-search"
                            onClick={() => this.resetSearchParameters()}
                            id="reset-search-button"
                        >
                            Reset Search
                        </button>
                    </div>
                ) : (
                    <div />
                )}
                <Lists
                    filterIcon={this.state.filterIcon}
                    filterEntered={this.state.filterEntered}
                    searchTerm={this.state.searchTerm}
                    hasBeenReset={this.state.hasBeenReset}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    null
)(App);
