import React, { useRef, FC } from 'react';
import './multiValueInput.css';

type MultiValueInputPropTypes = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange?(key: string, value: string): void;
};

const MultiValueInput: FC<MultiValueInputPropTypes> = ({ label, onChange, value }) => {
  const inputRef = useRef(null);

  const values = value.split(',').filter((item) => item !== ''); // removing null values

  console.log(values);
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      const newValue = event.target.textContent.trim();

      if (newValue) {
        onChange('skillsRequired', [...values, newValue].toString());
        event.target.textContent = '';
      }
      event.preventDefault();
    }
  };

  const handleRemoveValue = (index) => {
    const newValues = values.filter((_, i) => i !== index);

    onChange('skillsRequired', newValues.toString());
  };

  return (
    <div className='wr'>
      <label>{label}</label>
      <div className='input-wrapper'>
        {values.map((value, index) => (
          <div key={index} className='value-tag'>
            {value}
            <button onClick={() => handleRemoveValue(index)}>x</button>
          </div>
        ))}
        <div
          ref={inputRef}
          className='input-content'
          contentEditable
          onKeyPress={handleInputKeyPress}
        ></div>
      </div>
    </div>
  );
};

export default MultiValueInput;
