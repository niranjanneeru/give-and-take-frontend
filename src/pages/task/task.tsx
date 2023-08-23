import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery, useLazyGetTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useEffect, useState } from 'react';

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

  const [searchText, setSearchText] = useState('');

  const [searchTrigger, { data: searchData, isSuccess: isSearchSuccess }] = useLazyGetTasksQuery();

  useEffect(() => {
    searchTrigger(searchText);
  }, [searchText]);

  useEffect(() => {
    if (isSearchSuccess) console.log(searchData);
  }, [isSearchSuccess]);

  const searchBarProps = {
    setSearchText
  };


  return (
    <Layout
      searchBarProps={searchBarProps}
      subheaderProps={subheaderProps}
      userRole={user?.data.role}
    >
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
