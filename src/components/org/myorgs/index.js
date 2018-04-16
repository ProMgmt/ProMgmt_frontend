import React from 'react';
import {connect} from 'react-redux';
import * as orgActions from '../../../action/org-actions.js';
import * as util from '../../../lib/util.js';
import OrgForm from '../orgform/index.js';

class MyOrgs extends React.Component {
  componentWillMount() {
    this.props.userOrgSet();
    console.log('orgs in myOrgs', this.props.orgs);
  }
  
  render() {
    return (
      <div className='my-orgs'>
        <h1>My Orgs</h1>
        {this.props.orgs ?
          this.props.orgs.map(org => {
            <OrgPreview org={org}/>
          })
          : null
        }
        {/* TODO: add a 'CREATE NEW ORG' button which toggles view of OrgForm component */}
        <OrgForm buttonText='Create An Org'/>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MyOrgs);