function topDown(
  profits,
  weights,
  capacity,
  curIdx = 0,
  curProfit = 0,
  max = { current: 0 }
) {
  if (curIdx === profits.length) {
    max.current = Math.max(max.current, curProfit);
    return;
  }

  // iterate items, for each: maxAmount can take ? n, cases are n to 0;
  const profit = profits[curIdx];
  const weight = weights[curIdx];

  const maxAmount = ~~(capacity / weight);

  for (let j = maxAmount; j >= 0; j--) {
    topDown(
      profits,
      weights,
      capacity - j * weight,
      curIdx + 1,
      curProfit + j * profit,
      max
    );
  }

  return max.current;
}

export { topDown };
