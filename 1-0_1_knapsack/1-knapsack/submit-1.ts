// Items: { Apple, Orange, Banana, Melon }
// Weights: { 2, 3, 1, 4 }
// Profits: { 4, 5, 3, 7 }
// Knapsack capacity: 5

function naive(
  profits: number[],
  weights: number[],
  capacity: number,
  curIdx = 0,
  curProfit = 0
): number {
  const n = profits.length;

  if (curIdx === n) {
    // have checked all items
    return curProfit;
  }

  // 2 choices:
  // take item
  let p1 = 0;
  if (capacity >= weights[curIdx]) {
    p1 = naive(
      profits,
      weights,
      capacity - weights[curIdx],
      curIdx + 1,
      curProfit + profits[curIdx]
    );
  }

  // skip item
  const p2 = naive(profits, weights, capacity, curIdx + 1, curProfit);

  return Math.max(p1, p2);
}

function topDownCache(
  profits: number[],
  weights: number[],
  capacity: number,
  curIdx = 0,
  curProfit = 0,
  cache: Record<string, number> = {}
): number {
  const cacheKey = String([capacity, curIdx, curProfit]);

  if (cacheKey in cache) return cache[cacheKey];

  const n = profits.length;

  if (curIdx === n) {
    // have checked all items
    return curProfit;
  }

  // 2 choices:
  // take item
  let p1 = 0;
  if (capacity >= weights[curIdx]) {
    p1 = topDownCache(
      profits,
      weights,
      capacity - weights[curIdx],
      curIdx + 1,
      curProfit + profits[curIdx],
      cache
    );
  }

  // skip item
  const p2 = topDownCache(
    profits,
    weights,
    capacity,
    curIdx + 1,
    curProfit,
    cache
  );

  cache[cacheKey] = Math.max(p1, p2);

  return cache[cacheKey];
}

function bottomUp(
  profits: number[],
  weights: number[],
  capacity: number
): number {
  const rows = profits.length;
  const cols = capacity + 1;
  const dp: number[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(0));

  // fill first row
  for (let c = 1; c < cols; c++) {
    // def take first item if capacity is enough
    if (c >= weights[0]) dp[0][c] = profits[0];
  }

  for (let i = 1; i < rows; i++) {
    for (let c = 1; c < cols; c++) {
      // take it
      let p1 = 0;
      if (c >= weights[i]) {
        p1 = profits[i] + dp[i - 1][c - weights[i]];
      }

      // skip it
      const p2 = dp[i - 1][c];

      dp[i][c] = Math.max(p1, p2);
    }
  }

  return dp[rows - 1][cols - 1];
}

function findItems(
  profits: number[],
  weights: number[],
  capacity: number
): number[] {
  // build matrix
  const n = profits.length;
  const dp = Array(n)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // init first row
  for (let c = 1; c <= capacity; c++) {
    if (c >= weights[0]) dp[0][c] = profits[0];
  }

  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      const p1 = dp[i - 1][c];

      let p2 = 0;
      if (c >= weights[i]) {
        p2 = profits[i] + dp[i - 1][c - weights[i]];
      }
      dp[i][c] = Math.max(p1, p2);
    }
  }

  let curCapacity = capacity;
  let curItem = n - 1;
  const items: number[] = [];

  while (curCapacity > 0 && curItem >= 0) {
    const curProfit = dp[curItem][curCapacity];

    const profitWithoutThisItem = dp[curItem - 1][curCapacity];

    if (curProfit === profitWithoutThisItem) {
      // do not select
      curItem--;
    } else {
      items.push(curItem);
      curCapacity -= weights[curItem];
      curItem--;
    }
  }

  return items.sort();
}

export { naive, topDownCache, bottomUp, findItems };
