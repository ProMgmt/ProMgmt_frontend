import React from 'react';
import OrgForm from '../orgform/index.js';

class OrgPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.orgs ? 
      {...props.orgs, editing: false} :
      {
        _id: undefined,
        name: '',
        desc: '',
        editing: false,
      }

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(state => {
      return {editing: !state.editing}
    });
  }

  componentWillReceiveProps(props) {
    if(this.props.orgs) {
      this.setState(this.props.orgs);
    }
  }

  render() {
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    let org = this.props.org;

    return (
      <div className='org-previews'>
        <div key={org._id}>
          <h3>{org.name}</h3>
          <p>{org.desc}</p>
          {/* TODO: add a link to the OrgItem page for each Org created */}
          <button onClick={() => {this.props.delete(org)}}>x</button> <button onClick={() => this.toggleEdit()}>{updateButtonText}</button>
          {this.state.editing ?
            <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={org} />
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default OrgPreview;