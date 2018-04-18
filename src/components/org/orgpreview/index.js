import React from 'react';
import OrgForm from '../orgform/index.js';

import {connect} from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create';
import Clear from 'material-ui/svg-icons/content/clear';

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
        <Card key={org._id}>
          <CardHeader 
            title={org.name}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          
          <p>{org.desc}</p>
          {/* TODO: add a link to the OrgItem page for each Org created */}

          {isAdmin ?
            <div className='edit-org'>
              <FlatButton onClick={() => {this.props.delete(org)}} icon={<Clear />}/> <FlatButton onClick={() => this.toggleEdit()} icon={<Create />}/>

              {this.state.editing ?
                <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={org} />
                :
                null
              }
            </div>

            :
            null
          }
          </CardText>
        </Card>

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