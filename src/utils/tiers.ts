export enum Tier {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  ASCENDANT = 'ASCENDANT',
  IMMORTAL = 'IMMORTAL',
  RADIANT = 'RADIANT'
}

export const getTier = (bountyPoints: number) => {
  if (bountyPoints < 100) return Tier.BRONZE;
  if (bountyPoints < 500) return Tier.SILVER;
  if (bountyPoints < 1000) return Tier.GOLD;
  if (bountyPoints < 2000) return Tier.PLATINUM;
  if (bountyPoints < 5000) return Tier.DIAMOND;
  if (bountyPoints < 10000) return Tier.ASCENDANT;
  if (bountyPoints < 20000) return Tier.IMMORTAL;

  return Tier.RADIANT;
};
