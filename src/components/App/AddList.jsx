import React, { Component } from 'react';
import { listsRef } from '../../firebase';
import { connect } from 'react-redux';
import './styles/Global.css';
import './styles/AddList.css';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            image: '',
        }
    }

    addList() {
        const { title } = this.state;
        const { email } = this.state;
        const { description } = this.state;
        const { image } = this.state;
        listsRef.push({email, title, description, image});
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
                    placeholder="Add a description s"
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