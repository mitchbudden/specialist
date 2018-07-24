import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/ListItem.css';

class ListItem extends Component {

    render() {
        const { email, title } = this.props.list;
        return (
        <div className="list-item-card">
            <h1 className="list-header">{title}</h1>
            <h2 className="list-description">submitted by {email}</h2>
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(ListItem);
