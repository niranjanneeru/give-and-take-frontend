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
    </ul>
  );
};

export default DropdownContent;
