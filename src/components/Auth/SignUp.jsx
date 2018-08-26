import React, { Component } from "react";
import { browserHistory, Link } from "react-router";
import { firebaseApp } from '../../firebase';
import './Auth.css';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    signUp() {
        console.log(this.state);
        const { email, password } = this.state;
        firebaseApp.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
            .catch(error => {
                this.setState({error});
            });
        browserHistory.push('/');    
    }

    render() {
        return (
        <div className="page-background">
            <div className="auth-background">
                <h1 className="title">Special List</h1>
                <h2 className="sub-title"><i>Get The Stuff the Pros Use</i></h2>
                <div>
                    <input 
                        className="auth-input" 
                        type="text" 
                        placeholder="email" 
                        onChange={event => this.setState({email: event.target.value})}
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="password"
                        onChange={event => this.setState({password: event.target.value})}
                    />
                </div>
                <div className="button-group">
                    <button 
                        className="btn btn-primary" 
                        type="button"
                        onClick={() => this.signUp()}>Sign Up  
                    </button>
                    <div className="auth-error">{this.state.error.message}</div>
                    <div>
                        <Link to={'/signin'}>Already a user? Sign in instead.</Link>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default SignUp;
