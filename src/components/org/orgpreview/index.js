import React from 'react';
import OrgForm from '../orgform/index.js';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Create from 'material-ui/svg-icons/content/create';
import Clear from 'material-ui/svg-icons/content/clear';

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
            <Card key={_org._id}>
              <CardHeader
                title={_org.name}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
              <p>{_org.desc}</p>
              {/* TODO: add a link to the OrgItem page for each Org created */}
              <FlatButton 
                onClick={() => {this.props.delete(_org)}}
                icon={<Clear />}
              />
              {this.state.editing ?
                <OrgForm canToggle={true} toggle={this.toggleEdit} buttonText='Save' onComplete={this.props.update} org={_org} />
                :
                <FlatButton
                  onClick={() => this.toggleEdit()}
                  icon={<Create />}
                />
              }
              </CardText>
            </Card>
          )
          :
          <p>You currently have no organizations, would you like to create one?</p>
        }
      </div>
    )
  }
}

export default OrgPreview;