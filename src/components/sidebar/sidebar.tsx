import './sidebar.css';

const Sidebar = ({
  handleNavigateToEmployeeList,
  handleNavigateToTaskList,
  handleNavigateToLogout
}) => {
  return (
    <aside className='sidebar'>
      <div className='logo-employee'>
        <img src='assets/img/kv logo.png' />
      </div>
      <div></div>
      <ul className='side-nav'>
        <li className='list'>
          <a onClick={handleNavigateToEmployeeList}>
            <div className='icon-li'>
              <img src='assets/icons/employees.svg' />
            </div>
            <span>Employee List</span>
          </a>
          <a onClick={handleNavigateToTaskList}>
            <div className='icon-li'>
              <img src='assets/img/to-do-list.png' />
            </div>
            <span>Task List</span>
          </a>
          <a onClick={handleNavigateToLogout}>
            <div className='icon-li'>
              <img src='assets/icons/logout.svg' />
            </div>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
