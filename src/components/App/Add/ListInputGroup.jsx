import React, { Component } from 'react';
import { listsRef } from '../../../firebase';
import { connect } from 'react-redux';
import '../../Global.css';
import './AddList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconList } from '../../../constants';

class AddList extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
        }
        this.selectedIcons = [];
        this.itemDescriptions = [""];
        this.links = [""];      
        this.ableToInput = true;
        this.newListItems = [];
        this.icons = iconList
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
            icon: this.selectedIcons,
            listItems: newListItemArray
        }
        listsRef.push(newListObject);
        this.ableToInput = false;
        this.forceUpdate();            
    }

    addListItem() {
        this.itemDescriptions.push("item");
        this.forceUpdate();  
        if (document.getElementById("add-list-input-group-button")) {
            document.getElementById("add-list-input-group-button").blur();
        }    
    }

    handleNewListItem(input, index, type) {
        if (type === "description") {
            this.itemDescriptions[index] = input;
        } else if (type === "link") {
            this.links[index] = input;            
        }
    }

    addIcon(icon) {
        let value = Object.values(icon)[0].name;
        let valueId = value + "-input-button";

        if (this.selectedIcons.includes(value)) {
            this.selectedIcons = this.selectedIcons.filter(item => {
                return item !== value;
            });
        } else {
            this.selectedIcons.push(value);
        }

        this.icons.forEach(item => {
            if (item.name === value) {
                item.selected = item.selected === true ? false : true;
            }
        });
        this.forceUpdate();
        if (document.getElementById(valueId)) {
            document.getElementById(valueId).blur();
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
                        <h4 className="list-input-title">Select Icon Tags: 
                        </h4>
                        <div className="icon-group">
                            {this.icons.map((icon, index) => {
                                return (
                                    <button className={"icon-button " + (icon.selected ? "selected-icon" : "")}
                                        onClick={() => this.addIcon({icon})}
                                        key={index}
                                        id={icon.name + "-input-button"}>
                                        <FontAwesomeIcon size="2x" icon={icon.name}/></button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="list-category-group">
                        <h4 className="list-input-title">Add List Items: 
                            <button className="primary-button add-list-button"
                                    id="add-list-input-group-button"
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
                    <div className="list-category-final">
                    </div>
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