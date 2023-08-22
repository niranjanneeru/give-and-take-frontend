import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';

const TaskListPage = () => {
  const navigate = useNavigate();

  // add use effect
  const { data: taskData } = useGetTasksQuery();

  const onClick = (id) => navigate(`/tasks/${id}`);

  const { data: user } = useGetUserQuery();

  const subheaderProps = {
    heading: 'TASKS',
    iconText: 'Create Task',
    iconImg: 'plus',
    onClick: () => navigate('/tasks/create'),
    isTask: true
  };

  return (
    <Layout subheaderProps={subheaderProps} userRole={user?.data.role}>
      <div className='taskList-container'>
        <table className='table'>
          <TableHeader userRole={user?.data.role} isTask={true}></TableHeader>
          <div className='scroll-tr'>
            {taskData &&
              taskData.data.map((task) => (
                <TableRow
                  key={task['id']}
                  row={task}
                  onClick={() => onClick(task['id'])}
                  isTask={true}
                  userRole={user?.data.role}
                />
              ))}
          </div>
        </table>
      </div>
    </Layout>
  );
};

export default TaskListPage;
