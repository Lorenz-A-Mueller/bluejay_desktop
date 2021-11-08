export const calculateNumberOfDays = (
  startTimestamp: number,
  endTimestamp?: number,
) => {
  if (!endTimestamp) {
    endTimestamp = Date.now();
  }

  const timeDifference = endTimestamp - startTimestamp;
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.ceil(dayDifference + 1);
};
