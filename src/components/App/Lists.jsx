import React, { Component } from 'react';
import { listsRef } from '../../firebase';
import { connect } from 'react-redux';
import { setLists } from '../../actions';
import ListItem from './ListItem';

class Lists extends Component {
    componentDidMount() {
        listsRef.on('value', snap => {
            let lists = [];
            snap.forEach(list => {
                const { email, title } = list.val();
                const serverKey = list.key;
                lists.push({email, title, serverKey});
            })
            this.props.setLists(lists);
        })
    }

    render() {
        return (
            <div>
                {this.props.lists.map((list, index) => {
                    return (
                        <ListItem key={index} list={list}>{list.title}</ListItem>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { lists } = state;
    return { lists };
}

export default connect(mapStateToProps, { setLists })(Lists);