import React, { Component } from "react";
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import '../Global.css';
class ListPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Working!
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(ListPage);
