import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='logo-employee'>
        <img src='assets/img/kv logo.png' />
      </div>
      <div></div>
      <ul className='side-nav'>
        <li className='list'>
          <a>
            <div className='icon-li'>
              <img src='assets/icons/employees.svg' />
            </div>
            <span>Employee List</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
