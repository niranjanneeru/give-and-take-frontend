import './TextArea.css';
import type { FC } from 'react';

type TextAreaPropTypes = {
  label: string;
  rows: number;
  cols: number;
  value: string;
  placeholder: string;
  onChange?: (e: any) => void;
};

const TextArea: FC<TextAreaPropTypes> = ({ label, rows, cols, value, onChange }) => {
  return (
    <div className='textAreaDiv'>
      <label>{label}</label>
      <textarea placeholder={label} value={value} rows={rows} cols={cols} onChange={onChange} />
    </div>
  );
};

export default TextArea;
