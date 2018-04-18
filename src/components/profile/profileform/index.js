'use strict';

import React, { Component } from 'react';
import * as util from './../../../lib/util.js';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? 
      { ...props.profile, preview: '', userId: this.props.user._id }
      : 
      {
        firstName: '',
        lastName: '',
        desc: '',
        company: '',
        avatarURI: null,
        preview: '',
        title: '',
        userId: this.props.user._id,
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState({ ...props.profile });
    }
  }

  handleChange(e) {
    let { type, value, name } = e.target;

    if (name === 'desc') {
      this.setState({ desc: value });
    }

    if (name === 'avatarURI') {
      let { files } = e.target;
      let avatarURI = files[0];
      this.setState({ avatarURI });
      util.photoToDataURL(avatarURI)
        .then(preview => this.setState({ preview }))
        .catch(console.error);
    }

    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete({ ...this.state });
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}
      >
        {this.state.preview ?
          <div className='image-preview'>
            <h2>Image Preview:</h2>
            <img src={this.state.preview} />
          </div>
          : null}

        <h3>First Name</h3>
        <input
          type='text'
          name='firstName'
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        <h3>Last Name</h3>
        <input
          type='text'
          name='lastName'
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <h3>Company</h3>
        <input
          type='text'
          name='company'
          value={this.state.company}
          onChange={this.handleChange}
        />

        <h3>Title</h3>
        <input
          type='text'
          name='title'
          value={this.state.value}
          onChange={this.handleChange}
        />

        <h3>Write a Short Bio</h3>
        <textarea
          type='text'
          name='desc'
          value={this.state.desc}
          onChange={this.handleChange}>
        </textarea>
        <br />
        <button type='submit'>{this.props.buttonText}</button>

      </form>
      
      // TODO: implement this part
      // <h3>Upload an Image</h3>
      // <input
      //   type='file'
      //   name='avatarURI'
      //   onChange={this.handleChange}
      // />
    )
  }
}

export default ProfileForm;
