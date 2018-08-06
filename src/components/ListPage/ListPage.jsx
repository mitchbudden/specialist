import React, { Component } from "react";
import { listsRef } from '../../firebase'
import { connect } from 'react-redux';
import { setLists } from '../../actions';
import ListContent from './ListContent';
import '../Global.css';
import './ListPage.css';

class ListPage extends Component {

    componentDidMount() {
        const paramName = this.props.params.id;
        listsRef.on('value', data => {
            let lists = [];
            data.forEach(list => {
                const { email, title, description, image, listItems } = list.val();
                const serverKey = list.key;
                if (title === paramName) {
                    lists.push({email, title, description, image, listItems, serverKey});
                }
            })
            this.props.setLists(lists);
        })
    }

    render() {
        return (
            <div>
                <div className="app-header">
                    <h1 className="masthead">
                        <a href="app"><i>Special List</i></a>
                    </h1>
                    <h1 className="app-header-item"><a href="signin">Sign In/ Sign Up</a></h1>
                </div>
                <div className="content-container">
                    {this.props.lists.map((list, index) => {
                        return (
                            <ListContent key={index} 
                                    list={list}>
                            </ListContent>
                        )
                    })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { lists } = state;
    return { lists };
}

export default connect(mapStateToProps, { setLists })(ListPage);
