import getTiers from '../../utils/getTiers';
import './tierLogos.css';
import type { FC } from 'react';

type TierPropTypes = {
  bounty: number;
};

const TierLogos: FC<TierPropTypes> = ({ bounty }) => {
  const tierValues = getTiers(bounty);

  const getTier = (tier) => {
    return (
      <div className='tier-container'>
        <img src={`/assets/img/tiers/${tier}.png`} className='tier-img' />
        <p className='tier-notation'>X {tierValues[tier]}</p>
      </div>
    );
  };

  const tierList = Object.keys(tierValues)
    .filter((tier) => tierValues[tier] > 0)
    .map((tier) => getTier(tier));

  if (tierList.length == 0)
    tierList.push(
      <div className='tier-container'>
        <img src={`/assets/img/tiers/STONE.png`} className='tier-img' />
      </div>
    );

  return <div className='tiers-parent'>{tierList}</div>;
};

export default TierLogos;
