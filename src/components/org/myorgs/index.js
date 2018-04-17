import React from 'react';
import {connect} from 'react-redux';
import * as orgActions from '../../../action/org-actions.js';
import * as util from '../../../lib/util.js';
import OrgPreview from '../orgpreview/index.js';
import OrgForm from '../orgform/index.js';

class MyOrgs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      add: false,
    }

    this.toggleAdd = this.toggleAdd.bind(this);
  }

  componentWillMount() {
    this.props.userOrgSet();
  }

  toggleAdd() {
    this.setState(state => {
      return {add: !state.add};
    })
  }
  
  render() {    
    return (
      <div className='my-orgs'>
        <h1>My Orgs</h1>
        {this.state.add ?
          <OrgForm canToggle={true} toggle={this.toggleAdd} onComplete={this.props.orgCreateRequest} buttonText='Save'/>
          : 
          <button onClick={this.toggleAdd}>Create an Org</button>
        }

        <div className='org-previews'>
          <OrgPreview orgs={this.props.orgs} delete={this.props.orgDeleteRequest} update={this.props.orgUpdateRequest} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orgs: state.orgs,
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()),
  orgCreateRequest: (org) => dispatch(orgActions.orgCreateRequest(org)),
  orgDeleteRequest: (org) => dispatch(orgActions.orgDeleteRequest(org)),
  orgUpdateRequest: (org) => dispatch(orgActions.orgUpdateRequest(org)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyOrgs);