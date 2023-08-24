import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import './layout.css';
import Subheader from '../subheader/subheader';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../pages/employee/api';

type LayoutProps = {
  userRole?: string;
  children: any;
  subheaderProps: any;
  searchBarProps?: any;
};

const Layout: FC<LayoutProps> = ({ userRole, searchBarProps = {}, subheaderProps, children }) => {
  const navigate = useNavigate();

  const { data: userData } = useGetUserQuery();
  const user = userData?.data;

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

  const hanndleNavigateToProfile = () => {
    navigate(`/employees/${user.id}`);
  };
  const handleNavigateToRedeemRequests = () => {
    navigate(`/redeem-requests`);
  };

  return (
    <section>
      <Sidebar
        handleNavigateToEmployeeList={handleNavigateToEmployeeList}
        handleNavigateToTaskList={handleNavigateToTaskList}
        handleNavigateToLogout={handleNavigateToLogout}
        handleNavigateToProfile={hanndleNavigateToProfile}
        handleNavigateToRedeemRequests={handleNavigateToRedeemRequests}
        userRole={userRole}
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
