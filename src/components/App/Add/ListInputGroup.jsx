import React, { Component } from 'react';
import { listsRef } from '../../../firebase';
import { connect } from 'react-redux';
import '../../Global.css';
import './AddList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
        }
        this.icons = [];
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
            icon: this.icons,
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

    addIcon(iconName) {
        this.icons.push(iconName);
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
                        <h4 className="list-input-title">Select Icon Tags: 
                        </h4>
                        <div className="icon-group">
                            <button className="icon-button"
                                    onClick={() => this.addIcon("coffee")}>
                                <FontAwesomeIcon icon="coffee" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("umbrella-beach")}>
                                <FontAwesomeIcon icon="umbrella-beach" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("swimmer")}>
                                <FontAwesomeIcon icon="swimmer" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("suitcase")}>
                                <FontAwesomeIcon icon="suitcase" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("cookie-bite")}>
                                <FontAwesomeIcon icon="cookie-bite" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("music")}>
                                <FontAwesomeIcon icon="music" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("book")}>
                                <FontAwesomeIcon icon="book" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("podcast")}>
                                <FontAwesomeIcon icon="podcast" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("laptop")}>
                                <FontAwesomeIcon icon="laptop" /></button>
                            <button className="icon-button"
                                    onClick={() => this.addIcon("snowflake")}>
                                <FontAwesomeIcon icon="snowflake" /></button>
                        </div>
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