import type { FC } from 'react';
import './dropdownContent.css';

export type DropdownProps = {
  value: string;
};

const DropdownContent: FC<DropdownProps> = () => {
  return (
    <ul className='dropdown-content'>
      <li>
        <a href='#'>Status - Created</a>
      </li>
      <li>
        <a href='#'>Status - In Progress</a>
      </li>
      <li>
        <a href='#'>Status - Completed</a>
      </li>
      <li>
        <a href='#'>EXPIRED</a>
      </li>
      <li>
        <a href='#'>DIRECT BOUNTY</a>
      </li>
    </ul>
  );
};

export default DropdownContent;
