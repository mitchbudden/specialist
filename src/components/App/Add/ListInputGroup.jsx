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
                <div className="list-category">
                    <h4 className="list-input-title">Title: </h4>
                    <input 
                        type="text"
                        placeholder="List Title"
                        className="list-input-field"
                        onChange={event => this.setState({title: event.target.value})}
                    />
                </div>
                <div className="list-category">
                    <h4 className="list-input-title">Description: </h4>                    
                    <input 
                        type="text"
                        placeholder="List description"
                        className="list-input-field"
                        onChange={event => this.setState({description: event.target.value})}
                    />
                </div>
                <div className="list-category">
                    <h4 className="list-input-title">Thumbnail Image: </h4>
                    <input 
                        type="text"
                        placeholder="thumbnail image"
                        className="list-input-field"
                        onChange={event => this.setState({image: event.target.value})}
                    />
                </div>
                <button className="primary-button"
                        type="button"
                        onClick={() => this.addList()}>Submit
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(AddList);