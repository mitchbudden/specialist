import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoalItem extends Component {

    render() {
        const { email, title } = this.props.goal;
        return (
        <div style={{margin: '5px'}}>
            <strong>{title}</strong>
            <span style={{margin: '5px'}}> submitted by <em>{email}</em></span>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(GoalItem);
