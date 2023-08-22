import type { FC } from 'react';
import './styles.css';

export type ButtonProps = {
  value: string;
  iconImg?: string;
  onClick?: (e) => void;
};

const Button: FC<ButtonProps> = ({ value, onClick, iconImg }) => {
  return (
    <div className='button-relative' onClick={onClick}>
      {iconImg && <img className='subheader-img' src={`assets/icons/${iconImg}.svg`} />}

      <input type='submit' value={value} className='form-login' data-testid='button-test'></input>
    </div>
  );
};

export default Button;
