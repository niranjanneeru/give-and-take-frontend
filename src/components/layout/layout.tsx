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
};

const Layout: FC<LayoutProps> = ({ userRole, subheaderProps, children }) => {
  const navigate = useNavigate();

  const handleNavigateToEmployeeList = () => {
    navigate('/employees');
  };

  const handleNavigateToTaskList = () => {
    console.log('here');
    navigate('/tasks');
  };

  return (
    <section>
      <Sidebar
        handleNavigateToEmployeeList={handleNavigateToEmployeeList}
        handleNavigateToTaskList={handleNavigateToTaskList}
      ></Sidebar>
      <div className='sectionRight'>
        <Header></Header>
        <div className='feed'>
          <Subheader userRole={userRole} {...subheaderProps}></Subheader>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Layout;
