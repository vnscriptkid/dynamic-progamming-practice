export function naive(coins: number[], total: number, curIdx = 0): number {
  if (total === 0) return 1;

  if (curIdx === coins.length) return 0;

  // skip cur coin
  let branch1 = naive(coins, total, curIdx + 1);

  // take cur coin (if possible)
  let branch2 = 0;
  if (total >= coins[curIdx]) {
    branch2 = naive(coins, total - coins[curIdx], curIdx);
  }

  return branch1 + branch2;
}

export function topDownCache(
  coins: number[],
  total: number,
  curIdx = 0,
  cache: Record<string, number> = {}
): number {
  const cacheKey = String([total, curIdx]);

  if (!(cacheKey in cache)) {
    if (total === 0) return 1;

    if (curIdx === coins.length) return 0;

    // skip cur coin
    let branch1 = naive(coins, total, curIdx + 1);

    // take cur coin (if possible)
    let branch2 = 0;
    if (total >= coins[curIdx]) {
      branch2 = naive(coins, total - coins[curIdx], curIdx);
    }

    cache[cacheKey] = branch1 + branch2;
  }

  return cache[cacheKey];
}

export function bottomUp(coins: number[], total: number): number {
  const dp: number[][] = Array(coins.length)
    .fill(null)
    .map(() => Array(total + 1).fill(0));

  // first col
  for (let i = 0; i < coins.length; i++) dp[i][0] = 1;

  // first row
  for (let t = 1; t <= total; t++) {
    if (t >= coins[0]) dp[0][t] = dp[0][t - coins[0]];
  }

  for (let i = 1; i < coins.length; i++) {
    for (let t = 1; t <= total; t++) {
      let count1 = dp[i - 1][t];

      let count2 = 0;
      if (t >= coins[i]) count2 = dp[i][t - coins[i]];

      dp[i][t] = count1 + count2;
    }
  }

  return dp[coins.length - 1][total];
}
