import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/ListItem.css';

class ListItem extends Component {

    render() {
        const { email, title, description, image } = this.props.list;
        return (
            <div className="list-item-outer-card">
                <div className="list-item-card">
                    <h1 className="list-header">{title}</h1>
                    <h2 className="list-description">submitted by {email}</h2>
                    <h2 className="list-description">{description}</h2>
                </div>
                <img className="list-item-image"
                     src={image}
                     alt="thumbnail"></img> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(ListItem);
