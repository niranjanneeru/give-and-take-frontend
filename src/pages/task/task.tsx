import { useState } from 'react';
import './styles.css';
import Subheader from '../../components/subheader/subheader';
import TaskListHeader from '../../components/taskListHeader/taskListHeader';
import TaskListRow from '../../components/taskListRow/taskListRow';
import { useGetTasksQuery } from './api';

const TaskListPage = () => {
  const [icon] = useState('pencil');
  //const navigate = useNavigate();

  const { data: taskData } = useGetTasksQuery();

  /*const taskData: Object[] = [
    {
      id: 1,
      title: 'Task1',
      deadline: '12-12-12',
      bounty: 20,
      skills: 'Skill1,Skill2',
      status: 'CREATED',
      maxParticipants: 4
    },
    {
      id: 2,
      title: 'Task2',
      deadline: '12-12-15',
      bounty: 25,
      skills: 'Skill1,Skill3',
      status: 'IN_PROGRESS',
      maxParticipants: 1
    },
    {
      id: 3,
      title: 'Task3',
      deadline: '12-12-18',
      bounty: 28,
      skills: 'Skill2,Skill3',
      status: 'COMPLETED',
      maxParticipants: 2
    }
  ];*/

  console.log(taskData?.data);

  const onClick = (id) => console.log(`Clicked on task ${id}`);
  const subheaderProps = {
    heading: 'TASKS',
    iconText: 'Create Task',
    iconImg: icon,
    onClick: () => console.log('Clicked create task')
  };

  return (
    <div className='taskList-container'>
      <Subheader {...subheaderProps}></Subheader>
      <table className='table'>
        <TaskListHeader></TaskListHeader>
        {taskData &&
          taskData.data.map((task) => (
            <TaskListRow key={task['id']} task={task} onClick={() => onClick(task['id'])} />
          ))}
      </table>
    </div>
  );
};

export default TaskListPage;
