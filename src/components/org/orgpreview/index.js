import React from 'react';
import * as orgActions from '../../../action/org-actions.js';
import OrgForm from '../orgform/index.js';
import * as util from '../../../lib/util.js';

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
    }, () => console.log(this.state));
  }

  componentWillReceiveProps(props) {
    if(this.props.org) {
      console.log('component received props');
      this.setState(this.props.org);
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className='org-previews'>
        {(this.props.org.length !== 0) ? 
          this.props.org.map(_org => 
            <div key={_org._id}>
            <h3>{_org.name}</h3>
            <p>{_org.desc}</p>
            {/* TODO: add a link to the OrgItem page for each Org created */}
            <button onClick={() => {this.props.delete(_org)}}>x</button>
            {this.state.editing ?
              <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={_org} />
              :
              <button onClick={() => this.toggleEdit()}>update</button>
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