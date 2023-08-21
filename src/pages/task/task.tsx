import { useState } from 'react';
import './styles.css';
import Subheader from '../../components/subheader/subheader';
import TaskListHeader from '../../components/taskListHeader/taskListHeader';
import TaskListRow from '../../components/taskListRow/taskListRow';
import { useGetTasksQuery } from './api';

const TaskListPage = () => {
  const [icon] = useState('pencil');
  //const navigate = useNavigate();

  // add use effect
  const { data: taskData } = useGetTasksQuery();

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
