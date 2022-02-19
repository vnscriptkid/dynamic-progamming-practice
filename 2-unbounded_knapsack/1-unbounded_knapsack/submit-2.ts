// Time: O(2^n), Space: O(n)
function topDown(
  profits: number[],
  weights: number[],
  capacity: number,
  curIdx = 0,
  curProfit = 0
): number {
  // base case
  if (curIdx === profits.length) return curProfit;

  // 2 choices
  // CHOICE 1: SKIP
  const p1 = topDown(profits, weights, capacity, curIdx + 1, curProfit);

  // CHOICE 2: TAKE
  let p2 = 0;
  if (capacity >= weights[curIdx]) {
    // can take at least one
    let amount = ~~(capacity / weights[curIdx]);

    while (amount > 0) {
      const leftCapacity = capacity - amount * weights[curIdx];
      const accProfit = curProfit + amount * profits[curIdx];

      p2 = Math.max(
        p2,
        topDown(profits, weights, leftCapacity, curIdx + 1, accProfit)
      );
      amount--;
    }
  }

  return Math.max(p1, p2);
}

// Time: O(N * C), Space: O(N * C)
function topDownMemoized(
  profits: number[],
  weights: number[],
  capacity: number,
  curIdx = 0,
  curProfit = 0,
  cache: any = {}
): number {
  const key = String([capacity, curIdx, curProfit]);

  if (!(key in cache)) {
    // Base case
    if (curIdx === profits.length) return curProfit;

    const p1 = topDownMemoized(
      profits,
      weights,
      capacity,
      curIdx + 1,
      curProfit,
      cache
    );

    let p2 = 0;
    if (capacity >= weights[curIdx]) {
      p2 = topDownMemoized(
        profits,
        weights,
        capacity - weights[curIdx],
        curIdx,
        curProfit + profits[curIdx],
        cache
      );
    }

    cache[key] = Math.max(p1, p2);
  }

  return cache[key];
}

// Time: O(N*C) ; Space: O(N*C)
function bottomUp(profits: number[], weights: number[], capacity: number) {
  // build matrix: A[NxC]
  const dp = Array(profits.length)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // initial state
  for (let c = 0; c <= capacity; c++) {
    dp[0][c] = ~~(c / weights[0]) * profits[0];
  }

  // feed matrix
  let i: number;
  for (i = 1; i < profits.length; i++) {
    for (let c = 1; c <= capacity; c++) {
      const p1 = dp[i - 1][c];

      let p2 = 0;
      if (c >= weights[i]) {
        p2 = profits[i] + dp[i][c - weights[i]];
      }

      dp[i][c] = Math.max(p1, p2);
    }
  }

  // return
  return dp[i - 1][capacity];
}

function findItems(
  profits: number[],
  weights: number[],
  capacity: number
): any {
  // build matrix: A[NxC]
  const dp = Array(profits.length)
    .fill(null)
    .map(() => Array(capacity + 1).fill(0));

  // initial state
  for (let c = 0; c <= capacity; c++) {
    dp[0][c] = ~~(c / weights[0]) * profits[0];
  }

  // feed matrix
  let i: number;
  for (i = 1; i < profits.length; i++) {
    for (let c = 1; c <= capacity; c++) {
      const p1 = dp[i - 1][c];

      let p2 = 0;
      if (c >= weights[i]) {
        p2 = profits[i] + dp[i][c - weights[i]];
      }

      dp[i][c] = Math.max(p1, p2);
    }
  }

  let curItemIdx = i - 1;
  let curCapacity = capacity;
  const items: Record<string, number> = {};

  while (curItemIdx >= 0 && curCapacity > 0) {
    if (
      curItemIdx > 0 &&
      dp[curItemIdx][curCapacity] === dp[curItemIdx - 1][curCapacity]
    ) {
      // skip cur item
      curItemIdx--;
    } else {
      if (!(curItemIdx in items)) items[curItemIdx] = 0;
      items[curItemIdx]++;

      curCapacity -= weights[curItemIdx];
    }
  }

  return items;
}

export { topDown, topDownMemoized, bottomUp, findItems };
