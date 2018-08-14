import React, { Component } from 'react';
import { listsRef } from '../../../firebase';
import { connect } from 'react-redux';
import '../../Global.css';
import './AddList.css';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            image: ''
        }
        this.itemDescriptions = [""];
        this.links = [""];      
        this.ableToInput = true;
        this.newListItems = [];
    }

    addList() {
        let newListItemArray = [];
        for (let i = 0; i < this.itemDescriptions.length; i++) {
            let itemValues = {
                itemDesc: this.itemDescriptions[i],
                link: this.links[i]
            };
            newListItemArray.push(itemValues);
        }
        const newListObject = {
            title: this.state.title,
            email: this.props.user.email,
            description: this.state.description,
            image: this.state.image,
            listItems: newListItemArray
        }
        listsRef.push(newListObject);
        this.ableToInput = false;
        this.forceUpdate();            
    }

    addListItem() {
        this.itemDescriptions.push("item");
        this.forceUpdate();        
    }

    handleNewListItem(input, index, type) {
        if (type === "description") {
            this.itemDescriptions[index] = input;
        } else if (type === "link") {
            this.links[index] = input;            
        }
    }

    render() {
        if (this.ableToInput) {
            return (
                <div className="list-input">
                    <div className="list-category">
                        <h4 className="list-input-title">Title: </h4>
                        <textarea 
                            type="text"
                            placeholder="List Title"
                            className="list-input-field"
                            onChange={event => this.setState({title: event.target.value})}
                        />
                    </div>
                    <div className="list-category">
                        <h4 className="list-input-title">Description: </h4>                    
                        <textarea 
                            type="text"
                            placeholder="List description"
                            className="list-input-field"
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </div>
                    <div className="list-category-final">
                        <h4 className="list-input-title">Link to Thumbnail Image: </h4>
                        <textarea 
                            type="text"
                            placeholder="thumbnail image - must be a link"
                            className="list-input-field"
                            onChange={event => this.setState({image: event.target.value})}
                        />
                    </div>
                    <div className="list-category-group">
                        <h4 className="list-input-title">List Items <button className="primary-button add-list-button"
                                onClick={() => this.addListItem()}>&#43;</button></h4>
                        
                        <div className="each-list-group">
                            {this.itemDescriptions.map((item, index) => (
                                <div key={index}>
                                    <h4 className="item-number">{index + 1}</h4>
                                    <div className="list-item-input-group">
                                        <textarea 
                                            type="text"
                                            placeholder="list description"
                                            className="list-item-desc-or-link"
                                            onChange={event => this.handleNewListItem(event.target.value, index, 'description')}
                                        />
                                        <textarea 
                                            type="text"
                                            placeholder="list link"
                                            className="list-item-desc-or-link"
                                            onChange={event => this.handleNewListItem(event.target.value, index, 'link')}                                        />
                                    </div>
                                </div>
                            ))}    
                        </div>        
                    </div>
                    <button className="primary-button"
                            type="button"
                            onClick={() => this.addList()}>Submit
                    </button>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return { user };
}

export default connect(mapStateToProps, null)(AddList);