import Status from '../status/status';
import './empDetailsItem.css';
import type { FC } from 'react';

type ItemPropTypes = {
  label: string;
  type: 'text' | 'status';
  value: string;
};

const DetailsItem: FC<ItemPropTypes> = ({ label, type, value }) => {
  return (
    <div className='emp-item'>
      <span>{label}</span>
      {type != 'status' ? (
        <div className='item-value'>{value}</div>
      ) : (
        <Status status={value}></Status>
      )}
    </div>
  );
};

export default DetailsItem;
