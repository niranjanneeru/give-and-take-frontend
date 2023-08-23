import type { FC } from 'react';
import './button.css';
import DropdownContent from '../dropdownContent/dropdownContent';

export type ButtonProps = {
  value: string;
  iconImg?: string;
  onClick?: (e) => void;
  handleFilter?: (e) => void;
};

const Button: FC<ButtonProps> = ({ value, onClick, iconImg, handleFilter }) => {
  return (
    <button onClick={onClick} className='button-relative'>
      {iconImg && <img className='subheader-img' src={`assets/icons/${iconImg}.svg`} />}

      <input type='submit' value={value} className='form-login' data-testid='button-test'></input>
      {value === 'Filter task' && <DropdownContent handleFilter={handleFilter}></DropdownContent>}
    </button>
  );
};

export default Button;
