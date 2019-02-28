import React, { Component } from "react";
// import { newListsRef } from "../../firebase"; 'feature flag' for new lists to seperate db table
import { listsRef } from "../../firebase";
import { connect } from "react-redux";
import "../Global.css";
import "./AddList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconList } from "../../constants/listCategoryIcons";
import ListInstructions from "./ListInstructions";

// TODO split this into multiple components, it's the largest component by far
class ListInputGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            title: "",
            description: ""
        };
        this.selectedIcons = [];
        this.itemDescriptions = [""];
        this.links = [""];
        this.ableToInput = true;
        this.displayInputError = false;
        this.inputError = "";
        this.newListItems = [];
        this.icons = iconList;
        this.diableButtons = false;
    }

    addList() {
        let newListItemArray = [];
        for (let i = 0; i < this.itemDescriptions.length; i++) {
            let itemValues = {
                itemDesc: this.itemDescriptions[i],
                link: this.links[i]
            };
            newListItemArray.push(itemValues);
        }
        const newListObject = {
            name: this.state.name,
            email: this.state.email,
            title: this.state.title,
            description: this.state.description,
            icon: this.selectedIcons,
            listItems: newListItemArray
        };

        if (this.isNewListIsValid(newListObject)) {
            // newListsRef.push(newListObject);
            listsRef.push(newListObject);
            this.ableToInput = false;
            this.forceUpdate();
        } else {
            this.displayInputError = true;
            this.inputError =
                "Please complete all fields on the form to continue";
            this.forceUpdate();
        }
    }

    addListItem() {
        this.itemDescriptions.push("item");
        this.forceUpdate();
        if (document.getElementById("add-list-input-group-button")) {
            document.getElementById("add-list-input-group-button").blur();
        }
    }

    removeListItem() {
        if (this.itemDescriptions.length > 0) {
            this.itemDescriptions.pop();
            this.forceUpdate();
            if (document.getElementById("add-list-input-group-button")) {
                document.getElementById("add-list-input-group-button").blur();
            }
        }
    }

    handleNewListItem(input, index, type) {
        if (type === "description") {
            this.itemDescriptions[index] = input;
        } else if (type === "link") {
            this.links[index] = input;
        }
    }

    addIcon(icon) {
        let value = Object.values(icon)[0].name;
        let valueId = value + "-input-button";

        this.disableButtons = this.disableButtons === true ? false : true;

        if (this.selectedIcons.includes(value)) {
            this.selectedIcons = this.selectedIcons.filter(item => {
                return item !== value;
            });
        } else {
            this.selectedIcons.push(value);
        }

        this.icons.forEach(item => {
            if (item.name === value) {
                item.selected = item.selected === true ? false : true;
            }
        });
        this.forceUpdate();
        if (document.getElementById(valueId)) {
            document.getElementById(valueId).blur();
        }
    }

    isNewListIsValid(list) {
        let newListItems = Object.values(list);
        let isNewListValid = true;

        newListItems.forEach(item => {
            if (typeof item === "string") {
                if (item === "") {
                    isNewListValid = false;
                }
            } else {
                if (item.length === 0) {
                    isNewListValid = false;
                }
            }
        });

        return isNewListValid;
    }

    render() {
        if (this.ableToInput) {
            return (
                <div className="list-input">
                    <ListInstructions />
                    <div className="list-category">
                        <h4 className="list-input-title">Your Name: </h4>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="list-input-field"
                            onChange={event =>
                                this.setState({ name: event.target.value })
                            }
                        />
                    </div>
                    <div className="list-category">
                        <h4 className="list-input-title">Your Email: </h4>
                        <input
                            type="text"
                            placeholder="Your Email"
                            className="list-input-field"
                            onChange={event =>
                                this.setState({ email: event.target.value })
                            }
                        />
                    </div>
                    <div className="list-category">
                        <h4 className="list-input-title">
                            The Title of Your List:{" "}
                        </h4>
                        <input
                            type="text"
                            placeholder="List Title"
                            className="list-input-field"
                            onChange={event =>
                                this.setState({ title: event.target.value })
                            }
                        />
                    </div>
                    <div className="list-category">
                        <h4 className="list-input-title">
                            {" "}
                            Your List's Description:{" "}
                        </h4>
                        <textarea
                            type="text"
                            placeholder="Item description"
                            className="list-input-description"
                            onChange={event =>
                                this.setState({
                                    description: event.target.value
                                })
                            }
                        />
                    </div>
                    <div className="list-category-final">
                        <h4 className="list-input-title">
                            Select One Product Group:
                        </h4>
                        <div className="icon-group">
                            {this.icons.map((icon, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="icon-and-description"
                                    >
                                        <h4>{icon.description}</h4>
                                        <button
                                            className={
                                                "icon-button " +
                                                (icon.selected
                                                    ? "selected-icon"
                                                    : "")
                                            }
                                            onClick={() =>
                                                this.addIcon({ icon })
                                            }
                                            key={index}
                                            id={icon.name + "-input-button"}
                                            disabled={
                                                this.disableButtons &&
                                                !icon.selected
                                            }
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
                    </div>
                    <div className="list-category-group">
                        <h4 className="list-input-title">
                            Add List Items:
                            <button
                                className="primary-button add-list-button"
                                id="add-list-input-group-button"
                                onClick={() => this.addListItem()}
                            >
                                &#43;
                            </button>
                            <button
                                className="primary-button add-list-button"
                                id="add-list-input-group-button"
                                onClick={() => this.removeListItem()}
                            >
                                -
                            </button>
                        </h4>

                        <div className="each-list-group">
                            {this.itemDescriptions.map((item, index) => (
                                <div key={index}>
                                    <h4 className="item-number">{index + 1}</h4>
                                    <div className="list-item-input-group">
                                        <input
                                            type="text"
                                            placeholder="Enter an Item Description Here"
                                            className="list-item-desc-or-link"
                                            onChange={event =>
                                                this.handleNewListItem(
                                                    event.target.value,
                                                    index,
                                                    "description"
                                                )
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Enter an Item Link Here"
                                            className="list-item-desc-or-link"
                                            onChange={event =>
                                                this.handleNewListItem(
                                                    event.target.value,
                                                    index,
                                                    "link"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {this.displayInputError ? (
                        <h4 className="spcl-warning">{this.inputError}</h4>
                    ) : (
                        <br />
                    )}
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => this.addList()}
                    >
                        Submit
                    </button>
                    <div className="list-category-final" />
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="after-submit">
                        Thank you! Your list will be reviewed as soon as
                        possible, and we will reach out to you through email
                        shortly. <a href="/">Click here</a> to Return to the
                        homepage.
                    </h1>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    null
)(ListInputGroup);
