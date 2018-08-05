import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListPage.css';
import '../Global.css'

class ListContent extends Component {

    render() {
        const { email, title, description, image } = this.props.list;
        return (
            <div>
                <h1>{title}</h1>
                <h2>{email}</h2>
                <h2>{description}</h2>
                <img src={image}
                    alt={title}></img>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(ListContent);
