import './styles.css';
import { useNavigate } from 'react-router-dom';
import { useLazyGetFilteredTasksQuery, useLazyGetTasksQuery } from './api';
import Layout from '../../components/layout/layout';
import { useGetUserQuery } from '../employee/api';
import TableHeader from '../../components/tableHeader/tableHeader';
import TableRow from '../../components/tableRow/tableRow';
import { useEffect, useState } from 'react';
import TableShimmer from '../../components/shimmer/TableShimmer';
import CustomSnackbar from '../../components/snackbar/snackbar';
import { filterCondtionsList } from '../../utils/filterConditions';

const TaskListPage = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [currentTaskData, setTaskDataState] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState('');
  const [severitySnackbar, setSeveritySnackbar] = useState('');

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

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
    if (isFilterSuccess) setTaskDataState(filteredTaskData);
  }, [filteredTaskData]);

  useEffect(() => {
    if (isFilterSuccess && selectedFilter) {
      setMessageSnackbar(`${filterCondtionsList[selectedFilter]} filter applied`);
      setSeveritySnackbar('success');
      setOpenSnackbar(true);
    }
  }, [currentTaskData]);

  useEffect(() => {
    if (isTaskFetchSuccess) setTaskDataState(taskData);
  }, [taskData]);

  useEffect(() => {
    taskTrigger();
  }, []);

  const searchBarProps = {
    setSearchText
  };

  return (
    <Layout
      searchBarProps={searchBarProps}
      subheaderProps={subheaderProps}
      userRole={user?.data.role}
    >
      {!currentTaskData && <TableShimmer />}
      {currentTaskData && (
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
      <CustomSnackbar
        open={openSnackbar}
        message={messageSnackbar}
        severity={severitySnackbar}
        handleClose={handleSnackbarClose}
      />
    </Layout>
  );
};

export default TaskListPage;
