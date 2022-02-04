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

function topDownMemoized(profits, weights, capacity) {
  const cache = {};

  function recursiveFn(capacity, curIdx, curProfit) {
    const [cap, idx] = Array.from(arguments);

    if (String([cap, idx]) in cache) return cache[String([cap, idx])];

    // base case
    if (curIdx === profits.length) {
      // globalMax = Math.max(globalMax, curProfit);
      return curProfit;
    }

    // iterate items, for each: maxAmount can take ? n, cases are n to 0;
    const profit = profits[curIdx];
    const weight = weights[curIdx];

    const maxAmount = ~~(capacity / weight);

    let maxProfit = 0;

    for (let j = maxAmount; j >= 0; j--) {
      const result = recursiveFn(
        capacity - j * weight,
        curIdx + 1,
        curProfit + j * profit
      );

      maxProfit = Math.max(result, maxProfit);
    }

    cache[String([cap, idx])] = maxProfit;

    return maxProfit;
  }

  return recursiveFn(capacity, 0, 0);
}

export { topDown, topDownMemoized };
