import './formInput.css';
import { type FC } from 'react';

type FormInputPropTypes = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'date' | 'textarea';
  placeholder: string;
  value: string;
  onChange?(key: string, value: string): void;
  options?: string[];
};

const FormInput: FC<FormInputPropTypes> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  options
}) => {
  return (
    <div className='wr'>
      <label>{label}</label>
      {type === 'select' && (
        <select name={name} onChange={(evt) => onChange(evt.target.name, evt.target.value)}>
          <option value={placeholder} disabled selected>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {type === 'textarea' && (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(evt) => onChange(evt.target.name, evt.target.value)}
          className='formInputCreate'
        />
      )}

      {type !== 'select' && type !== 'textarea' && (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(evt) => onChange(evt.target.name, evt.target.value)}
          className='formInputCreate'
        />
      )}
    </div>
  );
};

export default FormInput;
