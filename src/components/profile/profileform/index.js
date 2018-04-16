import React from 'react';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.profile ?
      {...props.profile} :
      {
        orgId: undefined,
        users: [],
        admins: [],
        tasks: [],
        projectName: '',
        desc: '',
        startDate: '',
        dueDate: '',
        dateCreated: '',
      }
    
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handlechange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.profile) {
      this.setState({...props.profile});
    }
  }

  handleChange(e) {
    
  }
}