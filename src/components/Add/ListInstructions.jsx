import React, { Component } from "react";
import { connect } from "react-redux";
import "../Global.css";
import "./ListInstructions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListInstructions extends Component {
    constructor() {
        super();
        this.instructions = [
            {
                instruction: "Enter your contact information",
                icon: "smile"
            },
            {
                instruction:
                    "Create a list of links to your favorite things - on Amazon if possible",
                icon: "pen"
            },
            {
                instruction:
                    "We review your list, and if it meets our guidelines, we put it on Blue Links",
                icon: "thumbs-up"
            },
            {
                instruction:
                    "When people like the items on your list and buy them - if they are Amazon links - you get money for your recommendation!",
                icon: "money-bill"
            }
        ];
    }
    render() {
        return (
            <div className="list-instructions-outer">
                <h1 className="list-instruction-header">
                    How to Use Blue Links:
                </h1>
                {this.instructions.map((text, index) => {
                    return (
                        <div className="instructions-group" key={index}>
                            <FontAwesomeIcon icon={text.icon} size="2x" />
                            <h4 className="list-instruction">
                                {text.instruction}
                            </h4>
                        </div>
                    );
                })}
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
