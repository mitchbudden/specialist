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
        this.listHasBeenFiltered = false; // this is a super hacky fix. Need to work with Redux to make this actually work
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
            this.props.filterEntered === true &&
            this.props.searchTerm === "" &&
            this.filteredLists.length === 0
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
            // icon is un-selected
            this.props.filterEntered === false &&
            this.props.filterIcon.length > 0 &&
            this.props.searchTerm === "" &&
            this.state.shownLists !== this.props.lists
        ) {
            this.filteredLists = [];
            this.setState({ shownLists: this.props.lists });
        } else if (
            // search term is entered
            this.props.filterEntered === true &&
            this.props.filterIcon.length === 0 &&
            this.props.searchTerm !== ""
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
                this.noMatchingLists = true;
                if (!this.listHasBeenFiltered) {
                    this.forceUpdate();
                    this.listHasBeenFiltered = true;
                }
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
