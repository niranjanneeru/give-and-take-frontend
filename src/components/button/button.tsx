import type { FC } from 'react';
import './button.css';
import DropdownContent from '../dropdownContent/dropdownContent';

export type ButtonProps = {
  value: string;
  iconImg?: string;
  onClick?: (e) => void;
  handleFilter?: (e) => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({ value, onClick, iconImg, handleFilter, className }) => {
  return (
    <button onClick={onClick} className={className ? className : 'button-relative'}>
      {iconImg && <img className='subheader-img' src={`assets/icons/${iconImg}.svg`} />}

      <div className={!className ? 'form-login' : null} data-testid='button-test'>
        {value}
      </div>
      {value === 'Filter task' && <DropdownContent handleFilter={handleFilter}></DropdownContent>}
    </button>
  );
};

export default Button;
