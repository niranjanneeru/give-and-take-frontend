const getTiers = (bounty) => {
  const TierValues = {
    platinum: 0,
    gold: 0,
    silver: 0,
    bronze: 0
  };

  if (bounty > 100) {
    TierValues.platinum = bounty / 100;
    bounty %= 100;
  }
  if (bounty > 75) {
    TierValues.gold = bounty / 75;
    bounty %= 75;
  }
  if (bounty > 50) {
    TierValues.silver = bounty / 50;
    bounty %= 50;
  }

  TierValues.bronze = bounty / 25;
  bounty %= 25;

  return TierValues;
};

export default getTiers;
