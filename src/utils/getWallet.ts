const getWallet = (totalBounty, redeemedBounty) => {
  console.log(totalBounty);
  console.log(redeemedBounty);

  totalBounty = totalBounty - (totalBounty % 25);

  const remainder = redeemedBounty % 100;
  let price = 0;

  redeemedBounty -= remainder;
  totalBounty -= redeemedBounty;
  redeemedBounty = remainder;
  console.log(totalBounty, redeemedBounty);

  if (redeemedBounty + 99 < totalBounty) {
    const plats = totalBounty - redeemedBounty;

    price += plats * 18000;
  }

  for (let i = redeemedBounty; i <= totalBounty; i += 25) {
    if (i == 25 && redeemedBounty !== 25) {
      price += 2000;
      continue;
    }

    if (i == 50 && redeemedBounty !== 50) {
      price += 3000;
      continue;
    }

    if (i == 75 && redeemedBounty !== 75) {
      price += 5000;
      continue;
    }

    if (i == 100 && redeemedBounty !== 100) {
      price += 8000;
      continue;
    }
  }

  return price;
};

export default getWallet;
