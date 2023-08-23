import './styles.css';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useGetTasksQuery, useLazyGetTasksQuery } from './api';
=======
import { useGetTasksQuery, useLazyGetFilteredTasksQuery } from './api';
>>>>>>> dev
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useEffect, useState } from 'react';

const TaskListPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(null);

  // add use effect
  const { data: taskData } = useGetTasksQuery();

  const onClick = (id) => navigate(`/tasks/${id}`);

  const { data: user, refetch } = useGetUserQuery();

  useEffect(() => {
    // Refetch task data when the component mounts (user navigates back)
    refetch();
  }, [refetch]);
  const [getFilteredTasks, { data: filteredTaskData }] = useLazyGetFilteredTasksQuery();

  const handleFilter = (filterValue) => {
    console.log('Filter value changed to:', filterValue);
    setSelectedFilter(filterValue);
  };

  useEffect(() => {
    if (selectedFilter) getFilteredTasks({ status: selectedFilter });
  }, [selectedFilter]);

  const subheaderProps = {
    heading: 'TASKS',
    iconText: 'Create Task',
    iconImg: 'plus',
    onClick: () => navigate('/tasks/create'),
    isTask: true,
    handleFilter: handleFilter
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

  const currentTaskData = selectedFilter ? filteredTaskData : taskData;

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
            {currentTaskData &&
              currentTaskData.data.map((task) => (
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
