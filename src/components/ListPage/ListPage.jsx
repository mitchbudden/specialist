import React, { Component } from "react";
import { listsRef } from "../../firebase";
import { connect } from "react-redux";
import { setLists } from "../../actions";
import ListContent from "./ListContent";
import "../Global.css";
import "./ListPage.css";
import logo from "../../images/logo.jpg";

class ListPage extends Component {
    componentDidMount() {
        const paramName = this.props.params.id;
        listsRef.on("value", data => {
            let lists = [];
            data.forEach(list => {
                const { email, title, description, listItems } = list.val();
                const serverKey = list.key;
                if (title === paramName) {
                    lists.push({
                        email,
                        title,
                        description,
                        listItems,
                        serverKey
                    });
                }
            });
            this.props.setLists(lists);
        });
    }

    render() {
        return (
            <div>
                <a href="/">
                    <img className="logo" src={logo} alt="blue links" />
                </a>
                <div className="content-container">
                    {this.props.lists.map((list, index) => {
                        return <ListContent key={index} list={list} />;
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { lists } = state;
    return { lists };
}

export default connect(
    mapStateToProps,
    { setLists }
)(ListPage);
