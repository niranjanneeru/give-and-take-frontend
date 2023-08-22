import SkillBlock from '../skillBlock/skillBlock';
import Status from '../status/status';
import './empDetailsItem.css';
import type { FC } from 'react';

type ItemPropTypes = {
  label: string;
  type: 'text' | 'status' | 'badge';
  value: string;
};

const DetailsItem: FC<ItemPropTypes> = ({ label, type, value }) => {
  return (
    <div className='emp-item'>
      <span>{label}</span>
      {type === 'status' ? (
        <Status status={value} />
      ) : type === 'badge' ? (
        <img className='tier-img' src={`/assets/img/tiers/${value}.png`} />
      ) : label === 'Skills' ? (
        <SkillBlock value={value} />
      ) : (
        <div className='item-value'>{value}</div>
      )}
    </div>
  );
};

export default DetailsItem;
