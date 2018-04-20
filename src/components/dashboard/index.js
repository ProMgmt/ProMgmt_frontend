import React from 'react';
import {connect} from 'react-redux';
import OrgForm from '../org/orgform';
import OrgItem from '../org/orgitem';
import { userOrgEtAllSetRequest, orgCreateRequest, orgUpdateRequest } from '../../action/org-actions.js';
import { projectCreateRequest, projectUpdateRequest } from '../../action/project-actions.js';
import { userTaskCreateRequest, userTaskUpdateRequest } from '../../action/task-actions.js';
import FlatButton from 'material-ui/FlatButton';
import './_dashboard.scss';
import Divider from 'material-ui/Divider';

class Dashboard extends React.Component{
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

  componentWillReceiveProps(props){
    if (!props.loggedIn) {
      props.history.replace('/welcome/signup');
    }
  }

  render(){
    let buttonText;
    this.state.add ? buttonText = 'Add an Org' : buttonText = 'Hide Add Org Form';

    console.log(this.props.orgs)
    return(

      <section className='devtool' style={{padding: '3.5vw'}}>
      <div class='dashboard' style={{backgroundColor: 'rgba(255, 255, 255, .5)', padding: '30px 30px'}}>
        <h1 className='big-title'>Welcome to your Dashboard!</h1>
        {this.props.orgs ?
        this.props.orgs.length !== 0 ?
          <div>
            <h2>From here you can add ORGANIZATIONS, create PROJECTS, and add TASKS to each project.</h2>
            <h2>Click the button below to begin!</h2><br/>
          </div>
          :
          null
          :
          null
        }
        <FlatButton onClick={this.toggleAdd} style={{marginBottom: '2.4vw', backgroundColor: 'rgba(54, 178, 232, .5)', padding: '2px 11px'}}>Add an Org</FlatButton>

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
        {this.props.orgs ?
          this.props.orgs.length !== 0 ?
          <div style={{marginBottom: '2vw'}}>
            <h3 style={{marginBottom: '.5vw'}}>Your Organizations:</h3>
            <Divider />
          </div>
          :
          <p>You currently are not a member of any organizations, click above to get started!</p>
          : null
        }
        {this.props.orgs ?
          this.props.orgs.map(org => 
            <OrgItem
            key={org._id}
            org={org}
          />
        )
        : null}
        </div>
      </section>
    )
  }
}

let mapStateToProps = state => ({
  orgs: state.orgs,
  loggedIn: !!state.auth,
  user: state.user,
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);