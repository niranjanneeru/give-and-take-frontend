import type { FC } from 'react';
import './dropdownContent.css';

export type DropdownProps = {
  onClick?: (e) => void;
};

const DropdownContent: FC<DropdownProps> = () => {
  return (
    <ul className='dropdown-content'>
      <li>
        <a>Created</a>
      </li>
      <li>
        <a href='#'>In Progress</a>
      </li>
      <li>
        <a href='#'>Completed</a>
      </li>
      <li>
        <a href='#'>Expired</a>
      </li>
      <li>
        <a href='#'>Direct Bounty</a>
      </li>
    </ul>
  );
};

export default DropdownContent;
