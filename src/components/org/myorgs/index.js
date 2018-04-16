import React from 'react';
import {connect} from 'react-redux';
import * as orgActions from '../../../action/org-actions.js';
import * as util from '../../../lib/util.js';
import OrgPreview from '../orgpreview/index.js';
import OrgForm from '../orgform/index.js';

class MyOrgs extends React.Component {
  componentWillMount() {
    this.props.userOrgSet();
  }
  
  render() {
    console.log(':::this.props.org:::', this.props.org);
    
    return (
      <div className='my-orgs'>
        <h1>My Orgs</h1>
        <div className='org-previews'>
          {this.props.org.map(org => 
              <div>
                <p>hi</p>
                <OrgPreview key={org._id} org={org}/>
              </div>
            )
          }
        </div>
        {/* TODO: add a 'CREATE NEW ORG' button which toggles view of OrgForm component */}
        <OrgForm onComplete={this.props.orgCreateRequest} buttonText='Create An Org'/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    org: state.org,
  }
}

const mapDispatchToProps = dispatch => ({
  userOrgSet: () => dispatch(orgActions.userOrgEtAllSetRequest()),
  orgCreateRequest: (org) => dispatch(orgActions.orgCreateRequest(org)),
  orgDeleteRequest: (org) => dispatch(orgActions.orgDeleteRequest(org)),
  orgUpdateRequest: (org) => dispatch(orgActions.orgUpdateRequest(org)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyOrgs);