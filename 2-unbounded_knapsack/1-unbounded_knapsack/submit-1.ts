function topDown(
  profits: number[],
  weights: number[],
  capacity: number,
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

function topDownMemoized(
  profits: number[],
  weights: number[],
  capacity: number
) {
  const cache: Record<string, any> = {};

  function recursiveFn(capacity: number, curIdx: number, curProfit: number) {
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

function bottomUp(profits: number[], weights: number[], capacity: number) {
  // generate matrix
  const rows = profits.length + 1;
  const cols = capacity + 1;

  const dp = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(0));

  // initial matrix state

  // solve matrix
  for (let rowIdx = 1; rowIdx < rows; rowIdx++) {
    for (let colIdx = 1; colIdx < cols; colIdx++) {
      // in one cell, find local max profit considering items up until cur row, with capacity colIdx
      const [profit, weight] = [profits[rowIdx - 1], weights[rowIdx - 1]];

      // choice 1: take curItem
      // choice 2: do not take
      dp[rowIdx][colIdx] =
        dp[rowIdx - 1][colIdx]; /* default case: do not take */

      const maxAmountCanTake = ~~(colIdx / weight);

      let amountTake = maxAmountCanTake;

      while (amountTake > 0) {
        const profitCandidate =
          profit * amountTake + dp[rowIdx - 1][colIdx - weight * amountTake];

        dp[rowIdx][colIdx] = Math.max(profitCandidate, dp[rowIdx][colIdx]);

        amountTake--;
      }
    }
  }

  // return
  return dp[rows - 1][cols - 1];
}

function findItems(profits: number[], weights: number[], capacity: number) {
  const items: Record<number, number> = {};

  // gen matrix
  const rows = profits.length;
  const cols = capacity + 1;
  const dp = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(0));

  // fill matrix
  for (let i = 0; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      let profitIfSkip = 0;
      let profitIfTake = 0;

      if (i > 0) {
        /* do not skip if i === 0 */
        profitIfSkip = dp[i - 1][j];
      }

      if (j >= weights[i]) {
        /* only take if there's enough capacity */
        profitIfTake = profits[i] + dp[i][j - weights[i]];
      }

      dp[i][j] = Math.max(profitIfTake, profitIfSkip);
    }
  }

  // traverse back to find items

  let i = rows - 1;
  let j = cols - 1;

  while (i >= 0 && j > 0) {
    // which direction do i go?

    // 1. upward: skip current item
    if (i > 0 && dp[i][j] === dp[i - 1][j]) {
      // update i
      i--;
    }
    // 2. leftward: take current item
    else {
      // update selected items
      if (!(i in items)) items[i] = 0;
      items[i]++;
      // update left capacity
      j -= weights[i];
    }
  }

  return items;
}

export { topDown, topDownMemoized, bottomUp, findItems };
