import React, { Component } from "react";
import { connect } from "react-redux";
import "../Global.css";

class RedirectPage extends Component {
    render() {
        console.log("getting here");

        return <h1>Getting Here</h1>;
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    null
)(RedirectPage);
