import React, { Component } from "react";
import { connect } from "react-redux";
import ListInputGroup from "./ListInputGroup";
import logo from "../../images/logo.jpg";
import "../Global.css";
import "./AddList.css";

class AddList extends Component {
    render() {
        return (
            <div>
                <a href="/">
                    <div className="logo-flex">
                        <img className="logo" src={logo} alt="blue links" />
                    </div>
                </a>
                <ListInputGroup />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(
    mapStateToProps,
    null
)(AddList);
