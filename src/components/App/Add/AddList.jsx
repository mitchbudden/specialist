import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListInputGroup from './ListInputGroup';
import '../Global.css';
import './AddList.css';

class AddList extends Component {
    constructor(props){
        super(props);
        this.isOpen = false;
    }
    
    openInput() {
        this.isOpen = this.isOpen === false ? true : false;
        this.forceUpdate();
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
            <div>
                <div className="list-expansion">
                    <h4>Add a List</h4>
                    <button className="primary-button add-list-button"
                            onClick={() => this.openInput()}>&#43;</button>
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