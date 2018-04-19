import React from 'react';
import {connect} from 'react-redux';
import OrgForm from '../org/orgform';
import OrgItem from '../org/orgitem';
import {userOrgEtAllSetRequest, orgCreateRequest, orgUpdateRequest} from '../../action/org-actions.js';
import {projectCreateRequest, projectUpdateRequest} from '../../action/project-actions.js';
import {userTaskCreateRequest, userTaskUpdateRequest} from '../../action/task-actions.js';

class DevTool extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      add: false
    }

    this.toggleAdd = this.toggleAdd.bind(this);
  }

  toggleAdd() {
    this.setState(state => {
      return {add: !state.add}
    })
  }

  componentDidMount(){
    this.props.userOrgEtAllSet()
    .catch(console.error);
  }

  render(){
    let buttonText;
    this.state.add ? buttonText = 'Add an Org' : buttonText = 'Hide Add Org Form';
    return(
      <section className='devtool'>
        <button onClick={this.toggleAdd}>Add an Org</button>
        {this.state.add ? 
          <OrgForm
            onComplete={this.props.orgCreate}
            buttonText='Create Org'
            canToggle={true}
            toggle={this.toggleAdd}
          />
          :
          null
        }
        {this.props.orgs.length !== 0 ?
          <h3>Your Organizations:</h3>
          :
          <p>You currently are not a member of any organizations, click above to get started!</p>
        }
        {this.props.orgs.map(org => 
          <OrgItem
            key={org._id}
            org={org}
          />
        )}
      </section>
    )
  }
}

let mapStateToProps = state => ({
  orgs: state.orgs,
})

let mapDispatchToProps = dispatch => ({
  userOrgEtAllSet: () => dispatch(userOrgEtAllSetRequest()),
  orgCreate: org => dispatch(orgCreateRequest(org)),
  orgUpdate: org => dispatch(orgUpdateRequest(org)),
  projectCreate: project => dispatch(projectCreateRequest(project)),
  projectUpdate: project => dispatch(projectUpdateRequest(project)),
  taskCreate: task => dispatch(userTaskCreateRequest(task)),
  taskUpdate: task => dispatch(userTaskUpdateRequest(task)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DevTool);