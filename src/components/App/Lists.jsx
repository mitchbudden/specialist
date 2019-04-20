import React, { Component } from "react";
import { listsRef } from "../../firebase";
import { connect } from "react-redux";
import { setLists } from "../../actions";
import ListItem from "./ListItem";
import "./Lists.css";
import "../Global.css";

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownLists: []
        };
        this.filteredLists = [];
        this.noMatchingLists = false;
    }

    componentDidMount() {
        listsRef.on("value", data => {
            let lists = [];
            data.forEach(list => {
                const { name, title, description, icon } = list.val();
                const serverKey = list.key;
                lists.push({ name, title, description, icon, serverKey });
            });
            this.props.setLists(lists);
            this.setState({ shownLists: lists });
            this.forceUpdate();
        });
    }

    componentDidUpdate() {
        if (
            // Icon is selected
            this.props.filterEntered &&
            this.props.searchTerm === "" &&
            this.filteredLists.length === 0 &&
            !this.props.hasBeenReset
        ) {
            if (this.props.filterIcon.length > 0) {
                this.props.lists.forEach(list => {
                    if (list.icon.indexOf(this.props.filterIcon) > -1) {
                        this.filteredLists.push(list);
                    }
                });
            }
            this.setState({ shownLists: this.filteredLists });
        } else if (
            // search term is entered
            this.props.filterEntered &&
            this.props.filterIcon.length === 0 &&
            this.props.searchTerm !== "" &&
            this.filteredLists.length === 0 &&
            !this.props.hasBeenReset
        ) {
            let term = this.props.searchTerm.toLowerCase();

            this.props.lists.forEach(list => {
                let lowerCaseListName = list.title.toLowerCase();
                if (lowerCaseListName.indexOf(term) > -1) {
                    this.filteredLists.push(list);
                }
            });

            if (
                this.filteredLists.length &&
                this.filteredLists !== this.state.shownLists
            ) {
                this.noMatchingLists = false;
                this.setState({ shownLists: this.filteredLists });
            } else {
                if (!this.noMatchingLists) {
                    this.forceUpdate();
                }
                this.noMatchingLists = true;
            }
        } else if (
            // reset is selected
            !this.props.filterEntered &&
            this.props.filterIcon === "" &&
            this.props.searchTerm === "" &&
            this.props.hasBeenReset
        ) {
            this.filteredLists = [];
            if (
                this.state.shownLists !== this.props.lists &&
                !this.noMatchingLists
            ) {
                this.setState({ shownLists: this.props.lists });
            } else if (this.noMatchingLists) {
                // If reseting after no matches
                this.noMatchingLists = false;
                this.forceUpdate();
            }
        }
    }

    render() {
        return (
            <div className="list-group">
                {this.noMatchingLists ? (
                    <h1 className="list-option-title">
                        Sorry, no lists matched your search term. Please try
                        again.
                    </h1>
                ) : (
                    this.state.shownLists.map((list, index) => {
                        return (
                            <ListItem key={index} list={list}>
                                {list.title}
                            </ListItem>
                        );
                    })
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lists } = state;
    return { lists };
}

export default connect(
    mapStateToProps,
    { setLists }
)(Lists);
