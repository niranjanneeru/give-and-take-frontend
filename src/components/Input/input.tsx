import './styles.css';
import type { FC } from 'react';

type InputPropTypes = {
  label: string;
  type: 'text' | 'password';
  value: string;
  onChange: (e) => void;
};

const Input: FC<InputPropTypes> = ({ label, type, value, onChange }) => {
  return (
    <div className='relative'>
      <input
        type={type}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        className='form-input'
        required
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;
