function naive(
  lengths: number[],
  prices: number[],
  total: number,
  curIdx = 0,
  curPrice = 0
): number {
  if (curIdx === prices.length || total <= 0) {
    return curPrice;
  }

  // choices
  // take cur length
  let p1 = curPrice;
  if (total >= lengths[curIdx]) {
    p1 = naive(
      lengths,
      prices,
      total - lengths[curIdx],
      curIdx,
      curPrice + prices[curIdx]
    );
  }

  // skip cur length
  const p2 = naive(lengths, prices, total, curIdx + 1, curPrice);

  return Math.max(p1, p2);
}

function topDownCache(
  lengths: number[],
  prices: number[],
  total: number,
  curIdx = 0,
  curPrice = 0,
  cache: Record<string, number> = {}
): number {
  const cacheKey = String([total, curIdx, curPrice]);

  if (!(cacheKey in cache)) {
    if (curIdx === prices.length || total <= 0) {
      return curPrice;
    }

    // choices
    // take cur length
    let p1 = curPrice;
    if (total >= lengths[curIdx]) {
      p1 = naive(
        lengths,
        prices,
        total - lengths[curIdx],
        curIdx,
        curPrice + prices[curIdx]
      );
    }

    // skip cur length
    const p2 = naive(lengths, prices, total, curIdx + 1, curPrice);

    cache[cacheKey] = Math.max(p1, p2);
  }

  return cache[cacheKey];
}

function bottomUp(lengths: number[], prices: number[], total: number): number {
  const n = prices.length;
  const dp: number[][] = Array(total + 1)
    .fill(0)
    .map(() => Array(n).fill(0));

  // init first row
  for (let l = 1; l <= total; l++) {
    if (l >= lengths[0]) {
      dp[0][l] = prices[0] + dp[0][l - lengths[0]];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let l = 1; l <= total; l++) {
      let p1 = 0;

      if (l >= lengths[i]) p1 = prices[i] + dp[i][l - lengths[i]];

      const p2 = dp[i - 1][l];

      dp[i][l] = Math.max(p1, p2);
    }
  }

  return dp[n - 1][total];
}

function findItems(lengths: number[], prices: number[], total: number): any {
  const n = prices.length;
  const dp: number[][] = Array(n)
    .fill(null)
    .map(() => Array(total + 1).fill(0));
  const items: Record<string, number> = {};

  // init first row
  for (let l = 1; l <= total; l++) {
    if (l >= lengths[0]) dp[0][l] = prices[0] + dp[0][l - lengths[0]];
  }

  // build dp
  for (let i = 1; i < n; i++) {
    for (let l = 1; l <= total; l++) {
      const p1 = dp[i - 1][l];

      let p2 = 0;

      if (l >= lengths[i]) {
        p2 = prices[i] + dp[i][l - lengths[i]];
      }

      dp[i][l] = Math.max(p1, p2);
    }
  }

  let i = n - 1;
  let l = total;

  while (l > 0) {
    if (i - 1 >= 0 && dp[i][l] === dp[i - 1][l]) {
      // do not take cur item
      i--;
    } else {
      // take cur item
      if (!(i in items)) items[i] = 0;
      items[i]++;

      // update curLength
      l -= lengths[i];
    }
  }

  return items;
}

export { naive, topDownCache, bottomUp, findItems };
