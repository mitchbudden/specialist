import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListItem extends Component {
    render() {
        const { name, title, description, icon } = this.props.list;
        return (
            <div>
                <a
                    rel="noopener noreferrer"
                    className="card-link"
                    href={this.props.list.title}
                >
                    <div className="list-item-outer-card">
                        <div className="list-item-card">
                            <h1 className="list-header">{title}</h1>
                            <h2 className="list-description">
                                Submitted by {name}
                            </h2>
                            <h2 className="list-description">{description}</h2>
                        </div>
                        {icon.map((eachIcon, index) => {
                            return (
                                <FontAwesomeIcon
                                    icon={eachIcon}
                                    size="6x"
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </a>
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
)(ListItem);
