import { useState } from 'react';
import './sidebar.css';
import Popup from '../deletePopup/deletePopup';

const Sidebar = ({
  handleNavigateToEmployeeList,
  handleNavigateToTaskList,
  handleNavigateToLogout,
  hanndleNavigateToProfile
}) => {
  const [isLogOutPopUpVisible, setPopUpVisible] = useState(false);

  console.log(isLogOutPopUpVisible);
  console.log(handleNavigateToLogout);

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
              <img src='assets/img/icons8-employees-24.png' />
            </div>
            <span>Employee List</span>
          </a>
          <a onClick={handleNavigateToTaskList}>
            <div className='icon-li'>
              <img src='assets/img/icons8-task-list-30.png' />
            </div>
            <span>Task List</span>
          </a>
          <a>
            <div className='icon-li'>
              <img src='assets/img/to-receive-points-svgrepo-com.svg' />
            </div>
            <span>Redeem Requests</span>
          </a>
          <a onClick={hanndleNavigateToProfile}>
            <div className='icon-li'>
              <img src='assets/icons/profile.svg' />
            </div>
            <span>Profile</span>
          </a>
          <a onClick={() => {}}>
            <div className='icon-li'>
              <img src='assets/icons/about.svg' />
            </div>
            <span>About</span>
          </a>
          <div className='logout'>
            <a
              onClick={() => {
                setPopUpVisible(true);
              }}
            >
              <div className='icon-li'>
                <img src='assets/img/icons8-logout-48.png' />
              </div>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
      {isLogOutPopUpVisible && (
        <Popup
          onClose={() => {
            setPopUpVisible(false);
          }}
          desc='Do you want to logout?'
          onConfirm={() => {
            handleNavigateToLogout();
          }}
        />
      )}
    </aside>
  );
};

export default Sidebar;
