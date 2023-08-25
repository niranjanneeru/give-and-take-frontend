import type { FC } from 'react';
import './dropdownContent.css';
import { filterCondtionsList } from '../../utils/filterConditions';

export type DropdownProps = {
  onClick?: (e) => void;
  handleFilter: any;
};

const DropdownContent: FC<DropdownProps> = ({ handleFilter }) => {
  return (
    <ul className='dropdown-content'>
      {Object.keys(filterCondtionsList).map((item) => {
        return (
          <li key={item}>
            <a onClick={() => handleFilter(String(item))}>{filterCondtionsList[item]}</a>
          </li>
        );
      })}

      {/* <li>
        <a onClick={() => handleFilter('CREATED')}>Created</a>
      </li>
      <li>
        <a onClick={() => handleFilter('IN_PROGRESS')}>In Progress</a>
      </li>
      <li>
        <a onClick={() => handleFilter('COMPLETED')}>Completed</a>
      </li>
      <li>
        <a onClick={() => handleFilter('IS_EXPIRED')}>Expired</a>
      </li>
      <li>
        <a onClick={() => handleFilter('IS_DIRECT_BOUNTY')}>Direct Bounty</a>
      </li> */}
    </ul>
  );
};

export default DropdownContent;
