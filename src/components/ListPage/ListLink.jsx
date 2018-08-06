import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Global.css';
import './ListContent.css';

class ListLink extends Component {

    render() {
        let linkItems = Object.values(this.props.listItems);
        return (
        <ul className="content-links-list">
            {linkItems.map((item, index) => {
                return (
                    <li className="content-link">
                        <a href={item.link}>{item.description}</a>
                    </li>
                )
            })}
        </ul>    
        )   
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(ListLink);
