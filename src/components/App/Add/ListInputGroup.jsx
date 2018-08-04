import React, { Component } from 'react';
import { listsRef } from '../../../firebase';
import { connect } from 'react-redux';
import '../Global.css';
import './AddList.css';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            image: ''
        }
        this.isOpen = false;
    }

    addList() {
        const newListObject = {
            title: this.state.title,
            email: this.props.user.email,
            description: this.state.description,
            image: this.state.image
        }
        listsRef.push(newListObject);
    }

    render() {
        return (
        <div className="list-input">
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Add a list"
                    className="form-control"
                    onChange={event => this.setState({title: event.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Add a description"
                    className="form-control"
                    onChange={event => this.setState({description: event.target.value})}
                />
                <input 
                    type="text"
                    placeholder="Add an image"
                    className="form-control"
                    onChange={event => this.setState({image: event.target.value})}
                />
                <button className="primary-button"
                        type="button"
                        onClick={() => this.addList()}>Submit
                </button>
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(AddList);