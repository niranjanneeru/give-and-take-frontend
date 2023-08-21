import { useState } from 'react';
import './styles.css';
import TaskListHeader from '../../components/taskListHeader/taskListHeader';
import TaskListRow from '../../components/taskListRow/taskListRow';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';

const TaskListPage = () => {
  const [icon] = useState('pencil');
  const navigate = useNavigate();

  // add use effect
  const { data: taskData } = useGetTasksQuery();

  const onClick = (id) => navigate(`/tasks/${id}`);

  const { data: user } = useGetUserQuery();

  const subheaderProps = {
    heading: 'TASKS',
    iconText: 'Create Task',
    iconImg: icon,
    onClick: () => navigate('/tasks/create')
  };

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      <div className='taskList-container'>
        <table className='table'>
          <TaskListHeader></TaskListHeader>
          {taskData &&
            taskData.data.map((task) => (
              <TaskListRow key={task['id']} task={task} onClick={() => onClick(task['id'])} />
            ))}
        </table>
      </div>
    </Layout>
  );
};

export default TaskListPage;
