import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useLazyGetFilteredTasksQuery, useLazyGetTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useEffect, useState } from 'react';
import TableShimmer from '../../components/shimmer/TableShimmer';
import Pagination from '@material-ui/lab/Pagination';

const TaskListPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentTaskData, setTaskDataState] = useState(null);
  const [totalPage, setTotalPage] = useState(1);

  // add use effect
  const [taskTrigger, { data: taskData, isSuccess: isTaskFetchSuccess }] = useLazyGetTasksQuery();

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
    if (searchText.trim() === '') {
      if (selectedFilter) {
        getFilteredTasks({ status: selectedFilter });

        return;
      }
      taskTrigger();

      return;
    }

    const params = {};

    if (selectedFilter) params['status'] = selectedFilter;
    params['search'] = searchText;
    searchTrigger(params);
  }, [searchText]);

  useEffect(() => {
    if (isSearchSuccess) setTaskDataState(searchData);
  }, [searchData]);

  useEffect(() => {
    if (isFilterSuccess) {
      setTaskDataState(filteredTaskData);
      // const page = filteredTaskData['meta']['page'];
      const pageSize = filteredTaskData['meta']['pageSize'];
      const total = filteredTaskData['meta']['total'];

      if (!pageSize) {
        setTotalPage(1);

        return;
      }

      setTotalPage(Math.ceil(total / pageSize));
    }
  }, [filteredTaskData]);

  useEffect(() => {
    if (isTaskFetchSuccess) setTaskDataState(taskData);
  }, [taskData]);

  useEffect(() => {
    taskTrigger();
  }, []);

  const searchBarProps = {
    setSearchText
  };

  const handlePagination = (event, page) => {
    console.log(event);
    console.log(page);
    console.log(totalPage);
    const params = { page: page - 1, pageSize: 5 };

    if (selectedFilter) params['status'] = selectedFilter;
    if (searchText.trim() !== '') params['search'] = searchText;
    searchTrigger(params);
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
      <div className='pagination'>
        <Pagination count={totalPage} shape='rounded' onChange={handlePagination} />
      </div>
    </Layout>
  );
};

export default TaskListPage;
