import './PopupInput.css';
import type { FC } from 'react';

type PopupInputPropTypes = {
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange?: (e: any) => void;
};

const PopupInput: FC<PopupInputPropTypes> = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className='popupInputDiv'>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='popupInput'
        size={80}
      />
    </div>
  );
};

export default PopupInput;
