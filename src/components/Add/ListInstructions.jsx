import React, { Component } from "react";
import { connect } from "react-redux";
import "../Global.css";
import "./ListInstructions.css";

class ListInstructions extends Component {
    render() {
        return (
            <div className="list-instructions-outer">
                <h4>
                    Enter your contact information and a list of links to your
                    favorite things off Amazon
                </h4>
                <h4>
                    We review your list, and if it meets our guidelines, we put
                    it on Blue Links
                </h4>
                <h4>
                    When people like the items on your list and buy them, you
                    get money for your recommendation!
                </h4>
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
)(ListInstructions);
