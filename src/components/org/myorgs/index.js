import React from 'react';
import {connect} from 'react-redux';
import * as orgActions from '../../../action/org-actions.js';
import * as util from '../../../lib/util.js';
import OrgPreview from '../orgpreview/index.js';
import OrgForm from '../orgform/index.js';
import FlatButton from 'material-ui/FlatButton';
import './_myorgs.scss';

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
      <div className='my-orgs big-title' style={{margin: '50px 50px 50px 50px', padding: '3.5vw', backgroundColor: 'rgba(255, 255, 255, .5)', padding: '30px 30px'}}>
        <h1 style={{margin: '0px 0px 20px 0px'}}>My Orgs</h1>
        {(this.props.orgs.length !== 0) ? 
          this.props.orgs.map(_org =>
            <OrgPreview key={_org._id} org={_org} delete={this.props.orgDeleteRequest} update={this.props.orgUpdateRequest} />
          )
          : <p>You currently have no organizations, would you like to create one?</p>
        }
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