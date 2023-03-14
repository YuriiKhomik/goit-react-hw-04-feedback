export const percentageCounter = (total, percent) => {
  if (total > 0) {
    const purePercent = (percent * 100) / total;
    const roundedNumber = Math.round(purePercent);
    return roundedNumber;
  }
  return 0;
};
