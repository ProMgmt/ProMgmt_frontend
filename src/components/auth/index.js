'use strict';

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import * as util from './../../lib/util.js';
import RaisedButton from 'material-ui/RaisedButton';

class AuthForm extends Component {
  constructor(props){
    super(props); 
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: null,
      passwordError: null,
      emailError: null,
      error: null,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.onComplete(this.state)
      .then( () => {                    
        this.setState({ username: '', email: '', password: ''} )
      })
      .catch( error => {
        console.error(error);
        this.setState({error})
      })
    }

    handleChange(e) {
      let { name, value } = e.target;
      this.setState({
        [name]: value,
        usernameError: name === 'username' && !value 
        ? 'username required' 
        : null,
        emailError: name === 'email' && !value
        ? 'email required'
        : null,
        passwordError: name === 'password' && !value
        ? 'password required'
        : null,
      })
    }

    render() {
      return(
        <form
          onSubmit={this.handleSubmit}
          className='auth-form'
        >

          {util.renderIf(this.props.auth === 'signup',
            
              <TextField 
                type='email'
                name='email'
                hintText='email'
                value={this.state.email}
                onChange={this.handleChange}
              />
            
      )}
            
              <TextField
                type='text'
                name='username'
                hintText='username'
                value={this.state.username}
                onChange={this.handleChange}
              />
           

            
              <TextField
                type='password'
                name='password'
                hintText='password'
                value={this.state.password}
                onChange={this.handleChange}
              />
           

            
              <RaisedButton type='submit'>{this.props.auth}</RaisedButton>
            
        </form>
      )
    }
  }


  export default AuthForm;



