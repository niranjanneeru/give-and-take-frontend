import type { FC } from 'react';
import './styles.css';

export type ButtonProps = {
  value: string;
  iconImg?: string;
  onClick?: (e) => void;
};

const Button: FC<ButtonProps> = ({ value, onClick, iconImg }) => {
  return (
    <div className='button-relative'>
      {iconImg && <img src={`assets/icons/${iconImg}.svg`} />}

      <input
        type='submit'
        value={value}
        className='form-login'
        onClick={onClick}
        data-testid='button-test'
      ></input>
    </div>
  );
};

export default Button;
