import React from 'react';
import OrgForm from '../orgform/index.js';
import {connect} from 'react-redux';

class OrgPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.org ? 
      {...props.org, editing: false} :
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
    if(this.props.org) {
      this.setState(this.props.org);
    }
  }

  render() {
    
    let updateButtonText;
    this.state.editing ? updateButtonText = 'Hide' : updateButtonText = 'Update';
    let org = this.props.org;
    let isAdmin = false;
    org.admins.forEach(adminObj => {
      console.log(this.props.user, adminObj);
      if(this.props.user._id === adminObj._id) isAdmin = true;
    })

    return (
      <div className='org-previews'>
        <div key={org._id}>
          <h3>{org.name}</h3>
          <p>{org.desc}</p>
          {/* TODO: add a link to the OrgItem page for each Org created */}

          {isAdmin ?
            <div className='edit-org'>
              <button onClick={() => {this.props.delete(org)}}>x</button> <button onClick={() => this.toggleEdit()}>{updateButtonText}</button>
              {this.state.editing ?
                <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={org} />
                :
                null
              }
            </div>

            :
            null
          }

        </div>
      </div>
    )
  }
}

export const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(OrgPreview);