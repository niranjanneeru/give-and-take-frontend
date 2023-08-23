import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import './layout.css';
import Subheader from '../subheader/subheader';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type LayoutProps = {
  userRole?: string;
  children: any;
  subheaderProps: any;
  searchBarProps?: any;
};

const Layout: FC<LayoutProps> = ({ userRole, searchBarProps = {}, subheaderProps, children }) => {
  const navigate = useNavigate();

  const handleNavigateToEmployeeList = () => {
    navigate('/employees');
  };

  const handleNavigateToTaskList = () => {
    console.log('here');
    navigate('/tasks');
  };
  const handleNavigateToLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <section>
      <Sidebar
        handleNavigateToEmployeeList={handleNavigateToEmployeeList}
        handleNavigateToTaskList={handleNavigateToTaskList}
        handleNavigateToLogout={handleNavigateToLogout}
      ></Sidebar>
      <div className='sectionRight'>
        <Header {...searchBarProps}></Header>
        <div className='feed'>
          <Subheader userRole={userRole} {...subheaderProps}></Subheader>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
