import React, { Component } from 'react';
import { listsRef } from '../../firebase';
import { connect } from 'react-redux';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    addList() {
        const { title } = this.state;
        const { email } = this.props.user;
        listsRef.push({email, title});
    }

    render() {
        return (
        <div className="form-inline">
            <div className="form-group">
                <input 
                    type="text"
                    placeholder="Add a list"
                    className="form-control"
                    style={{marginRight: '5px'}}
                    onChange={event => this.setState({title: event.target.value})}
                />
                <button className="btn btn-success"
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