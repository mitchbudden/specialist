import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListInputGroup from './ListInputGroup';
import '../Global.css';
import './AddList.css';

class AddList extends Component {
    constructor(props) {
        super(props);
        this.isOpen = false;
    }

    openInput() {
        this.isOpen = this.isOpen === false ? true : false;
        this.forceUpdate();
        if (document.getElementById("open-input-button")) {
            document.getElementById("open-input-button").blur();
        }
    }

    render() {
        if (this.isOpen) {
            return (
                <div>
                    <div className="list-expansion">
                        <h4>Add a List</h4>
                        <button className="primary-button add-list-button"
                            onClick={() => this.openInput()}>&#45;</button>
                    </div>
                    <ListInputGroup />
                </div>
            )
        } else {
            return (
                <div className="list-expansion">
                    <h4 className="list-option-title">Make Money Sharing Your Expertise</h4>
                    <div className="add-list-option">
                        <button className="primary-button list-option-title"
                            onClick={() => this.openInput()}
                            id="open-input-button">Add a List</button>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(AddList);