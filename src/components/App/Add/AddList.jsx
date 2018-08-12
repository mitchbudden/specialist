import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListInputGroup from './ListInputGroup';
import '../../Global.css';
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
                    {this.props.user.email ? 
                    <button className="primary-button add-list-button"
                            onClick={() => this.openInput()}>&#45;</button>
                    : <h4 className="spcl-warning"><i>Log in or sign up to add a list</i></h4>        
                    }
                </div>
                <ListInputGroup />
            </div>
            )
        } else {
            return (
            <div>
                <div className="list-expansion">
                    <h4>Add a List</h4>
                    {this.props.user.email ? 
                    <button className="primary-button add-list-button"
                            onClick={() => this.openInput()}>&#43;</button>
                    : <h4 className="spcl-warning"><i>Log in or sign up to add a list</i></h4>        
                    }
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