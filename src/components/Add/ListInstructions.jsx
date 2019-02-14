import React, { Component } from "react";
import { connect } from "react-redux";
import "../Global.css";
import "./ListInstructions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconList } from "../../constants";

class ListInstructions extends Component {
    constructor() {
        super();
        this.instructions = [
            {
                instruction: "Enter your contact information",
                icon: iconList[0].name
            },
            {
                instruction:
                    "Create a list of links to your favorite things - on Amazon if possible",
                icon: iconList[1].name
            },
            {
                instruction:
                    "We review your list, and if it meets our guidelines, we put it on Blue Links",
                icon: iconList[2].name
            },
            {
                instruction:
                    "When people like the items on your list and buy them, you get money for your recommendation!",
                icon: iconList[3].name
            }
        ];
    }
    render() {
        return (
            <div className="list-instructions-outer">
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
