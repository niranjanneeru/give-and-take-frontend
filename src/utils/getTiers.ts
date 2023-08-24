const getTiers = (bounty) => {
  const TierValues = {
    PLATINUM: 0,
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0
  };

  if (bounty >= 100) {
    TierValues.PLATINUM = Math.floor(bounty / 100);
    bounty %= 100;
  }
  if (bounty >= 75) {
    TierValues.GOLD = Math.floor(bounty / 75);
    bounty %= 75;
  }
  if (bounty >= 50) {
    TierValues.SILVER = Math.floor(bounty / 50);
    bounty %= 50;
  }

  TierValues.BRONZE = Math.floor(bounty / 25);
  bounty %= 25;

  return TierValues;
};

export default getTiers;
