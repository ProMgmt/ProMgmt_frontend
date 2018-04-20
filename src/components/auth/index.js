'use strict';

import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import * as util from './../../lib/util.js';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom'; 
import GoogleOauth from '../google-oauth';

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
      modalOpen: true,
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleModalOpen = this.handleModalOpen.bind(this);
      this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.onComplete(this.state)
      .then( () => {  
        this.props.history.push('/dashboard');                  
        this.setState({ username: '', email: '', password: ''} );
      })
      .catch( error => {
        console.error(error);
        this.setState({error})
      })
    }

    handleModalOpen() {
      this.setState({ modalOpen: true });
    }
  
    handleModalClose() {
      this.props.onClose();
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
        <Dialog
          title={this.props.auth}
          open={this.state.modalOpen}
          modal={false}
          onRequestClose={this.handleModalClose}
        >
          
          <form
            onSubmit={this.handleSubmit}
            className='auth-form'
          >

            {util.renderIf(this.props.auth === 'signup',
              
                <TextField 
                  type='email'
                  name='email'
                  floatingLabelText='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              
        )}
              
                <TextField
                  type='text'
                  name='username'
                  floatingLabelText='username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
            

              
                <TextField
                  type='password'
                  name='password'
                  floatingLabelText='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
            

              
                <FlatButton 
                  onClick={this.handleSubmit}
                  label={this.props.auth}
                  primary={true}
                  
                />

                <FlatButton 
                  onClick={this.handleModalClose}
                  label='Cancel'
                  primary={true}
                /> 
                <GoogleOauth/>
              
          </form>
        </Dialog>
      )
    }
  }


  export default withRouter(AuthForm);



