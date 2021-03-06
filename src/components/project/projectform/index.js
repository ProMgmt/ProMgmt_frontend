import React from 'react';

class ProjectForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.project ? {...props.project} : { 
      _id: undefined,
      orgId: undefined, 
      projectName: '',
      desc: '', 
      startDate: '', 
      dueDate: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if (props.project){
      this.setState(props.project);
    }
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();

    if(this.props.canToggle) {
      this.props.toggle();
    }
    
    this.props.onComplete({...this.state});
  }

  render(){
    return(
      <form className='project-form' onSubmit={this.handleSubmit}>
        <input 
          name='projectName'
          type='text'
          placeholder='Project Name'
          value={this.state.projectName}
          onChange={this.handleChange} />
        <input
          name='desc'
          type='text'
          placeholder='Project Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <input
          name='startDate'
          type='date'
          placeholder='Start Date'
          value={this.state.startDate}
          onChange={this.handleChange} />
        <input
          name='dueDate'
          type='date'
          placeholder='Due Date'
          value={this.state.dueDate}
          onChange={this.handleChange} />
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default ProjectForm;