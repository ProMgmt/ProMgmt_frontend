'use strict';

import React, {Component} from 'react';
import * as util from './../../../lib/util.js';

class ProfileForm extends Component {
  constructor(props){
    super(props);
    this.state = props.profile 
    ? {...props.profile, preview: ''} 
    : { desc: '', avatarURI: null, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState({...props.profile});
    }
  }

  handleChange(e) {
    let { type, name } = e.target;

    if(name === 'desc') {
      this.setState({ desc: e.target.value });
    }

    if(name === 'avatarURI') {
      let {files} = e.target;
      let avatarURI = files[0];
      this.setState({avatarURI});
      util.photoToDataURL(avatarURI)
      .then(preview => this.setState({preview}))
      .catch(console.error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return(
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}
      >

        <img src={this.state.preview}/>

        <input  
          type='file'
          name='avatarURI'
          onChange={this.handleChange}
        />

        <textarea
          type='text'
          name='desc'
          value={this.state.desc}
          onChange={this.handleChange}>
          </textarea>

          <button type='submit'>{this.props.buttonText}</button>

        </form>
    )
  }
}

export default ProfileForm;
