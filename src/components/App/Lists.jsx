import React, { Component } from 'react';
import { listsRef } from '../../firebase';
import { connect } from 'react-redux';
import { setLists } from '../../actions';
import ListItem from './ListItem';
import './Lists.css';

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shownLists: []
        }
        this.filteredLists = [];
    }

    componentDidMount() {
        listsRef.on('value', data => {
            let lists = [];
            data.forEach(list => {
                const { email, title, description, icon } = list.val();
                const serverKey = list.key;
                lists.push({ email, title, description, icon, serverKey });
            })
            this.props.setLists(lists);
            this.setState({ shownLists: lists });
            this.forceUpdate();
        })
    }

    componentDidUpdate() {
        if (this.props.filterEntered === true && this.filteredLists.length === 0) {
            if (this.props.filterKey.length > 0) {
                this.props.lists.forEach(list => {
                    if (list.icon.indexOf(this.props.filterKey) > -1) {
                        this.filteredLists.push(list);
                    }
                });
            }
            this.setState({ shownLists: this.filteredLists });
        }
    }

    render() {
        return (
            <div className="list-group">
                {this.state.shownLists.map((list, index) => {
                    return (
                        <ListItem key={index}
                            list={list}>{list.title}
                        </ListItem>
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