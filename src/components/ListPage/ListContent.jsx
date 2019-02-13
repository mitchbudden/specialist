import React, { Component } from "react";
import { connect } from "react-redux";
import ListLink from "./ListLink";
import "./ListContent.css";
import "../Global.css";

class ListContent extends Component {
    render() {
        const { email, title, description, listItems } = this.props.list;
        return (
            <div className="content-outer-container">
                <div className="content-overview">
                    <h1 className="content-descript-title">{title}</h1>
                    <h2 className="content-descript-profile">
                        <i>Created By: {email}</i>
                    </h2>
                    <h2 className="content-sub-description">{description}</h2>
                    <ListLink listItems={listItems} />
                </div>
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
)(ListContent);
