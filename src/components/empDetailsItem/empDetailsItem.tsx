import SkillBlock from '../skillBlock/skillBlock';
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
      {type === 'status' ? (
        <Status status={value}></Status>
      ) : label === 'Skills' ? (
        <SkillBlock value={value} />
      ) : (
        <div className='item-value'>{value}</div>
      )}
    </div>
  );
};

export default DetailsItem;
