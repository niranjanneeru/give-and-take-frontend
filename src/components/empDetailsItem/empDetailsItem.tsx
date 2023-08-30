import SkillBlock from '../skillBlock/skillBlock';
import Status from '../status/status';
import TierLogos from '../tierLogos/tierLogos';
import './empDetailsItem.css';
import type { FC } from 'react';

type ItemPropTypes = {
  label: string;
  type: 'text' | 'status' | 'badge';
  value: string;
  bounty?: number;
};

const DetailsItem: FC<ItemPropTypes> = ({ label, type, value, bounty = null }) => {
  return (
    <div className='emp-item'>
      <span>{label}</span>
      {type === 'status' ? (
        <Status status={value} />
      ) : type === 'badge' ? (
        <TierLogos bounty={bounty} />
      ) : label === 'Skills' ? (
        <SkillBlock value={value} />
      ) : (
        <div className='item-value'>{value}</div>
      )}
    </div>
  );
};

export default DetailsItem;
