import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
  }

  componentWillReceiveProps(props){
    if (props.project){
      this.setState(props.project);
    }
  }

  handleStartDateChange(event, date) {
    this.setState({
      startDate: date,
    });
  };

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
        <TextField
          name='projectName'
          type='text'
          floatingLabelText='Project Name'
          value={this.state.projectName}
          onChange={this.handleChange} />
        <TextField
          name='desc'
          type='text'
          floatingLabelText='Project Description'
          value={this.state.desc}
          onChange={this.handleChange} />
        <DatePicker
          name='startDate'
          
          hintText='Start Date'
          value={this.state.startDate}
          onChange={this.handleDateChange}
        />
        <DatePicker
          name='dueDate'
          
          hintText='Due Date'
          value={this.state.dueDate}
          onChange={this.handleDateChange} 
        />
        <FlatButton type='submit'>{this.props.buttonText}</FlatButton>
      </form>
    )
  }
}

export default ProjectForm;