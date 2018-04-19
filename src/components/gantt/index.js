import React from 'react';
import {Chart} from 'react-google-charts';

class ProjectGantt extends React.Component{
  constructor(props){
    super(props);
    let data = props.project.tasks.reduce((acc, task) => {
      let setDepTasks = task.dependentTasks.reduce((acc, task) => {
        return `${acc},${task._id}`;
      },'');
      setDepTasks = setDepTasks.slice(1);
      if(!setDepTasks) setDepTasks = null;
      let setTask = [task._id, task.desc, new Date(task.startDate), new Date(task.endDate), task.duration * 86400000, task.status ? +task.status : null, setDepTasks];
      acc.push(setTask);
      return acc;
    },[])
    this.state = {
      rows: data,
      columns: [
        {
          id:'Task ID',
          type:'string',
        },
        {
          id:'Task Name',
          type:'string',
        },
        {
          id:'Start Date',
          type:'date',
        },
        {
          id:'End Date',
          type:'date',
        },
        {
          id:'Duration',
          type:'number',
        },
        {
          id:'Percent Complete',
          type:'number',
        },
        {
          id:'Dependencies',
          type:'string',
        },
      ]
    }
  }

  render(){
    console.log('this.state.rows', this.state.rows);
    return(
      <div className='project-gantt'>
        <Chart
          graph_id='ganttchart'
          chartType='Gantt'
          columns={this.state.columns}
          rows={this.state.rows}
          chartPackages={['gantt']}
          width='100%'
          height='400px'>
        </Chart>
      </div>
    )
  }
}

export default ProjectGantt;