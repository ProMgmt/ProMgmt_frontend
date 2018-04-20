import './_landing.scss';
import React from 'react';

class Landing extends React.Component {
  render() {
    return (
      <div className='landing'>
        <h3 className='title'>Welcome to Pro_Mgmt!</h3>
        <br/><br/><br/>
        <p>This project management application gives you one place for businesses to help streamline and enhance teamwork within organizations.</p> 
        <br/><br/>
        <p>Employees can sign up, create organizations, and add their team members to organizations with or without admin priveledges. Admins are able to update and remove organizations.</p>
        <br/><br/>
        <p>Within each organization, projects can be created, with individual admins for each project as well. These admins can create or update existing projects. Every member of a project is able to create tasks for the projects.</p>
        <br/><br/>
        <p>This application also has task functionality. Individual tasks can be added to projects, independent or dependent upon each other. </p>
      </div>
    )
  }
}

export default Landing;