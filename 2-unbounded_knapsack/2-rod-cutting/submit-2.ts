export function naive(
  lengths: number[],
  prices: number[],
  curLength: number,
  curIdx = 0,
  curProfit = 0
): number {
  if (curIdx === prices.length) return curProfit;

  // choice 1: take cur lengths[curIdx]
  let p1 = curProfit;
  if (curLength >= lengths[curIdx]) {
    p1 = naive(
      lengths,
      prices,
      curLength - lengths[curIdx],
      curIdx,
      curProfit + prices[curIdx]
    );
  }
  // choice 2: skip it
  const p2 = naive(lengths, prices, curLength, curIdx + 1, curProfit);

  return Math.max(p1, p2);
}

export function topDownCache(
  lengths: number[],
  prices: number[],
  curLength: number,
  curIdx = 0,
  curProfit = 0,
  cache: Record<string, number> = {}
) {
  const cacheKey = String([curLength, curIdx, curProfit]);

  if (!(cacheKey in cache)) {
    if (curIdx === prices.length) return curProfit;

    // choice 1: take cur lengths[curIdx]
    let p1 = curProfit;
    if (curLength >= lengths[curIdx]) {
      p1 = naive(
        lengths,
        prices,
        curLength - lengths[curIdx],
        curIdx,
        curProfit + prices[curIdx]
      );
    }
    // choice 2: skip it
    const p2 = naive(lengths, prices, curLength, curIdx + 1, curProfit);

    cache[cacheKey] = Math.max(p1, p2);
  }

  return cache[cacheKey];
}

export function bottomUp(
  lengths: number[],
  prices: number[],
  curLength: number
) {
  const dp: number[][] = Array(lengths.length)
    .fill(null)
    .map(() => Array(curLength + 1).fill(0));

  // first row
  for (let c = 1; c <= curLength; c++) {
    if (c >= lengths[0]) {
      dp[0][c] = prices[0] + dp[0][c - lengths[0]];
    }
  }

  for (let r = 1; r < prices.length; r++) {
    for (let c = 1; c <= curLength; c++) {
      const p1 = dp[r - 1][c];

      let p2 = 0;
      if (c >= lengths[r]) {
        p2 = prices[r] + dp[r][c - lengths[r]];
      }

      dp[r][c] = Math.max(p1, p2);
    }
  }

  return dp[prices.length - 1][curLength];
}

export function findItems(
  lengths: number[],
  prices: number[],
  originalLength: number
) {
  const dp: number[][] = Array(lengths.length)
    .fill(null)
    .map(() => Array(originalLength + 1).fill(0));

  // first row
  for (let c = 1; c <= originalLength; c++) {
    if (c >= lengths[0]) {
      dp[0][c] = prices[0] + dp[0][c - lengths[0]];
    }
  }

  for (let r = 1; r < prices.length; r++) {
    for (let c = 1; c <= originalLength; c++) {
      const p1 = dp[r - 1][c];

      let p2 = 0;
      if (c >= lengths[r]) {
        p2 = prices[r] + dp[r][c - lengths[r]];
      }

      dp[r][c] = Math.max(p1, p2);
    }
  }

  let l = originalLength,
    i = prices.length - 1;

  const items: any = {};

  while (l > 0) {
    if (i - 1 >= 0 && dp[i][l] === dp[i - 1][l]) {
      // skip curLength
      i--;
    } else {
      // take curLength
      if (!(i in items)) items[i] = 0;
      items[i]++;

      l -= lengths[i];
    }
  }

  return items;
}
