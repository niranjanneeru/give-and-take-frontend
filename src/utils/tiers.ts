export enum Tier {
  AMATEUR = 'AMATEUR',
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
  if (bountyPoints >= 100) return Tier.PLATINUM;
  if (bountyPoints >= 75) return Tier.GOLD;
  if (bountyPoints <= 50) return Tier.SILVER;
  if (bountyPoints <= 25) return Tier.BRONZE;

  return Tier.AMATEUR;
};
