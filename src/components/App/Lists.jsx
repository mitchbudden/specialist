import React, { Component } from 'react';
import { listsRef } from '../../firebase';
import { connect } from 'react-redux';
import { setLists } from '../../actions';
import ListItem from './ListItem';
import './Lists.css';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            shownLists: []
        }
    }

    componentDidMount() {
        listsRef.on('value', data => {
            let lists = [];
            data.forEach(list => {
                const { email, title, description, image, tags } = list.val();
                const serverKey = list.key;
                lists.push({email, title, description, image, serverKey, tags});
            })
            this.props.setLists(lists);
            this.setState({shownLists: lists});
            this.forceUpdate();
        })
    }

    componentDidUpdate() {
        var filteredLists = [];
        if (this.props.filterEntered === true){
            if (this.props.filterKey.length > 0) {
                this.props.lists.forEach(list => {
                    if (list.tags.indexOf(this.props.filterKey) > -1) {
                        filteredLists.push(list);
                    }
                });
                this.setState({shownLists: filteredLists});
            } else {
                this.setState({shownLists: this.props.lists});
            }
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