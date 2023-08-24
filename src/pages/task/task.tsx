import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useGetTasksQuery, useLazyGetFilteredTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useEffect, useState } from 'react';
import TableShimmer from '../../components/shimmer/TableShimmer';

const TaskListPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentTaskData, setTaskDataState] = useState(null);

  // add use effect
  const { data: taskData, isSuccess: isTaskFetchSuccess } = useGetTasksQuery();

  const onClick = (id) => navigate(`/tasks/${id}`);

  const { data: user, refetch } = useGetUserQuery();

  useEffect(() => {
    // Refetch task data when the component mounts (user navigates back)
    refetch();
  }, [refetch]);
  const [getFilteredTasks, { data: filteredTaskData, isSuccess: isFilterSuccess }] =
    useLazyGetFilteredTasksQuery();

  const handleFilter = (filterValue) => {
    console.log('Filter value changed to:', filterValue);
    setSelectedFilter(filterValue);
  };

  useEffect(() => {
    const params = {};

    if (selectedFilter) params['status'] = selectedFilter;
    if (searchText.trim() !== '') params['search'] = searchText;
    getFilteredTasks(params);
  }, [selectedFilter]);

  const subheaderProps = {
    heading: 'Tasks',
    iconText: 'Create Task',
    iconImg: 'plus',
    onClick: () => navigate('/tasks/create'),
    isTask: true,
    handleFilter: handleFilter
  };

  const [searchText, setSearchText] = useState('');

  const [searchTrigger, { data: searchData, isSuccess: isSearchSuccess }] =
    useLazyGetFilteredTasksQuery();

  useEffect(() => {
    if (searchText.trim() === '') return;
    const params = {};

    if (selectedFilter) params['status'] = selectedFilter;
    params['search'] = searchText;
    searchTrigger(params);
  }, [searchText]);

  useEffect(() => {
    if (isSearchSuccess) setTaskDataState(searchData);
  }, [searchData]);

  useEffect(() => {
    if (isFilterSuccess) setTaskDataState(filteredTaskData);
  }, [filteredTaskData]);

  useEffect(() => {
    if (isTaskFetchSuccess) setTaskDataState(taskData);
  }, [taskData]);

  const searchBarProps = {
    setSearchText
  };

  return (
    <Layout
      searchBarProps={searchBarProps}
      subheaderProps={subheaderProps}
      userRole={user?.data.role}
    >
      {!taskData && <TableShimmer />}
      {taskData && (
        <div className='taskList-container'>
          <table className='table'>
            <TableHeader userRole={user?.data.role} page={'task'}></TableHeader>
            <div className='scroll-tr'>
              {currentTaskData &&
                currentTaskData.data.map((task) => (
                  <TableRow
                    key={task['id']}
                    row={task}
                    onClick={() => onClick(task['id'])}
                    userRole={user?.data.role}
                    pageType='taskList'
                  />
                ))}
            </div>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default TaskListPage;
