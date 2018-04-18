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
     return (
      <div className='org-previews'>
        {(this.props.orgs.length !== 0) ? 
          this.props.orgs.map(_org => 
            <div key={_org._id}>
              <h3>{_org.name}</h3>
              <p>{_org.desc}</p>
              {/* TODO: add a link to the OrgItem page for each Org created */}
              <button onClick={() => {this.props.delete(_org)}}>x</button>
              {this.state.editing ?
                <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={_org} />
                :
                <button onClick={() => this.toggleEdit()}>Update</button>
              }
            </div>
          )
          :
          <p>You currently have no organizations, would you like to create one?</p>
        }
      </div>
    )
  }
}

export default OrgPreview;