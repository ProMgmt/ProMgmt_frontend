import './_landing.scss';
import React from 'react';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className='landing'>
          <h3 className='title'>Welcome to Pro_Mgmt!</h3>
          <br /><br />
          <p className='landing-paragraph'>This project management application gives you one place for businesses to help streamline and enhance teamwork within organizations.</p>
          
          <p className='landing-paragraph'>Employees can sign up, create organizations, and add their team members to organizations so that they can collaboratively tackle the projects and tasks at hand.</p>

          <p className='landing-paragraph'>The application allows admin functionality on top of user functionality, so that the organization owners can better regulate activities within the organization.</p>

          <p className='landing-paragraph'>In addition, the application provides you with a task gantt chart, so that you can better visualize your progress as your teammates progress.</p>

          <p className='landing-paragraph'>This application was created by Taylor Stemple, Katy Robinson, David Kosmos, and Nicole Weese.</p>
        </div>
      </div>
    )
  }
}

export default Landing;