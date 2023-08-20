import type { FC } from 'react';
import './styles.css';

export type ButtonProps = {
  value: string;
  onClick?: (e) => void;
};

const Button: FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <div className='relative'>
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
