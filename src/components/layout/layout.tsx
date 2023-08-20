import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import './layout.css';
import Subheader from '../subheader/subheader';
import { FC } from 'react';
type LayoutProps = {
  userRole: string;
  children: any;
  subheaderProps: any;
};

const Layout: FC<LayoutProps> = ({ userRole, subheaderProps, children }) => {
  return (
    <section>
      <Sidebar></Sidebar>
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
